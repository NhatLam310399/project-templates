import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import Input from "designs/Input";
import Button from "designs/Button";

interface IFormValue {
  email: string;
  password: string;
}

export const LoginForm: React.FC<{ onSubmit?: (values: IFormValue) => void }> =
  ({ onSubmit }) => {
    const [initialValues] = useState<IFormValue>({
      email: "",
      password: "",
    });
    const [validatorSchema] = useState(
      yup.object().shape<{ [key in keyof IFormValue]: any }>({
        email: yup
          .string()
          .required("Email is required!")
          .email("Email not valid!"),
        password: yup
          .string()
          .required("Password is required!")
          .min(5, "Password is not valid!"),
      }),
    );

    const handleSubmit = (values: IFormValue) => {
      console.log({ values });
      onSubmit && onSubmit(values);
    };

    return (
      <div className="m-3">
        <h1 className="mb-5 text-xxl font-bold text-primary-1">Login Form</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validatorSchema}
        >
          <Form className="flex flex-col gap-3 w-50">
            <Input name="email" label="Email" required />
            <Input name="password" type="password" label="Password" required />
            <Button type="submit">Submit</Button>
          </Form>
        </Formik>
      </div>
    );
  };

export default {
  title: "Form/Login",
  component: LoginForm,
} as ComponentMeta<typeof Input>;
