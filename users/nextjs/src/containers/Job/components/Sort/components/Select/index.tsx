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
  [key: string]: any;
};

interface ISelectProps {
  optionSelected: IOption;
  options: IOption[];
  onSelect: (option: IOption) => void;
}

const Select: React.FC<ISelectProps> = (props) => {
  const { options = [], optionSelected, onSelect } = props;

  const handleSelect = (option: IOption) => {
    onSelect && onSelect(option);
  };

  return (
    <Container>
      <div>
        <Listbox value={optionSelected} onChange={handleSelect}>
          <div className="relative">
            <ListboxButton>
              <Menu>
                <Text>{optionSelected?.name}</Text>
                <SVG name="job/chevron-down" width="16" height="16" />
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
                      <MenuItem active={active} selected={selected}>
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
    </Container>
  );
};

export default Select;
