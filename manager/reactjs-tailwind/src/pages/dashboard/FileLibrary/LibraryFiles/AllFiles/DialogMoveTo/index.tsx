import { useEffect, useState } from "react";
import { Formik } from "formik";

import {
  Close,
  Title,
  TopDialog,
  Button,
  ButtonWrapper,
  FolderWrapper,
  Back,
  FileWrapper,
  Icon,
  Empty,
  Item,
} from "./styles";
import CreateFolder from "./CreateFolder";
import Dialog from "components/Dialog";

import SVG from "designs/SVG";
import Image from "designs/Image";
import { IFile, IFolder } from "typings";
interface IDialogFolderProps {
  currentFolder: IFolder | null;
  open: boolean;
  files: IFile[];
  onClose: () => void;
}

const DialogFolder: React.FC<IDialogFolderProps> = props => {
  const { files, open, onClose, currentFolder } = props;
  const [display, setDisplay] = useState(false);
  const [agree, setAgree] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [folderParent, setFolderParent] = useState<IFolder>({});

  useEffect(() => {
    if (open) {
      console.log("files move", files);
      setDisplay(open);
      currentFolder && setFolderParent(currentFolder);
    }
  }, [open]);

  const handleClose = () => {
    setDisplay(false);
    setAgree(false);
    setOpenCreate(false);
    onClose && onClose();
  };
  const handleDelete = () => {
    handleClose();
  };
  const handleClick = (folder: IFile) => {
    setFolderParent(folder);
  };
  const handleBack = () => {};
  const handleOpenCreate = () => {
    setOpenCreate(true);
  };
  return (
    <Dialog size="auto" open={display} onClose={handleClose}>
      <TopDialog>
        <Back onClick={handleBack}>
          <SVG name="common/arrow-left" width="10px" />
        </Back>
        <Title>{folderParent?.name}</Title>
        <Close onClick={handleClose}>
          <SVG name="common/close" className="w-2.5 h-2.5 p-0.5" />
        </Close>
      </TopDialog>
      {openCreate && <CreateFolder onClose={() => setOpenCreate(false)} />}
      {folderParent?.children?.length === 0 &&
      folderParent?.files?.length === 0 ? (
        <Empty>This folder is empty</Empty>
      ) : (
        <>
          <FolderWrapper>
            {folderParent?.children?.map(folder => (
              <Item onClick={() => handleClick(folder)}>
                <Image src={folder?.icon || ""} />
                {folder?.name}
              </Item>
            ))}
          </FolderWrapper>
          <FileWrapper>
            {folderParent?.files?.map(file => (
              <Item>{file?.name}</Item>
            ))}
          </FileWrapper>
        </>
      )}
      <ButtonWrapper>
        <Button
          type="button"
          onClick={handleDelete}
          size="md"
          variant="primary"
        >
          Move
        </Button>
        {!openCreate && (
          <Button onClick={handleOpenCreate} size="md" variant="link">
            Create new folder
          </Button>
        )}
      </ButtonWrapper>
    </Dialog>
  );
};
export default DialogFolder;
