import { ChangeEvent, FormEvent, Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Transition } from "@headlessui/react";

import { useClickOutSide } from "@common/hooks/useClickOutSide";
import { useRedirect } from "@common/hooks/useRedirect";
import { formatParams, unShiftArray } from "@common/functions";
import {
  IFindJobRoute,
  IMostKeyword,
  IProvince,
  IRootState,
} from "@common/typings";
import { PATH } from "@routes";

import AutoComplete from "@designs/AutoComplete";
import { SVG } from "@designs/SVG";

import {
  Button,
  CommonKeyword,
  CommonKeywordContent,
  CommonKeywordItem,
  Dropdown,
  DropdownMobile,
  Form,
  Icon,
  Input,
  ListBoxItem,
  ListBoxMenu,
  MobileSearchBox,
  RecentSearch,
  RecentSearchItem,
  SearchBoxContainer,
  SearchIcon,
  TextField,
  Title,
} from "./styles";

interface ISuggestion {
  name?: string;
  [key: string]: any;
}

interface ISearchBoxProps {
  listSearchCurrent?: string[];
  className?: string;
  onChange?: (text: string) => void;
  onSubmit?: (textSearch?: string, province?: string) => void;
  onSelect?: (text: string) => void;
  renderDropdownItem?: (suggestion: ISuggestion) => JSX.Element;
  hasProvince?: boolean;
  value?: string;
}

const MOBILE_SCREEN = 720;

type IFullQueries = IFindJobRoute.FullQueries;

