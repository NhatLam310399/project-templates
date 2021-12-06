import { useState } from "react";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import Menu from "../Menu";
import {
  FileLibrariesContainer,
  FiltersRowContainer,
  ThirdStoreButton,
} from "./styles";
import Dialog from "components/Dialog";
import SearchBoxTable from "components/SearchBoxTable";
import Button from "designs/Button";
import Select from "designs/Select";
import SVG from "designs/SVG";
import { changeControllerTab } from "redux/actions/editorController";
import Image from "designs/Image";
import ImageUploadLayout from "layouts/ImageUpload";

interface IUploadProps {}

interface IFilterOption {
  name: string;
}

const Upload: React.FC<IUploadProps> = props => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const [orderMethodsSelected, setOrderMethodsSelected] =
    useState<IFilterOption>(orderMethodOptions[0]);

  const handleClose = () => {
    dispatch(changeControllerTab("MENU"));
  };

  const handleUpload = (files: File[]) => {
    const file = files[0];
    console.log({ file });
  };

  return (
    <>
      <Menu />
      <Dialog size="lg" open={isOpen} onClose={handleClose}>
        <Dialog.Header title="File Libraries" onClose={handleClose} />
        <Dialog.Content>
          <FileLibrariesContainer>
            <Formik
              initialValues={{
                orderBy: orderMethodOptions[0].name,
              }}
              onSubmit={() => {}}
            >
              <Form>
                <FiltersRowContainer>
                  <SearchBoxTable placeholder="Search" onFetchData={() => {}} />
                  <Select
                    placeholder="Order by"
                    optionSelected={orderMethodsSelected}
                    options={orderMethodOptions}
                    name="orderBy"
                    onSelect={option => setOrderMethodsSelected(option)}
                  />
                  <ImageUploadLayout onUpload={handleUpload}>
                    <Button size="lg" icon={<SVG name="editor/upload-file" />}>
                      Upload
                    </Button>
                  </ImageUploadLayout>
                  <ThirdStoreButton>
                    <Image name="editor/driver.png" />
                  </ThirdStoreButton>
                  <ThirdStoreButton>
                    <Image name="editor/dropbox.png" />
                  </ThirdStoreButton>
                </FiltersRowContainer>
              </Form>
            </Formik>
          </FileLibrariesContainer>
        </Dialog.Content>
      </Dialog>
    </>
  );
};

export default Upload;

const orderMethodOptions: IFilterOption[] = [
  {
    name: "Created: newest first",
  },
  {
    name: "Created: old first",
  },
  {
    name: "Title: A to Z",
  },
  {
    name: "Title: Z to A",
  },
];
