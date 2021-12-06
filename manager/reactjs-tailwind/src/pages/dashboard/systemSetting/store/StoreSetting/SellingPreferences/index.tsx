import { Formik } from "formik";
import { useEffect, useState } from "react";

import {
  SellingPreferencesContainer,
  Form,
  Button,
  Title,
  Text,
  Container,
  HighLightText,
} from "./styles";
import Tab from "designs/Tabs";
import SelectWithIcon from "designs/SelectWithIcon";
import { randomId } from "common/functions";

interface ISellingPreferencesProps {
  store: IStore;
}
interface IStore {
  _id?: string;
  name?: string;
  image?: string;
  brand?: string;
}
const SellingPreferences: React.FC<ISellingPreferencesProps> = ({ store }) => {
  return (
    <SellingPreferencesContainer>
      <Tab
        titles={["Store default selling preferences"]}
        content={[<FormUpdate store={store} />]}
      />
    </SellingPreferencesContainer>
  );
};

export default SellingPreferences;

interface IFormUpdateProps {
  store: IStore;
}
interface IFormValue {
  region?: string;
}
interface IRegion {
  _id?: string;
  name?: string;
}
const FormUpdate: React.FC<IFormUpdateProps> = ({ store }) => {
  const [initialsState, setInitialsState] = useState<IFormValue>({});
  const [regionSelected, setRegionSelected] = useState<IRegion>({});

  useEffect(() => {
    if (Object?.keys(store).length > 0) {
      // setInitialsState({});
    }
  }, [store]);

  const handleSubmit = (values: IFormValue) => {
    if (!values?.region) return;
    console.log("submit", values);
  };
  const handleChangeRegion = (option: IRegion) => {
    console.log("region", option);
    setRegionSelected(option);
  };
  return (
    <>
      <Container>
        <Title>Set your store’s default selling preferences</Title>
        <Text>
          This section is for setting individual selling preferences for your
          store and choosing its default selling region. Decide what’s more
          important for the region where your store is selling-product
          availability or delivery speed. Setting selling preferences and a
          selling region true to your store allows us to accurately display
          products available to your store’s selling region.
        </Text>
        <Text>
          Remember-here you set store-specific selling preferences. Global
          selling preferences are set from the Prefernces menu in the upper
          right corner. Global selling preferences apply to personal orders and
          all stores without individual preferences.
        </Text>
      </Container>
      <Formik
        enableReinitialize={true}
        initialValues={initialsState}
        onSubmit={handleSubmit}
      >
        <Form method="post">
          <SelectWithIcon
            name="region"
            onSelect={handleChangeRegion}
            options={regions}
            optionSelected={regionSelected}
            label="Selling region:"
            placeholder="WordWide"
            className="mb-1"
          />
          <Title>Delivery times requirements:</Title>
          <Container>
            <Text>
              When choosing <HighLightText> Worldwide</HighLightText>, we’’
              display the entire Product Catalog. Delivery times depend on
              end-customer location and selected product.
            </Text>
          </Container>

          <Button type="submit" size="lg">
            Save
          </Button>
        </Form>
      </Formik>
    </>
  );
};
const regions: IRegion[] = [
  {
    _id: randomId(),
    name: "Viet Nam",
  },
  {
    _id: randomId(),
    name: "USA",
  },
  {
    _id: randomId(),
    name: "England",
  },
  {
    _id: randomId(),
    name: "Russia",
  },
];
