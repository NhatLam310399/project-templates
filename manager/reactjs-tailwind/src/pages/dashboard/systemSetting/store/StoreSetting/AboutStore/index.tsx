import { Formik } from "formik";
import { useEffect, useState } from "react";

import { AboutStoreContainer, Form, Button } from "./styles";
import Input from "designs/Input";
import Tab from "designs/Tabs";

interface IAboutStoreProps {
  store: IStore;
}
interface IStore {
  _id?: string;
  name?: string;
  image?: string;
  brand?: string;
}
const AboutStore: React.FC<IAboutStoreProps> = ({ store }) => {
  return (
    <AboutStoreContainer>
      <Tab
        titles={["Store default"]}
        content={[<FormUpdate store={store} />]}
      />
    </AboutStoreContainer>
  );
};

export default AboutStore;

interface IFormUpdateProps {
  store: IStore;
}
interface IFormValue {
  name?: string;
  brand?: string;
}
const FormUpdate: React.FC<IFormUpdateProps> = ({ store }) => {
  const [initialsState, setInitialsState] = useState<IFormValue>({});

  useEffect(() => {
    if (Object?.keys(store).length > 0) {
      setInitialsState({
        name: store?.name,
        brand: store?.brand,
      });
    }
  }, [store]);

  const handleSubmit = (values: IFormValue) => {
    if (Object?.keys(values).length === 0) return;
    console.log("submit", values);
  };
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialsState}
        onSubmit={handleSubmit}
      >
        <Form method="post">
          <Input
            name="name"
            label="Store name"
            placeholder="Enter your store name"
          />
          <Input
            className="mt-1"
            name="brand"
            label="Brand"
            placeholder="Enter your brand"
          />
          <Button type="submit" size="lg">
            Save
          </Button>
        </Form>
      </Formik>
    </>
  );
};
