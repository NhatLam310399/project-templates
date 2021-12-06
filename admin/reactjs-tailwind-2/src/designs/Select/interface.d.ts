export type IOption = {
    /**
     * @param {String} name - This will display in option
     */
    name?: string;
    [key: string]: any;
};

export type ISelectInputProps = {
    disabled?: boolean;
    label?: string | undefined;
    icon?: string | undefined;
    value: string | string[] | undefined;
    multiple?: boolean;
    className?: string;
    placeholder?: string;
    options: IOption[];
    onSelectOption: <T>(option: IOption & T) => void;
    isSelectImage?: boolean;
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
