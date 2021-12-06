import { useEffect } from "react";
import {
  ProcessStepContainer,
  PointContainer,
  PointStep,
  PointTitle,
  PointWrapper,
} from "./styles";

interface IProcessStepProps {
  currentStep: number;
  listSteps: string[];
  className?: string;
}

const ProcessStep: React.FC<IProcessStepProps> = ({
  currentStep,
  listSteps,
  className,
}) => {
  useEffect(() => {
    const processContainer = document.getElementById("processcontainer");
    const pointContainer = document.getElementsByClassName("pointcontainer");
    let totalWidth = 0;

    for (let i = 0; i < pointContainer.length; i++) {
      if (i + 1 < currentStep) {
        totalWidth += pointContainer[i].clientWidth;
      }
    }
    processContainer?.scrollTo(totalWidth, 0);
  }, [currentStep]);
  let ele: JSX.Element[] = [];
  listSteps.length > 0
    ? (ele = listSteps.map((value, index) => {
        return (
          <PointContainer className={`pointcontainer ${className}`}>
            <PointWrapper>
              <PointStep active={index + 1 === currentStep ? true : false}>
                {index + 1}
              </PointStep>
              <PointTitle>{value}</PointTitle>
            </PointWrapper>
          </PointContainer>
        );
      }))
    : null;

  return (
    <ProcessStepContainer id="processcontainer">
      {ele.length > 0 ? ele : null}
    </ProcessStepContainer>
  );
};

export default ProcessStep;
