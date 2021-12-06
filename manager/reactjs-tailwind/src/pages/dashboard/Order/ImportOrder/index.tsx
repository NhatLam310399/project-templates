import { ReactNode, lazy } from "react";
import { ImportOrderContainer, Heading, Title, Detail } from "./styles";
import { IRootState } from "typings";

import { Wrapper } from "designs/PageLayout";
import ProcessStep from "components/ProcessStep";

const StepOne = lazy(() => import("./StepOne"));
const StepTwo = lazy(() => import("./StepTwo"));
const StepThree = lazy(() => import("./StepThree"));
import { useSelector } from "react-redux";
interface IImportOrderProps {}

const listSteps: string[] = [
  "Data upload",
  "Data matching",
  "Review Order",
  "Payment",
  "Order import",
];

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
    name: "Order import step 1",
    Component: <StepOne />,
  },
  2: {
    step: 2,
    name: "Order import step 2",
    Component: <StepTwo />,
  },
  3: {
    step: 3,
    name: "Order import step 3",
    Component: <StepThree />,
  },
};
const ImportOrder: React.FC<IImportOrderProps> = props => {
  const { stepIndex } = useSelector((state: IRootState) => state.orderImport);

  console.log(stepIndex);
  return (
    <Wrapper>
      <ImportOrderContainer>
        <Heading>
          <Title>{`Product templates  >`} </Title>
          <Detail>Import Orders</Detail>
        </Heading>
        <ProcessStep currentStep={stepIndex} listSteps={listSteps} />
        {steps[stepIndex].Component}
      </ImportOrderContainer>
    </Wrapper>
  );
};

export default ImportOrder;
