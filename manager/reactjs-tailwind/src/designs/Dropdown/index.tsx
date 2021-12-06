import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MenuButtonContainer, Button, MenuItems } from "./styles";

interface IListBoxProps<T> {
  dropdownContainerClassName?: string;
  MenuButton: React.ReactNode;
  options: T[];
  renderItem: (option: T, active: boolean) => JSX.Element;
  onChange?: (option: T) => void;
}

const Dropdown = <T,>(props: IListBoxProps<T>) => {
  const {
    dropdownContainerClassName,
    MenuButton,
    options = [],
    renderItem,
  } = props;

  return (
    <div>
      <Menu as="div">
        <div className={`relative `}>
          <MenuButtonContainer>{MenuButton}</MenuButtonContainer>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems as="div" className={dropdownContainerClassName}>
              {options.map((option, index) => (
                <Menu.Item key={index}>
                  {
                    ({ active }) =>
                      // <Button active={active}>
                      renderItem(option, active)
                    // </Button>
                  }
                </Menu.Item>
              ))}
            </MenuItems>
          </Transition>
        </div>
      </Menu>
    </div>
  );
};

export default Dropdown;
