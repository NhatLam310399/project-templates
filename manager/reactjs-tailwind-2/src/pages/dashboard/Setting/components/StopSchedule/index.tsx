import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

import {
  IClosingTime,
  IGetAllClosingTime,
  IGetRoomByKaraokeId,
} from "common/typings";
import { shouldDecreasePageIndex } from "common/functions";

import AlertDialog from "components/AlertDialog";
import { AddButton } from "components/Dialog";

import Table, { IColumns } from "designs/Table";
import IconButton from "designs/IconButton";

import { resetAction } from "redux/actions/common";
import { IRootState } from "redux/reducers";
import {
  getAllClosingTime,
  deleteClosingTimeById,
} from "redux/actions/closingTime";
import { getRoomByKaraokeId } from "redux/actions/room";

import ClosingTimeDialog from "./Dialog";

const SIZE_PER_PAGE = 10;
interface IStopSchedule {}

const StopSchedule: React.FC<IStopSchedule> = props => {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const {
    allClosingTime: { results = [], totalCount = 0 },
  } = useSelector((state: IRootState) => state.closingTime);
  const { place } = useSelector((state: IRootState) => state.place);
  const [isRemoveAction, setIsRemoveAction] = useState<boolean>(false);
  const { actionSuccess } = useSelector((state: IRootState) => state.common);

  useEffect(() => {
    if (place) {
      getAllClosingTimeAPI();
    }
  }, [page, place]);

  useEffect(() => {
    if (place) {
      getAllRoomAPI();
    }
  }, [place]);

  useEffect(() => {
    if (actionSuccess) {
      if (
        isRemoveAction &&
        shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)
      ) {
        setPage(page - 1);
        return;
      }
      setTimeout(() => {
        getAllClosingTimeAPI();
      }, 500);
      dispatch(resetAction());
      setIsRemoveAction(false);
    }
  }, [actionSuccess]);

  const getAllRoomAPI = () => {
    const payload: IGetRoomByKaraokeId = {
      id: place?._id || "",
    };
    dispatch(getRoomByKaraokeId(payload));
  };

  const getAllClosingTimeAPI = () => {
    const payload: IGetAllClosingTime = {
      page: page - 1,
      size: SIZE_PER_PAGE,
      filterClosingTime: {
        karaokeId: place?._id || "",
      },
    };
    dispatch(getAllClosingTime(payload));
  };

  const handleChangePage = (nextPage: number) => {
    setPage(nextPage);
  };
  const handleConfirmRemove = (record: IClosingTime) => {
    dispatch(deleteClosingTimeById({ id: record._id || "" }));
    setIsRemoveAction(true);
  };

  const renderAction = (record: IClosingTime) => {
    return (
      <div className="flex items-center justify-end gap-1.5">
        <AlertDialog
          ButtonMenu={<IconButton svgName="common/delete" title="Xóa" />}
          title="Xóa lịch dừng hoạt động"
          content="Bạn có chắc chắn muốn xóa lịch dừng hoạt động này không ?"
          onConfirm={() => handleConfirmRemove(record)}
        />
      </div>
    );
  };
  const columns: IColumns = useMemo(
    () => [
      {
        text: "Ngày dừng hoạt động",
        dataField: "dayOffStart",
        formatter: (dayOffStart: Date) =>
          dayjs(dayOffStart).format("DD/MM/YYYY"),
      },
      {
        text: "Hành động",
        dataField: "actions",
        formatter: (_: string, record: IClosingTime) => renderAction(record),
      },
    ],
    [],
  );
  return (
    <div>
      <div className="w-24 mb-4">
        <ClosingTimeDialog
          editField={null}
          ButtonMenu={<AddButton>Thêm lịch dừng hoạt động</AddButton>}
        />
      </div>
      <Table
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

export default StopSchedule;
