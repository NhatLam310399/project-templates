import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  Fragment,
  KeyboardEvent,
} from "react";
import { Transition } from "@headlessui/react";
import {
  SearchBoxContainer,
  Form,
  TextField,
  Input,
  Dropdown,
  DropdownItem,
} from "./styles";
import { useDebounced } from "hooks/useDebounced";
import SearchIcon from "icons/Search";

interface ISearchBoxProps<T> {
  className?: string;
  placeholder?: string;
  value?: string;
  onFetchData: (text: string) => Promise<T[]>;
  onChange?: (text: string) => void;
  onSubmit?: (text: string) => void;
  onSelect: (suggestion: T) => void;
  renderDropdownItem: (suggestion: T) => JSX.Element;
}

const SearchBoxTopBar = <T,>(props: ISearchBoxProps<T>) => {
  const {
    value = "",
    className = "",
    onFetchData,
    onSelect,
    onChange,
    renderDropdownItem,
    onSubmit,
    placeholder = "Search Kingify",
  } = props;
  const { inputText, setInputText, searchResults } = useDebounced(onFetchData);
  const [suggestions, setSuggestions] = useState<T[]>([]);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [itemIndexActive, setItemIndexActive] = useState<number>(-1);

  useEffect(() => {
    if (value) {
      setInputText(value);
    }
  }, [value]);
  useEffect(() => {
    if (searchResults?.result) {
      setSuggestions(searchResults.result || []);
      setItemIndexActive(-1);
    }
  }, [searchResults?.result]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpenDropdown(false);
    if (itemIndexActive >= 0) {
      onSelect(suggestions[itemIndexActive]);
    } else if (inputText?.length > 0) {
      onSubmit && onSubmit(inputText);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange && onChange(value);
    setInputText(value);
  };

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown": {
        if (itemIndexActive < suggestions?.length - 1)
          setItemIndexActive(prev => prev + 1);
        break;
      }
      case "ArrowUp": {
        if (itemIndexActive > 0) setItemIndexActive(prev => prev - 1);
        break;
      }
    }
  };
  return (
    <SearchBoxContainer className={className}>
      <Form onSubmit={handleSubmit}>
        <TextField>
          <SearchIcon />
          <Input
            value={inputText}
            placeholder={placeholder}
            onChange={handleChange}
            onFocus={() => setIsOpenDropdown(true)}
            onBlur={() => setIsOpenDropdown(false)}
            onKeyDown={handleKeydown}
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
              {suggestions.map((suggestion, index) => (
                <DropdownItem
                  key={index}
                  active={index === itemIndexActive}
                  onMouseEnter={() => setItemIndexActive(index)}
                  onMouseLeave={() => setItemIndexActive(-1)}
                >
                  {renderDropdownItem(suggestion)}
                </DropdownItem>
              ))}
            </Dropdown>
          </Transition>
        </TextField>
      </Form>
    </SearchBoxContainer>
  );
};

export default SearchBoxTopBar;
