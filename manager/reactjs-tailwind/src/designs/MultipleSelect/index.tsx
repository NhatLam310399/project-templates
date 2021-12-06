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
} from "./styles";
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

interface IMultipleSelectProps<T> {
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
}

const MultipleSelect = <T,>(props: IMultipleSelectProps<T>) => {
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
  } = props;
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const isError = Boolean(!!meta.error && !!meta.touched);
  const [displayOptions, setDisplayOptions] = useState<T[]>(options);

  useEffect(() => {
    setDisplayOptions(options);
    removeAllOptionSelectedOutOfListOptions();
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
    removeAllOptionSelectedOutOfListOptions();
  }, [listOptionsSelected]);

  const handleSelect = (option: T) => {
    onSelect && onSelect([...listOptionsSelected, option]);
  };

  const removeAllOptionSelectedOutOfListOptions = () => {
    if (!listOptionsSelected?.length) return;
    const filteredOptions = displayOptions.filter(option => {
      if (
        listOptionsSelected.find(
          item =>
            (item as any)?.[optionTarget] === (option as any)?.[optionTarget],
        )
      )
        return false;
      return true;
    });
    setDisplayOptions(filteredOptions);
  };

  const removeItem = (removedItem: T) => {
    if (!listOptionsSelected?.length) return;
    const newListOptionsSelected = listOptionsSelected.filter(
      item =>
        (item as any)?.[optionTarget] !== (removedItem as any)?.[optionTarget],
    );
    setDisplayOptions([...displayOptions, removedItem]);
    onSelect && onSelect(newListOptionsSelected);
  };

  return (
    <MultipleSelectContainer className={className}>
      <FormControlLabel isError={isError} required={required}>
        {label}
      </FormControlLabel>
      <div>
        <Listbox
          value={listOptionsSelected}
          onChange={handleSelect as any}
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
                        <RemoveIcon
                          onClick={e => {
                            e.stopPropagation();
                            removeItem(option);
                          }}
                        />
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
                {displayOptions.map((option: any, index) => (
                  <Listbox.Option key={index} value={option}>
                    {({ selected, active }) => (
                      <MenuItem active={active || selected}>
                        {option?.[optionTarget]}
                      </MenuItem>
                    )}
                  </Listbox.Option>
                ))}
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

export default MultipleSelect;

const RemoveIcon: React.FC<IIconSVGProps> = props => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.32166 6.0001L11.8083 1.51327C11.9317 1.38976 11.9998 1.22498 12 1.04927C12 0.873464 11.9319 0.708488 11.8083 0.585171L11.4151 0.192098C11.2915 0.0682932 11.1267 0.000488281 10.9508 0.000488281C10.7752 0.000488281 10.6104 0.0682932 10.4868 0.192098L6.00019 4.67863L1.51337 0.192098C1.38995 0.0682932 1.22507 0.000488281 1.04927 0.000488281C0.873659 0.000488281 0.70878 0.0682932 0.585366 0.192098L0.192 0.585171C-0.064 0.841171 -0.064 1.25756 0.192 1.51327L4.67873 6.0001L0.192 10.4867C0.0684878 10.6104 0.000487805 10.7752 0.000487805 10.9509C0.000487805 11.1266 0.0684878 11.2914 0.192 11.415L0.585268 11.8081C0.708683 11.9318 0.873658 11.9997 1.04917 11.9997C1.22498 11.9997 1.38985 11.9318 1.51327 11.8081L6.0001 7.32146L10.4867 11.8081C10.6103 11.9318 10.7751 11.9997 10.9507 11.9997H10.9509C11.1266 11.9997 11.2914 11.9318 11.415 11.8081L11.8082 11.415C11.9316 11.2915 11.9997 11.1266 11.9997 10.9509C11.9997 10.7752 11.9316 10.6104 11.8082 10.4868L7.32166 6.0001Z"
        fill="white"
      />
    </svg>
  );
};
