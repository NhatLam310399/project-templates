import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Form,
  InformationContainer,
  SubTitle,
  ChangeEmailContainer,
} from "./styles";
import { isEmail } from "common/functions";
import Input from "designs/Input";
import useAuth from "hooks/useAuth";
import { nextStep, addNewEmail } from "redux/actions/settingAccount";
interface IChangeEmailProps {}
interface IFormValue {
  email: string;
  password: string;
}
const ChangeEmail: React.FC<IChangeEmailProps> = props => {
  const dispatch = useDispatch();
  const { isAuth, accountInfo, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<IFormValue>({
    email: accountInfo?.userInfo.email ? accountInfo.userInfo.email : " ",
    password: "",
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
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Password must have at least 6 characters!"),
    });
  const handleSubmit = (values: IFormValue) => {
    /* Validate password */
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(addNewEmail(values.email)); /*Validate success*/
      dispatch(nextStep(1));
    }, 2000);
    console.log("submit", values);
  };

  const handleCanCle = () => {
    dispatch(nextStep(1));
  };
  return (
    <ChangeEmailContainer>
      <SubTitle>Change Email</SubTitle>
      <InformationContainer>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validateSchema}
        >
          <Form method="post">
            <Input
              name="email"
              required
              label="Email address"
              placeholder="Enter your email address"
              autoComplete="email"
            />
            <Input
              required
              type="password"
              label="Current Passwod"
              name="password"
              placeholder="Enter your Password"
            />
            <div className="flex gap-1 w-full  flex-col phone:flex-row">
              <Button type="submit" size="lg" loading={loading}>
                Save Changes Email
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
    </ChangeEmailContainer>
  );
};

export default ChangeEmail;
