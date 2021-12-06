import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { randomId } from "common/functions";
import MultipleCheckBoxSelect from "designs/MultipleCheckBoxSelect";
import Button from "designs/Button";

type ICat = {
  _id: string;
  name: string;
};

const cats: ICat[] = [
  {
    _id: randomId(),
    name: "Abyssinian Cat",
  },
  {
    _id: randomId(),
    name: "American Bobtail Cat Breed",
  },
  {
    _id: randomId(),
    name: "American Curl Cat",
  },
  {
    _id: randomId(),
    name: "American Shorthair Cat",
  },
  {
    _id: randomId(),
    name: "American Wirehair Cat Breed",
  },
  {
    _id: randomId(),
    name: "Balinese-Javanese Cat",
  },
];

type IFormValue = {
  cats: string;
};

const validationSchema = yup.object().shape<{
  [key in keyof IFormValue]: any;
}>({
  cats: yup
    .string()
    .required("This field is required!")
    .test(
      "minCats",
      "Please select at least 2 options",
      val => (val || "")?.split("|")?.length >= 2,
    ),
});

export const Example: React.FC<{}> = props => {
  const [listCatsSelected, setListCatsSelected] = useState<ICat[]>([]);
  const [submitValues, setSubmitValue] = useState<IFormValue | null>(null);
  const [initValues] = useState<IFormValue>({ cats: "" });
  return (
    <div className="m-5 max-w-phone">
      <Formik
        initialValues={initValues}
        validationSchema={validationSchema}
        onSubmit={values => setSubmitValue(values)}
      >
        <Form className="flex flex-col gap-2">
          <MultipleCheckBoxSelect
            name="cats"
            label="Cat Breeds"
            listOptionsSelected={listCatsSelected}
            options={cats}
            onSelect={options => setListCatsSelected(options as any)}
            formTarget="_id"
          />
          <Button size="md" type="submit">
            Submit
          </Button>
        </Form>
      </Formik>
      <div style={{ marginTop: 100 }}>
        {JSON.stringify({ listCatsSelected }, null, 2)}
      </div>
      <div style={{ marginTop: 100 }}>
        Submitted: {JSON.stringify({ submitValues }, null, 2)}
      </div>
    </div>
  );
};

export default {
  title: "designs/MultipleCheckBoxSelect",
  component: MultipleCheckBoxSelect,
};
