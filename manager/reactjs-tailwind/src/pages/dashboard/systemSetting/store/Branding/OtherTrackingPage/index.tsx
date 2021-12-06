import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";

import { Message } from "yup/lib/types";
import SocialMediaAccount from "./SocialMediaAccount";
import CustomCTA from "./CustomCTA";
import LanguagePreferences from "./LanguagePreferences";
import {
  OtherTrackingPageContainer,
  Button,
  Text,
  ContainerUploadImage,
  Label,
  Form,
  ButtonUploadImage,
  RequireTextArea,
  Line,
  Title,
} from "./styles";
import SingleImageUploader from "components/SingleImageUploader";
import { isEmail, isPhoneNumber } from "common/functions";

import Input from "designs/Input";
import Tab from "designs/Tabs";

interface IOtherTrackingPageProps {
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
  textButtons?: string[];
}
const OtherTrackingPage: React.FC<IOtherTrackingPageProps> = ({ store }) => {
  return (
    <OtherTrackingPageContainer>
      <Tab
        titles={["Other tracking page"]}
        content={[<FormUpdate store={store} />]}
      />
    </OtherTrackingPageContainer>
  );
};

export default OtherTrackingPage;

interface IFormUpdateProps {
  store: IStore;
}
export interface IFormValue {
  email?: string;
  phoneNumber?: string;
  description?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
  snapchat?: string;
  isAutoLang?: boolean;
  language?: string;
  textButtons?: string[];
  linkPage?: string;
}
interface IButtonText {
  value: string;
}
const FormUpdate: React.FC<IFormUpdateProps> = ({ store }) => {
  const [isShowEmail, setIsShowEmail] = useState(false);
  const [imageFile, setImageFile] = useState<File>();
  const [initialState, setInitialState] = useState<IFormValue>({});
  useEffect(() => {
    if (Object?.keys(store).length > 0) {
      setInitialState({
        textButtons: store.textButtons,
        email: store?.email,
      });
      //add state in here
    }
  }, [store]);
  console.log("initialState button", initialState);
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
      textButtons: yup
        .array()
        .of(
          yup
            .string()
            .test(
              "button text",
              "Maximum characters < 15",
              text => text?.length! < 15,
            ),
        ),
    });
  const handleSubmit = (values: IFormValue) => {
    console.log("submit", values);
  };
  const handleChangeLanguage = (lang: string, isAuto: boolean) => {
    setInitialState({ ...initialState, isAutoLang: isAuto, language: lang });
  };
  return (
    <>
      <Text>
        Customize your store’s order tracing page with optional features like a
        color logo, store’s contact email, social media accounts, and
        call-to-action buttons. You can also adjust the page’s language
        settings.
      </Text>
      <Text>
        Even if you don’t personalize the tracking page, there won’t be any
        Kingify branding.
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
              Add a color logo with a minimun size of 800 * 500 px that will be
              displayed in the upper right corner of your order tracking page
            </Text>
          </ContainerUploadImage>
          <Input
            disabled={true}
            name="email"
            placeholder="Enter service email"
            label="Your store’s customer service email"
          />
          <Line />
          <Title>Social media account</Title>
          <SocialMediaAccount />

          <Line />
          <Title>Custom call-to-action (CTA) button</Title>
          <CustomCTA textButtons={initialState?.textButtons || []} />

          <Line />
          <Title>Tracking page language preferences</Title>
          <LanguagePreferences
            isAutoDetectLanguage={initialState?.isAutoLang!}
            language={initialState?.language!}
            onSubmit={handleChangeLanguage}
          />
          <Button type="submit" size="lg">
            Save
          </Button>
        </Form>
      </Formik>
    </>
  );
};
