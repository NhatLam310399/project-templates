import React, { PropsWithChildren, useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import SelectMaterial from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { TextValidator } from "react-material-ui-form-validator";
import { randomId } from "common/functions";
import ErrorMessage from "components/ErrorMessage";
import { useFormStyles } from "common/styles/muiStyles/useStyles";
import { ISelectInputProps } from "./interface";

const Select = <T,>(props: PropsWithChildren<ISelectInputProps<T>>) => {
  const {
    label = "",
    value = "",
    className = "",
    options = [],
    required = false,
    onSelectOption,
    disabled,
    errorMessage,
    placeholder,
    defaultValue,
    floatTitle = true,
  } = props;
  const validators = required ? ["required"] : [];

  const classes = useFormStyles({ showLabel: floatTitle });
  const [id, setId] = useState<string>(randomId());
  const [isError, setIsError] = useState(false);

  const handleValidate = (isValid: boolean) => {
    if (isValid) {
      isError && setIsError(false);
    } else {
      !isError && setIsError(true);
    }
  };

  const labelElement = (
    <p>
      {label}
      {required && <span className="text-error">*</span>}
    </p>
  );

  return (
    <div className={`select-custom w-full ${className} ${classes.root} `}>
      {!floatTitle && label && (
        <div className="text-lg font-medium leading-none mb-0.5">
          {labelElement}
        </div>
      )}
      <FormControl
        variant="outlined"
        className="w-full"
        error={isError}
        disabled={disabled}
      >
        <InputLabel id={id}>{placeholder}</InputLabel>
        <SelectMaterial
          className="w-full bg-white"
          id="demo-simple-select-outlined"
          labelId={id}
          label={floatTitle ? label : undefined}
          value={value}
          defaultValue={defaultValue}
          inputProps={{
            name: id,
            value,
          }}
          error={isError}
        >
          {options.map((option, index) => {
            const handleClick = () => {
              onSelectOption && onSelectOption(option);
            };
            const { name = "" } = option as any;
            return (
              <MenuItem value={name} onClick={handleClick} key={String(index)}>
                {name}
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
          validatorListener={handleValidate}
          className={classes.inputFieldHidden}
          FormHelperTextProps={{ component: ErrorMessage }}
        />
      )}
    </div>
  );
};

export default Select;
