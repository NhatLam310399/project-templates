import { useEffect, useState } from "react";

import { Container, Label, Required, Icon, Input, Error } from "./styles";
import { SVG } from "@designs/SVG";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChangeValue?: (e: string) => void;
  classNameInput?: string;
  error?: string;
  touched?: boolean;
  ref?: React.MutableRefObject<string>;
  icon?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
}

const InputBox: React.FC<IInputProps> = (props) => {
  const {
    className = "",
    classNameInput = "",
    error,
    touched,
    icon,
    ref,
    onChangeValue,
    onChange,
    disabled = false,
    label = "",
    placeholder = "",
    required,
    value,
    ...restProps
  } = props;

  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (touched && error) {
      !isError && setIsError(true);
    } else {
      isError && setIsError(false);
    }
  }, [touched, error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onChangeValue && onChangeValue(e.target.value);
  };
  return (
    <Container className={className}>
      {label && (
        <Label>
          {label}
          {required ? <Required>(*)</Required> : null}
        </Label>
      )}
      {icon && (
        <Icon>
          <SVG name={icon} className="fill-current text-primary" width="20" />
        </Icon>
      )}
      <Input
        className={classNameInput}
        error={isError}
        icon={!!icon}
        disabled={disabled}
        ref={ref}
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
        {...(restProps as any)}
      />
      {error && touched && (
        <Error>
          <SVG
            name="common/error"
            width={16}
            height={16}
            className="mr-0.5 inline-block"
          />
          {error}
        </Error>
      )}
    </Container>
  );
};

export default InputBox;
