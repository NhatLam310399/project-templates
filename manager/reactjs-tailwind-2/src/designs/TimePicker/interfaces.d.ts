export type ITimePickerProps = {
  time: Date | null | undefined;
  label?: string | undefined;
  title?: string | undefined;
  disabled?: boolean;
  className?: string;
  time?: string;
  useFloatTitle?: boolean;
  onChange?: (newDate: Date | null) => void;
  timeRef?: MutableRefObject<Date | null | undefined>;
} & (
  | {
      required: true;
      errorMessage?: string;
    }
  | {
      required?: false;
      errorMessage?: string;
    }
);
