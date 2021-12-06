import "firebase/auth";
import * as Yup from "yup";
import { FormikValues, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import RegisterForm from "./RegisterForm";
import OTPForm from "./OTPForm";
import { phoneRegExp, emailRegExp } from "@constants/validate";
import { useTranslation } from "next-i18next";
import firebase from "@common/utils/firebase";
import { getToken, updateUserEmailPassword } from "@redux/actions/auth";
import { useRedirect } from "@common/hooks/useRedirect";
import { IRootState } from "@redux/reducers";
import { PATH } from "@routes";
import { showNotification } from "@components/ToastNotification";

import { RegisterContainer, CaptchaWrapper } from "./styles";
import { IGraphQLResponse, IUser } from "@common/typings";
import { getAllUser } from "@services/user";
import { resetAction } from "@redux/actions/common";
import { updateUserProfile } from "@redux/actions/user";
import useAuth from "@common/hooks/useAuth";

interface IRegisterProps {}

type IInputMode = "PHONE_NUMBER" | "OTP";

const window: {
  appVerifier: firebase.auth.RecaptchaVerifier | undefined;
  confirmResult: firebase.auth.ConfirmationResult | undefined;
} = {
  appVerifier: undefined,
  confirmResult: undefined,
};

const Register: React.FC<IRegisterProps> = () => {
  const { t } = useTranslation(["authen"]);
  const dispatch = useDispatch();
  const redirect = useRedirect();
  const { accountInfo } = useAuth();
  const captchaVerifier = useRef<HTMLDivElement>(null);

  const [inputMode, setInputMode] = useState<IInputMode>("PHONE_NUMBER");

  const [errorMessage, setErrorMessage] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [valueUpdate, setValueUpdate] = useState<FormikValues>({});
  const [loading, setLoading] = useState(false);

  const { currentUser } = useSelector((state: IRootState) => state.auth);
  useEffect(() => {
    getAllUserForCheckExist();
  }, []);
  useEffect(() => {
    if (accountInfo) {
      const { userInfo } = accountInfo;
      if (userInfo.provider !== "phone") return;

      //update profile in here
      if (userInfo?.email === null) {
        dispatch(
          updateUserEmailPassword({
            idUser: userInfo?._id,
            email: valueUpdate?.email,
            password: valueUpdate?.password,
          }),
        );
      }
    }
  }, [accountInfo]);

  const { actionSuccess } = useSelector((state: IRootState) => state.actions);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      showNotification({
        type: "success",
        title: t("register.create-successful"),
      });
      redirect(PATH.LOGIN);
    }
  }, [actionSuccess]);

  const initialValues = {
    phoneNumber: "",
    email: "",
    password: "",
    otp: "",
  };

  const validateWithPhone = Yup.object({
    phoneNumber: Yup.string()
      .required(t("register.require-phone-number"))
      .matches(phoneRegExp, t("register.phone-not-valid"))
      .max(10, t("register.phone-not-valid")),
    email: Yup.string()
      .required(t("register.require-email"))
      .matches(emailRegExp, t("register.email-not-valid")),
    password: Yup.string().required(t("login.require-password")),
  });

  const validateWithOtp = Yup.object({
    otp: Yup.string().required(),
  });

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
      const listPhoneNumber = users?.map((user) => user?.phoneNumber);
      const listEmail = users?.map((user) => user?.email);

      if (values.phoneNumber) {
        const exist = listPhoneNumber?.includes(values.phoneNumber);
        if (exist) {
          dispatch(
            showNotification({
              type: "error",
              message: t("register.exist-phone-number"),
              title: t("register.have-error"),
            }),
          );
          return;
        }
      }

      if (values.email) {
        const exist = listEmail.includes(values.email);
        if (exist) {
          dispatch(
            showNotification({
              type: "error",
              message: t("register.exist-email"),
              title: t("register.have-error"),
            }),
          );
          return;
        }
      }

      handleVerifyPhoneNumber(phoneNumber);
    }
    if (inputMode === "OTP") {
      handleVerifyOtpCode(values);
    }
  };
  const getAllUserForCheckExist = async () => {
    try {
      const response: IGraphQLResponse = await getAllUser();
      const { getAllUserHasPermissions: result } = response?.data || {};
      setUsers(result?.results);
    } catch (error) {
      setUsers([]);
      console.error(error);
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
        setErrorMessage(t("register.phone-not-valid"));
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
          fnSendRequest(values);
          setErrorMessage("");
        } else {
          throw "Error";
        }
      } catch (error) {
        setErrorMessage(error.message);
        console.error(error);
        setLoading(false);
      }
    }
  };

  const fnSendRequest = async (values: FormikValues) => {
    try {
      if (firebase.auth()?.currentUser) {
        const idToken: string =
          (await firebase.auth().currentUser?.getIdToken(true)) || "";
        dispatch(
          getToken({
            data: {
              idToken,
            },
            loginMethod: "phone",
          }),
        );
        setValueUpdate(values);

        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RegisterContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={
          inputMode === "PHONE_NUMBER" ? validateWithPhone : validateWithOtp
        }
        onSubmit={handleSubmit}
      >
        {(formik) => {
          if (inputMode === "PHONE_NUMBER") {
            return (
              <RegisterForm
                loading={loading}
                formik={formik}
                errorMessage={errorMessage}
              />
            );
          } else {
            return (
              <OTPForm
                title={t("register.form-title")}
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
      <CaptchaWrapper ref={captchaVerifier}>
        <div id="captcha" />
      </CaptchaWrapper>
    </RegisterContainer>
  );
};

export default Register;
