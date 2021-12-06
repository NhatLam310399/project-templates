import { useState } from "react";
import { Formik, FormikHelpers, Form } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {
  FormDetailContainer,
  FormProductDetail,
  FormShipping,
  Title,
  Content,
  Orther,
} from "./styles";

import Select from "designs/Select";
import Button from "designs/Button";
import Input from "designs/Input";
import { randomId } from "common/functions";
import { nextStepOrderImport } from "redux/actions/orderImport";

interface IFormDetailProps {}

interface IRole {
  _id: string;
  name: string;
}

interface IQuantity {
  _id: number;
  name: number;
}
interface IFormValue {
  orderid: string;
  productid: string;
  variantid: string;
  quantity: number;
  fullname: string;
  company: string;
  addressline1: string;
  addressline2: string;
  country: string;
  province: string;
  city: string;
  code: string;
  phone: string;
}
const validationScheme = yup
  .object()
  .shape<{ [key in keyof IFormValue]: any }>({
    orderid: yup.string(),
    productid: yup.string(),
    variantid: yup.string(),
    quantity: yup.number(),
    fullname: yup.string(),
    company: yup.string(),
    addressline1: yup.string(),
    addressline2: yup.string(),
    country: yup.string(),
    province: yup.string(),
    city: yup.string(),
    code: yup.string(),
    phone: yup.string(),
  });

