import { Formik, FormikValues } from "formik";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as Yup from "yup";
import moment from "moment";

import Dialog from "@components/Dialog";
import Button from "@designs/Button";
import Input from "@designs/Input";
import TextArea from "@designs/TextArea";
import Select from "@designs/MultiSelect";
import { IEducation, IRecordUpdateInput, IRootState } from "@common/typings";
import { updateRecord, getRecordByUserId } from "@redux/actions/record";
import { setLoading } from "@redux/actions/common";

import {
  ButtonWrapper,
  Container,
  DialogButton,
  Title,
  Wrapper,
  Form,
  DateWrapper,
} from "../AddEducationDialog/styles";

import { degreeList } from "../AddEducationDialog/data";

interface IEditEducationDialogProps {
  ButtonMenu?: React.ReactElement;
  className?: string;
  educationList?: IEducation[];
  recordId?: string;
  userId?: string;
  schoolName?: string;
  degree?: string;
  major?: string;
  timeStart?: Date;
  timeEnd?: Date;
  description?: string;
  index?: number;
}

const EditEducationDialog: React.FC<IEditEducationDialogProps> = (props) => {
  const { t } = useTranslation(["job-management", "common"]);
  const {
    ButtonMenu,
    className,
    educationList,
    userId,
    recordId,
    schoolName,
    degree,
    major,
    timeStart,
    timeEnd,
    description,
    index,
  } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { isLoading } = useSelector((state: IRootState) => state.actions);

  const defaultDegreeValue = () => {
    return degreeList.find((item) => item.name === degree);
  };

  const initialValues = {
    major: major || "",
    degree: defaultDegreeValue(),
    school: schoolName || "",
    begin: (!!timeStart && moment(timeStart).format("YYYY-MM-DD")) || "",
    to: (!!timeEnd && moment(timeEnd).format("YYYY-MM-DD")) || "",
    describeLearningProcess: description || "",
  };

  const validationSchema = Yup.object({
    major: Yup.string().required(t("personal-info.education.major-validation")),
    degree: Yup.object()
      .required(t("personal-info.education.degree-validation"))
      .nullable(),
    school: Yup.string().required(
      t("personal-info.education.school-validation"),
    ),
  });

  const onDegreeSelected = (type: string, formik) => (value) => {
    return formik.setFieldValue(type, value);
  };

  const handleSubmit = (values: FormikValues) => {
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

      let education = [...clearFieldEducationList];

      education[index] = {
        schoolName: values.school,
        degree: values.degree,
        major: values.major,
        timeStart: values.begin,
        timeEnd: values.to,
        description: values.describeLearningProcess,
      };

      const payload: IRecordUpdateInput = {
        id: recordId,
        recordUpdateInput: {
          education: education as [IEducation],
        },
      };
      dispatch(updateRecord(payload));
      setOpen(false);
    }
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
          <Title>{t("personal-info.education.edit-education")}</Title>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
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
                  defaultValue={initialValues.degree}
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

export default EditEducationDialog;
