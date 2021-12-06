import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import Button from "designs/Button";
import SingleImageUploader from "components/SingleImageUploader";

export default {
  title: "Components/Images/Single Image Upload",
  component: SingleImageUploader,
} as ComponentMeta<typeof SingleImageUploader>;

interface IFormValue {
  image: string;
}

export const SingleImageUploadDemo: ComponentStory<typeof Button> = args => {
  const [imageSelected, setImageSelected] = useState<File>();
  const [values, setValues] = useState<IFormValue | null>(null);
  const [initialValues] = useState<IFormValue>({
    image: "",
  });
  const [validatorSchema] = useState(
    yup.object().shape<{ [key in keyof IFormValue]: any }>({
      image: yup.string().required("Image is required!"),
    }),
  );

  const handleSubmit = (values: IFormValue) => {
    setValues(values);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validatorSchema}
      >
        <Form className="flex flex-col max-w-lg">
          <SingleImageUploader
            name="image"
            label="Cat image"
            image={imageSelected}
          />
          <Button className="mt-2" type="submit">
            Submit
          </Button>
        </Form>
      </Formik>

      <div className="mt-5">{values && JSON.stringify(values, null, 2)}</div>
    </div>
  );
};
