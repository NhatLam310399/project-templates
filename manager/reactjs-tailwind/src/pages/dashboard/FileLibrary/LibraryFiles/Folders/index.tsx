import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import DialogFolder from "./DialogCreateOrEdit";
import DialogDelete from "./DialogDelete";
import DialogMoveTo from "./DialogMoveTo";
import {
  FoldersContainer,
  Title,
  FolderList,
  Text,
  ShowMore,
  Icon,
} from "./styles";
import { randomId } from "common/functions";
import { PATH } from "common/constants/routes";

import SVG from "designs/SVG";
import Folder, { IAction } from "designs/cards/Folder";
import CreateFolder from "designs/cards/CreateFolder";

import { setBreadcrumb } from "redux/actions/_config";
import { step } from "redux/actions/fileLibrary";

import { IBreadcrumb, IFolder, IRootState } from "typings";

import IconDemo from "assets/images/filesLibrary/folder-demo-icon.jpg";
import ImageProduct from "assets/images/filesLibrary/product-demo.png";

interface IFoldersProps {}

const Folders: React.FC<IFoldersProps> = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { breadcrumb = [] } = useSelector((state: IRootState) => state._config);
  const [breadcrumbs, setBreadcrumbs] = useState<IBreadcrumb>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openDialogMoveTo, setOpenDialogMoveTo] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [currentRecord, setCurrentRecord] = useState<IFolder | null>(null);
  const [record, setRecord] = useState<IFolder | null>(null);

  useEffect(() => {
    //when we have API, we replace currentFolder to folder got from API
    setCurrentRecord(currentFolder);
    const newBreadcrumb = {
      name: currentFolder?.name,
      href: `${PATH.FILE_LIBRARIES}`,
    };
    if (breadcrumb[0]?.name === currentFolder?.name) return;
    setBreadcrumbs([...breadcrumbs, newBreadcrumb]);
  }, []);

  useEffect(() => {
    if (breadcrumbs?.length > 0) {
      dispatch(setBreadcrumb(breadcrumbs));
    }
  }, [breadcrumbs]);

  const handleCreate = () => {
    setOpenDialog(true);
  };
  const handleClickSetting = (folder: IFolder, action: IAction) => {
    switch (action) {
      case "Edit":
        setRecord(folder);
        setOpenDialog(true);
        break;
      case "Delete":
        setRecord(folder);
        setOpenDialogDelete(true);
        break;
      case "Move to":
        setCurrentRecord(currentFolder);
        setRecord(folder);
        setOpenDialogMoveTo(true);
        break;
      case "Open":
        if (folder?.name === "Sample") {
          dispatch(step(3));

          return;
        }
        const newBreadcrumb = {
          name: folder?.name,
          href: `${PATH.FILE_LIBRARIES}?folder=${folder?._id}`,
        };
        setBreadcrumbs([...breadcrumbs, newBreadcrumb]);
        history.push(`${PATH.FILE_LIBRARIES}?folder=${folder?._id}`);
        setCurrentRecord(folder);
        //get Data for this folder
        break;
      default:
        break;
    }
  };
  const handleShowMore = () => {
    //if(folder list === total folder)
    // setShowMore(false) => collapse
    setShowMore(!showMore);
  };

  const total =
    (currentRecord?.children && currentRecord?.children?.length + 1) || 1;
  return (
    <>
      <FoldersContainer>
        <Title>Folder({total})</Title>
        <FolderList>
          <CreateFolder
            onClick={handleCreate}
            className="col-span-12 phone:col-span-6 laptop:col-span-3"
          />
          {breadcrumb?.length === 1 && (
            <Folder
              onClickSetting={handleClickSetting}
              sample
              setting={false}
              className="col-span-12 phone:col-span-6 laptop:col-span-3"
              folder={sampleFolder}
            />
          )}
          {currentRecord?.children?.map(folder => (
            <Folder
              className="col-span-12 phone:col-span-6 laptop:col-span-3"
              folder={folder}
              onClickSetting={handleClickSetting}
            />
          ))}
        </FolderList>
        <ShowMore onClick={handleShowMore}>
          <Icon>
            <SVG
              name="common/arrow-down"
              width="24px"
              height="24px"
              className={`transform duration-150 ${
                showMore ? "rotate-0" : "rotate-180"
              }`}
            />
          </Icon>
          <Text>{showMore ? "Show all folders" : "Hidden folders"}</Text>
        </ShowMore>
      </FoldersContainer>
      <DialogFolder
        currentFolder={currentRecord}
        folder={record}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
      <DialogDelete
        currentFolder={currentRecord}
        onClose={() => setOpenDialogDelete(false)}
        folder={record}
        open={openDialogDelete}
      />
      <DialogMoveTo
        currentFolder={currentRecord}
        onClose={() => setOpenDialogMoveTo(false)}
        folder={record}
        open={openDialogMoveTo}
      />
    </>
  );
};

export default Folders;

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
const currentFolder: IFolder = {
  name: "File library",
  icon: IconDemo,
  _id: randomId(),
  totals: 28,
  files: [
    {
      _id: randomId(),
      fileId: "1203814",
      name: "anhminhhoa1-main.jpg",
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
      name: "anhminhhoa2-main.jpg",
      resolution: "800 x 450 @ 96 dpi",
      size: "117.05 KB / 8.33x4.69",
      type: "image/jpeg",
      image: {
        default: ImageProduct,
      },
    },
  ],
  children: listFolders,
};
const sampleFolder: IFolder = {
  name: "Sample",
  icon: "assets/svg/fileLibrary/sample-folder.svg",
  _id: randomId(),
  totals: 22,
};
