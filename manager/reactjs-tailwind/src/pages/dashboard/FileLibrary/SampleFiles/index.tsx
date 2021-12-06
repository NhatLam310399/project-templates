import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import {
  AllFilesContainer,
  Title,
  FileList,
  SkeletonMessage,
  SkeletonContainer,
  PaginationMobile,
  PaginationWrapper,
} from "./styles";
import { randomId } from "common/functions";
import Pagination from "components/Pagination";
import DialogPreview from "components/DialogPreviewFiles";

import Image from "designs/Image";
import DetailFile, { IAction } from "designs/cards/FileDetail";

import ImageUploadLayout from "layouts/ImageUpload";
import { useQuery } from "hooks/useQuery";

import { setBreadcrumb } from "redux/actions/_config";
import { step } from "redux/actions/fileLibrary";

import FileLibraryLayout from "layouts/FileLibrary";
import { IBreadcrumb, IFile } from "typings";
import ImageProduct from "assets/images/filesLibrary/product-demo.png";
import ImageProduct2 from "assets/images/filesLibrary/product-demo-2.png";
import ImageProduct3 from "assets/images/filesLibrary/product-demo-3.png";
import ImageProduct4 from "assets/images/filesLibrary/product-demo-4.png";

interface ISampleFilesProps {}
interface IFormValue {
  filter?: string;
}
const SIZE_TO_DISPLAY = 8;
const SampleFiles: React.FC<ISampleFilesProps> = props => {
  const query = useQuery();
  const searchText = query.get("search");
  const filter = query.get("filter");
  const dispatch = useDispatch();
  const [openDialogPreview, setOpenDialogPreview] = useState(false);
  const [record, setRecord] = useState<IFile | null>(null);
  const [page, setPage] = useState(0);
  console.log("searchText", searchText);
  console.log("filter", filter);

  useEffect(() => {
    const breadcrumbs: IBreadcrumb = [
      {
        name: "File library",
      },
      {
        name: "Sample file",
      },
    ];
    dispatch(setBreadcrumb(breadcrumbs));
  }, []);

  const handleClickSetting = (folder: IFile, action: IAction) => {
    console.log("action", action);
    if (action === "Preview") {
      setRecord(folder);
      setOpenDialogPreview(true);
    }
  };
  const onClick = (index: number) => {
    console.log("index:", index);
    if (index === 0) {
      dispatch(step(1));
    }
  };
  const handleUploadRawImage = (files: File[]) => {
    if (!files) return;
    const file = files[0];
    console.log("file", file);
    //add to serve
  };
  const handleChangePage = (newPage: number) => {
    console.log("newPage", newPage);
    setPage(newPage);
  };
  return (
    <>
      <FileLibraryLayout onClickBreadcrumb={onClick} isSampleFiles={true}>
        <AllFilesContainer>
          <Title>Files in Sample file({files?.length || 0})</Title>
          <PaginationWrapper>
            <Pagination
              sizePerPage={SIZE_TO_DISPLAY}
              page={page}
              totalSize={10}
              onPageChange={handleChangePage}
            />
          </PaginationWrapper>
          {files?.length > 0 ? (
            <FileList>
              {files?.map(file => (
                <DetailFile
                  isFileSample
                  onClickSetting={handleClickSetting}
                  className="col-span-4 phone:col-span-3"
                  file={file}
                />
              ))}
            </FileList>
          ) : (
            <ImageUploadLayout onUpload={handleUploadRawImage}>
              <SkeletonContainer>
                <Image name="filesLibrary/sample-files.png" />
                <SkeletonMessage>Drag your image here</SkeletonMessage>
              </SkeletonContainer>
            </ImageUploadLayout>
          )}
          <PaginationMobile>
            <Pagination
              sizePerPage={SIZE_TO_DISPLAY}
              page={page}
              totalSize={10}
              onPageChange={handleChangePage}
            />
          </PaginationMobile>
        </AllFilesContainer>
      </FileLibraryLayout>
      <DialogPreview
        listFiles={files || []}
        file={record}
        open={openDialogPreview}
        onClose={() => setOpenDialogPreview(false)}
      />
    </>
  );
};

export default SampleFiles;
const files: IFile[] = [
  {
    _id: randomId(),
    fileId: "1203814",
    name: "Clothing",
    resolution: "800 x 450 @ 96 dpi",
    size: "117.05 KB / 8.33x4.69",
    type: "image/jpeg",
    image: {
      default: ImageProduct,
    },
    url: ImageProduct,
    createAt: new Date(),
  },
  {
    _id: randomId(),
    fileId: "1203814",
    name: "Running",
    resolution: "800 x 450 @ 96 dpi",
    size: "117.05 KB / 8.33x4.69",
    type: "image/jpeg",
    image: {
      default: ImageProduct2,
    },
    url: ImageProduct2,
    createAt: new Date(),
  },
  {
    _id: randomId(),
    fileId: "1203814",
    name: "Ski sport",
    resolution: "800 x 450 @ 96 dpi",
    size: "117.05 KB / 8.33x4.69",
    type: "image/jpeg",
    image: {
      default: ImageProduct3,
    },
    url: ImageProduct3,
    createAt: new Date(),
  },
  {
    _id: randomId(),
    fileId: "1203814",
    name: "Ski stop",
    resolution: "800 x 450 @ 96 dpi",
    size: "117.05 KB / 8.33x4.69",
    type: "image/jpeg",
    image: {
      default: ImageProduct4,
    },
    url: ImageProduct4,
    createAt: new Date(),
  },
];
