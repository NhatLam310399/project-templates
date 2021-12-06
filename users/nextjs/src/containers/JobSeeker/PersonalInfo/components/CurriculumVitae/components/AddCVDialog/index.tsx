import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";

import Dialog from "@components/Dialog";
import Button from "@designs/Button";
import Spinner from "@designs/icons/Spinner";
import { SVG } from "@designs/SVG";

import {
  updateRecord,
  getRecordByUserId,
  createRecord,
} from "@redux/actions/record";
import { setLoading } from "@redux/actions/common";
import {
  IRootState,
  IRecordUpdateInput,
  IRecordCreateInput,
} from "@common/typings";

import {
  Container,
  DialogButton,
  Wrapper,
  Content,
  Text,
  Title,
  ButtonText,
  CVDescription,
  Input,
} from "./styles";

interface IAddCVDialog {
  ButtonMenu?: React.ReactElement;
  className?: string;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  acceptedFiles: File[];
  recordId: string;
  userId: string;
}

const AddCVDialog: React.FC<IAddCVDialog> = (props) => {
  const { t } = useTranslation(["job-management", "common"]);
  const {
    ButtonMenu,
    className,
    acceptedFiles,
    getInputProps,
    getRootProps,
    recordId,
    userId,
  } = props;
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: IRootState) => state.actions);

  const [open, setOpen] = useState(false);
  const [urlCV, setURLCV] = useState(null);
  const [fileNameCV, setFileNameCV] = useState("");

  useEffect(() => {
    setURLCV(acceptedFiles[0]);
    setFileNameCV(acceptedFiles[0]?.name);
  }, [acceptedFiles]);

  useEffect(() => {
    if (!!urlCV && !!userId && fileNameCV !== "") {
      if (!recordId) {
        const payload: IRecordCreateInput = {
          recordCreateInput: {
            user: userId,
            urlCV,
            fileNameCV,
          },
        };
        handleCreate(payload);
      }

      if (!!recordId) {
        const payload: IRecordUpdateInput = {
          id: recordId,
          recordUpdateInput: {
            fileNameCV,
            urlCV,
          },
        };
        handleUpdate(payload);
      }
    }
  }, [fileNameCV]);

  const handleCreate = (payload: IRecordCreateInput) => {
    dispatch(setLoading(true));
    try {
      dispatch(createRecord(payload));
    } catch (err) {}
  };

  const handleUpdate = (payload: IRecordUpdateInput) => {
    dispatch(updateRecord(payload));
    setOpen(false);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const files = acceptedFiles.map((file: any) => (
    <CVDescription key={file.path}>{file.path}</CVDescription>
  ));

  return (
    <Container className={className}>
      <DialogButton onClick={handleOpenDialog}>{ButtonMenu}</DialogButton>
      <Dialog
        isOpen={open}
        onClose={handleCloseDialog}
        className="z-50 rounded-none w-max"
      >
        <Wrapper {...getRootProps({ className: "dropzone" })}>
          {/* Input upload file */}
          <Input {...getInputProps()} />
          <Content>
            {isLoading && <Spinner className="text-black" />}
            {!isLoading && <SVG name="job-management/folder-add-icon" />}

            <Title>{t("personal-info.cv.drag-and-drop")}</Title>
            {/* If user has uploaded then set file name, Else if set button upload file */}
            {acceptedFiles.length > 0 ? (
              files
            ) : (
              <Button className="w-full border border-solid phone:w-1/2 border-primary">
                <ButtonText>{t("personal-info.cv.choose-cv")}</ButtonText>
              </Button>
            )}
            <Text>{t("personal-info.cv.cv-note")}</Text>
          </Content>
        </Wrapper>
      </Dialog>
    </Container>
  );
};

export default AddCVDialog;
