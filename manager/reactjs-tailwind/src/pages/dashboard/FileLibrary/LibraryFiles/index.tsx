import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import RecentlyUsedFiles from "./RecentlyUsedFiles";
import Folders from "./Folders";
import AllFiles from "./AllFiles";
import { useQuery } from "hooks/useQuery";
import FileLibraryLayout from "layouts/FileLibrary";
import { setBreadcrumb } from "redux/actions/_config";
import { IRootState } from "typings";

import {} from "./styles";

interface IFileLibraryProps {}
interface IFormValue {
  filter?: string;
}
const FileLibrary: React.FC<IFileLibraryProps> = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const query = useQuery();
  const { breadcrumb = [] } = useSelector((state: IRootState) => state._config);
  const searchText = query.get("search");
  const filter = query.get("filter");
  const folder = query.get("folder");

  useEffect(() => {
    if (query) {
      console.log("searchText", searchText);
      console.log("filter", filter);
      console.log("folder", folder);
      //call api has filter for page in here
      //folder === null mean is call api for file Library
    }
  }, [query]);

  const handleClick = (index: number) => {
    const breadcrumbs = [...breadcrumb];
    breadcrumbs.splice(index + 1);
    dispatch(setBreadcrumb(breadcrumbs));
  };
  return (
    <FileLibraryLayout onClickBreadcrumb={handleClick}>
      <>
        <RecentlyUsedFiles />
        <Folders />
        <AllFiles />
      </>
    </FileLibraryLayout>
  );
};

export default FileLibrary;
