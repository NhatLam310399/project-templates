import React, { useCallback, useEffect, useMemo, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { IUser, IGetAllUser, ISetIsHighlightForUser } from "common/typings";
import { shouldDecreasePageIndex, renderLocation } from "common/functions";
import { getQueryFromLocation } from "common/functions/route/getQueryFromLocation";
import { usePage } from "common/hooks/usePage";

import AlertDialog from "components/AlertDialog";
import { AddButton } from "components/Dialog/components/AddButton";

import Table, { IColumns } from "designs/Table";
import Avatar from "designs/Avatar";
import IconButton from "designs/IconButton";

import { setBreadcrumb } from "redux/actions/_config";
import { resetAction } from "redux/actions/common";
import { getAllUser, setIsHighlightForUser } from "redux/actions/users";
import { IRootState } from "redux/reducers";

import Dialog from "./Dialog";

const SIZE_PER_PAGE = 10;

const HotStaffPages: React.FC<RouteComponentProps> = ({ location }) => {
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page || 1);
  const [isRemoveAction, setIsRemoveAction] = useState<boolean>(false);

  const dispatch = useDispatch();
  const {
    users: { results: listUsers = [], totalCount },
  } = useSelector((state: IRootState) => state.users);
  const { actionSuccess } = useSelector((state: IRootState) => state.common);

  useEffect(() => {
    setupBreadcrumb();
    getAllUserAPI();
  }, []);

  const setupBreadcrumb = () => {
    dispatch(
      setBreadcrumb([
        {
          name: "Cài đặt hệ thống",
        },
        {
          name: "Nhân viên nổi bật",
        },
      ]),
    );
  };

  useEffect(() => {
    getAllUserAPI();
  }, [location]);

  useEffect(() => {
    if (!actionSuccess) return;
    dispatch(resetAction());
    setIsRemoveAction(false);
    if (
      isRemoveAction &&
      shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)
    ) {
      setPage(page - 1);
      // Because of when you setPage, location will be changed
      // so useEffect has Api caller in top will be call
      return;
    }
    getAllUserAPI();
  }, [actionSuccess]);

  const getAllUserAPI = () => {
    const payload: IGetAllUser = {
      filterUser: {
        highlight: true,
      },
      page: page - 1,
      size: SIZE_PER_PAGE,
    };
    dispatch(getAllUser(payload));
  };

  const handleDelete = (record: IUser) => {
    const payload: ISetIsHighlightForUser = {
      id: record._id!,
      isHighlight: false,
    };
    dispatch(setIsHighlightForUser(payload));
    setIsRemoveAction(true);
  };

  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const renderAction = (record: IUser) => {
    return (
      <div className="flex items-center justify-end gap-1">
        <AlertDialog
          ButtonMenu={
            <IconButton
              svgName="common/delete"
              title="Xoá khỏi danh sách nổi bật"
            />
          }
          title="Xoá nhân viên nổi bật"
          content="Bạn có chắc chắn muốn xoá tài khoản này không?"
          onConfirm={() => handleDelete(record)}
        />
      </div>
    );
  };
  const columns: IColumns = useMemo(
    () => [
      {
        text: "Avatar",
        dataField: "urlAvt",
        headerStyle: () => ({
          width: "10%",
        }),
        formatter: (field: IUser) => (
          <Avatar src={field?.urlAvt?.small || field?.urlAvt?.default || ""} />
        ),
      },
      {
        text: "Họ và tên",
        dataField: "displayName",
      },
      {
        text: "Địa chỉ",
        dataField: "location",
        formatter: (_: unknown, field: IUser) =>
          renderLocation([
            field.ward?.name,
            field.district?.name,
            field.province?.name,
          ]),
      },
      {
        text: "Số điện thoại",
        dataField: "phoneNumber",
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
    <div>
      <div className="grid grid-cols-1 mb-3 laptop:grid-cols-12 phone:grid-cols-6">
        <div className="col-span-2">
          <Dialog ButtonMenu={<AddButton>Thêm nhân viên</AddButton>} />
        </div>
      </div>

      <Table
        isEmptyData={totalCount === 0}
        isRemote
        data={listUsers}
        columns={columns}
        totalSize={totalCount}
        page={page}
        onPageChange={handleChangePage}
      />
    </div>
  );
};
export default withRouter(HotStaffPages);
