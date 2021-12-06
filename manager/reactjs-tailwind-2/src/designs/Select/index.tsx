import { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import SelectMaterial from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { TextValidator } from "react-material-ui-form-validator";
import { randomId } from "common/functions";
import { InputLabel } from "@material-ui/core";
import { useFormStyles } from "common/styles/muiStyles/useStyles";
import ErrorMessage from "components/ErrorMessage";
import { ISelectInputProps, IValidatorProps } from "./interfaces";

const Select = <T,>(props: ISelectInputProps<T> & IValidatorProps) => {
  const {
    title = "",
    placeholder,
    value = "",
    className = "",
    options = [],
    onSelectOption,
    disabled,
    useFloatTitle = false,
    optionDisplayTarget = "name",
    required = false,
    errorMessage = "This field is required!",
  } = props;
  const validators = required ? ["required"] : [];
  const classes = useFormStyles({ showLabel: useFloatTitle });
  const [id] = useState<string>(randomId());
  const [isError, setIsError] = useState(false);

  const handleValidate = (isValid: boolean) => {
    if (isValid) {
      isError && setIsError(false);
    } else {
      !isError && setIsError(true);
    }
  };
  return (
    <div className={`select-custom w-full ${className} ${classes.root}`}>
      {!useFloatTitle && (
        <p className="mb-0.5 text-lg font-semibold">
          {title} <span className="text-error">{required && "*"}</span>
        </p>
      )}
      <FormControl
        variant="outlined"
        className="w-full"
        error={isError}
        disabled={disabled}
      >
        <InputLabel id={id}>{placeholder || title}</InputLabel>
        <SelectMaterial
          className="w-full bg-white "
          labelId={id}
          label={useFloatTitle ? title : undefined}
          id={id}
          value={value}
          inputProps={{
            name: id,
            value,
            // "aria-label": "Without label",
          }}
          error={isError}
        >
          {options.map((option, index) => {
            const handleClick = () => {
              onSelectOption && onSelectOption(option);
            };
            return (
              <MenuItem
                value={(option as any)?.[optionDisplayTarget]}
                onClick={handleClick}
                key={String(index)}
              >
                {(option as any)?.[optionDisplayTarget]}
              </MenuItem>
            );
          })}
        </SelectMaterial>
      </FormControl>
      {required && (
        <TextValidator
          value={value}
          name={id}
          validators={validators}
          errorMessages={[errorMessage]}
          className={classes.inputFieldHidden}
          validatorListener={handleValidate}
          FormHelperTextProps={{ component: ErrorMessage }}
        />
      )}
    </div>
  );
};

export default Select;
