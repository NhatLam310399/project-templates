import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ValidatorForm } from "react-material-ui-form-validator";
import { InputAdornment } from "@material-ui/core";

import useAuth from "common/hooks/useAuth";
import { useRedirect } from "common/hooks/useRedirect";
import {
  getIdByPhoneNumberService,
  getKaraokeByBossService,
  getCompanyByBossService,
} from "common/functions/servicesApi";
import { isAuthenticated, setUserCookies } from "common/utils/auth";

import ErrorDialog from "components/ErrorDialog";

import { PATH } from "constants/routes";
import { PERMISSION } from "constants/permission";
import { PHONE_VALIDATE_REGEXP } from "constants/regexp";
import { verifierMessages } from "constants/messages";

import firebase from "config/firebase";

import Select from "designs/Select";
import Button from "designs/Button";
import Input from "designs/Input";

import LoginLayout from "layouts/Login";

import { IRootState } from "redux/reducers";
import { getToken } from "redux/actions/auth";
import { showNotification } from "redux/actions/notification";
import { red } from "@material-ui/core/colors";
import { IPlace } from "common/typings";

const window: {
  appVerifier: firebase.auth.RecaptchaVerifier | undefined;
  confirmResult: firebase.auth.ConfirmationResult | undefined;
} = {
  appVerifier: undefined,
  confirmResult: undefined,
};

// firebase.auth().settings.appVerificationDisabledForTesting = true;

