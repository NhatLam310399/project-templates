import "firebase/auth";
import { useTranslation } from "next-i18next";
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import firebase from "@common/utils/firebase";
import { forceTextInputEnterNumber } from "@common/functions";
import { phoneRegExp } from "@constants/validate";
import Input from "@designs/Input";
import OTPForm from "@containers/Register/OTPForm";
import ErrorHelperText from "@components/ErrorHelperText";
import { resetPassword } from "@redux/actions/auth";
import { resetAction } from "@redux/actions/common";
import { showNotification } from "@components/ToastNotification";
import { IRootState } from "@redux/reducers";
import useAuth from "@common/hooks/useAuth";
import { useRedirect } from "@common/hooks/useRedirect";
import { PATH } from "@routes";

import {
  ForgotPasswordContainer,
  Title,
  Form,
  Button,
  Notification,
  Register,
  CaptchaWrapper,
} from "./styles";

interface IForgotPasswordProps {}

type IInputMode = "PHONE_NUMBER" | "OTP" | "CHANGE_PASSWORD";

const window: {
  appVerifier: firebase.auth.RecaptchaVerifier | undefined;
  confirmResult: firebase.auth.ConfirmationResult | undefined;
} = {
  appVerifier: undefined,
  confirmResult: undefined,
};

const ForgotPassword: React.FC<IForgotPasswordProps> = () => {
  const { t } = useTranslation(["authen", "common"]);
  const dispatch = useDispatch();
  const redirect = useRedirect();

  const captchaVerifier = useRef<HTMLDivElement>(null);

  const [inputMode, setInputMode] = useState<IInputMode>("PHONE_NUMBER");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      redirect(PATH.HOME);
    }
  }, []);

  const { actionSuccess } = useSelector((state: IRootState) => state.actions);

  useEffect(() => {
    if (actionSuccess) {
      showNotification({
        type: "success",
        title: t("forgot-password.change-password-success"),
      });
      dispatch(resetAction());
      redirect(PATH.LOGIN);
    }
  }, [actionSuccess]);

  const initialValues = {
    phoneNumber: "",
    otp: "",
    newPassword: "",
    reNewPassword: "",
  };

  const validationPhoneNumber = Yup.object({
    phoneNumber: Yup.string()
      .required(t("forgot-password.require-phone-number"))
      .matches(phoneRegExp, t("forgot-password.phone-number-not-valid")),
  });

  const validationOTP = Yup.object({
    otp: Yup.string().required(),
  });

  const validationNewPassword = Yup.object({
    newPassword: Yup.string().required(t("common:required")),
    reNewPassword: Yup.string().required(t("common:required")),
  });

  const formValidation = {
    PHONE_NUMBER: validationPhoneNumber,
    OTP: validationOTP,
    CHANGE_PASSWORD: validationNewPassword,
  };

  const handleReinitialRecatpcha = () => {
    if (window.appVerifier && captchaVerifier) {
      window.appVerifier.clear();
      captchaVerifier.current.innerHTML = `<div id="captcha"/>`;
    }
  };

  const handleSubmit = (values: FormikValues) => {
    if (inputMode === "PHONE_NUMBER") {
      const text = values.phoneNumber;
      const phoneNumber = `+84${text.slice(1, text.length)}`;
      handleVerifyPhoneNumber(phoneNumber);
    }
    if (inputMode === "OTP") {
      handleVerifyOtpCode(values);
    }
    if (inputMode === "CHANGE_PASSWORD") {
      handleChangePassword(values);
    }
  };

  const handleResendOtpCode = (values: FormikValues) => {
    const text = values.phoneNumber;
    const phoneNumber = `+84${text.slice(1, text.length)}`;
    firebase.auth().signInWithPhoneNumber(phoneNumber, window.appVerifier);
  };

  const handleVerifyPhoneNumber = async (phoneNumber: string) => {
    setLoading(true);
    try {
      const captchaVerifier = new firebase.auth.RecaptchaVerifier("captcha", {
        size: "invisible",
      });
      window.appVerifier = captchaVerifier;
      const confirmResult = await firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, window.appVerifier);

      if (!confirmResult) {
        setErrorMessage(t("forgot-password.phone-not-valid"));
      }
      setErrorMessage("");
      setLoading(false);
      window.confirmResult = confirmResult;
      setInputMode("OTP");
    } catch (error) {
      console.error(error);
      setLoading(false);
      setErrorMessage(error?.message);
    }
  };

  const handleVerifyOtpCode = async (values: FormikValues) => {
    setLoading(true);
    if (window.confirmResult) {
      try {
        const result = await window.confirmResult.confirm(values.otp);
        if (result) {
          setErrorMessage("");
          setInputMode("CHANGE_PASSWORD");
          setLoading(false);
        } else {
          throw "Error";
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
        setErrorMessage(error.message);
      }
    }
  };

  const handleChangePassword = (values: FormikValues) => {
    setLoading(true);
    if (values.newPassword === values.reNewPassword) {
      dispatch(
        resetPassword({
          username: values.phoneNumber,
          newPassword: values.newPassword,
        }),
      );
      setLoading(false);
    } else {
      setLoading(false);
      showNotification({
        type: "error",
        title: t("forgot-password.same-password-required"),
      });
    }
  };

  return (
    <ForgotPasswordContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={formValidation[inputMode]}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          if (inputMode !== "OTP") {
            return (
              <>
                <Title>{t("forgot-password.form-title")}</Title>
                <Form>
                  {inputMode === "PHONE_NUMBER" ? (
                    <Input
                      label={t("forgot-password.phone-number")}
                      placeholder={t("forgot-password.enter-phone-number")}
                      onKeyPress={forceTextInputEnterNumber}
                      {...formik.getFieldProps("phoneNumber")}
                      {...formik.getFieldMeta("phoneNumber")}
                    />
                  ) : (
                    <>
                      <Input
                        label={t("forgot-password.new-password")}
                        placeholder={t("forgot-password.enter-new-password")}
                        type="password"
                        {...formik.getFieldProps("newPassword")}
                        {...formik.getFieldMeta("newPassword")}
                      />
                      <Input
                        label={t("forgot-password.re-enter-password")}
                        placeholder={t(
                          "forgot-password.re-enter-your-password",
                        )}
                        type="password"
                        {...formik.getFieldProps("reNewPassword")}
                        {...formik.getFieldMeta("reNewPassword")}
                      />
                    </>
                  )}
                  <Button loading={loading} type="submit" primary>
                    {t("forgot-password.confirm")}
                  </Button>
                  {errorMessage && <ErrorHelperText text={errorMessage} />}
                </Form>
              </>
            );
          }
          if (inputMode === "OTP") {
            return (
              <OTPForm
                title={t("forgot-password.form-title")}
                loading={loading}
                formik={formik}
                errorMessage={errorMessage}
                onResendOtp={handleResendOtpCode}
                onClose={() => {
                  setInputMode("PHONE_NUMBER");
                  handleReinitialRecatpcha();
                }}
              />
            );
          }
        }}
      </Formik>
      <Notification>
        {t("forgot-password.dont-have-account")}
        <Register routeName={PATH.REGISTER}>
          {t("forgot-password.register-here")}
        </Register>
      </Notification>
      <CaptchaWrapper ref={captchaVerifier}>
        <div id="captcha" />
      </CaptchaWrapper>
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;
