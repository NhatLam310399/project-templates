import { ReactNode, useState, lazy } from "react";
import { PlatformContainer } from "./styles";

interface IPlatformProps {}

const Connect = lazy(() => import("./Connect"));
const Overview = lazy(() => import("./OverviewStep"));
type IStep = {
  [key: number]: {
    step: number;
    name: string;
    Component: (value: (value: number) => void) => JSX.Element;
  };
};

const steps: IStep = {
  1: {
    step: 1,
    name: "Connect store",
    Component: (setStep: (value: number) => void) => (
      <Connect setStep={setStep} />
    ),
  },
  2: {
    step: 2,
    name: "Connect step",
    Component: (setStep: (value: number) => void) => (
      <Overview setStep={setStep} />
    ),
  },
};
const Platform: React.FC<IPlatformProps> = props => {
  const [step, setStep] = useState<number>(1);
  return (
    <PlatformContainer>{steps[step].Component(setStep)}</PlatformContainer>
  );
};

export default Platform;
