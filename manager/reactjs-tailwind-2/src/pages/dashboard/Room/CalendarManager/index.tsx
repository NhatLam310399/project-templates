/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/reducers";
import AlertDialog from "components/AlertDialog";
import IconButton from "designs/IconButton";
import {
  IClosingTime,
  IGetAllClosingTime,
  IGetKaraokeByBoss,
  IGetRoomByKaraokeId,
  IRoom,
} from "common/typings";
import Table, { IColumns } from "designs/Table";
import {
  getAllClosingTime,
  deleteClosingTimeById,
} from "redux/actions/closingTime";
import { resetAction } from "redux/actions/common";
import { shouldDecreasePageIndex } from "common/functions";
import { setBreadCrumb } from "redux/actions/_config";
import { PATH } from "constants/routes";
import { AddButton } from "components/Dialog";
import { getKaraokeByBoss } from "redux/actions/place";
import { getRoomByKaraokeId } from "redux/actions/room";
import { useHistory } from "react-router";
import RoomManagerDialog from "./components/Dialog";

const SIZE_PER_PAGE = 10;
const classNavigation = "block w-full font-bold text-lg leading-none";

interface ICalendarProps {}

const CalendarManager: React.FC<ICalendarProps> = props => {
  const history = useHistory();

  const [page, setPage] = useState<number>(1);
  const { place } = useSelector((state: IRootState) => state.place);
  const { currentUser } = useSelector((state: IRootState) => state.auth);
  const { actionSuccess, isLoading } = useSelector(
    (state: IRootState) => state.common,
  );
  const {
    allClosingTime: { results: allClosingTime, totalCount },
  } = useSelector((state: IRootState) => state.closingTime);
  const dispatch = useDispatch();
  const [isRemoveAction, setIsRemoveAction] = useState<boolean>(false);

  const getKaraokeByBossAPI = () => {
    const idBoss: IGetKaraokeByBoss = {
      idUser: currentUser!.userId!.id,
    };
    dispatch(getKaraokeByBoss(idBoss));
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

  const getAllRoomAPI = () => {
    const payload: IGetRoomByKaraokeId = {
      id: place?._id || "",
    };
    dispatch(getRoomByKaraokeId(payload));
  };

  useEffect(() => {
    if (!place) {
      getKaraokeByBossAPI();
    } else {
      getAllClosingTimeAPI();
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

  useEffect(() => {
    if (place) {
      getAllClosingTimeAPI();
    }
  }, [page]);

  const handleChangePage = (nextPage: number) => {
    setPage(nextPage);
  };

  const handleConfirmRemove = (record: IClosingTime) => {
    dispatch(deleteClosingTimeById({ id: record._id || "" }));
    setIsRemoveAction(true);
  };

  const renderAction = (record: IClosingTime) => {
    return (
      <div className="flex gap-1.5 justify-end items-center ">
        <RoomManagerDialog
          editField={record}
          ButtonMenu={
            <IconButton
              svgName="common/edit"
              title="Ch???nh s???a l???ch t???m d???ng ho???t ?????ng"
            />
          }
        />
        <AlertDialog
          ButtonMenu={
            <IconButton
              svgName="common/delete"
              title="X??a l???ch t???m d???ng ho???t ?????ng"
            />
          }
          title="X??a l???ch t???m d???ng ho???t ?????ng"
          content="B???n c?? ch???c mu???n x??a l???ch t???m d???ng n??y kh??ng?"
          onConfirm={() => handleConfirmRemove(record)}
        />
      </div>
    );
  };
  const columns: IColumns = useMemo(
    () => [
      {
        text: "T??n ph??ng",
        dataField: "room",
        formatter: (rooms: IRoom[]) => rooms.map(room => room.name).join(", "),
      },
      {
        text: "Ng??y d???ng ho???t ?????ng",
        dataField: "dayOffStart",
        formatter: (dayOffStart: Date) =>
          dayjs(dayOffStart).format("DD/MM/YYYY"),
      },
      {
        text: "H??nh ?????ng",
        dataField: "actions",
        formatter: (_: string, record: IClosingTime) => renderAction(record),
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
          name: "Qu???n l?? ph??ng",
          path: "",
        },
      ]),
    );
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap phone:flex-nowrap items-center justify-between gap-2">
        <div className="flex gap-2">
          <div className="w-15 max-w-full">
            <button
              type="button"
              className={`${classNavigation} text-body hover:text-primary text-xl`}
              onClick={() => {
                history.push(`${PATH.ROOM}?q=room`);
              }}
            >
              <p className="mb-1">Ph??ng</p>
            </button>
          </div>
          <div className="w-15 max-w-full">
            <div className={`${classNavigation} text-xl`}>
              <p className="mb-1">Qu???n l?? l???ch</p>
              <div className="w-13 max-w-full h-0.5 bg-primary" />
            </div>
          </div>
        </div>
        <div className="w-25">
          <RoomManagerDialog
            ButtonMenu={<AddButton>Th??m l???ch d???ng</AddButton>}
          />
        </div>
      </div>
      <Table
        isEmptyData={!isLoading && totalCount === 0}
        sizePerPage={SIZE_PER_PAGE}
        columns={columns}
        data={allClosingTime}
        page={page}
        totalSize={totalCount}
        isRemote
        onPageChange={handleChangePage}
      />
    </div>
  );
};
export default CalendarManager;
