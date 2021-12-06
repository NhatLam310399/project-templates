import { useState, useEffect } from "react";

import { StepThreeContainer, Progress } from "./styles";
import FileUploaded from "./FileUploaded";
import ProductImport from "./ProductImport";
import useLocalStorage from "hooks/useLocalStorage";
interface IStepThreeProps {}

const IMPORT_ORDER_FILE_UPLOADED_LS_KEY = "IMPORT_ORDER_FILE_UPLOADED_LS_KEY";

const StepThree: React.FC<IStepThreeProps> = props => {
  const [fileUploaded, setFileUploaded] = useLocalStorage<any>(
    IMPORT_ORDER_FILE_UPLOADED_LS_KEY,
    {},
  );
  const [errors, setErrors] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <StepThreeContainer>
      {loading ? (
        <Progress />
      ) : (
        <>
          <FileUploaded errors={errors} fileUploaded={fileUploaded} />
          <ProductImport errors={errors} />{" "}
        </>
      )}
    </StepThreeContainer>
  );
};

export default StepThree;
