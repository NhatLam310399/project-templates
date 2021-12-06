import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import { FormikErrors, FormikTouched } from "formik";

import { SVG } from "@designs/SVG";
import {
  customStyles,
  Container,
  SelectWrapper,
  Label,
  Required,
  Error,
  LimitSelected,
} from "./styles";

export interface IValue {
  [x: string]: any;
  _id?: string;
  name?: string;
}

export interface IMultiSelectProps {
  label?: string;
  required?: boolean;
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[];
  options: IValue[];
  initValue?: IValue;
  defaultValue?: IValue;
  onChangeSelect: (value: any) => void;
  ref?: any;
  id?: string;
  instanceId?: string;
  isMulti?: boolean;
  placeholder?: string;
  onBlurInput?: any;
  optionLabel?: string;
  optionValue?: string;
  limit?: number;
  limitText?: string;
}

const MultiSelect: React.FC<IMultiSelectProps> = (props) => {
  const {
    label,
    touched,
    required,
    error,
    onChangeSelect,
    options,
    placeholder = "",
    id,
    instanceId,
    isMulti,
    initValue,
    defaultValue,
    onBlurInput,
    optionLabel = "name",
    optionValue = "_id",
    limit,
    limitText = "",
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

  const handleChange = (value: any) => {
    onChangeSelect && onChangeSelect(value);
  };

  const Menu = (props: any) => {
    const optionSelectedLength = props.getValue().length || 0;
    if (limit) {
      return (
        <components.Menu {...props}>
          {optionSelectedLength < limit ? (
            props.children
          ) : (
            <LimitSelected>{limitText}</LimitSelected>
          )}
        </components.Menu>
      );
    }
    return <components.Menu {...props}>{props.children}</components.Menu>;
  };

  return (
    <Container>
      {label ? (
        <Label>
          {label}
          {required && <Required>(*)</Required>}
        </Label>
      ) : null}
      <SelectWrapper>
        <Select
          error={isError}
          styles={customStyles}
          id={id}
          instanceId={instanceId}
          options={options}
          placeholder={placeholder}
          isMulti={isMulti}
          onChange={handleChange}
          value={initValue}
          defaultValue={defaultValue}
          components={{ Menu }}
          getOptionLabel={(x: any) => x[optionLabel]}
          getOptionValue={(x: any) => x[optionValue]}
          {...(restProps as any)}
        />
      </SelectWrapper>
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

export default MultiSelect;
