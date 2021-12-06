import { useEffect, useState, useCallback, useMemo } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import { IGetAllNotification, INotification, IRootState } from "common/typings";
import {
  getQueryFromLocation,
  shouldDecreasePageIndex,
  textWithLimitWords,
} from "common/functions";
import { usePage } from "common/hooks/usePage";

import AlertDialog from "components/AlertDialog";
import { AddButton } from "components/Dialog/components/AddButton";
import SearchBox from "components/SearchboxTable";

import Table, { IColumns } from "designs/Table";
import IconButton from "designs/IconButton";

import { setBreadcrumb } from "redux/actions/_config";
import { resetAction } from "redux/actions/common";
import {
  deleteNotificationById,
  getAllNotification,
} from "redux/actions/notificationApi";
import { getAllTypeUser } from "redux/actions/types";

import { PERMISSION } from "constants/users";
import Dialog from "./Dialog";

const SIZE_PER_PAGE = 10;

const NotificationInfo: React.FC<RouteComponentProps> = ({ location }) => {
  const {
    allNotification: { results = [], totalCount },
  } = useSelector((state: IRootState) => state.notificationApi);
  const { actionSuccess } = useSelector((state: IRootState) => state.common);
  const dispatch = useDispatch();

  const [page, setPage] = usePage(getQueryFromLocation(location)?.page || 1);

  const [isRemoveAction, setIsRemoveAction] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");

  const getAllNotificationAPI = (name = "") => {
    const payload: IGetAllNotification = {
      page: page - 1,
      size: SIZE_PER_PAGE,
    };

    if (name) {
      payload.filterNotification = { content: name };
    }

    dispatch(getAllNotification(payload));
  };

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
    if (keyword) {
      getAllNotificationAPI(keyword);
    } else {
      getAllNotificationAPI();
    }
  }, [actionSuccess]);

  useEffect(() => {
    setupBreadcrumb();
    getAllNotificationAPI();
    // get api for dialog
    dispatch(getAllTypeUser({}));
  }, []);

  const setupBreadcrumb = () => {
    dispatch(
      setBreadcrumb([
        {
          name: "Thông tin khác",
        },
        {
          name: "Thông báo",
        },
      ]),
    );
  };

  useEffect(() => {
    getAllNotificationAPI(keyword);
  }, [page]);

  const handleFetchData = (text: string) => {
    setKeyword(text);
    if (page > 1) {
      setPage(1);
    } else {
      getAllNotificationAPI(text);
    }
  };

  const handleDelete = (record: INotification) => {
    dispatch(deleteNotificationById({ id: record._id! }));
  };

  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const renderAction = (record: INotification) => {
    return (
      <div className="flex flex-row justify-end gap-1">
        <Dialog
          ButtonMenu={<IconButton svgName="common/edit" title="Chỉnh sửa" />}
          editField={record}
        />
        <AlertDialog
          ButtonMenu={<IconButton svgName="common/delete" title="Xoá" />}
          title="Xóa thông báo"
          content={`Bạn có chắc chắn muốn xoá thông báo: ${record.title} không?`}
          onConfirm={() => handleDelete(record)}
        />
      </div>
    );
  };

  const columns: IColumns = useMemo(() => {
    return [
      {
        text: "Tiêu đề thông báo",
        dataField: "title",
      },
      {
        text: "Mô tả thông báo",
        dataField: "content",
        formatter: (content: string) => textWithLimitWords(content, 30, "..."),
      },
      {
        text: "Loại thành viên ",
        dataField: "permission",
        formatter: (permission: string) => PERMISSION[permission]?.name || "",
      },
      {
        text: "Ngày tạo",
        dataField: "createdAt",
        formatter: (createdAt: Date) => dayjs(createdAt).format("DD/MM/YYYY"),
      },
      {
        text: "Hành động",
        dataField: "actions",
        formatter: (cell: null, record: INotification) => renderAction(record),
      },
    ];
  }, []);

  return (
    <>
      <div className="flex flex-col-reverse items-end justify-between gap-2 mb-3 phone:items-center phone:flex-row">
        <Dialog
          ButtonMenu={
            <AddButton className="w-full phone:w-auto">
              Thêm thông báo
            </AddButton>
          }
        />
        <div className="max-w-full w-26">
          <SearchBox onFetchData={handleFetchData} />
        </div>
      </div>
      <Table
        isRemote
        isEmptyData={totalCount === 0}
        columns={columns}
        data={results}
        page={page}
        totalSize={totalCount}
        sizePerPage={SIZE_PER_PAGE}
        onPageChange={handleChangePage}
      />
    </>
  );
};

export default withRouter(NotificationInfo);
