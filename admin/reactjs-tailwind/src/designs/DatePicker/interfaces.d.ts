import { KeyboardDatePickerProps } from "@material-ui/pickers";

export type IValidatorProps =
  | {
      required: true;
      errorMessage: string;
    }
  | {
      required?: false;
      errorMessage?: string;
    };

export type IDatePickerProps = {
  label?: string;
  date: Date | null | undefined;
  onChange?: (newDate: Date | null) => void;
  dateRef?: MutableRefObject<Date | null | undefined>;
  floatTitle?: boolean;
  disable?: boolean;
} & IValidatorProps &
  Omit<KeyboardDatePickerProps, "value" | "label">;
