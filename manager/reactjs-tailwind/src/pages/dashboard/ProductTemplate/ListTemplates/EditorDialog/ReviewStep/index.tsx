import PreviewProduct from "./PreviewProduct";
import { ListActionButtons } from "./styles";
import FullScreenDialog from "components/FullScreenDialog";
import Button from "designs/Button";

interface IReviewStepProps {
  closeDialog: () => void;
  backToPreviousStep: () => void;
}

const ReviewStep: React.FC<IReviewStepProps> = ({
  closeDialog,
  backToPreviousStep,
}) => {
  const handleSaveTemplate = () => {
    closeDialog();
  };

  return (
    <>
      <FullScreenDialog.Header
        title="Create a product templates"
        onClose={closeDialog}
      />
      <PreviewProduct />
      <FullScreenDialog.Footer
        leftSide={
          <ListActionButtons>
            <Button variant="secondary" onClick={() => backToPreviousStep()}>
              Back To Design
            </Button>
            <Button onClick={handleSaveTemplate}>Save Template</Button>
          </ListActionButtons>
        }
        rightSide={<div>$15.31 - $20.51</div>}
      />
    </>
  );
};

export default ReviewStep;
