import React, { useState } from "react";

import { Formik } from "formik";
import { SearchContainer } from "./styles";
import Select from "designs/Select";
import SearchBoxTable from "components/SearchBoxTable";

interface IFilterBoxProps {}

type IFilterOption = {
  name: string;
};

const filterStatusOptions: IFilterOption[] = [
  {
    name: "Fail",
  },
  {
    name: "Success",
  },
  {
    name: "Pending",
  },
];

const filterPageOptions: IFilterOption[] = [
  {
    name: "20 per page",
  },
  {
    name: "25 per page",
  },
  {
    name: "26 per page",
  },
];

const FilterBox: React.FC<IFilterBoxProps> = () => {
  const [filterStatusSelected, setFilterStatusSelected] = useState<any>();
  const [filterPageSelected, setFilterPageSelected] = useState<any>();

  const onFetchDataInput = (text: string) => {};

  return (
    <SearchContainer>
      <SearchBoxTable
        placeholder="Input text here"
        onFetchData={onFetchDataInput}
      />
      <Formik initialValues={{ filterStatusSelected: "" }} onSubmit={() => {}}>
        <Select
          placeholder="Status"
          optionSelected={filterStatusSelected}
          options={filterStatusOptions}
          name="filterStatusSelected"
          onSelect={option => setFilterStatusSelected(option)}
        />
      </Formik>
      <Formik initialValues={{ filterSelected: "" }} onSubmit={() => {}}>
        <Select
          placeholder="Page"
          optionSelected={filterPageSelected}
          options={filterPageOptions}
          name="filterPageSelected"
          onSelect={option => setFilterPageSelected(option)}
        />
      </Formik>
    </SearchContainer>
  );
};

export default FilterBox;
