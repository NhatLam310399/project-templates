export type IOption = {
  /**
   * @param {String} name - This will display in option
   */
  name?: string;
  [key: string]: any;
};

export type IValidatorProps =
  | {
      required: true;
      errorMessage: string;
    }
  | {
      required?: false;
      errorMessage?: string;
    };

export interface ISelectInputProps<T> {
  disabled?: boolean;
  title?: string;
  readonly label?: undefined;
  slim?: boolean;
  value?: string | undefined;
  className?: string;
  placeholder?: string;
  options: T[];
  useFloatTitle?: boolean;
  optionDisplayTarget?: string;
  onSelectOption: (option: T) => void;
}
