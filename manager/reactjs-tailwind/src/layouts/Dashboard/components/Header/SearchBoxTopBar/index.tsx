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

import DialogSearch from "./DialogSearch";
import SearchIcon from "icons/Search";
import { useDebounced } from "hooks/useDebounced";
interface ISearchBoxProps<T> {
  className?: string;
}

const onFetchData = () => [];

const SearchBoxTopBar = <T,>(props: ISearchBoxProps<T>) => {
  const { className = "" } = props;
  const { inputText, setInputText, searchResults } = useDebounced(onFetchData);
  const [suggestions, setSuggestions] = useState<T[]>([]);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [itemIndexActive, setItemIndexActive] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);

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
    } else if (inputText?.length > 0) {
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputText(value);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
            placeholder="Search Kingify"
            onChange={handleChange}
            onFocus={() => {
              setIsOpenDropdown(true);
            }}
            onBlur={() => {
              setIsOpenDropdown(false);
            }}
            onKeyDown={handleKeydown}
            value={inputText}
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
                  {/* {renderDropdownItem(suggestion)} */}
                </DropdownItem>
              ))}
            </Dropdown>
          </Transition>
        </TextField>
      </Form>
      <DialogSearch
        inputText={inputText}
        setInputText={setInputText}
        loading={loading}
        setLoading={setLoading}
      />
    </SearchBoxContainer>
  );
};

export default SearchBoxTopBar;
