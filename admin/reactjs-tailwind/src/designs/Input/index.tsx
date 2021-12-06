import React, { useState, useEffect } from "react";
import { TextValidator } from "react-material-ui-form-validator";
import { StandardTextFieldProps } from "@material-ui/core/TextField";
import { randomId } from "common/functions";
import ErrorMessage from "components/ErrorMessage";
import { useFormStyles } from "common/styles/muiStyles/useStyles";

type IValidateProperty = {
  errorMessage: string;
};

interface IValidate {
  required?: IValidateProperty;
  isEmail?: IValidateProperty;
  isNumber?: IValidateProperty;
  isFloat?: IValidateProperty;
  matchRegexp?: IValidateProperty & {
    regexp: string;
  };
  minNumber?: IValidateProperty & {
    min?: number;
  };
  maxNumber?: IValidateProperty & {
    max?: number;
  };
}

interface IInputProps extends Omit<StandardTextFieldProps, "onChange"> {
  label: string;
  name: string;
  initValue: string | number | undefined;
  errorText?: string;
  valueRef?: React.MutableRefObject<string>;
  validates?: IValidate;
  onChange?: (value: string) => void;
}

const Input: React.FC<IInputProps> = props => {
  const {
    className = "",
    label,
    name,
    initValue = "",
    errorText = "",
    validates,
    disabled,
    onChange,
    valueRef,
    ...rest
  } = props;
  const classes = useFormStyles({});

  const [text, setText] = useState<string | number>("");
  const [id, setId] = useState(randomId());
  const { validators, errorMessages } =
    renderValidatorsAndErrorMessages(validates);
  useEffect(() => {
    if (initValue) {
      setText(String(initValue));
    } else {
      setText("");
    }
  }, [initValue]);

  const handleChange = (e: any) => {
    const newValue = e.target?.value || "";
    onChange && onChange(newValue);
    setText(newValue);
  };

  return (
    <div className={`text-validator-wrapper ${className} ${classes.root}`}>
      {label && (
        <div className="block mb-0.5 text-lg font-medium leading-none ">
          {label}
          {validates?.required && <span className="text-error">*</span>}
        </div>
      )}
      <TextValidator
        style={{
          width: "100%",
          backgroundColor: "white",
        }}
        name={name}
        value={text}
        autoComplete="off"
        onChange={handleChange}
        id={id}
        key={id}
        variant="outlined"
        FormHelperTextProps={{ component: ErrorMessage }}
        helperText={errorText}
        validators={disabled ? undefined : validators}
        errorMessages={errorMessages}
        disabled={disabled}
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
    case "minNumber":
      return `minNumber:${properties.min}`;
    case "maxNumber":
      return `maxNumber:${properties.max}`;
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
