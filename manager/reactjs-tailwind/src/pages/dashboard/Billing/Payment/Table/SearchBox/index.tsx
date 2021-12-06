import { useState } from "react";
import { Formik } from "formik";
import { SearchContainer } from "./styles";
import Select from "designs/Select";
import SearchBoxTable from "components/SearchBoxTable";
interface ISearchProps {}

const Search: React.FC<ISearchProps> = props => {
  const [store, setStore] = useState<any>();
  const [filters, setFilters] = useState<any>();
  const [date, setDate] = useState<any>();
  const onFetchDataInput = () => {};
  return (
    <SearchContainer>
      <SearchBoxTable
        placeholder="Input text here"
        onFetchData={onFetchDataInput}
      />

      <Formik initialValues={{ store: "" }} onSubmit={() => {}}>
        <Select
          placeholder="All stores"
          optionSelected={store}
          options={[
            {
              name: "Store 1",
            },
            {
              name: "Store 2",
            },
          ]}
          name="store"
          onSelect={option => setStore(option)}
        />
      </Formik>
      <Formik initialValues={{ filters: "" }} onSubmit={() => {}}>
        <Select
          placeholder="Filters"
          optionSelected={filters}
          options={[
            {
              name: "Filter 1",
            },
            {
              name: "Filter 2",
            },
          ]}
          name="filters "
          onSelect={option => setFilters(option)}
        />
      </Formik>
      <Formik initialValues={{ date: "" }} onSubmit={() => {}}>
        <Select
          placeholder="Date"
          optionSelected={date}
          options={[
            {
              name: "Date 1",
            },
            {
              name: "Date 2",
            },
          ]}
          name="date"
          onSelect={option => setDate(option)}
        />
      </Formik>
    </SearchContainer>
  );
};

export default Search;
