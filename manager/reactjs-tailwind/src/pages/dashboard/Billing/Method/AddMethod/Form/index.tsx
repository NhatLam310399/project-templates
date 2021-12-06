import { ChangeEvent, useState, useEffect } from "react";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {
  FormContainer,
  FormWrapper,
  FormHeading,
  BillingMethod,
  Chose,
  Items,
} from "./styles";

import Input from "designs/Input";
import Button from "designs/Button";
import SVG from "designs/SVG";

import { defaultStepBillingMethod } from "redux/actions/billingMethod";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

interface IFormValue {
  fullName: string;
  company: string;
  addressline1: string;
  addressline2: string;
  phone: string;
  city: string;
  country: string;
  zip: number;
}
interface IFormProps {}

const validationSchema = yup
  .object()
  .shape<{ [key in keyof IFormValue]: any }>({
    fullName: yup.string().required("Full name is required!"),
    company: yup.string(),
    addressline1: yup.string().required("Address line 1 is required"),
    addressline2: yup.string(),
    phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
    city: yup.string().required("City is required"),
    country: yup.string().required("Country is required"),
    zip: yup.number().required("Zip is required"),
  });

const Form: React.FC<IFormProps> = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [openChoseMethod, setOpenChoseMethod] = useState<boolean>(false);
  const [choseMethod, setChoseMethod] = useState<number>(0); // 0 No choose , 1 Paypal , 2 Payment Card
  const [initialValues, setInitialValues] = useState<IFormValue>({
    fullName: "",
    company: "",
    addressline1: "",
    addressline2: "",
    phone: "",
    city: "",
    country: "",
    zip: 0,
  });

  const onHandleSumbit = (
    values: IFormValue,
    helper: FormikHelpers<IFormValue>,
  ) => {
    if (choseMethod !== 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        dispatch(defaultStepBillingMethod());
      }, 2000);
    } else {
      alert("Please ! Choose method");
    }
  };
  const onHandleClick = (value: number) => {
    setChoseMethod(value);
  };

  useEffect(() => {
    if (
      initialValues.fullName.trim() === "" ||
      initialValues.city.trim() === "" ||
      initialValues.addressline1.trim() === "" ||
      initialValues.country.trim() === "" ||
      initialValues.zip <= 0
    ) {
      console.log("Disable");
      setOpenChoseMethod(false);
    } else {
      console.log("Enable");
      setOpenChoseMethod(true);
    }
  }, [initialValues]);

  const onChange = (e: ChangeEvent<any>) => {
    setInitialValues({
      ...initialValues,
      [e.target.name]: e.target.value,
    });
  };
  console.log(initialValues);
  return (
    <FormContainer>
      <Formik
        initialValues={initialValues}
        onSubmit={onHandleSumbit}
        validationSchema={validationSchema}
      >
        <FormWrapper onChange={onChange}>
          <FormHeading.Wrapper>
            <FormHeading.Title>Billing info</FormHeading.Title>
            <FormHeading.Body>
              <FormHeading.Content>
                <Input
                  name="fullName"
                  label="Full name"
                  placeholder="Enter your full name"
                  autoComplete="off"
                  required
                />
                <Input
                  name="addressline1"
                  label="Address line 1"
                  placeholder="Enter your address"
                  autoComplete="off"
                  required
                />
                <Input
                  name="addressline2"
                  label="Address line 2 (optional)"
                  placeholder="Enter your address"
                  autoComplete="off"
                />
                <Input
                  name="city"
                  label="City"
                  placeholder="Enter your city"
                  autoComplete="off"
                  required
                />
                <Input
                  name="country"
                  label="Country"
                  placeholder="Enter your Country"
                  autoComplete="off"
                  required
                />
                <Input
                  name="zip"
                  label="Zip"
                  placeholder=""
                  autoComplete="off"
                  required
                />
              </FormHeading.Content>
              <FormHeading.Content>
                <Input
                  onChange={onChange}
                  name="company"
                  label="Company (optional)"
                  placeholder="Enter your company"
                  autoComplete="off"
                />
                <Input
                  onChange={onChange}
                  name="phone"
                  label="Phone (optional)"
                  placeholder="Enter your company"
                  autoComplete="off"
                />
              </FormHeading.Content>
              <BillingMethod.Wrapper>
                <BillingMethod.Tilte>Billing method</BillingMethod.Tilte>
                {!openChoseMethod ? (
                  <BillingMethod.Box>
                    Please finish filling out Billing info to select a Billing
                    method!
                  </BillingMethod.Box>
                ) : (
                  <Chose.Wrapper>
                    <Chose.Heading>
                      <SVG name="billing/block" height={32} width={32} />
                      <Chose.Desc>
                        We do not store your card or billing method details. We
                        use imdustry standard encryption to protect your
                        personal information.
                      </Chose.Desc>
                    </Chose.Heading>
                    <Items.Wrapper
                      chose={choseMethod}
                      onClick={e => onHandleClick(1)}
                    >
                      <Items.Content>
                        <SVG name="billing/paypal" />
                        Paypal
                      </Items.Content>
                    </Items.Wrapper>
                    <Items.Wrappers
                      chose={choseMethod}
                      onClick={e => onHandleClick(2)}
                    >
                      <Items.Content>
                        <SVG name="billing/paypal" />
                        Payment card
                      </Items.Content>
                      <Items.Content>
                        <SVG name="billing/master" />
                        <SVG name="billing/visa" />
                      </Items.Content>
                    </Items.Wrappers>
                  </Chose.Wrapper>
                )}
              </BillingMethod.Wrapper>
            </FormHeading.Body>
          </FormHeading.Wrapper>
          <Button type="submit" size="lg" loading={loading} className="mt-2">
            Add
          </Button>
        </FormWrapper>
      </Formik>
    </FormContainer>
  );
};

export default Form;
