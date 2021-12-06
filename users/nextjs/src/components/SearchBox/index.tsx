import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, Fragment, KeyboardEvent } from "react";
import { useTranslation } from "next-i18next";
import { Transition } from "@headlessui/react";

import { useDebouncedSearch } from "@common/hooks/useDebounced";
import { useRedirect } from "@common/hooks/useRedirect";
import { formatParams, unShiftArray } from "@common/functions";
import { IFindCompanyRoute, IProvince, IRootState } from "@common/typings";
import { PATH } from "@routes";

import AutoComplete from "@designs/AutoComplete";
import { SVG } from "@designs/SVG";
import {
  Button,
  Dropdown,
  DropdownItem,
  Form,
  Input,
  ListBoxItem,
  ListBoxMenu,
  SearchBoxContainer,
  SearchIcon,
  TextField,
} from "./styles";

interface ISuggestion {
  name?: string;
  [key: string]: any;
}

interface ISearchBoxProps {
  onFetchData: (text: string) => Promise<ISuggestion[]>;
  className?: string;
  onChange?: (text: string) => void;
  onSubmit?: (text?: string, province?: string) => void;
  value?: string;
  onSelect: (suggestion: ISuggestion) => void;
  renderDropdownItem: (suggestion: ISuggestion) => JSX.Element;
}

const SearchBox: React.FC<ISearchBoxProps> = (props) => {
  const {
    className = "",
    onFetchData,
    onSelect,
    onChange,
    renderDropdownItem,
    onSubmit,
    value = "",
  } = props;

  const { t } = useTranslation(["common"]);
  const redirect = useRedirect();
  const fullQuery: IFindCompanyRoute.FullQueries = useRouter().query || {};

  const { p: _province } = fullQuery;

  const queryProvince = formatParams(decodeURIComponent(_province || ""));

  const { inputText, setInputText, searchResults } = useDebouncedSearch(
    onFetchData,
  );

  const { provinces } = useSelector((state: IRootState) => state.location);

  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [itemIndexActive, setItemIndexActive] = useState<number>(-1);
  const [provinceSelected, setProvinceSelected] = useState<IProvince>({});
  const [listProvince, setListProvince] = useState<IProvince[]>([]);

  useEffect(() => {
    if (value) {
      setInputText(value);
    } else {
      setInputText("");
    }
  }, [value]);

  useEffect(() => {
    if (searchResults?.result) {
      setSuggestions(searchResults.result || []);
      setItemIndexActive(-1);
    }
  }, [searchResults?.result]);

  useEffect(() => {
    addOptionToProvince();
  }, [provinces]);

  useEffect(() => {
    if (queryProvince) {
      const provinceSelected = listProvince.find(
        (item) => item?.slug === queryProvince,
      );
      setProvinceSelected(provinceSelected);
    } else {
      setProvinceSelected(listProvince[0]);
    }
  }, [listProvince, fullQuery]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (itemIndexActive >= 0) {
      onSelect(suggestions[itemIndexActive]);
    }
    onSubmit && onSubmit(inputText, provinceSelected?.slug);
    e.preventDefault();
    setIsOpenDropdown(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // onChange && onChange(value);

    setInputText(e.target.value || "");
  };

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown": {
        if (itemIndexActive < suggestions?.length - 1)
          setItemIndexActive((prev) => prev + 1);
        break;
      }
      case "ArrowUp": {
        if (itemIndexActive > 0) setItemIndexActive((prev) => prev - 1);
        break;
      }
    }
  };

  const handleSelectProvince = (option: IProvince) => {
    setProvinceSelected(option);
    onSubmit && onSubmit(inputText, option?.slug);
  };

  const addOptionToProvince = () => {
    let draftArray = [...provinces];
    const allProvince: IProvince = {
      name: t("filter-all-location"),
    };
    draftArray.unshift(allProvince);
    setListProvince(draftArray);
  };
  const handleFocus = () => {
    if (suggestions?.length > 0) {
      setIsOpenDropdown(true);
    }
  };

  return (
    <SearchBoxContainer className={className}>
      <Form onSubmit={handleSubmit}>
        <TextField>
          <SearchIcon className="text-black" />
          <Input
            placeholder={t("search-company-placeholder")}
            onChange={handleChange}
            onFocus={handleFocus}
            value={inputText}
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
        <AutoComplete
          className="w-full laptop:w-26.5"
          MenuButton={
            <ListBoxMenu>
              <SVG name="common/location" width="24" height="24" />
              {provinceSelected?.name}
            </ListBoxMenu>
          }
          fieldToSearch={["name", "nameEn"]}
          onChange={handleSelectProvince}
          optionSelected={provinceSelected}
          options={listProvince}
          renderItem={(option: IProvince) => (
            <ListBoxItem>{option?.name}</ListBoxItem>
          )}
        />
        <Button type="submit">
          <p className="hidden phone:block">{t("search-box.search")}</p>
        </Button>
      </Form>
    </SearchBoxContainer>
  );
};

export default SearchBox;
