import { Formik } from "formik";
import { useState } from "react";

import AboutStore from "./AboutStore";
import SellingPreferences from "./SellingPreferences";
import { StoreSettingContainer, Form, Option, Img, Logo, Name } from "./styles";
import { randomId } from "common/functions";

import Select from "designs/Select";
import { Title } from "designs/Title";
import { Wrapper } from "designs/PageLayout";

interface IStoreSettingProps {}
interface IStore {
  _id?: string;
  name?: string;
  image?: string;
  brand?: string;
}
const StoreSetting: React.FC<IStoreSettingProps> = props => {
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
      <Title>Settings: Stores</Title>
      <StoreSettingContainer>
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
        <AboutStore store={storeSelected} />
        <SellingPreferences store={storeSelected} />
      </StoreSettingContainer>
    </Wrapper>
  );
};

export default StoreSetting;
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
