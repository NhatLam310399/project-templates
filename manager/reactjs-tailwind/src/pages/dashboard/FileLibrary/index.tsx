import React, { lazy, ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "typings";

const EmptyFiles = lazy(() => import("./EmptyFiles"));
const Files = lazy(() => import("./LibraryFiles"));
const SampleFiles = lazy(() => import("./SampleFiles"));

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
    name: "Empty files",
    Component: <EmptyFiles />,
  },
  2: {
    step: 2,
    name: "File Libraries",
    Component: <Files />,
  },
  3: {
    step: 3,
    name: "Sample files",
    Component: <SampleFiles />,
  },
};

const FileLibrary: React.FC = props => {
  const { step = 1 } = useSelector((state: IRootState) => state.fileLibrary);
  useEffect(() => {
    //get data for page in here
  }, []);
  return <>{steps[step].Component}</>;
};

export default FileLibrary;
