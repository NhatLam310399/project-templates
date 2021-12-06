import { Fragment, useEffect, useRef, useState } from "react";
import { Transition, Listbox } from "@headlessui/react";
import Fuse from "fuse.js";

import {
  Input,
  InputWrapper,
  ListboxButton,
  ListboxOptions,
  ListOptions,
  Button,
} from "./styles";

import { SVG } from "@designs/SVG";

interface IListBoxProps {
  className?: string;
  optionSelected: any;
  MenuButton: React.ReactNode;
  fieldToSearch?: string[];
  disabled?: boolean;
  innerClassName?: string;
  isSelectProvince?: boolean;
  options: any[];
  onChange: (option: any) => void;
  renderItem: (option: any, selected: boolean, active: boolean) => JSX.Element;
}
const ListBox: React.FC<IListBoxProps> = (props) => {
  const {
    innerClassName = "",
    className = "",
    MenuButton,
    optionSelected,
    fieldToSearch = ["name"],
    options,
    renderItem,
    onChange,
    disabled = false,
    isSelectProvince = false,
  } = props;
  const [value, setValue] = useState<string>();
  const [listData, setListData] = useState<any[]>([]);

  useEffect(() => {
    if (options.length > 0) {
      setListData(options || []);
    }
  }, [options]);

  useEffect(() => {
    if (value) {
      handleSearch(value);
    }
  }, [value]);
  const handleSearch = (value: string) => {
    const fuseOptions = { includeScore: true, keys: fieldToSearch };
    const fuse = new Fuse(options, fuseOptions);
    const searchResult =
      value && fuse.search(value).map((option) => option.item);
    setListData(searchResult || []);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onChangeSelected = (value) => {
    setValue("");

    onChange && onChange(value);
    setListData(options || []);
  };

  return (
    <div className={className}>
      <Listbox
        value={optionSelected}
        onChange={onChangeSelected}
        disabled={disabled}
      >
        <div
          className={`relative ${innerClassName} ${disabled && "opacity-60"}`}
        >
          <ListboxButton>{MenuButton}</ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions>
              <InputWrapper>
                <SVG
                  name="common/search"
                  width="24"
                  height="24"
                  className="block absolute top-1.2 left-3.5"
                />
                <Input
                  autoComplete="off"
                  value={value}
                  name="name"
                  onChange={handleChange}
                />
              </InputWrapper>
              <ListOptions>
                {listData.map((option, index) => (
                  <Listbox.Option
                    key={`dropdown-i-${index}-${option?.name}`}
                    value={option}
                    className="px-1"
                  >
                    {({ selected, active }) => (
                      <Button active={active} selected={selected}>
                        {renderItem(option, selected, active)}
                      </Button>
                    )}
                  </Listbox.Option>
                ))}
              </ListOptions>
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default ListBox;
