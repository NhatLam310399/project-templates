import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Formik, FormikValues } from "formik";
import moment from "moment";
import * as Yup from "yup";

import {
  IGetDistricts,
  IGetWards,
  IRootState,
  IUpdateUserInput,
} from "@common/typings";
import Dialog from "@components/Dialog";
import { isEmail, regexPhoneNumber, isPhoneNumber } from "@constants/validate";
import { setLoading } from "@redux/actions/common";
import { getDistricts, getWards } from "@redux/actions/location";
import { updateUserProfile, getUserProfile } from "@redux/actions/user";

import { ISingleProps } from "../../index";
import EditSingleForm from "./components/Form";
import { Container, DialogButton, Title, Wrapper } from "./styles";

interface IEditSingleDialogProps extends ISingleProps {
  ButtonMenu?: React.ReactElement;
  className?: string;
}

const EditSingleDialog: React.FC<IEditSingleDialogProps> = (props) => {
  const { t } = useTranslation(["job-management", "common"]);
  const {
    ButtonMenu,
    className,
    address,
    dateOfBirth,
    district,
    email,
    gender,
    idCard,
    phoneNumber,
    province,
    ward,
    userId,
  } = props;

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  // When provinceCode change -> dispatch(getDistricts(provinceCode))
  const [provinceCode, setProvinceCode] = useState<string>("");
  // When districtCode change -> dispatch(getWards(districtCode))
  const [districtCode, setDistrictCode] = useState<string>("");

  // Provinces, districts, wards for options select (dropdown select)
  const { provinces, districts, wards } = useSelector(
    (state: IRootState) => state.location,
  );

  const { isLoading } = useSelector((state: IRootState) => state.actions);

  useEffect(() => {
    if (provinceCode !== "") {
      const payload: IGetDistricts = {
        provinceCode,
      };
      dispatch(getDistricts(payload));
    }
  }, [provinceCode]);

  useEffect(() => {
    if (districtCode !== "") {
      const payload: IGetWards = {
        districtCode,
      };
      dispatch(getWards(payload));
    }
  }, [districtCode]);

  // Gender options select with i18next (english, vietnamese)
  const genderOptions = [
    {
      name: t("common:gender.male"),
      _id: "male",
    },
    {
      name: t("common:gender.female"),
      _id: "female",
    },
  ];

  const defaultGenderValue = () => {
    if (gender === "male") {
      return {
        name: t("common:gender.male"),
        _id: "male",
      };
    }

    if (gender === "female") {
      return {
        name: t("common:gender.female"),
        _id: "female",
      };
    }
    return;
  };

  const defaultDateOfBirthValue = () => {
    return !!dateOfBirth && moment(dateOfBirth).format("YYYY-MM-DD");
  };

  const defaultProvinceValue = () => {
    return (
      !!province?.name && {
        name: province.name,
        _id: province._id,
        code: province.code,
      }
    );
  };

  const defaultWardValue = () => {
    return (
      !!ward?.name && {
        name: ward.name,
        _id: ward._id,
        code: ward.code,
      }
    );
  };

  const defaultDistrictValue = () => {
    return (
      !!district?.name && {
        name: district?.name,
        _id: district?._id,
        code: district?.code,
      }
    );
  };

  const initialValues = {
    email,
    phoneNumber: phoneNumber,
    idCard,
    dateOfBirth: defaultDateOfBirthValue(),
    gender: defaultGenderValue(),
    province: defaultProvinceValue(),
    district: defaultDistrictValue(),
    ward: defaultWardValue(),
    address: address?.name,
  };

  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .required(t("personal-info.single.phone-number-validation"))
      .matches(
        regexPhoneNumber,
        t("personal-info.single.phone-number-validation2"),
      )
      .length(10, t("personal-info.single.phone-number-validation2")),
    email: Yup.string()
      .required(t("personal-info.single.email-empty"))
      .test("Email", t("personal-info.single.email-inValid"), (values) =>
        isEmail(values!),
      ),
    gender: Yup.object().required(t("personal-info.single.gender-empty")),
    province: Yup.object()
      .nullable()
      .required(t("personal-info.single.province-empty")),
    district: Yup.object()
      .nullable()
      .required(t("personal-info.single.district-empty")),
    ward: Yup.object()
      .nullable()
      .required(t("personal-info.single.wards-empty")),
    dateOfBirth: Yup.string().required(t("personal-info.single.gender-empty")),
  });

  const handleSubmit = (values: FormikValues) => {
    const updateUserPayload: IUpdateUserInput = {
      updateUserInput: {
        email: values.email,
        phoneNumber: values.phoneNumber.toString(),
        identityCard: values.idCard.toString(),
        birthday: values?.dateOfBirth,
        gender: values?.gender?._id,
        locationTypeInput: {
          districtCode: values?.district?.code,
          provinceCode: values?.province?.code,
          streetName: values?.address,
          wardCode: values?.ward?.code,
        },
      },
    };
    handleConfirm(updateUserPayload);
  };

  const handleConfirm = (updateUserPayload: IUpdateUserInput) => {
    dispatch(updateUserProfile(updateUserPayload));
    handleCloseDialog();
  };

  const onSelected = (type: string, formik: any) => (value: any) => {
    if (type === "province") {
      setProvinceCode(value.code);
    }

    if (type === "district") {
      setDistrictCode(value.code);
    }

    return formik.setFieldValue(type, value);
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
          <Title>{t("personal-info.single.edit-personal-info")}</Title>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <EditSingleForm
                districts={districts}
                formik={formik}
                genderOptions={genderOptions}
                handleClose={handleCloseDialog}
                initialValues={initialValues}
                isLoading={isLoading}
                onSelected={onSelected}
                provinces={provinces}
                wards={wards}
              />
            )}
          </Formik>
        </Wrapper>
      </Dialog>
    </Container>
  );
};

export default EditSingleDialog;
