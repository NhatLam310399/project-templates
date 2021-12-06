import { useTranslation } from "next-i18next";
import { FormikProps, FormikValues } from "formik";
import { useEffect, useState } from "react";

import OTPInput from "@components/OTPInput";
import ErrorHelperText from "@components/ErrorHelperText";

import {
  OTPFormContainer,
  Form,
  Back,
  Icon,
  Title,
  PhoneValidate,
  Notification,
  PhoneNumber,
  CountDown,
  Button,
  Resend,
} from "./styles";

interface IOTPFormProps {
  title?: string;
  formik: FormikProps<FormikValues>;
  errorMessage?: string;
  loading: boolean;
  onResendOtp?: (value: FormikValues) => void;
  onClose?: () => void;
}

const COUNT_DOWN_TIME = 60;

const OTPForm: React.FC<IOTPFormProps> = (props) => {
  const {
    title,
    formik,
    errorMessage,
    loading = false,
    onResendOtp,
    onClose,
  } = props;
  const { t } = useTranslation(["authen"]);
  const handleClick = () => {
    onClose();
    formik.setFieldValue("otp", "");
  };

  const [countDown, setCountDown] = useState(COUNT_DOWN_TIME);
  const [resend, setResend] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCountDown(countDown - 1);
    }, 1000);
    if (countDown === 0) {
      setResend(true);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [countDown]);

  const handleResend = () => {
    setResend(false);
    setCountDown(COUNT_DOWN_TIME);
    onResendOtp && onResendOtp(formik.values);
    formik.setFieldValue("otp", "");
  };

  return (
    <OTPFormContainer>
      <Form>
        <Back onClick={handleClick}>
          <Icon name="common/navigate-before" width={16} height={17} />
          {t("register.back")}
        </Back>
        <Title>{title}</Title>
        <PhoneValidate>{t("register.confirm-phone-number")}</PhoneValidate>
        <Notification>
          {t("register.message")}
          <PhoneNumber>{formik.values.phoneNumber}</PhoneNumber>
        </Notification>
        <OTPInput
          value={formik.values.otp}
          onChange={(value) => formik.setFieldValue("otp", value)}
          touched={formik.touched.otp}
          error={formik.errors.otp}
        />
        {resend ? (
          <Notification className="mt-2 phone:mt-4">
            {t("register.not-receive-code")}
            <Resend onClick={handleResend}>{t("register.resend")}</Resend>
          </Notification>
        ) : (
          <Notification className="mt-2 phone:mt-4">
            {t("register.please-wait")}
            <CountDown>{countDown}s</CountDown>
            {t("register.to-resend-code")}
          </Notification>
        )}
        <Button loading={loading} type="submit" primary>
          {t("register.confirm")}
        </Button>
        {errorMessage && <ErrorHelperText text={errorMessage} />}
      </Form>
    </OTPFormContainer>
  );
};

export default OTPForm;
