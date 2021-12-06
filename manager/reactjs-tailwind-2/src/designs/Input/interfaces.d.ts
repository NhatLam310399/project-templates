import { StandardTextFieldProps } from "@material-ui/core";

export type IValidateProperty = {
  errorMessage: string;
};

export interface IValidate {
  required?: IValidateProperty;
  isNumber?: IValidateProperty;
  isFloat?: IValidateProperty;
  isEmail?: IValidateProperty;
  phoneNumber?: IValidateProperty;
  matchRegexp?: IValidateProperty & {
    regexp: string;
  };
  min?: IValidateProperty & {
    min: number;
  };
  max?: IValidateProperty & {
    max: number;
  };
}

export interface IInputProps extends Omit<StandardTextFieldProps, "onChange"> {
  placeholder?: string;
  className?: string;
  name: string;
  label?: string;
  disabled?: boolean;
  initValue?: string | number;
  validates?: IValidate;
  readonly label?: "";
  onChange?: (value: string) => void;
}
