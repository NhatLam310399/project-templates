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
    optionSelected?: IOption;
    className?: string;
    placeholder?: string;
    options: IOption[];
    useFloatTitle?: boolean;
    disableClearable?: boolean;
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
