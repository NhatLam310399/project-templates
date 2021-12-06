import { useState } from "react";

import {
  AllFilesContainer,
  Title,
  FileList,
  SkeletonContainer,
  SkeletonMessage,
  WrapperCheckBox,
  Button,
  PaginationWrapper,
  ButtonWrapper,
  PaginationMobile,
} from "./styles";
import DialogDelete from "./DialogDelete";
import DialogMoveTo from "./DialogMoveTo";
import { randomId } from "common/functions";
import Pagination from "components/Pagination";
import DialogPreview from "components/DialogPreviewFiles";

import Checkbox from "designs/Checkbox";
import DetailFile, { IAction } from "designs/cards/FileDetail";
import Image from "designs/Image";

import ImageUploadLayout from "layouts/ImageUpload";
import { IFile, IFolder } from "typings";
import ImageProduct from "assets/images/filesLibrary/product-demo.png";
import ImageProduct2 from "assets/images/filesLibrary/product-demo-2.png";
import ImageProduct3 from "assets/images/filesLibrary/product-demo-3.png";
import ImageProduct4 from "assets/images/filesLibrary/product-demo-4.png";
import IconDemo from "assets/images/filesLibrary/folder-demo-icon.jpg";

interface IAllFilesProps {}

const SIZE_TO_DISPLAY = 8;
const AllFiles: React.FC<IAllFilesProps> = props => {
  const [totalSelected, setTotalSelected] = useState(0);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openDialogMoveTo, setOpenDialogMoveTo] = useState(false);
  const [openDialogPreview, setOpenDialogPreview] = useState(false);
  const [currentFolder, setCurrentFolder] = useState<IFolder | null>(null);
  const [record, setRecord] = useState<IFile | null>(null);
  const [multiRecord, setMultiRecord] = useState<IFile[]>([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [page, setPage] = useState(0);

  const handleClickSetting = (folder: IFile, action: IAction) => {
    setMultiRecord([folder]);
    switch (action) {
      case "Delete":
        setCurrentFolder(currentFolders);
        setOpenDialogDelete(true);
        break;
      case "Move to":
        setCurrentFolder(currentFolders);
        setOpenDialogMoveTo(true);
        break;
      case "Preview":
        setOpenDialogPreview(true);
        break;
      default:
        break;
    }
  };

  const handleCheckedAllFiles = (checked: boolean) => {
    setCheckedAll(checked);
    setMultiRecord(currentFolders?.files!);
  };
  const handleChecked = (product: IFile | null, checked: boolean) => {
    if (checked) {
      setMultiRecord([...multiRecord, product!]);
    } else {
      const newMultiRecord = multiRecord?.filter(file => file != product);
      setMultiRecord(newMultiRecord);
    }
  };
  const handleUploadRawImage = (files: File[]) => {
    if (!files) return;
    const file = files[0];
    console.log("file", file);
    //add to serve
  };
  const handleMoveFileSelected = () => {
    setCurrentFolder(currentFolders);
    setOpenDialogMoveTo(true);
    //move all file on display
  };
  const handleDeleteFileSelected = () => {
    setCurrentFolder(currentFolders);
    setOpenDialogDelete(true);
    //delete all file on display
  };
  const handleChangePage = (newPage: number) => {
    console.log("newPage", newPage);
    setPage(newPage);
  };
  return (
    <>
      <AllFilesContainer>
        <Title>
          Files in File library({currentFolders?.files?.length || 0})
        </Title>
        <WrapperCheckBox>
          <Checkbox
            primary
            label={`${
              totalSelected > 0
                ? `${totalSelected}/${currentFolders?.files?.length} selected`
                : "Select all"
            }`}
            initialCheck={checkedAll}
            onChange={handleCheckedAllFiles}
          />
          <ButtonWrapper active={checkedAll || multiRecord?.length > 1}>
            <Button onClick={handleMoveFileSelected} variant="primary">
              Move to
            </Button>
            <Button onClick={handleDeleteFileSelected} variant="primary">
              Delete
            </Button>
          </ButtonWrapper>
        </WrapperCheckBox>
        <PaginationWrapper>
          <Pagination
            sizePerPage={SIZE_TO_DISPLAY}
            page={page}
            totalSize={10}
            onPageChange={handleChangePage}
          />
        </PaginationWrapper>

        {currentFolders?.files?.length! > 0 ? (
          <FileList>
            {currentFolders?.files?.map(file => (
              <DetailFile
                onClickSetting={handleClickSetting}
                isChecked={checkedAll}
                onChecked={handleChecked}
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
      <DialogMoveTo
        currentFolder={currentFolder}
        files={multiRecord}
        open={openDialogMoveTo}
        onClose={() => setOpenDialogMoveTo(false)}
      />
      <DialogDelete
        currentFolder={currentFolder}
        files={multiRecord}
        open={openDialogDelete}
        onClose={() => setOpenDialogDelete(false)}
      />
      <DialogPreview
        listFiles={currentFolders?.files || []}
        file={multiRecord[0]}
        open={openDialogPreview}
        onClose={() => setOpenDialogPreview(false)}
      />
    </>
  );
};

export default AllFiles;
const listFolders: IFolder[] = [
  {
    name: "My folder",
    icon: IconDemo,
    _id: randomId(),
    totals: 28,
    files: [
      {
        _id: randomId(),
        fileId: "1203814",
        name: "My folder candy.png",
        resolution: "800 x 450 @ 96 dpi",
        size: "117.05 KB / 8.33x4.69",
        type: "image/jpeg",
        image: {
          default: ImageProduct,
        },
      },
      {
        _id: randomId(),
        fileId: "1203814",
        name: "My folder candy-2.jpg",
        resolution: "800 x 450 @ 96 dpi",
        size: "117.05 KB / 8.33x4.69",
        type: "image/jpeg",
        image: {
          default: ImageProduct,
        },
      },
    ],
    children: [
      {
        name: "My folder 1",
        icon: IconDemo,
        _id: randomId(),
        totals: 28,
      },
      {
        name: "My folder 2",
        icon: IconDemo,
        _id: randomId(),
        totals: 28,
        files: [
          {
            _id: randomId(),
            fileId: "1203814",
            name: "My folder 2.jpg",
            resolution: "800 x 450 @ 96 dpi",
            size: "117.05 KB / 8.33x4.69",
            type: "image/jpeg",
            image: {
              default: ImageProduct,
            },
          },
          {
            _id: randomId(),
            fileId: "1203814",
            name: "My folder 2-1.jpg",
            resolution: "800 x 450 @ 96 dpi",
            size: "117.05 KB / 8.33x4.69",
            type: "image/jpeg",
            image: {
              default: ImageProduct,
            },
          },
        ],
        children: [
          {
            name: "My folder 2.1",
            icon: IconDemo,
            _id: randomId(),
            totals: 28,
          },
        ],
      },
    ],
  },
  {
    name: "Clothing",
    icon: IconDemo,
    _id: randomId(),
    totals: 18,
  },
];
const currentFolders: IFolder = {
  name: "File library",
  icon: IconDemo,
  _id: randomId(),
  totals: 28,
  files: [
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
  ],
  children: listFolders,
};
