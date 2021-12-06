import FileUploaded from "./FileUploaded";
import FormDetail from "./FormDetail";

import { StepTwoContainer } from "./styles";

interface IStepTwoProps {}

const StepTwo: React.FC<IStepTwoProps> = ({}) => {
  return (
    <StepTwoContainer>
      <FileUploaded />
      <FormDetail />
    </StepTwoContainer>
  );
};

export default StepTwo;
