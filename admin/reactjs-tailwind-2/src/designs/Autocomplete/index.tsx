import React, { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControl from "@material-ui/core/FormControl";
import { TextValidator } from "react-material-ui-form-validator";
import { randomId } from "common/functions";
import { FormHelperText, TextField } from "@material-ui/core";
import { t } from "language";
import { IAutocompleteProps, IOption } from "./interfaces";
import { useStyles } from "./styles";

const AutoComplete: React.FC<IAutocompleteProps> = props => {
    const {
        title = "",
        placeholder = "",
        optionSelected,
        className = "",
        options = [],
        required = false,
        onSelectOption,
        disabled,
        errorMessage = "This field is required!",
        useFloatTitle,
        disableClearable = false,
    } = props;
    const validators = required ? ["required"] : [];
    const classes = useStyles();

    const [id] = useState<string>(randomId());
    const [isError, setIsError] = useState(false);

    const handleValidate = (isValid: boolean) => {
        if (isValid) {
            isError && setIsError(false);
        } else {
            !isError && setIsError(true);
        }
    };

    const getValue = () => {
        return optionSelected || {};
    };
    return (
        <div className={`select-custom w-full ${className} ${classes.root}`}>
            {!useFloatTitle && (
                <p className="mb-0.5 text-lg font-medium">
                    {title}{" "}
                    <span className="text-error">{required && "*"}</span>
                </p>
            )}
            <FormControl
                fullWidth
                variant="outlined"
                error={isError}
                disabled={disabled}
            >
                <Autocomplete
                    className="w-full bg-white"
                    id={id}
                    value={getValue()}
                    getOptionLabel={option => option?.name || ""}
                    options={options}
                    onChange={(_, newValue) => {
                        onSelectOption && onSelectOption(newValue);
                    }}
                    disableClearable={disableClearable}
                    openOnFocus
                    renderInput={params => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label={placeholder}
                        />
                    )}
                    noOptionsText={t("common.empty-data")}
                />
                {isError && (
                    <FormHelperText
                        className="text-sm "
                        error
                        variant="outlined"
                    >
                        {errorMessage}
                    </FormHelperText>
                )}
            </FormControl>
            {required && (
                <TextValidator
                    value={optionSelected?.name}
                    name={id}
                    validators={validators}
                    errorMessages={[errorMessage]}
                    className="hidden"
                    validatorListener={handleValidate}
                />
            )}
        </div>
    );
};

export default AutoComplete;
