/* eslint-disable react/destructuring-assignment */
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";

import {
  IUser,
  IGetAllUserHasPermissions,
  IDeleteUser,
  ICustomSizeImages,
} from "common/typings";
import {
  getQueryFromLocation,
  shouldDecreasePageIndex,
} from "common/functions";
import { usePage } from "common/hooks/usePage";

import SearchBoxTable from "components/SearchboxTable";
import { AddButton } from "components/Dialog/components/AddButton";
import AlertDialog from "components/AlertDialog";

import Table, { IColumns } from "designs/Table";
import Avatar from "designs/Avatar";
import Tag from "designs/Tag";
import IconButton from "designs/IconButton";

import { getAllUserHasPermissions, deleteUser } from "redux/actions/users";
import { IRootState } from "redux/reducers";
import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";

import Dialog from "./Dialog";

const SIZE_PER_PAGE = 10;

const SystemStaff: React.FC<RouteComponentProps> = ({ location }) => {
  const dispatch = useDispatch();
  const {
    users: { results: listUsers = [], totalCount },
  } = useSelector((state: IRootState) => state.users);
  const { actionSuccess } = useSelector((state: IRootState) => state.common);

  const [keyword, setKeyword] = useState<string>("");
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page || 1);
  const [isRemoveAction, setIsRemoveAction] = useState<boolean>(false);

  useEffect(() => {
    setupBreadcrumb();
  }, []);

  const setupBreadcrumb = () => {
    dispatch(
      setBreadcrumb([
        {
          name: "Quản lý người dùng",
        },
        {
          name: "Nhân viên hệ thống",
        },
      ]),
    );
  };

  useEffect(() => {
    getAllUserHasPermissionsAPI();
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
      getAllUserHasPermissionsAPI();
    }
  }, [actionSuccess]);

  const getAllUserHasPermissionsAPI = (phone = "") => {
    const payload: IGetAllUserHasPermissions = {
      permissions: ["MANAGER"],
      page: page - 1,
      size: SIZE_PER_PAGE,
      filterUser: {
        phoneNumber: phone || keyword,
      },
    };
    dispatch(getAllUserHasPermissions(payload));
  };

  const handleDelete = (record: IUser) => {
    const payload: IDeleteUser = {
      id: record._id || "",
    };
    dispatch(deleteUser(payload));
    setIsRemoveAction(true);
  };
  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const handleFetchData = text => {
    setKeyword(text);
    if (page > 1) {
      setPage(1);
    } else {
      getAllUserHasPermissionsAPI(text);
    }
  };

  const renderAction = (record: IUser) => {
    return (
      <div className="flex justify-end gap-1">
        <Dialog
          ButtonMenu={<IconButton svgName="common/edit" title="Chỉnh sửa" />}
          isEdit
          editField={record}
        />
        <AlertDialog
          ButtonMenu={<IconButton svgName="common/delete" title="Xoá" />}
          title="Xóa tài khoản"
          content={`Bạn có chắc chắn muốn xoá tài khoản: ${record.username} không?`}
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
        formatter: (urlAvt: ICustomSizeImages) => (
          <Avatar src={urlAvt?.small || urlAvt?.default} />
        ),
      },
      {
        text: "Họ và tên",
        dataField: "displayName",
      },
      {
        text: "Email",
        dataField: "email",
      },
      {
        text: "Số điện thoại",
        dataField: "phoneNumber",
      },
      {
        text: "Tình trạng",
        dataField: "enabled",
        formatter: (enabled: boolean) => {
          return enabled ? (
            <Tag active>Hoạt động</Tag>
          ) : (
            <Tag active={false}>Bị khoá</Tag>
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
    <div>
      <div className="flex flex-wrap items-center justify-between gap-1 mb-3">
        <Dialog ButtonMenu={<AddButton>Thêm nhân viên hệ thống</AddButton>} />
        <div className="max-w-full w-26">
          <SearchBoxTable
            onFetchData={handleFetchData}
            placeholder="Tìm kiếm theo SĐT"
          />
        </div>
      </div>
      <Table
        isEmptyData={totalCount === 0}
        data={listUsers}
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
export default withRouter(SystemStaff);
