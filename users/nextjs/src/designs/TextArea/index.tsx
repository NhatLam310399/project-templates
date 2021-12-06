import { useEffect, useState } from "react";

import { SVG } from "@designs/SVG";
import {
  Container,
  TextArea as TextAreaStyled,
  Label,
  Required,
  Error,
} from "./styles";

interface ITextAreaProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChangeValue?: (e: string) => void;
  classNameInput?: string;
  error?: string;
  ref?: any;
  rows?: number;
  label?: string;
  required?: boolean;
  touched?: boolean;
  placeholder?: string;
}

const TextArea: React.FC<ITextAreaProps> = (props) => {
  const {
    className = "",
    classNameInput = "",
    error,
    ref,
    rows = 4,
    onChangeValue,
    onChange,
    label = "",
    required,
    touched,
    placeholder,
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

  const handleChange = (e: any) => {
    onChange?.(e);
    onChangeValue && onChangeValue(e.target.value);
  };

  return (
    <Container className={className}>
      {label && (
        <Label>
          {label}
          {required && <Required>(*)</Required>}
        </Label>
      )}
      <TextAreaStyled
        className={classNameInput}
        error={isError}
        rows={rows}
        ref={ref}
        onChange={handleChange}
        placeholder={placeholder}
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

export default TextArea;
