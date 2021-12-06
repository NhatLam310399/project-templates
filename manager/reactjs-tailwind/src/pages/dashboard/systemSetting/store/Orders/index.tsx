import { Formik } from "formik";
import { useState } from "react";

import FulfillmentCenters from "./FulfillmentCenters";
import ImportSettings from "./ImportSettings";
import SyncAsYouGo from "./SyncAsYouGo";
import ProductAlternatives from "./ProductAlternatives";
import { OrdersContainer, Form, Option, Img, Logo, Name } from "./styles";
import { Wrapper } from "designs/PageLayout";
import Select from "designs/Select";
import { Title } from "designs/Title";
import { randomId } from "common/functions";

interface IOrdersProps {}
interface IStore {
  _id?: string;
  name?: string;
  image?: string;
  brand?: string;
}
const Orders: React.FC<IOrdersProps> = props => {
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
      <Title>Settings: Order</Title>
      <OrdersContainer>
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
        <FulfillmentCenters store={storeSelected} />
        <ImportSettings store={storeSelected} />
        <SyncAsYouGo store={storeSelected} />
        <ProductAlternatives store={storeSelected} />
      </OrdersContainer>
    </Wrapper>
  );
};

export default Orders;
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
