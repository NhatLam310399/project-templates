import { useState } from "react";
import { useDispatch } from "react-redux";
import Editor from "components/Editor";
import FullScreenDialog from "components/FullScreenDialog";
import Button from "designs/Button";
import { setIsContinueStepPreview } from "redux/actions/productTemplate";

interface IDesignStepProps {
  closeDialog: () => void;
  onNextStep: () => void;
}

const DesignStep: React.FC<IDesignStepProps> = ({
  closeDialog,
  onNextStep,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleClickContinue = () => {
    dispatch(setIsContinueStepPreview(true));
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onNextStep();
    }, 500);
  };
  return (
    <>
      <FullScreenDialog.Header
        title="Create a product templates"
        onClose={closeDialog}
      />
      <Editor />
      <FullScreenDialog.Footer
        leftSide={
          <Button loading={loading} onClick={handleClickContinue}>
            Continue
          </Button>
        }
        rightSide={<div>$15.31 - $20.51</div>}
      />
    </>
  );
};

export default DesignStep;
