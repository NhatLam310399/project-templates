import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";

import {
  PackingSlipContainer,
  Button,
  Text,
  ContainerUploadImage,
  Label,
  Form,
  ButtonUploadImage,
  RequireTextArea,
} from "./styles";
import SingleImageUploader from "components/SingleImageUploader";
import { isEmail, isPhoneNumber } from "common/functions";

import GroupRadioButton, { IOptions } from "designs/GroupRadioButton";
import Input from "designs/Input";
import Checkbox from "designs/Checkbox";
import Tab from "designs/Tabs";
import TextArea from "designs/TextArea";

interface IPackingSlipProps {
  store: IStore;
}
interface IStore {
  _id?: string;
  name?: string;
  image?: string;
  email?: string;
  isShowEmail?: boolean;
  phoneNumber?: string;
  description?: string;
  customMessage?: string;
}
const PackingSlip: React.FC<IPackingSlipProps> = ({ store }) => {
  return (
    <PackingSlipContainer>
      <Tab titles={["Packing Slip"]} content={[<FormUpdate store={store} />]} />
    </PackingSlipContainer>
  );
};

export default PackingSlip;

interface IFormUpdateProps {
  store: IStore;
}
interface IFormValue {
  email?: string;
  phoneNumber?: string;
  description?: string;
}
const FormUpdate: React.FC<IFormUpdateProps> = ({ store }) => {
  const [isShowEmail, setIsShowEmail] = useState(false);
  const [customMessage, setCustomMessage] = useState<IOptions>(radioGroups[0]);
  const [imageFile, setImageFile] = useState<File>();
  const [initialState, setInitialState] = useState<IFormValue>({});
  useEffect(() => {
    if (Object?.keys(store).length > 0) {
      setInitialState({
        description: store?.description,
        email: store?.email,
        phoneNumber: store?.phoneNumber,
      });
      radioGroups.map(custom => {
        if (custom?._id === store?.customMessage) {
          setCustomMessage(custom);
        }
      });
      setIsShowEmail(store?.isShowEmail || false);
    }
  }, [store]);

  const validateSchema = yup
    .object()
    .shape<{ [key in keyof IFormValue]: any }>({
      email: yup
        .string()
        .test("email", "Email address is not valid !", value =>
          isEmail(value || ""),
        ),
      phoneNumber: yup
        .string()
        .test("phone", "Phone number is not valid", value =>
          isPhoneNumber(String(value)),
        ),
      description: yup
        .string()
        .test(
          "description",
          "Maximum characters < 300",
          value => value?.length! < 300,
        ),
    });
  const handleSubmit = (values: IFormValue) => {
    console.log("submit", values);
    console.log("show email", isShowEmail);
    console.log("customMessage", customMessage?._id);
  };
  return (
    <>
      <Text>
        Cuztomize your packing slips by adding optional features like your logo,
        store’s contact info, and a short message. Even if you don’t personalize
        your packing steps, there won’t be any Kingify branding on the
        packaging.
      </Text>
      <Text>
        Orders routed to backup facilities and partner fullfillment centers
        won’t have cuztomized packing slips.
      </Text>
      <Formik
        enableReinitialize={true}
        initialValues={initialState}
        onSubmit={handleSubmit}
        validationSchema={validateSchema}
      >
        <Form method="post">
          <ContainerUploadImage>
            <Label>Logo</Label>
            <ButtonUploadImage type="button" size="lg">
              Select image to upload
            </ButtonUploadImage>
            <Text>
              Add a 3” x 2” black and white logo that we’ll print on your
              packing slips
            </Text>
          </ContainerUploadImage>
          <Input
            name="email"
            placeholder="Enter service email"
            label="Your store’s customer service email"
            className="mb-2.5"
          />
          <Checkbox
            primary
            initialCheck={isShowEmail}
            onChange={isCheck => setIsShowEmail(isCheck)}
            label="Show this email on the order tracking page (see below)"
            className="mb-2.5"
          />
          <Input
            name="phoneNumber"
            label="Your store’s customer service phone number"
            className="mb-2.5"
            placeholder="Enter service phoneNumber"
          />
          <GroupRadioButton
            label="Custom packing slip message"
            innerClassName="flex flex-col phone:flex-row gap-2"
            options={radioGroups}
            optionSelected={customMessage}
            onChange={option => setCustomMessage(option)}
            className="mb-2.5"
          />
          <TextArea
            name="description"
            label="You can say thanks, give a discount code, or encourage sharing on socail media"
          />
          <RequireTextArea>0/300 characters</RequireTextArea>
          <Button type="submit" size="lg">
            Save
          </Button>
        </Form>
      </Formik>
    </>
  );
};
const radioGroups: IOptions[] = [
  {
    _id: "Personalized",
    label: "Personalized message",
  },
  {
    _id: "Sustainablility",
    label: "Sustainablility message",
  },
];
