import React, { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Title, Text, Link, Other, TextSematic } from "./styles";
import { PATH } from "common/constants/routes";
import { IRootState } from "typings";

import { nextStep } from "redux/actions/resetPassword";
import { addData, nextStep as _resetStep } from "redux/actions/register";

const ForgotPasswordPage: React.FC = () => {
  const dispatch = useDispatch();
  const { emailReset = "" } = useSelector(
    (state: IRootState) => state.resetPassword,
  );
  const handleReSend = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(nextStep({ emailReset: "", step: 1 }));
  };
  const resetStep = () => {
    dispatch(_resetStep(1));
    dispatch(addData({}));
  };
  return (
    <>
      <Title>Password Reset</Title>
      <TextSematic>
        We just sent an email with password reset instructions to {emailReset}
      </TextSematic>
      <Text>
        Click the link in the email to reset your password. If you don’t see the
        email, check your Spam folder.
      </Text>
      <Link onClick={handleReSend}>I didn't receive the email</Link>
      <Other.Container>
        <Other.Button onClick={resetStep} to={PATH.AUTH.REGISTER}>
          Sign up
        </Other.Button>
        <Other.Button to={PATH.AUTH.LOGIN}>Sign in</Other.Button>
      </Other.Container>
    </>
  );
};

export default ForgotPasswordPage;
