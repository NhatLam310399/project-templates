import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  InformationContainer,
  SubTitle,
  PersonInfoContainer,
  Detail,
} from "./styles";
import { isEmail, isPhoneNumber } from "common/functions";
import Input from "designs/Input";
import useAuth from "hooks/useAuth";
import { nextStep } from "redux/actions/settingAccount";
import { IRootState } from "typings";
interface IPersonInfoProps {}
interface IFormValue {
  fullName: string;
  email: string;
  phoneNumber?: string;
  password?: string;
}

const GOOGLE = "google";
const FACEBOOK = "facebook";
const PersonInfo: React.FC<IPersonInfoProps> = props => {
  const dispatch = useDispatch();
  const { isAuth, accountInfo, logout } = useAuth();
  const settingAccount = useSelector(
    (state: IRootState) => state.settingAccount,
  );
  const [loading, setLoading] = useState(false);
  const [disabledEmail, setDisabledEmail] = useState(true);
  const [disabledPassword, setDisabledPassword] = useState(true);
  const [initialValues, setInitialValues] = useState<IFormValue>({
    fullName: accountInfo?.userInfo.fullName
      ? accountInfo.userInfo.fullName
      : " ",
    email: accountInfo?.userInfo.email ? accountInfo.userInfo.email : " ",
    phoneNumber: accountInfo?.userInfo.phoneNumber
      ? accountInfo.userInfo.phoneNumber
      : " ",
    password: accountInfo?.userInfo.password
      ? accountInfo.userInfo.password
      : "",
  });
  const validateSchema = yup
    .object()
    .shape<{ [key in keyof IFormValue]: any }>({
      email: yup
        .string()
        .required("Email address is required !")
        .test("email", "Email address is not valid !", value =>
          isEmail(value || ""),
        ),
      fullName: yup.string().required("Full name is required !"),
      phoneNumber: yup
        .string()
        .test("phone", "Phone number is not valid", value =>
          isPhoneNumber(String(value)),
        ),
    });
  const handleSubmit = (values: IFormValue) => {
    if (settingAccount.newEmail !== "") {
      values.password = settingAccount.newEmail;
    }
    if (settingAccount.newPassword !== "") {
      values.email = settingAccount.newPassword;
    }

    // accountInfo?.userInfo.provider === GOOGLE || // If login face or google then remove key password
    // accountInfo?.userInfo.provider === FACEBOOK
    //   ? delete values["password"]
    //   : null;

    console.log("submit", values);
  };
  const handleChangePassword = () => {
    dispatch(nextStep(3));
  };
  const handleChangeEmail = () => {
    dispatch(nextStep(2));
  };
  return (
    <PersonInfoContainer>
      <SubTitle>Personal Information</SubTitle>
      <InformationContainer>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validateSchema}
        >
          <Form method="post">
            <Input
              label="Full name"
              name="fullName"
              required
              placeholder="Enter your full name"
            />

            <Input
              onClickEvent={handleChangeEmail}
              hasEvent
              name="email"
              disabled={disabledEmail}
              required
              label="Email address"
              placeholder="Enter your email address"
              autoComplete="email"
            />
            {settingAccount.newEmail !== "" &&
            settingAccount.newEmail !== accountInfo?.userInfo.email ? (
              <Detail>
                Email changed . Pls click button Save Changes to save
              </Detail>
            ) : null}

            <Input
              label="Phone number"
              type="text"
              name="phoneNumber"
              placeholder="Enter your Phone number"
            />
            {accountInfo?.userInfo.provider === GOOGLE ||
            accountInfo?.userInfo.provider === FACEBOOK ? null : (
              <>
                <Input
                  onClickEvent={handleChangePassword}
                  hasEvent
                  disabled={disabledPassword}
                  type="password"
                  label="Password"
                  name="password"
                  placeholder="Enter your Password"
                />
                {settingAccount.newPassword !== " " &&
                settingAccount.newPassword !==
                  accountInfo?.userInfo?.password ? (
                  <Detail>
                    Password changed . Pls click button Save Changes to save
                  </Detail>
                ) : null}
              </>
            )}

            <Button type="submit" size="lg" loading={loading}>
              Save Changes
            </Button>
          </Form>
        </Formik>
      </InformationContainer>
    </PersonInfoContainer>
  );
};

export default PersonInfo;
