import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import faker from "faker";
import Button from "designs/Button";
import Select from "designs/Select";
import { randomId } from "common/functions";

export default {
  title: "Designs/Select",
  component: Select,
  argTypes: {
    formTarget: {
      options: ["id", "code", "name"],
      control: {
        type: "select",
      },
    },
    optionTarget: {
      options: ["id", "code", "name"],
      control: {
        type: "select",
      },
    },
  },
} as ComponentMeta<typeof Select>;

type IFromValue = {
  country: string;
};

type ICountry = {
  code: string;
  name: string;
  id: string;
};

const cats: ICountry[] = [];
for (let i = 0; i < 10; i++) {
  cats.push({
    id: randomId(),
    code: faker.address.countryCode(),
    name: faker.address.country(),
  });
}

const Template: ComponentStory<typeof Select> = args => {
  const [countrySelected, setCountrySelected] = useState<ICountry | null>(null);
  const [validatorSchema] = useState(
    yup.object().shape<{ [key in keyof IFromValue]: any }>({
      country: yup.string().required("Please select a country!"),
    }),
  );
  return (
    <div className="m-5 max-w-phone">
      <Formik
        initialValues={
          {
            country: "",
          } as IFromValue
        }
        onSubmit={values => {}}
        validationSchema={validatorSchema}
      >
        <Form className="flex flex-col gap-3">
          <Select
            {...args}
            optionSelected={countrySelected}
            onSelect={option => setCountrySelected(option)}
            options={cats}
          />
        </Form>
      </Formik>
    </div>
  );
};

export const Demo = Template.bind({});
Demo.args = {
  name: "country",
  label: "Country",
  required: true,
  formTarget: "code",
  optionTarget: "name",
};

export const Example: React.FC = () => {
  const [countrySelected, setCountrySelected] = useState<ICountry | null>(null);
  const [submittedValues, setSubmittedValues] = useState<IFromValue>();

  const [validatorSchema] = useState(
    yup.object().shape<{ [key in keyof IFromValue]: any }>({
      country: yup.string().required("Please select a country!"),
    }),
  );

  return (
    <div className="m-5 max-w-phone">
      <Formik
        initialValues={
          {
            country: "",
          } as IFromValue
        }
        onSubmit={values => {
          setSubmittedValues(values);
        }}
        validationSchema={validatorSchema}
      >
        <Form className="flex flex-col gap-3">
          <Select
            name="country"
            label="Country"
            optionSelected={countrySelected}
            onSelect={option => setCountrySelected(option)}
            options={cats}
            formTarget="code"
            optionTarget="name"
            required
          />
          <Select
            name="disabled-country"
            label="Disabled selector"
            onSelect={option => setCountrySelected(option)}
            optionSelected={countrySelected}
            options={cats}
            formTarget="code"
            optionTarget="name"
            disabled
          />
          <Button size="md" type="submit">
            Submit
          </Button>
        </Form>
      </Formik>
      <div className="mt-5 ">{JSON.stringify(submittedValues, null, 2)}</div>
    </div>
  );
};
