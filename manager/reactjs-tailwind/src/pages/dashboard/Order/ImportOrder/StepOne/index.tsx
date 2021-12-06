import { StepOneContainer } from "./styles";

import UploadFile from "./UploadFile";
import DescStep from "./DescStep";

interface IStepOneProps {}

const StepOne: React.FC<IStepOneProps> = () => {
  return (
    <StepOneContainer>
      <UploadFile />
      <DescStep />
    </StepOneContainer>
  );
};

export default StepOne;
