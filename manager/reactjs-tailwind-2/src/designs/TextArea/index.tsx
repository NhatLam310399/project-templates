import React, { useState, useMemo } from "react";
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
  matchRegexp?: IValidateProperty & {
    regexp: string;
  };
}

interface ITextArea extends Omit<StandardTextFieldProps, "onChange"> {
  placeholder?: string;
  name?: string;
  label?: string;
  initValue?: string | number;
  validates?: IValidate;
  onChange?: (value: string) => void;
}

const TextArea: React.FC<ITextArea> = props => {
  const {
    className = "",
    label: title = "",
    name,
    initValue,
    placeholder = "",
    validates,
    onChange,
    ...rest
  } = props;
  const classes = useFormStyles({});

  const [text, setText] = useState(initValue || "");
  const [id, setId] = useState(name || randomId());

  const { validators, errorMessages } = useMemo(
    () => renderValidatorsAndErrorMessages(validates),
    [],
  );
  const handleChange = (event: any) => {
    const currentValue = event.target?.value || "";
    onChange && onChange(currentValue);
    setText(currentValue);
  };

  return (
    <div className={`text-validator-wrapper ${className}`}>
      <p className="mb-0.5 text-lg font-medium">
        {title} <span className="text-error">{validates?.required && "*"}</span>
      </p>
      <TextValidator
        style={{
          width: "100%",
          background: "white",
        }}
        name={id}
        multiline
        placeholder={placeholder}
        rows={6}
        rowsMax={8}
        value={text || initValue}
        onChange={handleChange}
        id="outlined-multiline-static"
        variant="outlined"
        validators={validators}
        FormHelperTextProps={{ component: ErrorMessage }}
        errorMessages={errorMessages}
        {...(rest as any)}
      />
    </div>
  );
};

export default TextArea;

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
