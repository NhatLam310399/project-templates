/* eslint-disable react/destructuring-assignment */
import { useCallback, useEffect, useMemo, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";

import {
  getQueryFromLocation,
  shouldDecreasePageIndex,
} from "common/functions";
import { IUser, IDeleteUser, IGetAllCareStaff } from "common/typings";
import { usePage } from "common/hooks/usePage";

import AlertDialog from "components/AlertDialog";
import IconButton from "designs/IconButton";
import Table, { IColumns } from "designs/Table";
import Tag from "designs/Tag";

import { setBreadcrumb } from "redux/actions/_config";
import { resetAction } from "redux/actions/common";
import { deleteCareStaffById, getAllCareStaff } from "redux/actions/careStaff";
import { IRootState } from "redux/reducers";

const SIZE_PER_PAGE = 10;

const CareStaffsList: React.FC<RouteComponentProps> = ({ location }) => {
  const dispatch = useDispatch();
  const {
    allCareStaff: { results: listCareStaff = [], totalCount },
  } = useSelector((state: IRootState) => state.careStaff);
  const { actionSuccess } = useSelector((state: IRootState) => state.common);

  const [page, setPage] = usePage(getQueryFromLocation(location)?.page || 1);
  const [isRemoveAction, setIsRemoveAction] = useState<boolean>(false);

  useEffect(() => {
    getAllCareStaffAPI();
    setupBreadcrumb();
  }, []);

  const setupBreadcrumb = () => {
    dispatch(
      setBreadcrumb([
        {
          name: "Chăm sóc khách hàng",
        },
      ]),
    );
  };

  useEffect(() => {
    getAllCareStaffAPI();
  }, [page]);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      setIsRemoveAction(false);
      if (
        isRemoveAction &&
        shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)
      ) {
        setPage(page - 1);
        return;
      }
      getAllCareStaffAPI();
    }
  }, [actionSuccess]);

  const getAllCareStaffAPI = (name = "") => {
    const payload: IGetAllCareStaff = {
      filterCareStaff: {
        staff: name,
      },
      page: page - 1,
      size: SIZE_PER_PAGE,
    };
    dispatch(getAllCareStaff(payload));
  };
  const handleDelete = (record: IUser) => {
    const payload: IDeleteUser = {
      id: record._id || "",
    };
    dispatch(deleteCareStaffById(payload));
    setIsRemoveAction(true);
  };
  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const renderAction = (record: IUser) => {
    return (
      <div className="flex justify-end gap-1">
        <AlertDialog
          ButtonMenu={<IconButton svgName="common/delete" title="Xoá" />}
          title="Xóa tài khoản"
          content="Bạn có chắc chắn muốn xoá thông tin chăm sóc khách hàng này không?"
          onConfirm={() => handleDelete(record)}
        />
      </div>
    );
  };
  const columns: IColumns = useMemo(
    () => [
      {
        text: "Tên nhân viên chăm sóc",
        dataField: "staff.displayName",
      },
      {
        text: "Cơ sở chăm sóc",
        dataField: "company.name",
      },
      {
        text: "Ngày bắt đầu chăm sóc",
        dataField: "createdAt",
        formatter: (createdAt: Date) => dayjs(createdAt).format("DD/MM/YYYY"),
      },
      {
        text: "Tình trạng",
        dataField: "enabled",
        formatter: (enabled: boolean) => {
          return enabled ? (
            <Tag active>Đã chăm sóc</Tag>
          ) : (
            <Tag active={false}>Chưa chăm sóc</Tag>
          );
        },
      },
      {
        text: "Hành động ",
        dataField: "actions",
        formatter: (cell: null, record: IUser) => renderAction(record),
      },
    ],
    [],
  );

  return (
    <div className="mt-2">
      <Table
        data={listCareStaff}
        isEmptyData={totalCount === 0}
        columns={columns}
        totalSize={totalCount}
        sizePerPage={SIZE_PER_PAGE}
        page={page}
        onPageChange={handleChangePage}
        isRemote
      />
    </div>
  );
};
export default withRouter(CareStaffsList);