const FormDetail: React.FC<IFormDetailProps> = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [initialValues] = useState<IFormValue>({
    orderid: "",
    productid: "",
    variantid: "",
    quantity: -1,
    fullname: "",
    company: "",
    addressline1: "",
    addressline2: "",
    country: "",
    province: "",
    city: "",
    code: "",
    phone: "",
  });

  const [orderIdSelected, setOrderIdSelected] = useState<IRole>();
  const [productIdSelected, setProductIdSelected] = useState<IRole>();
  const [variantIdSelected, setVariantIdSelected] = useState<IRole>();
  const [quantitySelected, setQuantitySelected] = useState<IQuantity>();
  const [fullname, setFullname] = useState<IRole>();
  const [company, setCompany] = useState<IRole>();
  const [addressline1, setAddressline1] = useState<IRole>();
  const [addressline2, setAddressline2] = useState<IRole>();
  const [country, setConutry] = useState<IRole>();
  const [province, setProvice] = useState<IRole>();
  const [city, setCity] = useState<IRole>();
  const [code, setCode] = useState<IRole>();
  const [phone, setPhone] = useState<IRole>();

  const handleSubmit = (
    values: IFormValue,
    helper: FormikHelpers<IFormValue>,
  ) => {
    setLoading(true);
    console.log(values);
    setTimeout(() => {
      dispatch(nextStepOrderImport());
      setLoading(false);
    }, 2000);
  };
  return (
    <FormDetailContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={validationScheme}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormProductDetail>
            <Title>Product details</Title>
            <Content>
              <Select
                label="Order Id"
                name="orderid"
                onSelect={option => {
                  setOrderIdSelected(option);
                }}
                optionSelected={orderIdSelected}
                placeholder="Order id"
                options={[
                  {
                    _id: randomId(),
                    name: "Order id 1",
                  },
                  {
                    _id: randomId(),
                    name: "Order id 2",
                  },
                ]}
              />
              <Select
                label="Product Id"
                name="productid"
                onSelect={option => setProductIdSelected(option)}
                optionSelected={productIdSelected}
                placeholder="Product id"
                options={[
                  {
                    _id: randomId(),
                    name: "Product id 1",
                  },
                  {
                    _id: randomId(),
                    name: "Product id 2",
                  },
                ]}
              />
              <Select
                className="flex-1"
                label="Variant Id"
                name="variantid"
                onSelect={option => setVariantIdSelected(option)}
                optionSelected={variantIdSelected}
                placeholder="Variant id"
                options={[
                  {
                    _id: randomId(),
                    name: "Variant id 1",
                  },
                  {
                    _id: randomId(),
                    name: "Variant id 2",
                  },
                ]}
              />
              <Select
                label="Quantity"
                name="quantity"
                onSelect={option => setQuantitySelected(option)}
                optionSelected={quantitySelected}
                placeholder="Quantity"
                options={[
                  {
                    _id: 1,
                    name: 1,
                  },
                  {
                    _id: 2,
                    name: 2,
                  },
                ]}
              />
            </Content>
          </FormProductDetail>
          <FormShipping>
            <Title>Shipping details</Title>
            <Content>
              <Select
                label="Full name"
                name="fullname"
                onSelect={option => setFullname(option)}
                optionSelected={fullname}
                placeholder="Full name"
                options={[
                  {
                    _id: randomId(),
                    name: "Nguyễn Đình Khiêm",
                  },
                  {
                    _id: randomId(),
                    name: "Đặng Tấn Lực",
                  },
                ]}
              />
              <Select
                label="Company (Optional)"
                name="company"
                onSelect={option => setCompany(option)}
                optionSelected={company}
                placeholder="Company"
                options={[
                  {
                    _id: randomId(),
                    name: "Company 1",
                  },
                  {
                    _id: randomId(),
                    name: "Company 2",
                  },
                ]}
              />
              <Select
                label="Address line 1"
                name="addressline1"
                onSelect={option => setAddressline1(option)}
                optionSelected={addressline1}
                placeholder="addressline1"
                options={[
                  {
                    _id: randomId(),
                    name: "Adress line 1.1",
                  },
                  {
                    _id: randomId(),
                    name: "Address line 1.2",
                  },
                ]}
              />
              <Select
                label="Address line 2 (optional)"
                name="addressline2"
                onSelect={option => setAddressline2(option)}
                optionSelected={addressline2}
                placeholder="Address line 2"
                options={[
                  {
                    _id: randomId(),
                    name: "Adress line 2.1",
                  },
                  {
                    _id: randomId(),
                    name: "Address line 2.2",
                  },
                ]}
              />

              <Select
                label="Country"
                name="country"
                onSelect={option => setConutry(option)}
                optionSelected={country}
                placeholder="Country"
                options={[
                  {
                    _id: randomId(),
                    name: "VN",
                  },
                  {
                    _id: randomId(),
                    name: "EN",
                  },
                ]}
              />
              <Select
                label="State/Province/Prefecture"
                name="province"
                onSelect={option => setProvice(option)}
                optionSelected={province}
                placeholder="State/Province/Prefecture"
                options={[
                  {
                    _id: randomId(),
                    name: "Province 1",
                  },
                  {
                    _id: randomId(),
                    name: "Province 2",
                  },
                ]}
              />
              <Select
                label="City"
                name="city"
                onSelect={option => setCity(option)}
                optionSelected={city}
                placeholder="City"
                options={[
                  {
                    _id: randomId(),
                    name: "TP.HCM",
                  },
                  {
                    _id: randomId(),
                    name: "TP.HN",
                  },
                ]}
              />
              <Select
                label="Post/Zip code"
                name="code"
                onSelect={option => setCode(option)}
                optionSelected={code}
                placeholder="Code"
                options={[
                  {
                    _id: randomId(),
                    name: "Code 1",
                  },
                  {
                    _id: randomId(),
                    name: "Code 2",
                  },
                ]}
              />
              <Select
                label="Phone (Optional, used for delivery)"
                name="phone"
                onSelect={option => setPhone(option)}
                optionSelected={phone}
                placeholder="Phone"
                options={[
                  {
                    _id: randomId(),
                    name: "0899673976",
                  },
                  {
                    _id: randomId(),
                    name: "0839895914",
                  },
                ]}
              />
            </Content>
          </FormShipping>
          <Orther>
            <Button type="submit" size="lg" loading={loading}>
              Continue to shipping detail
            </Button>
          </Orther>
        </Form>
      </Formik>
    </FormDetailContainer>
  );
};

export default FormDetail;
