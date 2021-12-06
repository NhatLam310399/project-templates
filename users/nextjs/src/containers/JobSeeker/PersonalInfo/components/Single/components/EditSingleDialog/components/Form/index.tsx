import { useTranslation } from "next-i18next";
import { FormikProps, FormikValues } from "formik";

import Button from "@designs/Button";
import Select from "@designs/MultiSelect";
import InputBox from "@designs/Input";
import { IOption } from "@designs/Select";
import { IWard, IProvince, IDistrict } from "@common/typings";

import { ButtonWrapper, Form } from "./styles";

interface IEditSingleFormProps {
  formik: FormikProps<FormikValues>;
  genderOptions: IOption[];
  initialValues: any;
  onSelected: (type: string, formik: any) => (value: any) => any;
  handleClose: () => void;
  isLoading: boolean;
  districts: IDistrict[];
  wards: IWard[];
  provinces: IProvince[];
}

const EditSingleForm: React.FC<IEditSingleFormProps> = (props) => {
  const {
    formik,
    genderOptions,
    initialValues,
    onSelected,
    handleClose,
    isLoading,
    districts,
    provinces,
    wards,
  } = props;
  const { t } = useTranslation(["job-management", "common"]);

  return (
    <Form>
      <InputBox
        label={t("personal-info.single.email")}
        placeholder={t("personal-info.single.email-placeholder")}
        type="text"
        value={formik.values.email}
        disabled
        required
        {...formik.getFieldProps("email")}
        {...formik.getFieldMeta("email")}
      />

      <InputBox
        label={t("personal-info.single.phone-number")}
        placeholder={t("personal-info.single.phone-number-placeholder")}
        type="text"
        required
        {...formik.getFieldProps("phoneNumber")}
        {...formik.getFieldMeta("phoneNumber")}
      />

      <InputBox
        label={t("personal-info.single.id-card")}
        placeholder={t("personal-info.single.id-card-placeholder")}
        type="number"
        {...formik.getFieldProps("idCard")}
        {...formik.getFieldMeta("idCard")}
      />

      <InputBox
        label={t("personal-info.single.date-of-birth")}
        placeholder={t("personal-info.single.date-of-birth-placeholder")}
        className="cursor-pointer"
        type="date"
        required
        {...formik.getFieldProps("dateOfBirth")}
        {...formik.getFieldMeta("dateOfBirth")}
      />

      <Select
        label={t("personal-info.single.gender")}
        options={genderOptions}
        defaultValue={initialValues.gender}
        placeholder={t("personal-info.single.gender-placeholder")}
        onChangeSelect={onSelected("gender", formik)}
        touched={formik.touched["gender"]}
        error={formik.errors["gender"]}
        required
      />

      <Select
        label={t("personal-info.single.province")}
        options={provinces}
        defaultValue={initialValues.province}
        placeholder={t("personal-info.single.province-placeholder")}
        onChangeSelect={onSelected("province", formik)}
        touched={formik.touched["province"]}
        error={formik.errors["province"]}
        required
      />

      <Select
        label={t("personal-info.single.district")}
        options={districts}
        defaultValue={initialValues.district}
        placeholder={t("personal-info.single.district-placeholder")}
        onChangeSelect={onSelected("district", formik)}
        touched={formik.touched["district"]}
        error={formik.errors["district"]}
        required
      />

      <Select
        label={t("personal-info.single.wards")}
        options={wards}
        defaultValue={initialValues.ward}
        placeholder={t("personal-info.single.wards-placeholder")}
        onChangeSelect={onSelected("ward", formik)}
        touched={formik.touched["ward"]}
        error={formik.errors["ward"]}
        required
      />

      <InputBox
        label={t("personal-info.single.address-details")}
        placeholder={t("personal-info.single.address-details-placeholder")}
        type="text"
        {...formik.getFieldProps("address")}
        {...formik.getFieldMeta("address")}
      />

      <ButtonWrapper>
        <Button
          type="button"
          onClick={handleClose}
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

export default EditSingleForm;
