import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  Container,
  Menu,
  MenuItem,
  ListboxButton,
  ListboxOptionsContainer,
  Text,
} from "./styles";
import { SVG } from "@designs/SVG";

export type IOption = {
  /**
   * @param {String} name - This will display in option
   */
  name?: string;
  // Value will be passed to form values
  value?: string;
  slug?: string;
  [key: string]: any;
};

interface ISelectProps {
  className?: string;
  optionSelected: IOption;
  options: IOption[];
  onSelect: (option: IOption) => void;
}

const Select: React.FC<ISelectProps> = (props) => {
  const { className, options = [], optionSelected, onSelect } = props;

  const handleSelect = (option: IOption) => {
    onSelect && onSelect(option);
  };

  return (
    <Container className={className}>
      <div>
        <Listbox value={optionSelected} onChange={handleSelect}>
          <div className={`relative text-black ${className}`}>
            <ListboxButton>
              <Menu>
                <Text>
                  {optionSelected?.name || optionSelected?.displayName}
                </Text>
                <SVG name="common/arrow-down" width="16" height="16" />
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
                    key={`dropdown-i-${index}-${option?.name ||
                      option?.displayName}`}
                    value={option}
                  >
                    {({ selected, active }) => (
                      <MenuItem active={active || selected}>
                        {option?.name || option?.displayName}
                      </MenuItem>
                    )}
                  </Listbox.Option>
                ))}
              </ListboxOptionsContainer>
            </Transition>
          </div>
        </Listbox>
      </div>
    </Container>
  );
};

export default Select;
