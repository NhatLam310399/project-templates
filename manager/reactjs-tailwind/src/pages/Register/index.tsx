import React, { lazy, ReactNode, useState } from "react";
import "firebase/auth";
import { useSelector } from "react-redux";

import { IRootState } from "typings";

const RegisterForm = lazy(() => import("./RegisterForm"));
const GetInfo = lazy(() => import("./GetInfo"));

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
    name: "Register Form",
    Component: <RegisterForm />,
  },
  2: {
    step: 2,
    name: "Get Info",
    Component: <GetInfo />,
  },
};

const RegisterPage: React.FC = () => {
  const { stepIndex = 1 } = useSelector((state: IRootState) => state.register);

  return <>{steps[stepIndex].Component}</>;
};

export default RegisterPage;
