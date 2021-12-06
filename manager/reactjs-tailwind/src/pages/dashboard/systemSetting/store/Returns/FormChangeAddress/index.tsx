import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useSelector } from "react-redux";

import { FormAddressContainer, Button, ContainerButton, Form } from "./styles";
import Select from "designs/Select";
import Input from "designs/Input";

import { IProvince, IRootState } from "typings";

interface IFormAddressProps {
  store: IStore;
  onClose: () => void;
}
interface IStore {
  _id?: string;
  name?: string;
  image?: string;
  brand?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: IProvince;
  zipCode?: string;
  country?: string;
}
interface IFormValue {
  store: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  zipCode: string;
  country?: string;
}
const FormAddress: React.FC<IFormAddressProps> = ({ store, onClose }) => {
  const [initialsState, setInitialsState] = useState<IFormValue>({
    addressLine1: "",
    addressLine2: "",
    city: "",
    store: "",
    zipCode: "",
  });
  useEffect(() => {
    if (store && Object.keys(store).length > 0) {
      const {
        addressLine1 = "",
        addressLine2 = "",
        city = {},
        country = "",
        name = "",
        zipCode = "",
      } = store || {};
      setInitialsState({
        addressLine1,
        city: city?.name || "",
        store: name,
        addressLine2,
        zipCode,
        country,
      });
    }
  }, [store]);

  const { provinces = [] } = useSelector((state: IRootState) => state.location);
  const [city, setCity] = useState<IProvince>({});
  const validateSchema = yup
    .object()
    .shape<{ [key in keyof IFormValue]: any }>({
      addressLine1: yup
        .string()
        .required("The address line field is required !"),
      city: yup.string().required("The city field is required !"),
      store: yup.string().required("The company field is required !"),
      zipCode: yup.string().required("The zip code field is required !"),
    });
  const handleSubmit = (values: IFormValue) => {
    console.log("submit", values);
  };
  return (
    <FormAddressContainer>
      <Formik
        initialValues={initialsState}
        enableReinitialize={true}
        validationSchema={validateSchema}
        onSubmit={handleSubmit}
      >
        <Form id="update" method="post">
          <Input
            name="store"
            placeholder="Enter company"
            required
            label="Company"
          />
          <Input
            required
            name="addressLine1"
            placeholder="Enter addressLine1"
            label="AddressLine1"
          />
          <Input
            name="addressLine2"
            placeholder="Enter addressLine2"
            label="AddressLine2 (optional)"
          />

          <Select
            required
            name="city"
            label="City"
            options={provinces}
            optionTarget="name"
            placeholder="Select city"
            optionSelected={city}
            onSelect={option => setCity(option)}
          />
          <Input
            required
            name="zipCode"
            placeholder="Enter zipCode"
            label="ZipCode"
          />
          <Input
            disabled={true}
            name="country"
            placeholder="Country"
            label="Country"
          />
          <ContainerButton>
            <Button
              type="button"
              onClick={() => {
                onClose && onClose();
              }}
              variant="secondary"
              size="lg"
            >
              Cancel
            </Button>
            <Button type="submit" size="lg">
              Submit
            </Button>
          </ContainerButton>
        </Form>
      </Formik>
    </FormAddressContainer>
  );
};

export default FormAddress;
