import React, { useEffect, useState, useMemo } from "react";
import "firebase/auth";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Formik, FormikHelpers } from "formik";

import {
  Title,
  Text,
  Form,
  Other,
  Policy,
  Error,
  PolicyContainer,
  ErrorMessage,
  Link,
} from "./styles";
import { isEmail } from "common/functions";
import { PATH } from "common/constants/routes";
import LoginBySocialMedia from "components/LoginBySocialMedia";

import Button from "designs/Button";
import Checkbox from "designs/Checkbox";
import Input from "designs/Input";

import { useRedirect } from "hooks/useRedirect";
import { addData, nextStep } from "redux/actions/register";
import { ICreateUser, IRootState, IUserInput } from "typings";
import { checkExistEmail } from "redux/actions/user";
import { resetAction } from "redux/actions/common";

interface IFormValue {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = yup
  .object()
  .shape<{ [key in keyof IFormValue]: any }>({
    fullName: yup
      .string()
      .required("Full name is required!")
      .min(4, "Too short!"),
    email: yup
      .string()
      .required("Email address is required!")
      .test("email", "Email address is not valid!", value =>
        isEmail(value || ""),
      ),
    password: yup
      .string()
      .required("Password is required!")
      .min(6, "Password must have at least 6 characters!"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required!")
      .when("password", {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf([yup.ref("password")], "Both password need to be the same!"),
      }),
  });

const RegisterForm: React.FC = () => {
  const redirect = useRedirect();
  const dispatch = useDispatch();
  const { actionSuccess, isLoading } = useSelector(
    (state: IRootState) => state.common,
  );
  const { registerData } = useSelector((state: IRootState) => state.register);
  const [errorPolicy, setErrorPolicy] = useState("");
  const [error, setError] = useState("");
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [subscribe, setSubscribe] = useState(true);
  const [initialValues, setInitialValues] = useState<IFormValue>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (registerData) {
      const {
        fullName = "",
        email = "",
        password = "",
        agreePolicy,
        subscribe,
      } = registerData || {};
      setInitialValues({
        fullName,
        email,
        password,
        confirmPassword: password,
      });
      setAgreePolicy(agreePolicy || false);
      setSubscribe(subscribe || true);
    }
  }, [registerData]);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      const payload: IUserInput = {
        fullName: initialValues?.fullName,
        email: initialValues?.email,
        password: initialValues?.password,
        agreePolicy,
        subscribe,
      };
      dispatch(addData(payload));
      dispatch(nextStep(2));
    }
  }, [actionSuccess]);
  const handleSubmit = (
    values: IFormValue,
    helper: FormikHelpers<IFormValue>,
  ) => {
    if (!agreePolicy) {
      setErrorPolicy(
        "You must agree to our Terms of Service and Privacy Policy",
      );
      return;
    }

    setInitialValues({
      email: values?.email,
      confirmPassword: values?.confirmPassword,
      fullName: values?.fullName,
      password: values?.password,
    });
    dispatch(checkExistEmail({ email: values?.email }));
  };
  const handleSupport = () => {
    redirect(PATH.HELP);
  };
  return (
    <>
      <Title>Sign up to Kingify</Title>
      <LoginBySocialMedia onError={error => setError(error)} />
      <Text>Or</Text>
      {error && (
        <ErrorMessage>
          {error} <Link onClick={handleSupport}>Support team.</Link>
        </ErrorMessage>
      )}
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form id="register" method="post">
          <Input
            name="fullName"
            label="Full name"
            placeholder="Enter your full name"
            autoComplete="off"
          />
          <Input
            name="email"
            type="email"
            label="Email address"
            placeholder="Enter your email address"
            autoComplete="off"
          />
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            autoComplete="off"
          />
          <Input
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Enter your password again"
            autoComplete="off"
          />
          <Policy>
            I agree to Kingify's Terms of Service and Privacy Policy
          </Policy>
          <PolicyContainer>
            <Checkbox
              primary
              initialCheck={agreePolicy}
              onChange={isCheck => {
                setAgreePolicy(isCheck);
                setErrorPolicy("");
              }}
              className="mb-0.5"
              label="I agree to Kingify's Terms of Service and Privacy Policy"
            />
            {errorPolicy && <Error>{errorPolicy}</Error>}
          </PolicyContainer>

          <Checkbox
            primary
            initialCheck={subscribe}
            onChange={isCheck => setSubscribe(isCheck)}
            label="Subscribe to receive news and updates from Kingify"
          />

          <Button type="submit" size="lg" loading={isLoading}>
            Sign Up
          </Button>
        </Form>
      </Formik>
      <Other.Container>
        <Other.Button variant="link" to={PATH.AUTH.LOGIN}>
          Already have an account? <p className="text-primary-1">Log In</p>
        </Other.Button>
      </Other.Container>
    </>
  );
};

export default RegisterForm;
