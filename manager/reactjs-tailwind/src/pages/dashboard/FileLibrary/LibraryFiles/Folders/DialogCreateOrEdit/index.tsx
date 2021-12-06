import { useEffect, useState } from "react";
import { Formik } from "formik";

import {
  Close,
  Title,
  FoldersContainer,
  TopDialog,
  Form,
  Icon,
  Button,
  ButtonWrapper,
  IconFolderList,
  AvatarWrapper,
  Label,
  WrapperInput,
  ButtonIcon,
} from "./styles";
import Dialog from "components/Dialog";

import SVG from "designs/SVG";
import Input from "designs/Input";
import { IFolder } from "typings";
import IconDemo from "assets/images/filesLibrary/folder-demo-icon.jpg";
import IconDemo2 from "assets/images/filesLibrary/folder-demo-icon-2.jpg";
interface IDialogFolderProps {
  currentFolder: IFolder | null;
  open: boolean;
  folder: IFolder | null;
  onClose: () => void;
}
interface IFormValue {
  name: string;
}
const DialogFolder: React.FC<IDialogFolderProps> = props => {
  const { folder, open, onClose, currentFolder } = props;
  const [display, setDisplay] = useState(false);
  const [avatar, setAvatar] = useState<string>("");
  const [initialValues, setInitialValues] = useState<IFormValue>({
    name: "",
  });

  useEffect(() => {
    if (open) {
      if (folder) {
        setInitialValues({
          name: folder?.name || "",
        });
        setAvatar(folder?.icon || "");
      }
      setDisplay(open);
    }
  }, [open]);
  const handleSubmit = (values: IFormValue) => {
    if (!values?.name) return;
    console.log({ values });
    console.log(avatar);
  };
  const handleClose = () => {
    setDisplay(false);
    setAvatar("");
    onClose && onClose();
  };
  const handleChooseAvatar = (icon: string) => {
    setAvatar(icon);
  };
  return (
    <Dialog open={display} onClose={handleClose}>
      <TopDialog>
        <Title>{`${folder ? "Edit" : "Create new"} folder`}</Title>
        <Close onClick={handleClose}>
          <SVG name="common/close" />
        </Close>
      </TopDialog>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form id="create" method="post">
          <WrapperInput>
            <Input name="name" placeholder="Folder name" label="Folder name" />
          </WrapperInput>

          <AvatarWrapper>
            <Label>Avatar</Label>
            <IconFolderList>
              {iconFolders.map((icon, index) => (
                <ButtonIcon
                  onClick={() => handleChooseAvatar(icon)}
                  active={icon === avatar}
                >
                  <Icon key={String(index)} src={icon} />
                </ButtonIcon>
              ))}
            </IconFolderList>
          </AvatarWrapper>
          <ButtonWrapper>
            <Button type="submit" size="lg" variant="primary">
              {folder ? "Save" : "Create"}
            </Button>
            <Button onClick={handleClose} size="lg" variant="third">
              Cancel
            </Button>
          </ButtonWrapper>
        </Form>
      </Formik>
    </Dialog>
  );
};
export default DialogFolder;
const iconFolders = [IconDemo, IconDemo2];
