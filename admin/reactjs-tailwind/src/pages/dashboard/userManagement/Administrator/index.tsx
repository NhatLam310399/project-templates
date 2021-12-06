/* eslint-disable react/destructuring-assignment */
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";

import {
  IUser,
  IGetAllUserHasPermissions,
  IDeleteUser,
  ICustomSizeImages,
} from "common/typings";
import { shouldDecreasePageIndex } from "common/functions";
import { usePage } from "common/hooks/usePage";
import { getQueryFromLocation } from "common/functions/route/getQueryFromLocation";

import SearchBoxTable from "components/SearchboxTable";
import AlertDialog from "components/AlertDialog";
import { AddButton } from "components/Dialog/components/AddButton";

import Table, { IColumns } from "designs/Table";
import Tag from "designs/Tag";
import Avatar from "designs/Avatar";
import IconButton from "designs/IconButton";

import { getAllUserHasPermissions, deleteUser } from "redux/actions/users";
import { IRootState } from "redux/reducers";
import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";

import Dialog from "./Dialog";

const SIZE_PER_PAGE = 10;

const Administrators: React.FC<RouteComponentProps> = ({ location }) => {
  const dispatch = useDispatch();
  const {
    users: { results: listUsers = [], totalCount },
  } = useSelector((state: IRootState) => state.users);
  const { actionSuccess, isLoading } = useSelector(
    (state: IRootState) => state.common,
  );

  const [page, setPage] = usePage(getQueryFromLocation(location)?.page || 1);
  const [isRemoveAction, setIsRemoveAction] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();

  const setupBreadcrumb = () => {
    dispatch(
      setBreadcrumb([
        {
          name: "Quản lý người dùng",
        },
        {
          name: "Quản trị viên",
        },
      ]),
    );
  };

  useEffect(() => {
    setupBreadcrumb();
  }, []);

  const getAllUserHasPermissionsAPI = (phoneNumber?: string) => {
    const payload: IGetAllUserHasPermissions = {
      permissions: ["ADMIN"],
      page: page - 1,
      size: SIZE_PER_PAGE,
      filterUser: {
        phoneNumber: phoneNumber || keyword,
      },
    };
    dispatch(getAllUserHasPermissions(payload));
  };

  useEffect(() => {
    getAllUserHasPermissionsAPI();
  }, [page]);

  useEffect(() => {
    // Get all user in one time
    getAllUserHasPermissionsAPI();
  }, []);

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

  const handleFetchData = (text = "") => {
    setKeyword(text);
    if (page > 1) {
      setPage(1);
    } else {
      getAllUserHasPermissionsAPI(text);
    }
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
        text: "Hành động",
        dataField: "actions",
        formatter: (_: null, record: IUser) => renderAction(record),
      },
    ],
    [],
  );
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-1 mb-3">
        <Dialog ButtonMenu={<AddButton>Thêm quản trị viên</AddButton>} />
        <div className="w-32 max-w-full">
          <SearchBoxTable
            onFetchData={handleFetchData}
            placeholder="Tìm kiếm theo SĐT"
          />
        </div>
      </div>
      <Table
        isEmptyData={!isLoading && totalCount === 0}
        isRemote
        data={listUsers}
        columns={columns}
        sizePerPage={SIZE_PER_PAGE}
        totalSize={totalCount}
        page={page}
        onPageChange={handleChangePage}
      />
    </div>
  );
};
export default withRouter(Administrators);
