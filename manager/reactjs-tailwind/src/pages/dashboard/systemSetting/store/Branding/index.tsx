import { Formik } from "formik";
import { useState } from "react";

import PackingSlip from "./PackingSlip";
import OtherTrackingPage from "./OtherTrackingPage";
import {
  ShippingContainer,
  Form,
  Option,
  Img,
  Logo,
  Name,
  Description,
  SubTitle,
} from "./styles";
import { randomId } from "common/functions";

import Select from "designs/Select";
import { Title } from "designs/Title";
import { Wrapper } from "designs/PageLayout";
import Tab from "designs/Tabs";

interface IShippingProps {}
interface IStore {
  _id?: string;
  name?: string;
  image?: string;
  email?: string;
  brand?: string;
  isShowEmail?: boolean;
  phoneNumber?: string;
  description?: string;
  customMessage?: "Personalized" | "Sustainablility";
  textButtons?: string[];
}
const Shipping: React.FC<IShippingProps> = props => {
  const [storeSelected, setStoreSelected] = useState<IStore>({});
  const handleSelectedStore = (option: IStore) => {
    console.log("option", option);
    setStoreSelected(option);
  };
  const renderOption = (option: IStore) => {
    return (
      <Option>
        <Logo>
          <Img src={option?.image} />
        </Logo>
        <Name>{option?.name}</Name>
      </Option>
    );
  };
  return (
    <Wrapper>
      <Title>Settings: Shipping</Title>
      <ShippingContainer>
        <Formik
          initialValues={storeSelected}
          onSubmit={() => {
            null;
          }}
        >
          <Form method="post">
            <Select
              renderOption={renderOption}
              placeholder="Choose store"
              name="store"
              options={stores}
              optionSelected={storeSelected}
              label="Choose store"
              onSelect={handleSelectedStore}
            />
          </Form>
        </Formik>
        <PackingSlip store={storeSelected} />
        <OtherTrackingPage store={storeSelected} />
      </ShippingContainer>
    </Wrapper>
  );
};

export default Shipping;
const stores: IStore[] = [
  {
    _id: randomId(),
    image: "/",
    name: "Kingify",
    brand: "brand Kingify",
    email: "kingify@gmail.com",
    customMessage: "Personalized",
    description: "No description",
    isShowEmail: true,
    phoneNumber: "0703456400",
    textButtons: ["Go to back", "Contact"],
  },
  {
    _id: randomId(),
    image: "/",
    name: "VinMart",
    brand: "brand VinMart",
    email: "VinMart@gmail.com",
    customMessage: "Personalized",
    description: "No description",
    isShowEmail: false,
    phoneNumber: "0703456444",
    textButtons: ["Go to back", "Contact", "Go to home"],
  },
  {
    _id: randomId(),
    image: "/",
    name: "Phuc Long",
    brand: "brand Phuc Long",
    email: "PhucLong@gmail.com",
    customMessage: "Sustainablility",
    description: "No description",
    isShowEmail: true,
    phoneNumber: "0703456555",
    textButtons: ["Close"],
  },
];
