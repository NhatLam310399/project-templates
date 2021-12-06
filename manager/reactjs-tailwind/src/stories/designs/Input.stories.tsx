import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import Input from "designs/Input";

export default {
  title: "Designs/Input (TextField)",
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = args => {
  const [validatorSchema] = useState(
    yup.object().shape({
      email: yup
        .string()
        .required("Email is required!")
        .email("Email not valid!"),
    }),
  );
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={values => console.log({ values })}
        validationSchema={validatorSchema}
      >
        <Form>
          <Input className="max-w-phone" required {...(args as any)} />
        </Form>
      </Formik>
    </div>
  );
};

export const EmailInput = Template.bind({});
EmailInput.args = {
  name: "email",
  label: "Email",
  type: "email",
  required: true,
};

export const PasswordInput = Template.bind({});
PasswordInput.args = {
  name: "password",
  label: "Password",
  type: "password",
  required: true,
};
