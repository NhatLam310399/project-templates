import { ReactNode, lazy } from "react";
import { useSelector } from "react-redux";
import { MethodContainer } from "./styles";
import { IRootState } from "typings";
import { Wrapper, Container } from "designs/PageLayout";
interface IMethodProps {}

const AddMethod = lazy(() => import("./AddMethod"));
const ListMethod = lazy(() => import("./ListMethod"));

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
    name: "Billing method",
    Component: <ListMethod />,
  },
  2: {
    step: 2,
    name: "Add new billing methods",
    Component: <AddMethod />,
  },
};
const Method: React.FC<IMethodProps> = props => {
  const stepIndex = useSelector(
    (state: IRootState) => state.billingMethod.stepIndex,
  );
  return (
    <Wrapper>
      <Container>
        <MethodContainer>{steps[stepIndex].Component}</MethodContainer>;
      </Container>
    </Wrapper>
  );
};

export default Method;
