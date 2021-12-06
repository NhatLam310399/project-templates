import { Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddNewCard from "./AddNewCard";
import EditorDialog from "./EditorDialog";
import ProductTempCard from "./ProductTempCard";
import {
  ListTemplatesContainer,
  Header,
  GridViewContainer,
  ListProducts,
} from "./styles";
import Select from "designs/Select";
import Checkbox from "designs/Checkbox";
import SearchBoxTable from "components/SearchBoxTable";
import { PATH } from "common/constants/routes";

interface IListTemplatesProps {}

type IFilterOption = {
  name: string;
};

const filterOptions: IFilterOption[] = [
  {
    name: "Created: new first",
  },
  {
    name: "Created: old first",
  },
  {
    name: "Updated: new first",
  },
  {
    name: "Updated: old first",
  },
  {
    name: "Title: A to Z",
  },
  {
    name: "Title: Z to A",
  },
];

const ListTemplates: React.FC<IListTemplatesProps> = props => {
  const [filterSelected, setFilterSelected] = useState<IFilterOption>();
  return (
    <ListTemplatesContainer>
      <Header>
        <Checkbox initialCheck={false} label="Select all" />
        <SearchBoxTable onFetchData={() => []} />
        <Formik initialValues={{ filterSelected: "" }} onSubmit={() => {}}>
          <Select
            placeholder="Sort by"
            optionSelected={filterSelected}
            options={filterOptions}
            name="filterSelected"
            onSelect={option => setFilterSelected(option)}
          />
        </Formik>
      </Header>
      <ListProducts>
        <GridView />
      </ListProducts>
    </ListTemplatesContainer>
  );
};

export default ListTemplates;

const GridView: React.FC<{}> = props => {
  const [isOpenEditor, setIsOpenEditor] = useState(false);

  return (
    <>
      <GridViewContainer>
        <AddNewCard onClick={() => setIsOpenEditor(true)} />
        <ProductTempCard />
      </GridViewContainer>
      <EditorDialog
        open={isOpenEditor}
        onCloseDialog={() => setIsOpenEditor(false)}
      />
    </>
  );
};
