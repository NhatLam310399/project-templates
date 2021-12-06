import { IValidatorForm } from "common/typings";

export type IOption = {
  /**
   * @param {String} name - This will display in option
   */
  name?: string;
  [key: string]: any;
};

export type IAutocompleteProps = {
  disabled?: boolean;
  title?: string;
  readonly label?: undefined;
  slim?: boolean;
  optionSelected: IOption | null | undefined;
  className?: string;
  placeholder?: string;
  options: IOption[];
  useFloatTitle?: boolean;
  onSelectOption: <T>(option: IOption & T) => void;
} & (
  | {
      required: true;
      errorMessage: string;
    }
  | {
      required?: false;
      errorMessage?: string;
    }
);
