import { useState } from "react";

import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { FormContainer, Forms, WrapperInput } from "./styles";

import GroupRadio, { IOptions } from "designs/GroupRadioButton";
import Input from "designs/Input";
import Checkbox from "designs/Checkbox";
import Button from "designs/Button";

interface IFormProps {}

interface IFormValue {
  name: string;
  business: string;
  tax: string;
  address: string;
  code: number;
  city: string;
  state: string;
  securityNumber: string;
  employeeNumber: string;
}

const validationSchema = yup
  .object()
  .shape<{ [key in keyof IFormValue]: any }>({
    name: yup.string().required("Name is required!"),
    business: yup.string().required("Bussiness is required!"),
    tax: yup.string().required("tax is required!"),
    address: yup.string().required("address is required!"),
    state: yup.string().required("state is required!"),
    securityNumber: yup.string().required("securityNumber is required!"),
    employeeNumber: yup.string().required("EmployeeNumber is required!"),
    city: yup.string().required("City is required!"),
    code: yup.number().required("Number is required!"),
  });

const listCountry: IOptions[] = [
  {
    _id: "usa",
    label: "USA",
  },
  {
    _id: "other",
    label: "Other",
  },
];

const listLocated: IOptions[] = [
  {
    _id: "yes",
    label: "Yes",
  },
  {
    _id: "no",
    label: "No",
  },
];

const Form: React.FC<IFormProps> = props => {
  const [initialValues, setInitialValues] = useState<IFormValue>({
    name: "",
    business: "",
    tax: "",
    address: "",
    state: "",
    securityNumber: "",
    employeeNumber: "",
    city: "",
    code: 0,
  });
  const [radioCountry, setRadioCountry] = useState<IOptions>({});

  const [radioLocatied, setRadioLocated] = useState<IOptions>({});

  const [initCheckbox, setInitCheckBox] = useState<boolean>(false);

  const onSubmit = (
    values: IFormValue,
    helper: FormikHelpers<IFormValue>,
  ) => {};
  return (
    <FormContainer>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Forms>
          <WrapperInput>
            <GroupRadio
              label="Country of residence"
              onChange={options => setRadioCountry(options)}
              optionSelected={radioCountry}
              options={listCountry}
            />
          </WrapperInput>
          <WrapperInput>
            <GroupRadio
              label="Are you located & performing services in California?"
              onChange={options => setRadioLocated(options)}
              optionSelected={radioLocatied}
              options={listLocated}
            />
          </WrapperInput>
          <WrapperInput>
            <Input label="Name (as shown on your tax return)" name="name" />
          </WrapperInput>
          <WrapperInput>
            <Input label="Federal tax classification" name="tax" />
          </WrapperInput>
          <WrapperInput>
            <Input
              label="Address line"
              name="address"
              placeholder="Enter your address line"
            />
          </WrapperInput>
          <WrapperInput col>
            <Input label="Postal/Zip code" name="code" />
            <Input label="City" name="city" />
          </WrapperInput>
          <WrapperInput>
            <Input label="State" name="state" placeholder="Enter your state" />
          </WrapperInput>

          <WrapperInput col>
            <Input
              label="Social security number"
              name="securityNumber"
              placeholder="XXX-XX-XXXX"
            />
            <Input
              label="Employer identification number"
              name="employee  Number"
              placeholder="XX-XXXXXXXX"
            />
          </WrapperInput>
          <WrapperInput>
            <Checkbox
              label="Regular"
              initialCheck={initCheckbox}
              onChange={() => setInitCheckBox(!initCheckbox)}
            />
          </WrapperInput>
          <WrapperInput>
            <Button type="submit">Prepare form</Button>
          </WrapperInput>
        </Forms>
      </Formik>
    </FormContainer>
  );
};

export default Form;
