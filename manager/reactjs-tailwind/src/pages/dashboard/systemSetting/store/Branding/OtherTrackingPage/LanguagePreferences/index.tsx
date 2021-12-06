import { useEffect, useState } from "react";
import {
  LanguagePreferencesContainer,
  Label,
  Text,
  AddButton,
  Characters,
  WrapperInputAdd,
  LabelRadioButton,
} from "./styles";
import Input from "designs/Input";
import SVG from "designs/SVG";
import Checkbox from "designs/Checkbox";
import GroupRadioButton, { IOptions } from "designs/GroupRadioButton";

interface ILanguagePreferences {
  isAutoDetectLanguage: boolean;
  language: string;
  onSubmit: (language: string, isAuto: boolean) => void;
}
const LanguagePreferences: React.FC<ILanguagePreferences> = props => {
  const { isAutoDetectLanguage = false, onSubmit, language = "" } = props;
  const [listButtonText, setListButtonText] = useState<any[]>([]);
  const [isAuto, setIsAuto] = useState(false);
  const [languageSelected, setLanguageSelected] = useState<IOptions>(
    languages[0],
  );

  useEffect(() => {
    languages.map(lang => {
      if (lang._id === language) {
        setLanguageSelected(lang);
      }
    });
    setIsAuto(isAutoDetectLanguage);
  }, [language, isAutoDetectLanguage]);
  const handleCheckIsAuto = (isChecked: boolean) => {
    setIsAuto(isChecked);
  };
  const handleChangeLanguage = (option: IOptions) => {
    setLanguageSelected(option);
  };
  return (
    <LanguagePreferencesContainer>
      <Text>
        The order tracking page supports the languages listed below. By default,
        the tracking page auto-detects a customer’s browsing languege. If it’s
        not supported, the pageis shown in English.
      </Text>
      <Text>
        If you want the order tracking page to open in a specific language,
        regardless of your customer’s browsing preferences, uncheck this box and
        select the language below.
      </Text>
      <Checkbox
        label="Automatically detect language and use English as backup."
        initialCheck={isAuto}
        onChange={handleCheckIsAuto}
        className="mb-2.5 mt-1.5"
      />
      <LabelRadioButton>
        Select a language for your order tracking page upon opening:
      </LabelRadioButton>
      <GroupRadioButton
        optionSelected={languageSelected}
        options={languages}
        onChange={handleChangeLanguage}
        innerClassName="grid w-full phone:w-38 gap-2 grid-cols-2"
      />
    </LanguagePreferencesContainer>
  );
};
export default LanguagePreferences;
const languages: IOptions[] = [
  {
    _id: "English",
    label: "English",
  },
  {
    _id: "Français",
    label: "Français",
  },
  {
    _id: "Italiano",
    label: "Italiano",
  },
  {
    _id: "Português",
    label: "Português",
  },
  {
    _id: "Svenska",
    label: "Svenska",
  },
  {
    _id: "Suomi",
    label: "Suomi",
  },
  {
    _id: "Español",
    label: "Español",
  },
  {
    _id: "Deutsch",
    label: "Deutsch",
  },
  {
    _id: "Nederlands",
    label: "Nederlands",
  },
  {
    _id: "Norsk",
    label: "Norsk",
  },
];
