import React, { useState } from "react";
import AutocompleteUI from "@material-ui/lab/Autocomplete";
import FormControl from "@material-ui/core/FormControl";
import { TextValidator } from "react-material-ui-form-validator";
import { randomId } from "common/functions";
import { TextField } from "@material-ui/core";
import { useFormStyles } from "common/styles/muiStyles/useStyles";
import ErrorMessage from "components/ErrorMessage";
import { IAutocompleteProps } from "./interfaces";

const Autocomplete: React.FC<IAutocompleteProps> = props => {
  const {
    title = "",
    optionSelected,
    className = "",
    options = [],
    required = false,
    onSelectOption,
    disabled,
    errorMessage = "This field is required!",
    useFloatTitle = false,
  } = props;
  const validators = required ? ["required"] : [];

  const classes = useFormStyles({});
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
    <div className={`select-custom w-full ${className}`}>
      {!useFloatTitle && (
        <p className="mb-0.5 text-lg font-medium">
          {title} <span className="text-error">{required && "*"}</span>
        </p>
      )}
      <FormControl
        fullWidth
        variant="outlined"
        className={classes.root}
        error={isError}
        disabled={disabled}
      >
        <AutocompleteUI
          className="w-full bg-white"
          id={id}
          value={optionSelected}
          getOptionLabel={option => option?.name || ""}
          options={options}
          onChange={(_, newValue) => {
            onSelectOption && onSelectOption(newValue);
          }}
          renderInput={params => (
            <TextField
              {...params}
              required={optionSelected?.name?.length === 0}
              label={useFloatTitle ? title : ""}
              variant="outlined"
              error={isError}
            />
          )}
        />
        {isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </FormControl>
      {required && (
        <TextValidator
          value={optionSelected?.name}
          name={id}
          validators={validators}
          errorMessages={[errorMessage]}
          className={classes.inputFieldHidden}
          validatorListener={handleValidate}
        />
      )}
    </div>
  );
};

export default Autocomplete;
