import React, { useEffect, useState } from "react";
import "firebase/auth";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Formik, FormikHelpers } from "formik";

import { Title, Form, ResetPasswordContainer } from "./styles";
import { PATH } from "common/constants/routes";

import Input from "designs/Input";
import Button from "designs/Button";

import { updatePassword } from "redux/actions/user";
import { resetAction } from "redux/actions/common";

import { useRedirect } from "hooks/useRedirect";
import { useQuery } from "hooks/useQuery";

import { IRootState, IUpdatePasswordUser } from "typings";

interface IFormValue {
  password: string;
  confirmPassword: string;
}

const validationSchema = yup
  .object()
  .shape<{ [key in keyof IFormValue]: any }>({
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

const ResetPasswordPage: React.FC = () => {
  const dispatch = useDispatch();
  const redirect = useRedirect();
  const query = useQuery();
  const { actionSuccess, isLoading } = useSelector(
    (state: IRootState) => state.common,
  );
  const [initialValues] = useState<IFormValue>({
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      setTimeout(() => {
        redirect(PATH.AUTH.LOGIN);
      }, 2000);
    }
  }, [actionSuccess]);

  const handleSubmit = (
    values: IFormValue,
    helper: FormikHelpers<IFormValue>,
  ) => {
    console.log({ values });
    const userId = query.get("userId");
    if (!userId) return;
    const payload: IUpdatePasswordUser = {
      idUser: userId || "",
      password: values?.password,
    };
    dispatch(updatePassword(payload));
  };

  return (
    <ResetPasswordContainer>
      <Title>Change password</Title>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form id="resetPassword" method="post">
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
          <Button type="submit" size="lg" loading={isLoading}>
            Change password
          </Button>
        </Form>
      </Formik>
    </ResetPasswordContainer>
  );
};

export default ResetPasswordPage;
