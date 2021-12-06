import React, { lazy, ReactNode } from "react";
import "firebase/auth";
import { useSelector } from "react-redux";

import { IRootState } from "typings";

const FormReset = lazy(() => import("./FormReset"));
const ConfirmReset = lazy(() => import("./ConfirmReset"));

type IStep = {
  [key: number]: {
    step: number;
    name: string;
    Component: ReactNode;
  };
};

const steps: IStep = {
  1: {
    step: 1,
    name: "Password Reset",
    Component: <FormReset />,
  },
  2: {
    step: 2,
    name: "Confirm Reset",
    Component: <ConfirmReset />,
  },
};

const ForgotPasswordPage: React.FC = () => {
  const { step = 1 } = useSelector((state: IRootState) => state.resetPassword);
  return <>{steps[step].Component}</>;
};

export default ForgotPasswordPage;
