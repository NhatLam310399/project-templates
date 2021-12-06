export type IMultiSelectInputProps = {
    disabled?: boolean;
    title?: string;
    label?: string | undefined;
    slim?: boolean;
    initValue?: IOption[] | undefined;
    className?: string;
    placeholder?: string;
    options: IOption[];
    onSelectOption: <T>([option]: IOption & T) => void;
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