const SearchBox: React.FC<ISearchBoxProps> = (props) => {
  const {
    className = "",
    onSubmit,
    listSearchCurrent = [],
    hasProvince = false,
    value = "",
    onSelect,
  } = props;

  const { t } = useTranslation(["common"]);
  const redirect = useRedirect();
  const fullQuery: IFullQueries = useRouter().query || {};
  const query = removeParams(fullQuery);
  const { elementRef, isVisible, setElementVisible } = useClickOutSide(false);

  const { province: _province } = fullQuery;

  const queryProvince = formatParams(decodeURIComponent(_province || ""));

  const { mostKeyword = [] } = useSelector(
    (state: IRootState) => state.recruitment,
  );
  const { provinces } = useSelector((state: IRootState) => state.location);

  const [inputValue, setInputValue] = useState<string>("");
  const [provinceSelected, setProvinceSelected] = useState<IProvince>();
  const [listProvince, setListProvince] = useState<IProvince[]>([]);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [hotKeywords, setHotKeywords] = useState<IMostKeyword[]>([]);

  useEffect(() => {
    addOptionToProvince();
  }, [provinces]);

  useEffect(() => {
    if (value) {
      setInputValue(value);
    } else {
      setInputValue("");
    }
  }, [value]);

  useEffect(() => {
    if (mostKeyword?.length > 0) {
      const hotKeyword = mostKeyword?.filter(
        (keyword) => keyword.isHot === true,
      );
      setHotKeywords(hotKeyword);
    }
  }, [mostKeyword]);

  useEffect(() => {
    if (queryProvince) {
      const provinceSelected = listProvince?.find(
        (item) => item?.slug === queryProvince,
      );
      setProvinceSelected(provinceSelected);
    } else {
      setProvinceSelected(listProvince[0]);
    }
  }, [listProvince, fullQuery]);

  // useEffect(() => {
  // const currentWindowWith = window.innerWidth;
  // const bodyElement = document.querySelector("body");
  // if (currentWindowWith <= MOBILE_SCREEN) {
  //   if (isVisible) {
  //     bodyElement.style.overflow = "hidden";
  //   } else {
  //     bodyElement.style.overflow = "auto";
  //   }
  // }
  // }, [isVisible]);

  const handleSelectProvince = (option: IProvince) => {
    setProvinceSelected(option);
    onSubmit && onSubmit(inputValue, option?.slug);
    // redirect(PATH.JOB, fullQuery, {
    //   ...query,
    //   province: encodeURIComponent(option?.slug),
    // });
  };

  const addOptionToProvince = () => {
    let draftArray = [...provinces];
    const allProvince: IProvince = {
      name: t("filter-all-location"),
    };
    draftArray.unshift(allProvince);
    setListProvince(draftArray);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    onSubmit && onSubmit(inputValue, provinceSelected?.slug);
    e.preventDefault();
    setIsOpenDropdown(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleClickSuggest = (e, value: string) => {
    onSubmit && onSubmit(value, provinceSelected?.slug);
    e.preventDefault();
  };

  const handleClickKeyword = (e, keyword: IMostKeyword) => {
    onSubmit && onSubmit(keyword?.name, provinceSelected?.slug);
    e.preventDefault();
  };

  const handleFocus = () => {
    setElementVisible(true);
    setIsOpenDropdown(true);
  };
  const handleClose = () => {
    const currentWindowWith = window.innerWidth;
    if (currentWindowWith <= MOBILE_SCREEN) {
      return;
    }
    setIsOpenDropdown(false);
  };

  return (
    <SearchBoxContainer className={className} ref={elementRef} hasProvince>
      <Form onSubmit={handleSubmit}>
        <TextField hasProvince={hasProvince}>
          <SearchIcon className="h-2 text-black min-w-2" />
          <Input
            value={inputValue}
            onFocus={handleFocus}
            onBlur={handleClose}
            placeholder={t("search-box.place-holder")}
            onChange={handleChange}
          />
        </TextField>

        <Transition
          show={isOpenDropdown}
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0"
          enterTo="transform opacity-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100"
          leaveTo="transform opacity-0"
        >
          <Dropdown>
            <RecentSearch>
              <Title>{t("search-box.recent-search")}</Title>
              {listSearchCurrent?.length > 0 &&
                listSearchCurrent
                  ?.filter(
                    (text, index) => index > listSearchCurrent?.length - 6,
                  )
                  .map((value) => (
                    <RecentSearchItem
                      onClick={(e) => handleClickSuggest(e, value)}
                    >
                      {value}
                    </RecentSearchItem>
                  ))}
            </RecentSearch>
            <CommonKeyword>
              <Title>{t("search-box.common-keyword")}</Title>
              <CommonKeywordContent>
                {hotKeywords?.length > 0 &&
                  hotKeywords.map((keyword) => (
                    <CommonKeywordItem
                      onClick={(e) => handleClickKeyword(e, keyword)}
                    >
                      {keyword?.name}
                    </CommonKeywordItem>
                  ))}
              </CommonKeywordContent>
            </CommonKeyword>
          </Dropdown>
        </Transition>
        {hasProvince && (
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
        )}
        <Button type="submit">
          <p className="phone:block">{t("search-box.search")}</p>
        </Button>
      </Form>

      <Transition
        show={isOpenDropdown}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0"
        enterTo="transform opacity-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100"
        leaveTo="transform opacity-0"
      >
        <Form onSubmit={handleSubmit}>
          <DropdownMobile>
            <MobileSearchBox>
              <Icon
                name="common/menu/mobile-close"
                height={24}
                width={24}
                onClick={() => setIsOpenDropdown(false)}
              />
              <Input
                placeholder={t("search-box.place-holder")}
                onChange={handleChange}
              />
            </MobileSearchBox>
            <RecentSearch>
              <Title>{t("search-box.recent-search")}</Title>
              {listSearchCurrent?.length > 0 &&
                listSearchCurrent
                  ?.filter(
                    (text, index) => index > listSearchCurrent?.length - 6,
                  )
                  .map((value) => (
                    <RecentSearchItem
                      onClick={(e) => handleClickSuggest(e, value)}
                    >
                      {value}
                    </RecentSearchItem>
                  ))}
            </RecentSearch>
            <CommonKeyword>
              <Title>{t("search-box.common-keyword")}</Title>
              <CommonKeywordContent>
                {hotKeywords?.length > 0 &&
                  hotKeywords.map((keyword) => (
                    <CommonKeywordItem
                      onClick={(e) => handleClickKeyword(e, keyword)}
                    >
                      {keyword?.name}
                    </CommonKeywordItem>
                  ))}
              </CommonKeywordContent>
            </CommonKeyword>
          </DropdownMobile>
        </Form>
      </Transition>
    </SearchBoxContainer>
  );
};

export default SearchBox;

const removeParams = (_query: IFullQueries) => {
  const newQuery = { ..._query };
  delete newQuery.province;
  delete newQuery.career;
  delete newQuery.salary;
  delete newQuery.level;
  delete newQuery.type;
  return newQuery || {};
};
