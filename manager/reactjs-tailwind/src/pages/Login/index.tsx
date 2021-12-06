import React, { useEffect, useState } from "react";
import "firebase/auth";
import * as yup from "yup";
import { Formik, FormikHelpers } from "formik";
import { useDispatch } from "react-redux";

import { Title, Text, Form, Other, ErrorMessage, Link } from "./styles";
import { isEmail } from "common/functions";
import { PATH } from "common/constants/routes";
import LoginBySocialMedia from "components/LoginBySocialMedia";

import Input from "designs/Input";
import Button from "designs/Button";

import { useRedirect } from "hooks/useRedirect";
import useAuth from "hooks/useAuth";
import useLogin from "hooks/useLogin";

import { nextStep } from "redux/actions/resetPassword";
import { addData, nextStep as _step } from "redux/actions/register";

import { ILogin, IRootState } from "typings";
interface IFormValue {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const redirect = useRedirect();
  const dispatch = useDispatch();
  const { isAuth } = useAuth();
  const { error, loading, login, setError } = useLogin();
  const [initialValues] = useState<IFormValue>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuth) {
      redirect(PATH.DASHBOARD);
    }
  }, []);

  const validationSchema = yup
    .object()
    .shape<{ [key in keyof IFormValue]: any }>({
      email: yup
        .string()
        .required("Email address is required!")
        .test("email", "Invalid email address!", value => isEmail(value || "")),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Invalid password!"),
    });

  const handleSubmit = (
    values: IFormValue,
    helper: FormikHelpers<IFormValue>,
  ) => {
    const payload: ILogin = {
      user: {
        password: values?.password,
        username: values?.email,
      },
    };
    login(payload);
  };

  const resetPasswordStep = () => {
    dispatch(nextStep({ emailReset: "", step: 1 }));
  };
  const resetRegisterStep = () => {
    dispatch(_step(1));
    dispatch(addData({}));
  };
  const handleFocus = () => {
    setError("");
  };
  const handleSupport = () => {
    redirect(PATH.HELP);
  };
  return (
    <>
      <Title>Log In</Title>
      <LoginBySocialMedia onError={errorMessage => setError(errorMessage)} />
      <Text>Or</Text>
      {error && (
        <ErrorMessage>
          {error} <Link onClick={handleSupport}>Support team.</Link>
        </ErrorMessage>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form id="login" method="post">
          <Input
            name="email"
            id="email"
            type="email"
            label="Email address"
            placeholder="Enter your email address"
            autoComplete="email"
            onFocus={handleFocus}
          />
          <Input
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            autoComplete="current-password"
          />
          <Button type="submit" size="lg" loading={loading}>
            Log In
          </Button>
        </Form>
      </Formik>
      <Other.Container>
        <Other.Button
          onClick={resetRegisterStep}
          variant="link"
          to={PATH.AUTH.REGISTER}
        >
          Sign Up
        </Other.Button>
        <Other.Button
          onClick={resetPasswordStep}
          variant="link"
          to={PATH.AUTH.FORGOT_PASSWORD}
        >
          Forgot password?
        </Other.Button>
      </Other.Container>
    </>
  );
};

export default LoginPage;
