import { useTranslation } from "next-i18next";
import { useState } from "react";
import { Formik, FormikValues } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import Dialog from "@components/Dialog";
import Button from "@designs/Button";
import Input from "@designs/Input";
import TextArea from "@designs/TextArea";
import {
  IRecordUpdateInput,
  IRecordCreateInput,
  IWorkExperience,
  IRootState,
} from "@common/typings";
import {
  createRecord,
  updateRecord,
  getRecordByUserId,
} from "@redux/actions/record";
import { setLoading } from "@redux/actions/common";

import {
  ButtonWrapper,
  Container,
  DialogButton,
  Title,
  Wrapper,
  Form,
  DateWrapper,
} from "./styles";

interface IAddExperienceDialogProps {
  ButtonMenu?: React.ReactElement;
  className?: string;
  userId?: string;
  recordId?: string;
  experienceList?: IWorkExperience[];
}

const AddExperienceDialog: React.FC<IAddExperienceDialogProps> = (props) => {
  const { t } = useTranslation(["job-management", "common"]);
  const {
    ButtonMenu,
    className,
    userId,
    recordId,
    experienceList = [],
  } = props;

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state: IRootState) => state.actions);

  const initialValues = {
    title: "",
    company: "",
    begin: "",
    to: "",
    describeWorkingProcess: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required(
      t("personal-info.experience.title-validation"),
    ),
    company: Yup.string().required(
      t("personal-info.experience.company-validation"),
    ),
  });

  const handleSubmit = (values: FormikValues) => {
    if (!recordId && !!userId) {
      const payload: IRecordCreateInput = {
        recordCreateInput: {
          user: userId,
          workExperience: [
            {
              companyName: values.company,
              jobName: values.title,
              timeStart: values.begin,
              timeEnd: values.to,
              description: values.describeWorkingProcess,
            },
          ],
        },
      };
      dispatch(createRecord(payload));
    }

    if (!!recordId && !!userId) {
      const clearFieldExperienceList = experienceList.map(
        (experience: IWorkExperience) => ({
          companyName: experience.companyName,
          jobName: experience.jobName,
          timeStart: experience.timeStart,
          timeEnd: experience.timeEnd,
          description: experience.description,
        }),
      );
      const payload: IRecordUpdateInput = {
        id: recordId,
        recordUpdateInput: {
          workExperience: [
            ...clearFieldExperienceList,
            {
              companyName: values.company,
              jobName: values.title,
              timeStart: values.begin,
              timeEnd: values.to,
              description: values.describeWorkingProcess,
            },
          ] as [IWorkExperience],
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
          <Title>{t("personal-info.experience.add-experience")}</Title>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {(formik) => (
              <Form>
                <Input
                  label={t("personal-info.experience.company")}
                  placeholder={t(
                    "personal-info.experience.company-placeholder",
                  )}
                  type="text"
                  required
                  {...formik.getFieldProps("company")}
                  {...formik.getFieldMeta("company")}
                />

                <Input
                  label={t("personal-info.experience.title")}
                  placeholder={t("personal-info.experience.title-placeholder")}
                  type="text"
                  required
                  {...formik.getFieldProps("title")}
                  {...formik.getFieldMeta("title")}
                />

                <DateWrapper>
                  <Input
                    label={t("personal-info.experience.begin")}
                    placeholder={t("personal-info.education.date-placeholder")}
                    className="w-full"
                    type="date"
                    {...formik.getFieldProps("begin")}
                    {...formik.getFieldMeta("begin")}
                  />

                  <Input
                    label={t("personal-info.experience.to")}
                    placeholder={t("personal-info.education.date-placeholder")}
                    className="w-full"
                    type="date"
                    {...formik.getFieldProps("to")}
                    {...formik.getFieldMeta("to")}
                  />
                </DateWrapper>

                <TextArea
                  label={t(
                    "personal-info.experience.describe-working-process-placeholder",
                  )}
                  placeholder={t(
                    "personal-info.experience.describe-working-process",
                  )}
                  type="text"
                  rows={5}
                  {...formik.getFieldProps("describeWorkingProcess")}
                  {...formik.getFieldMeta("describeWorkingProcess")}
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

export default AddExperienceDialog;
