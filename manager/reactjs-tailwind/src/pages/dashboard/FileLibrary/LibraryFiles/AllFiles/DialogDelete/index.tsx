import { useEffect, useState } from "react";

import {
  Close,
  Title,
  TopDialog,
  Button,
  ButtonWrapper,
  Label,
  CheckboxWrapper,
  ContentWrapper,
  Text,
} from "./styles";
import Dialog from "components/Dialog";

import SVG from "designs/SVG";
import Checkbox from "designs/Checkbox";
import { IFile, IFolder } from "typings";
interface IDialogDeleteFileProps {
  currentFolder: IFolder | null;
  open: boolean;
  files: IFile[];
  onClose: () => void;
}

const DialogDeleteFile: React.FC<IDialogDeleteFileProps> = props => {
  const { files, open, onClose, currentFolder } = props;
  const [display, setDisplay] = useState(false);
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    if (open) {
      setDisplay(open);
    }
  }, [open]);

  const handleClose = () => {
    setDisplay(false);
    setAgree(false);
    onClose && onClose();
  };
  const handleDelete = () => {
    console.log(files);
    handleClose();
  };
  return (
    <Dialog open={display} onClose={handleClose}>
      <TopDialog>
        <Title>Are you sure?</Title>
        <Close onClick={handleClose}>
          <SVG name="common/close" />
        </Close>
      </TopDialog>
      <ContentWrapper>
        <Text>
          Really delete this {files?.length > 1 ? " files " : " file "} from
          your {currentFolder?.name}?
        </Text>
        <Text>This cannot be undone!</Text>
      </ContentWrapper>

      <ButtonWrapper>
        <Button
          type="button"
          onClick={handleDelete}
          size="md"
          variant="primary"
        >
          Delete file
        </Button>
        <Button onClick={handleClose} size="md" variant="secondary">
          Cancel
        </Button>
      </ButtonWrapper>
    </Dialog>
  );
};
export default DialogDeleteFile;
