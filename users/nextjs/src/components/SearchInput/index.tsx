import React, {
  useState,
  useEffect,
  ChangeEvent,
  Fragment,
  MouseEvent,
} from "react";
import { SVG } from "@designs/SVG";
import { useDebouncedSearch } from "@common/hooks/useDebounced";

import { Transition } from "@headlessui/react";
import {
  SearchBoxContainer,
  Input,
  Dropdown,
  DropdownItem,
  Button,
} from "./styles";

interface ISuggestion {
  name?: string;
  [key: string]: any;
}

interface ISearchBoxProps {
  initValue?: string;
  placeholder?: string;
  onFetchData: (text: string) => Promise<ISuggestion[]>;
  className?: string;
  onChange?: (text: string) => void;
  onSubmit?: (text: string) => void;
  renderDropdownItem: (suggestion: ISuggestion) => JSX.Element;
}

const SearchInput: React.FC<ISearchBoxProps> = (props) => {
  const {
    initValue = "",
    placeholder = "Tìm kiếm",
    onFetchData,
    onChange,
    className = "",
    renderDropdownItem,
    onSubmit,
  } = props;
  const { inputText, setInputText, searchResults } = useDebouncedSearch(
    onFetchData,
  );
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (initValue) {
      setValue(initValue);
    } else {
      setValue("");
    }
  }, [initValue]);

  useEffect(() => {
    if (searchResults?.result) {
      setSuggestions(searchResults.result || []);
    }
  }, [searchResults?.result]);

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit && onSubmit(inputText);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    setInputText(value);
    onChange && onChange(value);
  };

  return (
    <SearchBoxContainer className={className}>
      <Button type="button" onClick={handleSubmit}>
        <SVG className="text-primary w-2" name="common/search" />
      </Button>
      <Input
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={() => setIsOpenDropdown(true)}
        onBlur={() => setIsOpenDropdown(false)}
      />
      <Transition
        show={isOpenDropdown}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 "
        enterTo="transform opacity-100 "
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 "
        leaveTo="transform opacity-0"
      >
        <Dropdown>
          {suggestions.map((suggestion) => (
            <DropdownItem>{renderDropdownItem(suggestion)}</DropdownItem>
          ))}
        </Dropdown>
      </Transition>
    </SearchBoxContainer>
  );
};

export default SearchInput;
