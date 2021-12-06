import Input from "@designs/Input";
import { SVG } from "@designs/SVG";
import { Listbox, Transition } from "@headlessui/react";
import { useField, useFormikContext } from "formik";
import { useEffect } from "react";
import { Fragment } from "react";
import {
  Container,
  Label,
  HiddenInput,
  ErrorMessage,
  Menu,
  MenuItem,
  ListboxButton,
  ListboxOptionsContainer,
  Text,
  Placeholder,
} from "./styles";

export type IOption = {
  /**
   * @param {String} name - This will display in option
   */
  name?: string;
  // Value will be passed to form values
  value?: string;
  [key: string]: any;
};

interface ISelectProps {
  name: string;
  className?: string;
  optionSelected: IOption;
  label: string;
  options: IOption[];
  onSelect: (option: IOption) => void;
  disabled?: boolean;
  placeholder?: string;
  // instead of you don't want to custom your value for options. you can use this
  // value = optionSelected[valueKey]
  valueKey?: string;
  required?: boolean;
}

const Select: React.FC<ISelectProps> = (props) => {
  const {
    name,
    className,
    label,
    options = [],
    optionSelected,
    placeholder = "",
    disabled,
    valueKey,
    required = false,
    onSelect,
  } = props;
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const isError: boolean = Boolean(!!meta.error && !!meta.touched);

  useEffect(() => {
    setTimeout(() => {
      let newOption = optionSelected?.[valueKey] || optionSelected?.value || "";
      // setFieldValue cannot set immediately after first render
      setFieldValue(name, newOption);
    }, 300);
  }, [optionSelected]);

  const handleSelect = (option: IOption) => {
    onSelect && onSelect(option);
  };

  return (
    <Container className={className}>
      <Label isError={isError}>
        {label}
        {required && <span className="font-semibold text-primary">*</span>}
      </Label>
      <div>
        <Listbox
          value={optionSelected}
          onChange={handleSelect}
          disabled={disabled}
        >
          <div className={`relative text-black ${className}`}>
            <ListboxButton>
              <Menu isError={isError} disabled={disabled}>
                {optionSelected ? (
                  <Text>{optionSelected?.name}</Text>
                ) : (
                  <Placeholder>{placeholder}</Placeholder>
                )}
                <SVG name="common/select-down-arrow" width="24" height="24" />
              </Menu>
            </ListboxButton>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptionsContainer>
                {options.map((option, index) => (
                  <Listbox.Option
                    key={`dropdown-i-${index}-${option?.name}`}
                    value={option}
                  >
                    {({ selected, active }) => (
                      <MenuItem active={active || selected}>
                        {option?.name}
                      </MenuItem>
                    )}
                  </Listbox.Option>
                ))}
              </ListboxOptionsContainer>
            </Transition>
          </div>
        </Listbox>
      </div>
      {isError && <ErrorMessage>{meta.error}</ErrorMessage>}
      <HiddenInput name={name} {...field} />
    </Container>
  );
};

export default Select;
