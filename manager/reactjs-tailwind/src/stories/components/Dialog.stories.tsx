import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import Dialog from "components/Dialog";
import Button from "designs/Button";
import Input from "designs/Input";

export default {
  title: "Components/Dialog/Forms",
  component: Dialog,
} as ComponentMeta<typeof Dialog>;

export const WithTexts: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(true);
  return (
    <div>
      <Button className="w-20" onClick={handleClose}>
        Open Message
      </Button>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <div className="pb-2 text-neutral-1 content">
          <Dialog.Header
            title="Use Google's location service?"
            onClose={handleClose}
          />
          <Dialog.Content>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </Dialog.Content>
        </div>
      </Dialog>
    </div>
  );
};

interface IFormValue {
  email: string;
  password: string;
}

export const WithForm: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<IFormValue | null>(null);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      setValues(values);
    }, 3000);
  };

  return (
    <div>
      <Button className="w-20">Login</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validatorSchema}
        >
          <Form className="flex flex-col ">
            <h1 className="mb-2 font-bold text-primary-1 text-xxl">
              Login form
            </h1>
            <Input name="email" className="mb-2" label="Email" />
            <Input name="password" type="password" label="Mật khẩu" />
          </Form>
        </Formik>
      </Dialog>

      <div className="mt-5">{values && JSON.stringify(values, null, 2)}</div>
    </div>
  );
};
