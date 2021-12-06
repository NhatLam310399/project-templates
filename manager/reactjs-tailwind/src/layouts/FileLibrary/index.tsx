import { useState } from "react";
import { Formik } from "formik";

import { useHistory } from "react-router";
import {
  FileLibraryContainer,
  Header,
  HeaderFilter,
  HeaderUpload,
  Form,
  UploadIcon,
  DropdownItem,
  Content,
} from "./styles";
import Search from "components/SearchBoxWithDropdown";
import Breadcrumb from "components/Breadcrumb";
import { Title } from "designs/Title";
import { Wrapper } from "designs/PageLayout";
import Select from "designs/Select";
import Button from "designs/Button";
import SVG from "designs/SVG";

import { useRedirect } from "hooks/useRedirect";
import ImageUploadLayout from "layouts/ImageUpload";
import { IFilterFile } from "typings";
import { PATH } from "common/constants/routes";

interface IFileLibraryProps {
  onClickBreadcrumb?: (index: number) => void;
  isSampleFiles?: boolean;
}
interface IFormValue {
  filter?: string;
}
const FileLibrary: React.FC<IFileLibraryProps> = props => {
  const { onClickBreadcrumb, children, isSampleFiles = false } = props;
  const redirect = useRedirect();
  const history = useHistory();
  const [filter, setFilter] = useState<IFilterFile>();
  const [searchText, setSearchText] = useState("");
  const [initialValues] = useState<IFormValue>({
    filter: "",
  });

  const handleSubmit = (values: IFormValue) => {};
  const handleSubmitSearch = (searchText: string) => {
    setSearchText(searchText);
    history.push(
      `${PATH.FILE_LIBRARIES}?search=${encodeURIComponent(searchText)}`,
    );
  };
  const getFilesService = async (text: string) => {
    const file = ["file 1", "file 2", "file 3"];
    return await file;
  };
  const handleSelectSearch = (search: string) => {
    setSearchText(search);
    history.push(`${PATH.FILE_LIBRARIES}?search=${encodeURIComponent(search)}`);
  };
  const renderDropdown = (search: string) => {
    return (
      <DropdownItem onClick={() => handleSelectSearch(search)}>
        {search}
      </DropdownItem>
    );
  };
  const handleFilter = (option: IFilterFile) => {
    setFilter(option);
    if (searchText) {
      history.push(
        `${PATH.FILE_LIBRARIES}?search=${encodeURIComponent(
          searchText,
        )}&&filter=${option._id}`,
      );
    } else {
      history.push(`${PATH.FILE_LIBRARIES}?filter=${option._id}`);
    }
  };
  const handleUploadRawImage = (files: File[]) => {
    if (!files) return;
    const file = files[0];
    //add to server
    console.log("file", file);
  };
  const handleClickBreadcrumb = (index: number) => {
    onClickBreadcrumb && onClickBreadcrumb(index);
  };
  return (
    <Wrapper>
      <Title className="mb-4">File Libraries</Title>
      <Breadcrumb items={[]} />
      <FileLibraryContainer>
        <Header>
          <HeaderFilter>
            <Search
              value={searchText}
              onSubmit={handleSubmitSearch}
              onFetchData={getFilesService}
              onSelect={handleSelectSearch}
              renderDropdownItem={renderDropdown}
              className="w-full h-5 phone:w-36"
              placeholder="Search file name"
            />
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              <Form method="post">
                <Select
                  name="role"
                  formTarget="_id"
                  onSelect={handleFilter}
                  optionSelected={filter!}
                  placeholder="Choose filter"
                  optionTarget="name"
                  options={filters}
                />
              </Form>
            </Formik>
          </HeaderFilter>
          {!isSampleFiles && (
            <HeaderUpload>
              <ImageUploadLayout onUpload={handleUploadRawImage}>
                <Button size="lg" icon={<SVG name="fileLibrary/upload" />}>
                  Upload
                </Button>
              </ImageUploadLayout>

              <UploadIcon variant="secondary">
                <SVG name="fileLibrary/driver" />
              </UploadIcon>
              <UploadIcon variant="secondary">
                <SVG name="fileLibrary/dropbox" />
              </UploadIcon>
            </HeaderUpload>
          )}
        </Header>
        <Content>{children}</Content>
      </FileLibraryContainer>
    </Wrapper>
  );
};

export default FileLibrary;
const filters: IFilterFile[] = [
  {
    _id: "newest",
    name: "Newest first",
  },
  {
    _id: "oldest",
    name: "Oldest first",
  },
  {
    _id: "AtoZ",
    name: "Name: A to Z",
  },
  {
    _id: "ZtoA",
    name: "Name: Z to A",
  },
];
