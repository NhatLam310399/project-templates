import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ValidatorForm } from "react-material-ui-form-validator";

import { IRootState } from "common/typings";
import { removeUserCookies, setUserCookies } from "common/utils/auth";
import { InputAdornment } from "@material-ui/core";
import firebase from "common/utils/firebase";
import "firebase/auth";

import { verifierMessages } from "constants/messages";
import { PHONE_VALIDATE_REGEXP } from "constants/regexp";

import Button from "designs/Button";
import SVG from "designs/SVG";
import Input from "designs/Input";

import { actionRemoveCurrentUser, getToken } from "redux/actions/auth";
import { setLoading } from "redux/actions/common";
import { showNotification } from "redux/actions/notification";

import LoginIntro from "./components/LoginIntro";
import { getIdByPhoneNumberService } from "./helpers";

const window: {
  appVerifier: firebase.auth.RecaptchaVerifier | undefined;
  confirmResult: firebase.auth.ConfirmationResult | undefined;
} = {
  appVerifier: undefined,
  confirmResult: undefined,
};

// Disable this when Release the product
// firebase.auth().settings.appVerificationDisabledForTesting = true;

type IInputMode = "PHONE_VERIFY" | "OPT_VERIFY";

const LoginPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const inputValue = useRef("");
  const [inputMode, setInputMode] = useState<IInputMode>("PHONE_VERIFY");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const { currentUser } = useSelector((state: IRootState) => state.auth);
  const { isLoading } = useSelector((state: IRootState) => state.common);

  const handleSubmit = () => {
    if (inputMode === "PHONE_VERIFY") {
      const handleVerifyPhone = async () => {
        const text = inputValue.current;
        const user = await getIdByPhoneNumberService(text);
        if (user) {
          const firstChar = text.slice(0, 1);
          let phoneNumberStandard = "";
          if (firstChar === "0") {
            phoneNumberStandard = `+84${text.slice(1, text.length)}`;
          } else {
            phoneNumberStandard = `+84${text}`;
          }
          setPhoneNumber(phoneNumberStandard);
          handleVerifyPhoneNumber(phoneNumberStandard);
          inputValue.current = "";
        } else {
          setError("Số điện thoại chưa đăng kí, vui lòng đăng kí tài khoản!");
        }
      };
      handleVerifyPhone();
    } else if (inputMode === "OPT_VERIFY") {
      handleVerifyOtpCode(inputValue.current);
    }
  };

  const handleVerifyPhoneNumber = async (phone: string) => {
    dispatch(setLoading(true));

    const captchaVerifier = new firebase.auth.RecaptchaVerifier("captcha", {
      size: "invisible",
    });
    window.appVerifier = captchaVerifier;

    try {
      const confirmResult = await firebase
        .auth()
        .signInWithPhoneNumber(phone, window.appVerifier);

      error && setError("");
      setInputMode("OPT_VERIFY");
      dispatch(setLoading(false));
      window.confirmResult = confirmResult;
    } catch (errorReturn: any) {
      window.appVerifier?.clear();
      console.error(errorReturn);
      dispatch(setLoading(false));
      const errorMessage = verifierMessages.find(
        item => item?.code === errorReturn?.code,
      );
      setError(
        errorMessage?.vi || "Hệ thống đang gặp sự cố, vui lòng thử lại sau!",
      );
    }
  };

  const handleVerifyOtpCode = async (otpCode: string) => {
    dispatch(setLoading(true));

    try {
      const result = await window?.confirmResult?.confirm(otpCode);
      if (result) {
        dispatch(setLoading(false));
        fnSendRequest();
        setError("");
      }
    } catch (errorReturn) {
      console.error(errorReturn);
      dispatch(setLoading(false));
      setError("Mã OTP không đúng, vui lòng thử lại");
    }
  };

  const fnSendRequest = async () => {
    try {
      if (firebase.auth()?.currentUser) {
        const idToken: string =
          (await firebase.auth().currentUser?.getIdToken(true)) || "";
        dispatch(getToken({ idToken }));
      }
    } catch (errorReturn) {
      console.error(errorReturn);
    }
  };

  useEffect(() => {
    if (currentUser && Object.keys(currentUser).length) {
      const { permission } = currentUser?.userInfo;

      if (permission === "ADMIN") {
        setUserCookies(currentUser);
        history.push("/");
      } else {
        dispatch(
          showNotification({
            type: "warning",
            message: "Bạn không có quyền truy cập vào trang này!",
            title: "",
          }),
        );
        removeUserCookies();
        dispatch(actionRemoveCurrentUser());
      }
    }
  }, [currentUser]);

  return (
    <div className="flex items-center w-screen h-screen desktop:flex">
      <div className="hidden w-1/2 h-full relative background-wrapper bg-secondary phone:flex">
        <SVG name="login/singing" className="p-2 mx-auto laptop:p-15" />
        <p className="text-white absolute bottom-1 font-medium text-sm left-0 right-0 mx-auto laptop:w-46 w-25 text-center">
          © 2021, KTV APP. Bản quyền thuộc về KTV. Phát triển bởi USUM SOFTWARE.
        </p>
      </div>

      <ValidatorForm
        onSubmit={handleSubmit}
        className="block w-full max-w-lg px-2 py-2 mx-auto phone:w-3/5 "
      >
        <LoginIntro />
        <div className="pb-2">
          {inputMode === "PHONE_VERIFY" ? (
            <Input
              label="Số điện thoại"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+84</InputAdornment>
                ),
              }}
              name="phoneNumber"
              initValue=""
              onChange={newValue => {
                error && setError("");
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
              errorText={error}
            />
          ) : (
            <>
              <Input
                key="OPT"
                label="Mã OTP"
                placeholder="Nhập mã OTP"
                name="otp"
                initValue=""
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
                errorText={error}
              />
            </>
          )}
        </div>
        <div className="pb-10">
          <Button
            type="submit"
            primary
            className="w-full"
            innerClassName="text-xl normal-case font-medium h-4.5"
            disabled={isLoading}
          >
            Đăng nhập
          </Button>
        </div>
      </ValidatorForm>
      <div id="captcha" />
    </div>
  );
};

export default LoginPage;
