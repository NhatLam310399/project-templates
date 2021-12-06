import { Formik } from "formik";
import { useState } from "react";

import FormChangeAddress from "./FormChangeAddress";
import {
  AddressContainer,
  ReturnsContainer,
  Form,
  Option,
  Img,
  Logo,
  Name,
  Text,
  ButtonChange,
} from "./styles";
import { randomId } from "common/functions";

import Select from "designs/Select";
import { Title } from "designs/Title";
import { Wrapper } from "designs/PageLayout";
import Tab from "designs/Tabs";

import { IProvince } from "typings";

interface IShippingProps {}
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
const Shipping: React.FC<IShippingProps> = props => {
  const [storeSelected, setStoreSelected] = useState<IStore>({});
  const handleSelectedStore = (option: IStore) => {
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
      <Title>Settings: Returns </Title>
      <ReturnsContainer>
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

        <Tab
          className="mt-7"
          content={[<Address store={storeSelected} />]}
          titles={["Return Address"]}
          size="lg"
        />
      </ReturnsContainer>
    </Wrapper>
  );
};

export default Shipping;

interface IAddress {
  store: IStore;
}
const Address: React.FC<IAddress> = props => {
  const { store } = props;
  const [displayForm, setDisplayForm] = useState(false);
  return (
    <AddressContainer>
      <Text>
        All sent products are marked with Printful's return address for your
        convenience.
      </Text>
      <Text>
        If a product is returned, it will come back to us and we'll place it in
        temporary returns for 28 days at no cost. During this time, you'll be
        able to change the shipping address, and you'll be responsible for
        shipping costs. All unclaimed returns will go to charity.
      </Text>
      <Text>
        If you'd like to handle returns yourself, click on the button to add
        your address?. We'll review it in 1-2 business days and notify you via
        email. By adding your return address you'll be fully responsible for all
        returned orders.
      </Text>
      {displayForm ? (
        <FormChangeAddress
          onClose={() => setDisplayForm(false)}
          store={store}
        />
      ) : (
        <ButtonChange type="button" onClick={() => setDisplayForm(true)}>
          Change address
        </ButtonChange>
      )}
    </AddressContainer>
  );
};

const stores: IStore[] = [
  {
    _id: randomId(),
    image: "/",
    name: "Kingify",
    brand: "brand Kingify",
    addressLine1: "Tân sơn nhì",
    addressLine2: "Bình Hưng hoà",
    city: {
      _id: randomId(),
      code: "79",
      name: "Thành phố HCM",
    },
    country: "VietNam",
    zipCode: "170cde",
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
