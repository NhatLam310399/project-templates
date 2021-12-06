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
  Description,
} from "./styles";
import Tab from "designs/Tabs";
import GroupRadioButton, { IOptions } from "designs/GroupRadioButton";
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
        titles={["Other import settings"]}
        content={[<FormUpdate store={store} />]}
        icon="settings/info-circle"
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
  const [radioSelected, setRadioSelected] = useState<IOptions>({});

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
  const handleChange = (option: IOptions) => {
    console.log("radio", option?._id);
    setRadioSelected(option);
  };
  return (
    <>
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
            className="mb-2.5"
          />
          <GroupRadioButton
            className="flex flex-col gap-2.5 mb-2.5"
            options={confirmImportGroups}
            onChange={handleChange}
            optionSelected={radioSelected}
          />
          <Container>
            <Text>
              <HighLightText> NB! </HighLightText>
              If the import unsynced orders checkbox below is selected, then you
              orders will not be automatically fullfilled if that order contains
              an unsynced item, instead, the order will be saved as a draft.
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
const confirmImportGroups: IOptions[] = [
  {
    _id: "Manually",
    label: "Manually confirm imported orders",
    description: (
      <Description>
        All orders from your ecommerce store will be imported{" "}
        <HighLightText>as drafts</HighLightText>. You can then confirm them to
        be fullfilled. to toggle notifications about these orders, head over to
        Settings {`>`} Notifications {`>`} Orders {`&`} Products {`>`} Orders{" "}
        {`> `}
        Confirmations and status updates
      </Description>
    ),
  },
  {
    _id: "Automatically",
    label: "Automatically confirm orders to be fullfilled",
    description: (
      <Description>
        All orders from your online store will automatically be fullfilled
      </Description>
    ),
  },
];
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
