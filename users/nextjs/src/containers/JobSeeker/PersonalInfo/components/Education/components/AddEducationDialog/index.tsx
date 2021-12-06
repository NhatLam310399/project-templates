import { Formik, FormikValues } from "formik";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as Yup from "yup";

import Dialog from "@components/Dialog";
import Button from "@designs/Button";
import Input from "@designs/Input";
import TextArea from "@designs/TextArea";
import Select from "@designs/MultiSelect";
import {
  IEducation,
  IRecordCreateInput,
  IRecordUpdateInput,
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

import { degreeList } from "./data";

interface IAddEducationDialogProps {
  ButtonMenu?: React.ReactElement;
  className?: string;
  educationList?: IEducation[];
  recordId?: string;
  userId?: string;
}

const AddEducationDialog: React.FC<IAddEducationDialogProps> = (props) => {
  const { t } = useTranslation(["job-management", "common"]);
  const { ButtonMenu, className, educationList, userId, recordId } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { isLoading } = useSelector((state: IRootState) => state.actions);

  const initialValues = {
    major: "",
    degree: "",
    school: "",
    begin: "",
    to: "",
    describeLearningProcess: "",
  };

  const validationSchema = Yup.object({
    major: Yup.string().required(t("personal-info.education.major-validation")),
    degree: Yup.string().required(
      t("personal-info.education.degree-validation"),
    ),
    school: Yup.string().required(
      t("personal-info.education.school-validation"),
    ),
  });

  const onDegreeSelected = (type: string, formik) => (value) => {
    return formik.setFieldValue(type, value);
  };

  const handleSubmit = (values: FormikValues) => {
    if (!recordId && !!userId) {
      const payload: IRecordCreateInput = {
        recordCreateInput: {
          user: userId,
          education: [
            {
              schoolName: values.school,
              degree: values.degree.name,
              major: values.major,
              timeStart: values.begin,
              timeEnd: values.to,
              description: values.describeLearningProcess,
            },
          ],
        },
      };
      dispatch(createRecord(payload));
    }

    if (!!recordId && !!userId) {
      const clearFieldEducationList = educationList.map(
        (education: IEducation) => ({
          schoolName: education.schoolName,
          degree: education.degree,
          major: education.major,
          timeStart: education.timeStart,
          timeEnd: education.timeEnd,
          description: education.description,
        }),
      );

      const payload: IRecordUpdateInput = {
        id: recordId,
        recordUpdateInput: {
          education: [
            ...clearFieldEducationList,
            {
              schoolName: values.school,
              degree: values.degree.name,
              major: values.major,
              timeStart: values.begin,
              timeEnd: values.to,
              description: values.describeLearningProcess,
            },
          ] as [IEducation],
        },
      };
      dispatch(updateRecord(payload));
    }
    setOpen(false);
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
          <Title>{t("personal-info.education.add-education")}</Title>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {(formik) => (
              <Form>
                <Input
                  label={t("personal-info.education.major")}
                  placeholder={t("personal-info.education.major-placeholder")}
                  type="text"
                  required
                  {...formik.getFieldProps("major")}
                  {...formik.getFieldMeta("major")}
                />

                <Select
                  label={t("personal-info.education.degree")}
                  options={degreeList}
                  placeholder={t("personal-info.education.degree-placeholder")}
                  required
                  onChangeSelect={onDegreeSelected("degree", formik)}
                  touched={formik.touched["degree"]}
                  error={formik.errors["degree"]}
                />

                <Input
                  label={t("personal-info.education.school")}
                  placeholder={t("personal-info.education.school-placeholder")}
                  type="text"
                  required
                  {...formik.getFieldProps("school")}
                  {...formik.getFieldMeta("school")}
                />
                <DateWrapper>
                  <Input
                    label={t("personal-info.education.begin")}
                    placeholder={t("personal-info.education.date-placeholder")}
                    className="w-full"
                    type="date"
                    {...formik.getFieldProps("begin")}
                    {...formik.getFieldMeta("begin")}
                  />

                  <Input
                    label={t("personal-info.education.to")}
                    placeholder={t("personal-info.education.date-placeholder")}
                    className="w-full"
                    type="date"
                    {...formik.getFieldProps("to")}
                    {...formik.getFieldMeta("to")}
                  />
                </DateWrapper>

                <TextArea
                  label={t("personal-info.education.describe-learning-process")}
                  placeholder={t(
                    "personal-info.education.describe-learning-process-placeholder",
                  )}
                  type="text"
                  rows={5}
                  {...formik.getFieldProps("describeLearningProcess")}
                  {...formik.getFieldMeta("describeLearningProcess")}
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

export default AddEducationDialog;
