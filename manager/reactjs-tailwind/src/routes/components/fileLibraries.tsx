import { lazy } from "react";
import { IRoutes } from "typings";
import { PATH } from "common/constants/routes";
import FileLibraryIcon from "icons/Dashboard/FileLibrary";

const FileLibrary = lazy(() => import("pages/dashboard/FileLibrary"));

export const fileLibrariesRoute: IRoutes = {
  name: "File Libraries",
  path: PATH.FILE_LIBRARIES,
  exact: true,
  Component: FileLibrary,
  isPrivate: true,
  Icon: <FileLibraryIcon />,
};
