import { useEffect, useState } from "react";
import { Formik } from "formik";

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
import Input from "designs/Input";
import Checkbox from "designs/Checkbox";
import { IFolder } from "typings";
import IconDemo from "assets/images/filesLibrary/folder-demo-icon.jpg";
import IconDemo2 from "assets/images/filesLibrary/folder-demo-icon-2.jpg";
interface IDialogFolderProps {
  currentFolder: IFolder | null;
  open: boolean;
  folder: IFolder | null;
  onClose: () => void;
}

const DialogFolder: React.FC<IDialogFolderProps> = props => {
  const { folder, open, onClose, currentFolder } = props;
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
    console.log(folder);
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
        <Text>Really delete this folder from your {currentFolder?.name}?</Text>
        <Text>This cannot be undone!</Text>
        <CheckboxWrapper>
          <Checkbox
            initialCheck={agree}
            onChange={isChecked => setAgree(isChecked)}
          />
          <Label>
            Yes, I understand that all data in folders and all sub folders will
            be lost and this action does not have a revert possibility
          </Label>
        </CheckboxWrapper>
      </ContentWrapper>

      <ButtonWrapper>
        <Button
          type="button"
          onClick={handleDelete}
          size="md"
          variant="primary"
        >
          Delete folder
        </Button>
        <Button onClick={handleClose} size="md" variant="secondary">
          Cancel
        </Button>
      </ButtonWrapper>
    </Dialog>
  );
};
export default DialogFolder;
const iconFolders = [IconDemo, IconDemo2];
