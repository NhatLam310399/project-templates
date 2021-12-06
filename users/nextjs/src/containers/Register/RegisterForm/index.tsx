import { useTranslation } from "next-i18next";
import { useDispatch } from "react-redux";
import { FormikValues, FormikProps } from "formik";
import firebase from "@common/utils/firebase";

import ErrorHelperText from "@components/ErrorHelperText";
import InputBox from "@designs/Input";
import { forceTextInputEnterNumber } from "@common/functions/filter";
import { setLoading } from "@redux/actions/common";
import { getToken } from "@redux/actions/auth";
import { PATH } from "@routes";

import {
  RegisterFormContainer,
  Title,
  AuthenTication,
  SocialLogin,
  Icon,
  Or,
  Text,
  Navigation,
  Button,
  Form,
  EmployerLogin,
} from "./styles";

interface IRegisterFormProps {
  formik: FormikProps<FormikValues>;
  errorMessage?: string;
  loading?: boolean;
}

const RegisterForm: React.FC<IRegisterFormProps> = (props) => {
  const { formik, errorMessage, loading } = props;
  const { t } = useTranslation(["authen"]);

  const dispatch = useDispatch();

  const handleLoginFacebook = async () => {
    dispatch(setLoading(true));
    const authProvider = new firebase.auth.FacebookAuthProvider();
    try {
      await firebase
        .auth()
        .signInWithPopup(authProvider)
        .then((results) => {
          // @ts-ignore: Unreachable code error
          const token = results.credential.idToken;
          dispatch(
            getToken({ data: { idToken: token }, loginMethod: "facebook" }),
          );
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginGoogle = async () => {
    dispatch(setLoading(true));
    const authProvider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase
        .auth()
        .signInWithPopup(authProvider)
        .then((results) => {
          // @ts-ignore: Unreachable code error
          const token = results?.credential?.idToken;
          dispatch(
            getToken({ data: { idToken: token }, loginMethod: "google" }),
          );
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {}
  };

  return (
    <RegisterFormContainer>
      <Title>{t("register.form-title")}</Title>
      <AuthenTication>
        <SocialLogin onClick={handleLoginGoogle}>
          <Icon name="common/google" width={25} height={25} />
          {t("register.google-login")}
        </SocialLogin>
        <SocialLogin onClick={handleLoginFacebook}>
          <Icon name="common/facebook" width={25} height={25} />
          {t("register.facebook-login")}
        </SocialLogin>
        <Or>{t("register.or")}</Or>
        <Form>
          <InputBox
            onKeyPress={forceTextInputEnterNumber}
            label={t("register.phone-number")}
            type="tel"
            required
            placeholder={t("register.enter-phone-number")}
            {...formik.getFieldProps("phoneNumber")}
            {...formik.getFieldMeta("phoneNumber")}
          />
          <InputBox
            label={t("register.email-address")}
            type="email"
            required
            placeholder={t("register.enter-email-address")}
            {...formik.getFieldProps("email")}
            {...formik.getFieldMeta("email")}
          />
          <InputBox
            label={t("register.password")}
            placeholder={t("register.enter-password")}
            required
            type="password"
            {...formik.getFieldProps("password")}
            {...formik.getFieldMeta("password")}
          />
          <Button loading={loading} primary type="submit">
            {t("register.register")}
          </Button>
        </Form>
        {errorMessage && <ErrorHelperText text={errorMessage} />}
      </AuthenTication>
      <Text>
        {t("register.already-have-account")}
        <Navigation routeName={PATH.LOGIN}>{t("register.login")}</Navigation>
      </Text>
      <Text>
        {t("register.are-you-recruiter")}
        <EmployerLogin
          href="https://employer.tuyendungvn.com/dang-nhap"
          target="_blank"
        >
          {t("register.login-for-recruiters")}
        </EmployerLogin>
      </Text>
    </RegisterFormContainer>
  );
};

export default RegisterForm;
