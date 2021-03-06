/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useMemo, useCallback } from "react";
import { RouteComponentProps } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import {
  shouldDecreasePageIndex,
  getQueryFromLocation,
} from "common/functions";
import {
  ICustomSizeImages,
  IGetAllProject,
  IProjectType,
  IRootState,
} from "common/typings";
import { usePage } from "common/hooks/usePage";

import Table, { IColumns } from "designs/Table";
import IconButton from "designs/IconButton";

import { resetAction } from "redux/actions/common";
import { setBreadCrumb } from "redux/actions/_config";
import { deleteProject, getAllProject } from "redux/actions/project";

import { PATH } from "constants/routes";

import AlertDialog from "components/AlertDialog";
import { AddButton } from "components/Dialog";

import ProjectDiaLog from "./Dialog";

const SIZE_PER_PAGE = 10;

const Project: React.FC<RouteComponentProps> = ({ location }) => {
  const {
    allProject: { results, totalCount },
  } = useSelector((state: IRootState) => state.project);

  const { place } = useSelector((state: IRootState) => state.place);

  const { actionSuccess } = useSelector((state: IRootState) => state.common);
  const dispatch = useDispatch();

  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);

  const getAllProjectApi = () => {
    const payload: IGetAllProject = {
      filterProject: {
        company: place?._id,
      },
      page: page - 1,
      size: SIZE_PER_PAGE,
    };
    dispatch(getAllProject(payload));
  };

  useEffect(() => {
    if (place) {
      getAllProjectApi();
    }
  }, [page, place]);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      if (shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)) {
        setPage(page - 1);
        return;
      }
      getAllProjectApi();
    }
  }, [actionSuccess]);

  const handleDelete = (record: IProjectType) => {
    dispatch(deleteProject({ id: record._id || "" }));
  };

  const renderAction = (record: IProjectType) => {
    return (
      <div className="flex items-center justify-end gap-1.5">
        <ProjectDiaLog
          ButtonMenu={
            <IconButton svgName="common/edit" title="Ch???nh s???a d??? ??n" />
          }
          editField={record}
        />
        <AlertDialog
          ButtonMenu={<IconButton svgName="common/delete" title="X??a d??? ??n" />}
          title="X??a d??? ??n"
          content="B???n c?? ch???c mu???n x??a d??? ??n n??y kh??ng?"
          onConfirm={() => handleDelete(record)}
        />
      </div>
    );
  };
  const columns: IColumns = useMemo(
    () => [
      {
        text: "H??nh ???nh",
        dataField: "images",
        headerStyle: () => ({
          width: "15%",
        }),
        formatter: (images: ICustomSizeImages[]) => (
          <img
            src={images?.[0]?.small || images?.[0]?.default}
            alt="H??nh ???nh"
            className="rounded w-6 h-4 object-cover block"
          />
        ),
      },
      {
        text: "T??n d??? ??n",
        dataField: "name",
      },
      {
        text: "M?? t??? d??? ??n",
        dataField: "introduce",
      },
      {
        text: "H??nh ?????ng",
        dataField: "actions",
        formatter: (_: null, record: IProjectType) => renderAction(record),
      },
    ],
    [],
  );

  useEffect(() => {
    setupBreadCrumb();
  }, []);

  const setupBreadCrumb = () => {
    dispatch(
      setBreadCrumb([
        {
          name: "B???ng ??i???u khi???n",
          path: PATH.OVERVIEW,
        },
        {
          name: "Th??ng tin d??? ??n",
          path: PATH.PROJECT,
        },
      ]),
    );
  };

  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-end gap-1 mb-3">
        <ProjectDiaLog ButtonMenu={<AddButton>Th??m d??? ??n</AddButton>} />
      </div>
      <Table
        isEmptyData={totalCount === 0}
        sizePerPage={SIZE_PER_PAGE}
        columns={columns}
        data={results}
        page={page}
        totalSize={totalCount}
        isRemote
        onPageChange={handleChangePage}
      />
    </div>
  );
};
export default Project;
