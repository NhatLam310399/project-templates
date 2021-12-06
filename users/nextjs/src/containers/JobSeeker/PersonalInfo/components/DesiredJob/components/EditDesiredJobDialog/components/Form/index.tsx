import { useTranslation } from "next-i18next";
import { FormikProps, FormikValues } from "formik";

import Button from "@designs/Button";
import Select from "@designs/MultiSelect";
import Input from "@designs/Input";
import GroupSelect from "@designs/GroupSelect";
import {
  ICategoryLevel1,
  ICategoryLevel2,
  IJobLevel,
  IProvince,
} from "@common/typings";

import { IBenefitWithEnable } from "../../index";
import Benefit from "../../../Benefit";
import { ButtonWrapper, Form, BenefitWrapper, Label } from "./styles";

interface IFormProps {
  formik: FormikProps<FormikValues>;
  initialValues: any;
  onSelected: (type: string, formik: any) => (value: any) => any;
  handleCloseDialog: () => void;
  isLoading: boolean;
  provinces: IProvince[];
  benefits: IBenefitWithEnable[];
  handleSelectBenefits: (id: string) => void;
  allJobLevel: IJobLevel[];
  categoryLevel1: ICategoryLevel1[];
  categoryLevel2: ICategoryLevel2[];
}

const EditDesiredJobForm: React.FC<IFormProps> = (props) => {
  const {
    formik,
    initialValues,
    onSelected,
    handleCloseDialog,
    isLoading,
    provinces,
    benefits,
    handleSelectBenefits,
    allJobLevel,
    categoryLevel1,
    categoryLevel2,
  } = props;
  const { t } = useTranslation(["job-management", "common"]);

  return (
    <Form>
      <Select
        label={t("personal-info.desired-job.work-location")}
        options={provinces}
        defaultValue={initialValues.workLocation}
        placeholder={t("personal-info.desired-job.work-location-validation")}
        required
        onChangeSelect={onSelected("workLocation", formik)}
        touched={formik.touched["workLocation"]}
        error={formik.errors["workLocation"]}
      />

      <GroupSelect
        label={t("personal-info.desired-job.career")}
        groupLabel={categoryLevel1}
        groupOption={categoryLevel2}
        initValue={initialValues.jobDesired}
        placeholder={t("personal-info.desired-job.career-placeholder")}
        isMulti
        limit={3}
        onChangeSelect={onSelected("jobDesired", formik)}
        touched={formik.touched["jobDesired"]}
        error={formik.errors["jobDesired"]}
      />

      <Select
        label={t("personal-info.desired-job.desired-level")}
        defaultValue={initialValues.levelDesired}
        options={allJobLevel}
        placeholder={t("personal-info.desired-job.desired-level-validation")}
        required
        onChangeSelect={onSelected("levelDesired", formik)}
        touched={formik.touched["levelDesired"]}
        error={formik.errors["levelDesired"]}
      />

      <Input
        label={t("personal-info.desired-job.salary")}
        placeholder={t("personal-info.desired-job.salary-placeholder")}
        type="number"
        required
        {...formik.getFieldProps("salaryDesired")}
        {...formik.getFieldMeta("salaryDesired")}
      />

      <Label>{t("personal-info.desired-job.top-5-desired-benefits")}</Label>
      <BenefitWrapper>
        {benefits.map((benefit, index: number) => (
          <Benefit
            name={benefit?.name}
            enabled={benefit?.enabled}
            icon={benefit?.icon}
            id={benefit?._id}
            onClick={handleSelectBenefits}
            key={index}
          />
        ))}
      </BenefitWrapper>

      <ButtonWrapper>
        <Button
          type="button"
          onClick={handleCloseDialog}
          className="w-1/2 border border-solid border-primary"
        >
          {t("common:dialog.cancel")}
        </Button>

        <Button loading={isLoading} primary type="submit" className="w-1/2">
          {!isLoading && t("common:dialog.save")}
        </Button>
      </ButtonWrapper>
    </Form>
  );
};

export default EditDesiredJobForm;
