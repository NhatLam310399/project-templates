import { ReactNode, lazy, useState } from "react";
import { useSelector } from "react-redux";
import { StoreContainer } from "./styles";
import { IRootState } from "typings";

interface IStoreProps {}

const MainScreen = lazy(() => import("./Main"));
const Platform = lazy(() => import("./Platform"));
const ViewStore = lazy(() => import("./ViewStore"));
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
    name: "Main screen Store",
    Component: <MainScreen />,
  },
  2: {
    step: 2,
    name: "Choose Platform",
    Component: <Platform />,
  },
  3: {
    step: 3,
    name: "View store",
    Component: <ViewStore />,
  },
};

const Store: React.FC<IStoreProps> = props => {
  const stepIndex = useSelector((state: IRootState) => state.store.stepIndex);
  return <StoreContainer>{steps[stepIndex].Component}</StoreContainer>;
};

export default Store;
