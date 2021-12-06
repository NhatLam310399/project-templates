import { FormHelperText } from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import { colors } from "common/styles/colors";
import { randomId } from "common/functions";
import SVG from "designs/SVG";

interface IInputWithIconProps {
  type?: "text" | "number";
  className?: string;
  initialValue?: string;
  valueRef?: React.MutableRefObject<string>;
  Icon?: React.ReactNode;
  placeholder?: string | undefined;
  error?: string;
  name?: string;
  label?: string;
  onChange?: (value: string) => void;
  onPressEnter?: (value: string) => void;
}

const InputWithIcon: React.FC<IInputWithIconProps> = props => {
  const {
    type = "text",
    className = "",
    initialValue = "",
    Icon,
    valueRef,
    placeholder = "",
    error = "",
    label = "",
    name = "",
    onChange,
    onPressEnter,
  } = props;
  const [text, setText] = useState(initialValue);
  const [id, setId] = useState(randomId());

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setText(newValue);
    if (valueRef) valueRef.current = newValue;
    onChange && onChange(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onPressEnter && onPressEnter(text);
    }
  };

  return (
    <>
      {label && (
        <span className="flex mb-0.5 font-medium">
          {label}
          <p className="text-error">*</p>
        </span>
      )}
      <label
        htmlFor={id}
        className={`input-container px-1.5 w-full grid grid-cols-auto-1fr items-center border border-line rounded-md focus-within:border-secondary `}
      >
        {Icon && (
          <div className="icon-wrapper px-1 py-0.5 flex items-center justify-center">
            {Icon}
          </div>
        )}
        <input
          id={id}
          className={`w-full text-current h-4.5 py-1 font-lg ${className}`}
          placeholder={placeholder}
          name={name}
          type={type}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </label>

      {error && (
        <FormHelperText
          id="my-helper-text"
          style={{
            color: colors.error,
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            gap: "2px",
          }}
        >
          <SVG name="common/error" width={14} height={14} /> {error}
        </FormHelperText>
      )}
    </>
  );
};

export default InputWithIcon;
