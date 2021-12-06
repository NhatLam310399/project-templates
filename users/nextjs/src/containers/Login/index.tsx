import "firebase/auth";
import { useTranslation } from "next-i18next";
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import firebase from "@common/utils/firebase";
import { useEffect, useState } from "react";

import { phoneRegExp } from "@constants/validate";
import InputBox from "@designs/Input";
import Button from "@designs/Button";
import { forceTextInputEnterNumber } from "@common/functions/filter";
import {
  IGraphQLResponse,
  ILoginInput,
  IRootState,
  IUser,
} from "@common/typings";
import { login, getToken } from "@redux/actions/auth";
import { setLoading } from "@redux/actions/common";
import { PATH } from "@routes";
import { useRedirect } from "@common/hooks/useRedirect";
import useAuth from "@common/hooks/useAuth";

import {
  LoginContainer,
  Title,
  AuthenTication,
  SocialLogin,
  Icon,
  Or,
  Form,
  Text,
  Navigation,
  EmployerLogin,
} from "./styles";
import { getAllUser } from "@services/user";
import { showNotification } from "@components/ToastNotification";

interface ILoginProps {}

const Login: React.FC<ILoginProps> = () => {
  const { t } = useTranslation(["authen"]);
  const redirect = useRedirect();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: IRootState) => state.auth);
  const { isLoading } = useSelector((state: IRootState) => state.actions);
  const [users, setUsers] = useState<IUser[]>([]);
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      redirect(PATH.HOME);
    } else {
      getAllUserForCheckExist();
    }
  }, []);

  useEffect(() => {
    if (currentUser && currentUser?.userInfo?.email !== null) {
      redirect(PATH.JOB_MANAGEMENT_PERSONAL_INFO);
    }
  }, [currentUser]);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required(t("login.require-phone-number"))
      .matches(phoneRegExp, t("login.incorrect-phone-number"))
      .max(10, t("login.incorrect-phone-number")),
    password: Yup.string().required(t("login.require-password")),
  });

  const handleSubmit = (values: FormikValues) => {
    const listPhone = users?.map((user) => user?.phoneNumber);
    if (values.username) {
      const isExist = listPhone?.includes(values.username);
      if (!isExist) {
        dispatch(
          showNotification({
            type: "error",
            title: t("login.have-error"),
            message: t("login.non-exist-phone"),
          }),
        );
        return;
      }
    }
    const payload: ILoginInput = {
      user: {
        username: values.username,
        password: values.password,
      },
      permission: "CANDIDATE",
    };
    dispatch(login(payload));
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
  const handleLoginFacebook = async () => {
    dispatch(setLoading(true));
    const authProvider = new firebase.auth.FacebookAuthProvider();
    try {
      await firebase
        .auth()
        .signInWithPopup(authProvider)
        .then((results) => {
          // @ts-ignore: Unreachable code error
          const token = results?.credential?.accessToken;
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
          dispatch(setLoading(false));
        })
        .catch((error) => {});
    } catch (error) {}
  };

  return (
    <LoginContainer>
      <Title>{t("login.form-title")}</Title>
      <AuthenTication>
        <SocialLogin onClick={handleLoginGoogle}>
          <Icon name="common/google" width={25} height={25} />
          {t("login.google-login")}
        </SocialLogin>
        <SocialLogin onClick={handleLoginFacebook}>
          <Icon name="common/facebook" width={25} height={25} />
          {t("login.facebook-login")}
        </SocialLogin>
        <Or>{t("login.or")}</Or>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <InputBox
                onKeyPress={forceTextInputEnterNumber}
                label={t("login.phone-number")}
                type="tel"
                placeholder={t("login.enter-phone-number")}
                {...formik.getFieldProps("username")}
                {...formik.getFieldMeta("username")}
              />
              <InputBox
                label={t("login.password")}
                placeholder={t("login.enter-password")}
                type="password"
                {...formik.getFieldProps("password")}
                {...formik.getFieldMeta("password")}
              />
              <Button loading={isLoading} primary type="submit">
                {t("login.login")}
              </Button>
            </Form>
          )}
        </Formik>
      </AuthenTication>
      <Text>
        {t("login.forgot-password")}
        <Navigation routeName={PATH.FORGOT_PASSWORD}>
          {t("login.reset")}
        </Navigation>
      </Text>
      <Text>
        {t("login.dont-have-account")}
        <Navigation routeName={PATH.REGISTER}>
          {t("login.register-here")}
        </Navigation>
      </Text>
      <Text>
        {t("login.are-you-recruiter")}
        <EmployerLogin
          href="https://employer.tuyendungvn.com/dang-nhap"
          target="_blank"
        >
          {t("login.login-for-recruiters")}
        </EmployerLogin>
      </Text>
    </LoginContainer>
  );
};

export default Login;
