import React, { useState, useMemo, useEffect } from "react";
import { TextValidator } from "react-material-ui-form-validator";
import TextField, { BaseTextFieldProps } from "@material-ui/core/TextField";
import { randomId } from "common/functions";
import { t } from "language";
import { FormHelperText } from "@material-ui/core";
import { useStyles } from "./styles";

interface ITextAreaProps extends BaseTextFieldProps {
    label: string;
    name: string;
    value?: string;
    onChange?: (value: string, name?: string) => void;
    required?: boolean;
    errorMessage?: string;
    helpInputText?: string;
    placeholder?: string;
}

const TextArea: React.FC<ITextAreaProps> = props => {
    const {
        className = "",
        label,
        name,
        value = "",
        onChange,
        required,
        helpInputText = "",
        errorMessage = t("common.text-area-placeholder"),
        placeholder = t("common.text-area-placeholder"),
        ...rest
    } = props;
    const validators = required ? ["required"] : [];
    const classes = useStyles();

    const id = randomId();
    const [text, setText] = useState(value);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (value) {
            setText(value);
        } else {
            setText("");
        }
    }, [value]);

    const handleValidate = (isValid: boolean) => {
        if (isValid) {
            isError && setIsError(false);
        } else {
            !isError && setIsError(true);
        }
    };

    const handleChange = (event: any) => {
        const currentValue = event.target?.value || "";
        if (name) {
            onChange && onChange(currentValue, name);
        } else {
            onChange && onChange(currentValue);
        }
        setText(currentValue);
    };

    return (
        <>
            <div className={`text-validator-wrapper ${className}`}>
                {label && (
                    <p className="text-lg font-medium flex items-center mb-0.5">
                        {label}
                        {required && <span className="text-error">*</span>}
                        {helpInputText && (
                            <span className="text-sm text-body ml-0.5 ">
                                {helpInputText}
                            </span>
                        )}
                    </p>
                )}
                <TextField
                    placeholder={placeholder}
                    className="bg-white"
                    id={id}
                    style={{
                        width: "100%",
                    }}
                    multiline
                    rows={8}
                    variant="outlined"
                    name={name}
                    value={text}
                    onChange={handleChange}
                    {...(rest as any)}
                />
                {isError && (
                    <FormHelperText
                        className="font-sfpro"
                        error
                        variant="outlined"
                    >
                        {errorMessage}
                    </FormHelperText>
                )}
            </div>
            {required && (
                <TextValidator
                    value={text}
                    name={id}
                    validators={validators}
                    errorMessages={[errorMessage]}
                    className={`${classes.inputFieldHidden} -z-1`}
                    validatorListener={handleValidate}
                />
            )}
        </>
    );
};

export default TextArea;
