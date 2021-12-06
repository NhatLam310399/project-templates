import React, { useState, useMemo, useEffect } from "react";
import { TextValidator } from "react-material-ui-form-validator";
import { useFormStyles } from "common/styles/muiStyles/useStyles";
import ErrorMessage from "components/ErrorMessage";
import { IInputProps, IValidate } from "./interfaces";

const Input: React.FC<IInputProps> = props => {
  const {
    className = "",
    name,
    initValue = "",
    label = "",
    validates,
    disabled = false,
    onChange,
    placeholder,
    ...rest
  } = props;
  const [text, setText] = useState("");
  const classes = useFormStyles({});
  const { validators, errorMessages } = useMemo(
    () => renderValidatorsAndErrorMessages(validates),
    [validates],
  );

  useEffect(() => {
    if (initValue) {
      setText(String(initValue));
    } else {
      setText("");
    }
  }, [initValue]);

  const handleChange = (event: any) => {
    const currentValue = event.target?.value || "";
    onChange && onChange(currentValue);
    setText(currentValue);
  };

  return (
    <div
      className={`text-validator-wrapper relative input-custom ${className}`}
    >
      <p className="mb-0.5 text-lg font-semibold">
        {label} <span className="text-error">{validates?.required && "*"}</span>
      </p>
      <TextValidator
        style={{
          width: "100%",
        }}
        className={classes.root}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
        id="outlined-basic"
        variant="outlined"
        validators={disabled ? undefined : validators}
        FormHelperTextProps={{ component: ErrorMessage }}
        errorMessages={errorMessages}
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
    case "min":
      return `minNumber:${properties.min}`;
    case "max":
      return `maxNumber:${properties.max}`;
    default:
      return type;
  }
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
