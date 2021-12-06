export interface ISelectInputProps<T> {
  disabled?: boolean;
  label?: string | undefined;
  slim?: boolean;
  value?: string | undefined;
  className?: string;
  placeholder?: string;
  options: T[];
  onSelectOption: (option: T) => void;
  floatTitle?: boolean;
  defaultValue?: string;
  required?: boolean;
  errorMessage?: string;
}