type IInputMode = "PHONE_VERIFY" | "OTP_VERIFY";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const redirect = useRedirect();
  const { isAuth, logout, currentUser } = useAuth();
  const inputValue = useRef("");
  const captchaRef = useRef<HTMLDivElement | null>(null);
  const [inputMode, setInputMode] = useState<IInputMode>("PHONE_VERIFY");
  const [permissionSelected, setPermissionSelected] = useState(PERMISSION[0]);
  const [errorField, setErrorField] = useState({
    isShow: false,
    message: "Số điện thoại không đúng!",
  });
  const [isLoading, setIsLoading] = useState(false);
  console.log("currentUser", currentUser);
  useEffect(() => {
    const accountPermission = currentUser?.userInfo?.permission;
    if (isAuthenticated()) {
      if (accountPermission === "CARE_STAFF") {
        redirect(PATH.CUSTOMER_CARE.CARED);
        return;
      }
      redirect(PATH.OVERVIEW);
      return;
    }

    if (!isAuth) {
      logout();
      return;
    }

    const warningNotify = (message: string) => {
      dispatch(
        showNotification({
          type: "warning",
          message,
          title: "",
        }),
      );
      logout();
      setInputMode("PHONE_VERIFY");
    };

    if (accountPermission === permissionSelected?.permission) {
      if (accountPermission === "CARE_STAFF") {
        dispatch(
          showNotification({
            message: "Đăng nhập thành công",
            type: "success",
            title: "",
          }),
        );
        setUserCookies(currentUser!);
        redirect(PATH.CUSTOMER_CARE.CARED);
        return;
      }

      const handleVerifyPlace = async () => {
        setIsLoading(true);
        let place: IPlace | null = null;
        if (permissionSelected?.type === "KARAOKE") {
          place = await getKaraokeByBossService({
            idUser: currentUser!.userId!.id,
          });
        } else if (permissionSelected?.type === "COMPANY") {
          place = await getCompanyByBossService({
            idUser: currentUser!.userId!.id!,
          });
        }
        // now, place is null
        // api return null user in company. Check again when api fixed. Good luck !!!

        if (permissionSelected.permission === "") setIsLoading(false);
        if (!place) {
          warningNotify(
            "Tài khoản bạn chưa được duyệt hoặc không tồn tại. Vui lòng liên hệ quản trị viên và thử lại sau!",
          );
          setInputMode("PHONE_VERIFY");
        }

        if (place?.type === permissionSelected?.type) {
          dispatch(
            showNotification({
              message: "Đăng nhập thành công",
              type: "success",
              title: "",
            }),
          );
          setUserCookies(currentUser!);
          redirect(PATH.OVERVIEW);
        } else {
          warningNotify(
            "Không đúng loại hình doanh nghiệp, xin vui lòng thử lại!",
          );
        }
      };
      handleVerifyPlace();
    } else {
      warningNotify("Không đúng quyền truy cập, xin vui lòng thử lại!");
    }
  }, [isAuth]);

  const handleReinitialRecatpcha = () => {
    if (window.appVerifier && captchaRef) {
      window.appVerifier.clear();
      captchaRef!.current!.innerHTML = `<div id="captcha"/>`;
    }
  };

  const handleSelect = (option: any) => {
    setPermissionSelected(option);
  };

  const handleSubmit = () => {
    if (inputMode === "PHONE_VERIFY") {
      const handleVerifyPhone = async () => {
        const text = inputValue.current;
        const user = await getIdByPhoneNumberService({ phoneNumber: text });
        if (user) {
          if (
            !(user?.permission === "BOSS" || user?.permission === "CARE_STAFF")
          ) {
            setErrorField({
              isShow: true,
              message: "Không đúng quyền truy cập, xin vui lòng thử lại!",
            });
            return;
          }
          const firstChar = text.slice(0, 1);
          let phoneNumberStandard = "";
          if (firstChar === "0") {
            phoneNumberStandard = `+84${text.slice(1, text.length)}`;
          } else {
            phoneNumberStandard = `+84${text}`;
          }
          handleVerifyPhoneNumber(phoneNumberStandard);
        } else {
          setErrorField({
            isShow: true,
            message: "Số điện thoại chưa đăng kí, vui lòng đăng kí tài khoản!",
          });
        }
      };
      handleVerifyPhone();
    } else if (inputMode === "OTP_VERIFY") {
      handleVerifyOtpCode(inputValue.current);
    }
  };

  const handleVerifyPhoneNumber = async (phoneNumber: string) => {
    const captchaVerifier = await new firebase.auth.RecaptchaVerifier(
      "captcha",
      {
        size: "invisible",
      },
    );
    window.appVerifier = await captchaVerifier;
    try {
      setIsLoading(true);
      const confirmResult = await firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, window.appVerifier);
      handleReinitialRecatpcha();
      inputValue.current = "";
      setInputMode("OTP_VERIFY");
      setIsLoading(false);
      window.confirmResult = confirmResult;
    } catch (error: any) {
      handleReinitialRecatpcha();
      console.error(error);
      setIsLoading(false);
      const errorMessage = verifierMessages.find(
        item => item?.code === error?.code,
      );
      setErrorField({
        isShow: true,
        message:
          errorMessage?.vi || "Hệ thống đang gặp sự cố, vui lòng thử lại sau!",
      });
    }
  };

  const handleVerifyOtpCode = async (otpCode: string) => {
    setIsLoading(true);

    if (window.confirmResult) {
      try {
        const result = await window.confirmResult.confirm(otpCode);
        if (result) {
          setIsLoading(false);
          fnSendRequest();
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setErrorField({
          isShow: true,
          message: "Mã OTP không hợp lệ",
        });
      }
    }
  };

  const fnSendRequest = async () => {
    try {
      if (firebase.auth()?.currentUser) {
        const idToken: string =
          (await firebase.auth().currentUser?.getIdToken(true)) || "";
        dispatch(getToken({ idToken }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoginLayout>
      <div className="w-full px-2 wrapper max-w-50 ">
        <Header />
        <div className="w-full ">
          <ValidatorForm
            onSubmit={handleSubmit}
            className="flex flex-col gap-1"
          >
            {inputMode === "PHONE_VERIFY" ? (
              <>
                <Select
                  options={PERMISSION}
                  title="Bạn là"
                  value={permissionSelected?.name}
                  onSelectOption={handleSelect}
                  required
                  errorMessage="Vui lòng chọn quyền"
                />
                <Input
                  key="PHONE"
                  label="Số điện thoại"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+84</InputAdornment>
                    ),
                  }}
                  name="phoneNumber"
                  type="number"
                  onChange={newValue => {
                    inputValue.current = newValue;
                  }}
                  className="text-lg text-primary"
                  validates={{
                    required: {
                      errorMessage: "Vui lòng nhập Số điện thoại!",
                    },
                    matchRegexp: {
                      regexp: PHONE_VALIDATE_REGEXP,
                      errorMessage: "Số điện thoại không hợp lệ!",
                    },
                  }}
                />
              </>
            ) : (
              <Input
                key="OPT"
                label="Mã OTP"
                name="otp"
                type="number"
                onChange={newValue => {
                  inputValue.current = newValue;
                }}
                className="text-lg text-primary"
                validates={{
                  required: {
                    errorMessage: "Vui lòng nhập mã OTP!",
                  },
                  matchRegexp: {
                    regexp: "\\b[0-9]{6}\\b",
                    errorMessage: "Mã OTP phải đúng 6 con số.",
                  },
                }}
              />
            )}
            <Button
              type="submit"
              primary
              innerClassName="h-4 text-lg font-bold text-white normal-case"
              className="mt-2 mb-1"
              loading={isLoading}
            >
              Đăng nhập
            </Button>
          </ValidatorForm>
        </div>
        <div className="w-full text-right">
          <Link
            className="text-lg font-bold text-primary hover:text-secondary"
            to={PATH.REGISTER.INPUT}
          >
            Đăng ký sử dụng
          </Link>
        </div>

        <Footer />
      </div>
      <div ref={captchaRef}>
        <div id="captcha" />
      </div>
      <ErrorDialog
        isOpen={errorField.isShow}
        title="Đăng nhập thất bại"
        message={errorField.message}
        onClose={() => setErrorField({ ...errorField, isShow: false })}
      />
    </LoginLayout>
  );
};

export default Login;

const Header: React.FC = props => {
  return (
    <div className="w-full font-normal">
      <h1 className="mb-2 font-bold text-left font-default text-primary text-mxl phone:text-3xl laptop:mr-0 laptop:mb-1">
        Đăng nhập
      </h1>
      <p className="mb-1 text-lg font-default">
        Bằng việc đăng nhập, bạn đồng ý với
        <a
          href="https://www.ktv-app.com/dieu-luat-danh-cho-chu-quan-karaoke-khi-dung-ung-dung-ktv-app/"
          target="_blank"
          rel="noreferrer"
          className="font-bold ml-0.5"
        >
          Điều luật sử dụng hệ thống KTV APP.
        </a>
      </p>
    </div>
  );
};

const Footer: React.FC = props => {
  return (
    <div className="">
      <div className="w-full mt-5 mb-2 text-left contact-wrapper text-md">
        <p>
          Tổng đài hỗ trợ :
          <a className="font-bold mx-0.5" href="tel:0964636139">
            0964636139
          </a>
          -
          <a className="font-bold ml-0.5" href="tel:0368878887">
            0368878887
          </a>
        </p>
        <p className="mt-1">
          Hỗ trợ quý khách từ
          <span className="inline font-bold ml-0.5">
            6:00-18:00 hàng ngày trong tuần từ thứ thứ 2 đến chủ nhật
          </span>
        </p>
      </div>
    </div>
  );
};
