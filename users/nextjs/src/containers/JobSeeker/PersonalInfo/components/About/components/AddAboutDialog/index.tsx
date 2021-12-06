import { Formik, FormikValues } from "formik";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Dialog from "@components/Dialog";
import Button from "@designs/Button";
import TextArea from "@designs/TextArea";
import { setLoading } from "@redux/actions/common";
import {
  updateRecord,
  getRecordByUserId,
  createRecord,
} from "@redux/actions/record";

import {
  IRootState,
  IRecordUpdateInput,
  IRecordCreateInput,
} from "@common/typings";
import {
  ButtonWrapper,
  Container,
  DialogButton,
  Title,
  Wrapper,
  Form,
} from "./styles";

interface IGeneralInfoDialogProps {
  ButtonMenu?: React.ReactElement;
  className?: string;
  content?: string;
  recordId: string;
  userId: string;
}

const GeneralInfoDialog: React.FC<IGeneralInfoDialogProps> = (props) => {
  const { t } = useTranslation(["job-management", "common"]);
  const { ButtonMenu, className, content, recordId, userId } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { isLoading } = useSelector((state: IRootState) => state.actions);

  const initialValues = {
    describe: content,
  };

  const handleSubmit = (values: FormikValues) => {
    if (!recordId && !!userId) {
      const payload: IRecordCreateInput = {
        recordCreateInput: {
          user: userId,
          description: values.describe,
        },
      };
      dispatch(createRecord(payload));
    }

    if (!!recordId && !!userId) {
      const payload: IRecordUpdateInput = {
        id: recordId,
        recordUpdateInput: {
          description: values.describe,
        },
      };
      dispatch(updateRecord(payload));
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  return (
    <Container className={className}>
      <DialogButton onClick={handleOpenDialog}>{ButtonMenu}</DialogButton>
      <Dialog
        isOpen={open}
        onClose={handleCloseDialog}
        className="z-50 rounded-none w-max"
      >
        <Wrapper>
          <Title>{t("personal-info.about.add-describe")}</Title>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {(formik) => (
              <Form>
                <TextArea
                  label={t("personal-info.about.describe-yourself")}
                  placeholder={t(
                    "personal-info.about.describe-yourself-placeholder",
                  )}
                  type="text"
                  rows={6}
                  {...formik.getFieldProps("describe")}
                  {...formik.getFieldMeta("describe")}
                />

                <ButtonWrapper>
                  <Button
                    type="button"
                    onClick={handleCloseDialog}
                    className="w-1/2 border border-solid border-primary"
                  >
                    {t("common:dialog.cancel")}
                  </Button>

                  <Button
                    loading={isLoading}
                    primary
                    type="submit"
                    className="w-1/2"
                  >
                    {!isLoading && t("common:dialog.save")}
                  </Button>
                </ButtonWrapper>
              </Form>
            )}
          </Formik>
        </Wrapper>
      </Dialog>
    </Container>
  );
};

export default GeneralInfoDialog;
