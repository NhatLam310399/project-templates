import { Formik } from "formik";
import { useEffect, useState, MouseEvent } from "react";

import {
  FulfillmentCentersContainer,
  Button,
  Text,
  Container,
  Icon,
} from "./styles";
import Checkbox from "designs/Checkbox";
import Tab from "designs/Tabs";
import SVG from "designs/SVG";

interface IFulfillmentCentersProps {
  store: IStore;
}
interface IStore {
  _id?: string;
  name?: string;
  image?: string;
  brand?: string;
  isFullFill?: boolean;
}
const FulfillmentCenters: React.FC<IFulfillmentCentersProps> = ({ store }) => {
  return (
    <FulfillmentCentersContainer>
      <Tab
        titles={["Order fullfillment centers"]}
        content={[<FormUpdate store={store} />]}
      />
    </FulfillmentCentersContainer>
  );
};

export default FulfillmentCenters;

interface IFormUpdateProps {
  store: IStore;
}
interface IFormValue {
  name?: string;
  brand?: string;
}
const FormUpdate: React.FC<IFormUpdateProps> = ({ store }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (Object?.keys(store).length > 0) {
      setIsChecked(store?.isFullFill!);
    }
  }, [store]);

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    //submit
    console.log("checked", isChecked);
    event.preventDefault();
  };
  return (
    <>
      <Checkbox
        initialCheck={isChecked}
        onChange={isCheck => setIsChecked(isCheck)}
        label="Fullfill my orrders at a backup facillity"
        className="mb-2.5"
      />
      <Container>
        <SVG name="settings/earth" width="28px" height="28px" />
        <Text>
          To better manage unecpectedly high order volumes, we might fullfill
          some orders in backup facilities of our partners. We’ve made sure the
          quality, production, and speed are up to our standards
        </Text>
      </Container>
      <Button onClick={handleSubmit} type="button" size="lg">
        Save
      </Button>
    </>
  );
};
