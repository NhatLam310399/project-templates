import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { setSortTypeSelected } from "@redux/actions/recruitment";

import Select, { IOption } from "./components/Select";

import {
  SortContainer,
  SortLabel,
  SortWrapper,
  TotalContainer,
} from "./styles";

interface ISortProps {
  totalCount?: number;
}

const Sort: React.FC<ISortProps> = (props) => {
  const { t } = useTranslation(["job"]);
  const dispatch = useDispatch();

  const { totalCount } = props;

  const renderSortOptions = [
    {
      name: t("sort.default"),
      value: "latest",
    },
    {
      name: t("sort.low-salary"),
      value: "lowSalary",
    },
    {
      name: t("sort.latest"),
      value: "latest",
    },
    {
      name: t("sort.oldest"),
      value: "oldest",
    },
  ];

  useEffect(() => {
    dispatch(setSortTypeSelected(renderSortOptions[0]));
  }, []);

  const [sortSelected, setSortSelected] = useState<IOption>(
    renderSortOptions[0],
  );

  const handleSort = (option: IOption) => {
    setSortSelected(option);
    dispatch(setSortTypeSelected(option));
  };

  return (
    <SortWrapper>
      <TotalContainer>
        {totalCount} {t("total")}
      </TotalContainer>
      <SortContainer>
        <SortLabel>{t("sort.self")} :</SortLabel>
        <Select
          optionSelected={sortSelected}
          onSelect={(option) => handleSort(option)}
          options={renderSortOptions}
        />
      </SortContainer>
    </SortWrapper>
  );
};

export default Sort;
