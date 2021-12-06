import { lazy, useState } from "react";
import FullScreenDialog from "components/FullScreenDialog";

const DesignStep = lazy(() => import("./DesignStep"));
const ProductStep = lazy(() => import("./ProductStep"));
const ReviewStep = lazy(() => import("./ReviewStep"));

interface IEditorDialogProps {
  open: boolean;
  onCloseDialog: () => void;
}

const steps = [
  {
    index: 1,
    name: "Product",
    Component: ProductStep,
  },
  {
    index: 2,
    name: "Design",
    Component: DesignStep,
  },
  {
    index: 3,
    name: "Review",
    Component: ReviewStep,
  },
];

const EditorDialog: React.FC<IEditorDialogProps> = ({
  open,
  onCloseDialog,
}) => {
  const [stepIndex, setStepIndex] = useState(1);
  const Component = steps[stepIndex - 1].Component;

  const handleNextStep = () => {
    if (stepIndex < steps.length) setStepIndex(stepIndex + 1);
  };

  const handleBackToPreviousStep = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  const wrappedOnCloseDialog = () => {
    onCloseDialog();
    setTimeout(() => {
      // Reset steps after close
      setStepIndex(1);
    }, 500);
  };

  return (
    <FullScreenDialog open={open} onClose={wrappedOnCloseDialog}>
      <Component
        onNextStep={handleNextStep}
        backToPreviousStep={handleBackToPreviousStep}
        closeDialog={wrappedOnCloseDialog}
      />
    </FullScreenDialog>
  );
};

export default EditorDialog;
