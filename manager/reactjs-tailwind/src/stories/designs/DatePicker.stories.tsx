import { ComponentMeta } from "@storybook/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import Select from "designs/Select";
import Button from "designs/Button";
import DatePicker from "designs/DatePicker";

export default {
  title: "Designs/DatePicker",
  component: Select,
} as ComponentMeta<typeof Select>;

type IFromValue = {
  birthday: string;
};

export const Templates: React.FC = () => {
  const [] = useState();
  const [submittedValues, setSubmittedValues] = useState<IFromValue>();
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [initialValues] = useState<IFromValue>({
    birthday: "",
  });

  const [validatorSchema] = useState(
    yup.object().shape<{ [k in keyof IFromValue]: any }>({
      birthday: yup.string().required("Please choose date!"),
    }),
  );

  return (
    <div className="m-5 max-w-phone">
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          setSubmittedValues(values);
        }}
        validationSchema={validatorSchema}
      >
        <Form className="flex flex-col gap-3">
          <DatePicker
            name="birthday"
            label="Birthday"
            onDateChange={newDate => setBirthday(newDate)}
            required
          />
          <Button type="submit">Submit</Button>
        </Form>
      </Formik>
      <div className="mt-5 ">{JSON.stringify(submittedValues, null, 2)}</div>
    </div>
  );
};
