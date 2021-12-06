/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo, useEffect } from "react";
import { TextValidator } from "react-material-ui-form-validator";
import { StandardTextFieldProps } from "@material-ui/core/TextField";
import i18n, { t } from "language";
import { useStyles } from "./styles";

type IValidateProperty = {
    errorMessage: string;
};

interface IValidate {
    required?: IValidateProperty;
    isEmail?: IValidateProperty;
    isNumber?: IValidateProperty;
    matchRegexp?: IValidateProperty & {
        regexp: string;
    };
    minmax?: IValidateProperty & {
        min?: number;
        max?: number;
    };
}

interface IInputProps extends Omit<StandardTextFieldProps, "onChange"> {
    label?: string;
    name?: string;
    value?: string | string[] | number | undefined;
    validates?: IValidate;
    placeholder?: string;
    onChange?: (value: string, name?: string) => void;
    helpInputText?: string;
}

const Input: React.FC<IInputProps> = props => {
    const {
        className = "",
        label = "",
        name,
        value = "",
        validates,
        placeholder = "",
        onChange,
        helpInputText = "",
        ...rest
    } = props;
    const [text, setText] = useState(value);

    const { validators, errorMessages } = useMemo(
        () => renderValidatorsAndErrorMessages(validates),
        [i18n.language],
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setText(newValue);
        if (name) {
            onChange && onChange(newValue, name);
        } else {
            onChange && onChange(newValue);
        }
    };

    useEffect(() => {
        if (value) {
            setText(value);
        } else {
            setText("");
        }
    }, [value]);

    const classes = useStyles();

    return (
        <div className={`text-validator-wrapper  ${classes.root} ${className}`}>
            {label && (
                <p className="text-lg font-medium flex items-center mb-0.5">
                    {label}
                    {validates?.required && (
                        <span className="text-error">*</span>
                    )}
                    {helpInputText && (
                        <span className="text-sm text-body ml-0.5 ">
                            {helpInputText}
                        </span>
                    )}
                </p>
            )}

            <TextValidator
                autoComplete="off"
                style={{
                    width: "100%",
                }}
                name={name}
                value={text}
                onChange={handleChange}
                variant="outlined"
                validators={validators}
                errorMessages={errorMessages}
                placeholder={placeholder}
                {...(rest as any)}
            />
        </div>
    );
};

export default Input;

const makeValidator = (type: string, properties: any): string => {
    switch (type) {
        case "matchRegexp":
            return `matchRegexp:${properties.regexp}`;
        default:
            break;
    }
    return type;
};

const renderValidatorsAndErrorMessages = (validates: IValidate | undefined) => {
    const validators: string[] = [];
    const errorMessages: string[] = [];

    if (!validates) return {};

    for (const key in validates) {
        validators.push(makeValidator(key, (validates as any)[key]));
        errorMessages.push((validates as any)[key].errorMessage);
    }

    return { validators, errorMessages };
};
