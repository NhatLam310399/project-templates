import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Form,
  InformationContainer,
  SubTitle,
  ChangePasswordContainer,
} from "./styles";
import { isEmail, isPhoneNumber } from "common/functions";
import Input from "designs/Input";
import useAuth from "hooks/useAuth";
import { nextStep, addNewPassword } from "redux/actions/settingAccount";
interface IChangePasswordProps {}
interface IFormValue {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
const ChangePassword: React.FC<IChangePasswordProps> = props => {
  const dispatch = useDispatch();
  const { isAuth, accountInfo, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<IFormValue>({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const validateSchema = yup
    .object()
    .shape<{ [key in keyof IFormValue]: any }>({
      currentPassword: yup
        .string()
        .required("Password is required!")
        .min(6, "Password must have at least 6 characters!"),
      newPassword: yup
        .string()
        .required("Password is required!")
        .min(6, "Password must have at least 6 characters!"),
      confirmNewPassword: yup
        .string()
        .required("Confirm password is required!")
        .when("newPassword", {
          is: (val: string) => (val && val.length > 0 ? true : false),
          then: yup
            .string()
            .oneOf(
              [yup.ref("newPassword")],
              "Both password need to be the same!",
            ),
        }),
    });
  const handleSubmit = (values: IFormValue) => {
    /* Validate password */
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(addNewPassword(values.newPassword)); /*Validate success*/
      dispatch(nextStep(1));
    }, 2000);
    console.log("submit", values);
  };

  const handleCanCle = () => {
    dispatch(nextStep(1));
  };
  return (
    <ChangePasswordContainer>
      <SubTitle>Change Password</SubTitle>
      <InformationContainer>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validateSchema}
        >
          <Form method="post">
            <Input
              required
              type="password"
              label="Current Password"
              name="currentPassword"
              placeholder="Enter your Password"
            />
            <Input
              required
              type="password"
              label="New Password"
              name="newPassword"
              placeholder="Enter your New Password"
            />
            <Input
              required
              type="password"
              label="Confirm New Password"
              name="confirmNewPassword"
              placeholder="Enter confirm new password"
            />
            <div className="flex gap-1 w-full flex-col phone:flex-row">
              <Button type="submit" size="lg" loading={loading}>
                Save Changes Password
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={handleCanCle}
              >
                Cancle
              </Button>
            </div>
          </Form>
        </Formik>
      </InformationContainer>
    </ChangePasswordContainer>
  );
};

export default ChangePassword;
