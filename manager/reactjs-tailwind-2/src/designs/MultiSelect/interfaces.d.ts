export type IOption = Record<any, any>;

export type IMultiSelectInputProps = {
  disabled?: boolean;
  title?: string;
  label?: string | undefined;
  slim?: boolean;
  className?: string;
  placeholder?: string;
  initValue?: IOption[];
  enableAll?: boolean;
  useFloatTitle?: boolean;
  options: IOption[];
  onSelectOption: (options: IOption[]) => void;
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
