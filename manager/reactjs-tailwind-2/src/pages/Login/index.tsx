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
    message: "S??? ??i???n tho???i kh??ng ????ng!",
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
            message: "????ng nh???p th??nh c??ng",
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
            "T??i kho???n b???n ch??a ???????c duy???t ho???c kh??ng t???n t???i. Vui l??ng li??n h??? qu???n tr??? vi??n v?? th??? l???i sau!",
          );
          setInputMode("PHONE_VERIFY");
        }

        if (place?.type === permissionSelected?.type) {
          dispatch(
            showNotification({
              message: "????ng nh???p th??nh c??ng",
              type: "success",
              title: "",
            }),
          );
          setUserCookies(currentUser!);
          redirect(PATH.OVERVIEW);
        } else {
          warningNotify(
            "Kh??ng ????ng lo???i h??nh doanh nghi???p, xin vui l??ng th??? l???i!",
          );
        }
      };
      handleVerifyPlace();
    } else {
      warningNotify("Kh??ng ????ng quy???n truy c???p, xin vui l??ng th??? l???i!");
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
              message: "Kh??ng ????ng quy???n truy c???p, xin vui l??ng th??? l???i!",
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
            message: "S??? ??i???n tho???i ch??a ????ng k??, vui l??ng ????ng k?? t??i kho???n!",
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
          errorMessage?.vi || "H??? th???ng ??ang g???p s??? c???, vui l??ng th??? l???i sau!",
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
          message: "M?? OTP kh??ng h???p l???",
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
                  title="B???n l??"
                  value={permissionSelected?.name}
                  onSelectOption={handleSelect}
                  required
                  errorMessage="Vui l??ng ch???n quy???n"
                />
                <Input
                  key="PHONE"
                  label="S??? ??i???n tho???i"
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
                      errorMessage: "Vui l??ng nh???p S??? ??i???n tho???i!",
                    },
                    matchRegexp: {
                      regexp: PHONE_VALIDATE_REGEXP,
                      errorMessage: "S??? ??i???n tho???i kh??ng h???p l???!",
                    },
                  }}
                />
              </>
            ) : (
              <Input
                key="OPT"
                label="M?? OTP"
                name="otp"
                type="number"
                onChange={newValue => {
                  inputValue.current = newValue;
                }}
                className="text-lg text-primary"
                validates={{
                  required: {
                    errorMessage: "Vui l??ng nh???p m?? OTP!",
                  },
                  matchRegexp: {
                    regexp: "\\b[0-9]{6}\\b",
                    errorMessage: "M?? OTP ph???i ????ng 6 con s???.",
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
              ????ng nh???p
            </Button>
          </ValidatorForm>
        </div>
        <div className="w-full text-right">
          <Link
            className="text-lg font-bold text-primary hover:text-secondary"
            to={PATH.REGISTER.INPUT}
          >
            ????ng k?? s??? d???ng
          </Link>
        </div>

        <Footer />
      </div>
      <div ref={captchaRef}>
        <div id="captcha" />
      </div>
      <ErrorDialog
        isOpen={errorField.isShow}
        title="????ng nh???p th???t b???i"
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
        ????ng nh???p
      </h1>
      <p className="mb-1 text-lg font-default">
        B???ng vi???c ????ng nh???p, b???n ?????ng ?? v???i
        <a
          href="https://www.ktv-app.com/dieu-luat-danh-cho-chu-quan-karaoke-khi-dung-ung-dung-ktv-app/"
          target="_blank"
          rel="noreferrer"
          className="font-bold ml-0.5"
        >
          ??i???u lu???t s??? d???ng h??? th???ng KTV APP.
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
          T???ng ????i h??? tr??? :
          <a className="font-bold mx-0.5" href="tel:0964636139">
            0964636139
          </a>
          -
          <a className="font-bold ml-0.5" href="tel:0368878887">
            0368878887
          </a>
        </p>
        <p className="mt-1">
          H??? tr??? qu?? kh??ch t???
          <span className="inline font-bold ml-0.5">
            6:00-18:00 h??ng ng??y trong tu???n t??? th??? th??? 2 ?????n ch??? nh???t
          </span>
        </p>
      </div>
    </div>
  );
};
