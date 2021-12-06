import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import { FormikErrors, FormikTouched } from "formik";

import { SVG } from "@designs/SVG";
import {
  customStyles,
  Container,
  Label,
  Required,
  Error,
  MenuListWrapper,
  LimitSelected,
} from "./styles";
import { useTranslation } from "next-i18next";

export interface IGroupSelectProps {
  label?: string;
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[];
  required?: boolean;
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  initValue?: any;
  limit?: number;
  onChangeSelect: (value: any) => void;
  ref?: any;
  id?: string;
  isMulti?: boolean;
  placeholder?: string;
  onBlurInput?: any;
  optionLabel?: string;
  optionValue?: string;
  groupLabel?: any[];
  groupOption?: any[];
}

const GroupSelect: React.FC<IGroupSelectProps> = (props) => {
  const {
    label,
    touched,
    required,
    error,
    limit = 0,
    onChangeSelect,
    placeholder = "",
    id,
    isMulti,
    initValue,
    onBlurInput,
    optionLabel = "name",
    optionValue = "_id",
    groupLabel,
    groupOption,
    ...restProps
  } = props;

  const { t } = useTranslation(["common"]);

  const options = groupLabel.map((value) =>
    Object.assign(
      {},
      {
        label: value?.name,
        options: groupOption.filter(
          (item) => item?.categoryLevel1?._id === value?._id,
        ),
      },
    ),
  );

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

  const MenuList = (props: any) => {
    return (
      <components.MenuList {...props}>
        <MenuListWrapper>{props.children}</MenuListWrapper>
      </components.MenuList>
    );
  };

  const Menu = (props: any) => {
    const optionSelectedLength = props.getValue().length || 0;
    return (
      <components.Menu {...props}>
        {optionSelectedLength < limit ? (
          props.children
        ) : (
          <LimitSelected>{`${t("selected-limit")} ${optionSelectedLength} ${t(
            "careers",
          )}`}</LimitSelected>
        )}
      </components.Menu>
    );
  };

  return (
    <>
      <Container>
        {label ? (
          <Label>
            {label}
            {required && <Required>(*)</Required>}
          </Label>
        ) : null}
        <Select
          error={isError}
          styles={customStyles}
          id={id}
          options={options}
          placeholder={placeholder}
          isMulti={isMulti}
          onChange={handleChange}
          defaultValue={initValue}
          getOptionLabel={(x: any) => x[optionLabel]}
          getOptionValue={(x: any) => x[optionValue]}
          components={{ MenuList, Menu }}
          {...(restProps as any)}
        />
      </Container>
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
    </>
  );
};

export default GroupSelect;
