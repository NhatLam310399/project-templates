import { useEffect, Fragment, useRef } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useField, useFormikContext } from "formik";
import {
  SelectContainer,
  HiddenInput,
  MenuButton,
  MenuItem,
  ListboxButton,
  ListboxOptionsContainer,
  Text,
  Placeholder,
  Icon,
} from "./styles";
import FormControlErrorHelper from "common/styles/FormControlErrorHelper";
import FormControlLabel from "common/styles/FormControlLabel";
import SVG from "designs/SVG";
import DropdownArrowIcon from "icons/Arrows/SelectArrow";

interface ISelectProps<T = any> {
  name: string;
  label?: string;
  className?: string;
  optionSelected: T;
  icon?: string;
  options: T[];
  onSelect: (option: T) => void;
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
  required?: boolean;
  renderOption?: (option: T, active: boolean) => JSX.Element;
}

const SelectWithIcon = <T,>(props: ISelectProps<T>) => {
  const {
    name,
    className,
    label,
    icon = "settings/region",
    options = [],
    optionSelected,
    placeholder = "",
    disabled = false,
    formTarget = "_id",
    optionTarget = "name",
    required = false,
    renderOption,
    onSelect,
  } = props;
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const isError = Boolean(!!meta.error && !!meta.touched);

  useEffect(() => {
    setTimeout(() => {
      const newOption = (optionSelected as any)?.[formTarget] || "";
      setFieldValue(name, newOption);
    }, 300);
  }, [optionSelected]);

  const handleSelect = (option: T) => {
    onSelect && onSelect(option);
  };

  return (
    <SelectContainer className={className}>
      <FormControlLabel isError={isError} required={required}>
        {label}
      </FormControlLabel>
      <div>
        <Listbox
          value={optionSelected}
          onChange={handleSelect}
          disabled={disabled}
        >
          <div className={`relative text-neutral-1 ${className}`}>
            <ListboxButton>
              <MenuButton
                className="group"
                isError={isError}
                disabled={disabled}
              >
                <Icon>
                  <SVG name={icon} width="16px" height="16px" />
                </Icon>
                {optionSelected && Object.keys(optionSelected)?.length > 0 ? (
                  <Text>
                    {renderOption
                      ? renderOption(optionSelected, false)
                      : (optionSelected as any)?.[optionTarget]}
                  </Text>
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
                {options?.map((option, index) => (
                  <Listbox.Option key={index} value={option}>
                    {({ selected, active }) => (
                      <MenuItem active={active || selected}>
                        {renderOption
                          ? renderOption(option, active || selected)
                          : (option as any)?.[optionTarget]}
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
    </SelectContainer>
  );
};

export default SelectWithIcon;
