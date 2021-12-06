/**
 * @name Multiple_Select
 * @return_value_of_formik {String} a string which was joined of all selected option
 * @example
 *  - valueKey = "_id"
 *  - optionSelected = [{_id: "12EQ"}, {_id: "32UI"}, {_id: "7U21"}]
 * --> "12EQ|32UI|7u21"
 */

import { Listbox, Transition } from "@headlessui/react";
import { useField, useFormikContext } from "formik";
import { useEffect, useState, Fragment } from "react";

import {
  MultipleSelectContainer,
  HiddenInput,
  MenuButton,
  MenuItem,
  ListboxButton,
  ListboxOptionsContainer,
  Tag,
  Placeholder,
  TagContainer,
  TagText,
  Option,
} from "./styles";
import CheckBox from "designs/Checkbox";
import { IIconSVGProps } from "typings";
import DropdownArrowIcon from "icons/Arrows/SelectArrow";
import FormControlErrorHelper from "common/styles/FormControlErrorHelper";
import FormControlLabel from "common/styles/FormControlLabel";

export type IOption = {
  /**
   * @param {String} name - This will display in option
   */
  name?: string;
  // Value will be passed to form values
  value?: string;
  [key: string]: any;
};

interface IMultipleCheckBoxSelectProps<T> {
  name: string;
  className?: string;
  listOptionsSelected: T[];
  label: string;
  options: T[];
  onSelect: (option: T[]) => void;
  disabled?: boolean;
  placeholder?: string;
  /**
   * @description targetForm is key of optionSelected. When form is submitted,
   * value of name will be optionSelected[targetForm]
   * @default targetForm = "_id"
   */
  formTarget?: string;
  /**
   * @description optionTarget is key of option which will be displayed in feature
   * @default optionTarget = "name"
   */
  optionTarget?: string;
  splitSign?: string; // ex: splitSign = "|" --> "abc|erf"
  required?: boolean;
  onRenderOption?: (option: T, active: boolean) => JSX.Element;
}

const MultipleCheckBoxSelect = <T,>(props: IMultipleCheckBoxSelectProps<T>) => {
  const {
    name,
    className,
    label,
    options = [],
    listOptionsSelected = [],
    placeholder = "",
    disabled = false,
    formTarget = "_id",
    optionTarget = "name",
    required = false,
    splitSign = "|",
    onSelect,
    onRenderOption,
  } = props;
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const isError = Boolean(!!meta.error && !!meta.touched);
  const [displayOptions, setDisplayOptions] = useState<T[]>([]);

  useEffect(() => {
    if (options?.length > 0) {
      setDisplayOptions(options);
    }
  }, [options]);

  useEffect(() => {
    setTimeout(() => {
      const value = (listOptionsSelected || [])
        .map(item => (item as any)[formTarget])
        .join(splitSign);
      const newOption = value;
      // setFieldValue cannot set immediately after first render
      setFieldValue(name, newOption);
    }, 300);
  }, [listOptionsSelected]);

  const renderOption = (option: any, active: boolean) => {
    const handleChecked = (isCheck: boolean) => {
      if (isCheck) {
        onSelect && onSelect([...listOptionsSelected, option]);
      } else {
        const newListOptionsSelected = listOptionsSelected.filter(
          item =>
            (item as any)?.[optionTarget] !== (option as any)?.[optionTarget],
        );
        onSelect && onSelect(newListOptionsSelected);
      }
    };
    return (
      <Option>
        <CheckBox initialCheck={active} onChange={handleChecked} />
        <TagText>{option?.[optionTarget]}</TagText>
      </Option>
    );
  };

  return (
    <MultipleSelectContainer className={className}>
      <FormControlLabel isError={isError} required={required}>
        {label}
      </FormControlLabel>
      <div>
        <Listbox
          value={listOptionsSelected}
          onChange={() => null}
          disabled={disabled}
        >
          <div className={`relative text-black ${className}`}>
            <ListboxButton>
              <MenuButton isError={isError} disabled={disabled}>
                {listOptionsSelected?.length > 0 ? (
                  <TagContainer>
                    {listOptionsSelected.map((option: any, index) => (
                      <Tag key={index}>
                        <TagText>{option?.[optionTarget]}</TagText>
                      </Tag>
                    ))}
                  </TagContainer>
                ) : (
                  <Placeholder>{placeholder}</Placeholder>
                )}
                <DropdownArrowIcon />
              </MenuButton>
            </ListboxButton>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptionsContainer>
                {displayOptions?.map((option: any, index) => {
                  const active = listOptionsSelected?.includes(option);
                  return (
                    <MenuItem key={String(index)} active={active}>
                      {onRenderOption
                        ? onRenderOption(option, active)
                        : renderOption(option, active)}
                    </MenuItem>
                  );
                })}
              </ListboxOptionsContainer>
            </Transition>
          </div>
        </Listbox>
      </div>
      {isError && <FormControlErrorHelper>{meta.error}</FormControlErrorHelper>}
      <HiddenInput {...field} />
    </MultipleSelectContainer>
  );
};

export default MultipleCheckBoxSelect;
