import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
} from "react";
import { SearchBoxContainer, Form, TextField, Input } from "./styles";
import { useDebounced } from "hooks/useDebounced";
import SearchIcon from "icons/Search";

interface ISearchBoxProps<T> {
  className?: string;
  setText?: (value: string) => void;
}

const onFetchData = () => [];

const SearchBoxHelp = <T,>(props: ISearchBoxProps<T>) => {
  const { className = "", setText } = props;
  const { inputText, setInputText, searchResults } = useDebounced(onFetchData);
  const [suggestions, setSuggestions] = useState<T[]>([]);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [itemIndexActive, setItemIndexActive] = useState<number>(-1);

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
    setText && setText(value);
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
            onChange={handleChange}
            onFocus={() => setIsOpenDropdown(true)}
            onBlur={() => setIsOpenDropdown(false)}
            onKeyDown={handleKeydown}
          />
        </TextField>
      </Form>
    </SearchBoxContainer>
  );
};

export default SearchBoxHelp;
