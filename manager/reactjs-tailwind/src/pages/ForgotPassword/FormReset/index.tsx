import React, { useEffect, useState } from "react";
import "firebase/auth";
import * as yup from "yup";
import { Formik, FormikHelpers } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { Title, Text, Form } from "./styles";
import Input from "designs/Input";
import Button from "designs/Button";

import { isEmail } from "common/functions";

import { nextStep, resetPassword } from "redux/actions/resetPassword";
import { resetAction } from "redux/actions/common";

import { IRootState } from "typings";

interface IFormValue {
  email: string;
}

const validationSchema = yup
  .object()
  .shape<{ [key in keyof IFormValue]: any }>({
    email: yup
      .string()
      .required("Email address is required!")
      .test("email", "Oops, your email address is incorrect!", value =>
        isEmail(value || ""),
      ),
  });

const ForgotPasswordPage: React.FC = () => {
  const dispatch = useDispatch();
  const { actionSuccess, isLoading } = useSelector(
    (state: IRootState) => state.common,
  );
  const [initialValues, setInitialValues] = useState<IFormValue>({
    email: "",
  });
  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      setTimeout(() => {
        dispatch(nextStep({ emailReset: initialValues?.email, step: 2 }));
      }, 2000);
    }
  }, [actionSuccess]);
  const handleSubmit = (
    values: IFormValue,
    helper: FormikHelpers<IFormValue>,
  ) => {
    setInitialValues({ email: values?.email });
    dispatch(resetPassword({ email: values?.email }));
  };
  return (
    <>
      <Title>Password Reset</Title>
      <Text>
        Enter your email, and we'll send you a password reset link. This may
        take a few minutes!
      </Text>
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
            autoFocus={true}
            autoComplete="off"
          />

          <Button type="submit" size="lg" loading={isLoading}>
            Send your password
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default ForgotPasswordPage;
