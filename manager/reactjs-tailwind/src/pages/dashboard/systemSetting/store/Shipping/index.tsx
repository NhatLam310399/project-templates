import { Formik } from "formik";
import { useState } from "react";

import Europe from "./Europe";
import UsaAndCanada from "./UsaAndCanada";
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
  brand?: string;
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
        <SubTitle>Standard shipping</SubTitle>
        <Description>
          We’ll ship out all orders with our fixed-rate Standard shipping. Find
          out how to calculate and set up shipping rates on your storefront.
          Express shipping is only available for manual orders and stores that
          use live shipping rates, which are calculated by carriers in real
          time. View estimated delivery times on Kingify product pages based on
          your selling region and during order checkout.
        </Description>
        <Tab
          className="mt-7"
          content={[
            <UsaAndCanada store={storeSelected} />,
            <Europe store={storeSelected} />,
          ]}
          titles={["USA & Canada", "Europe"]}
        />
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
  },
  {
    _id: randomId(),
    image: "/",
    name: "VinMart",
    brand: "brand VinMart",
  },
  {
    _id: randomId(),
    image: "/",
    name: "Phuc Long",
    brand: "brand Phuc Long",
  },
];
