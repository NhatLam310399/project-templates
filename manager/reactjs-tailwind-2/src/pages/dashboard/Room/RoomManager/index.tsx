/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useMemo, useState } from "react";

import IconButton from "designs/IconButton";
import {
  IRoom,
  IGetRoomByKaraokeId,
  ICustomSizeImages,
  IGetKaraokeByBoss,
} from "common/typings";
import Table, { IColumns } from "designs/Table";

import { useDispatch, useSelector } from "react-redux";
import { getRoomByKaraokeId, deleteRoomById } from "redux/actions/room";
import { resetAction } from "redux/actions/common";
import { setBreadCrumb } from "redux/actions/_config";
import { getKaraokeByBoss } from "redux/actions/place";
import { IRootState } from "redux/reducers";

import { shouldDecreasePageIndex, renderMoneyValue } from "common/functions";

import { PATH } from "constants/routes";
import { useHistory } from "react-router";

import { AddButton } from "components/Dialog";
import AlertDialog from "components/AlertDialog";
import RoomManagerDialog from "./components/Dialog";

const SIZE_PER_PAGE = 10;
const classNavigation = "block w-full font-bold text-lg leading-none";

interface IRoomManagerProps {}

const RoomManager: React.FC<IRoomManagerProps> = () => {
  const history = useHistory();

  const [page, setPage] = useState<number>(1);
  const { place } = useSelector((state: IRootState) => state.place);
  const { currentUser } = useSelector((state: IRootState) => state.auth);

  const [isRemoveAction, setIsRemoveAction] = useState<boolean>(false);
  const { actionSuccess, isLoading } = useSelector(
    (state: IRootState) => state.common,
  );
  const {
    rooms: { results: allRoom, totalCount },
  } = useSelector((state: IRootState) => state.room);
  const dispatch = useDispatch();

  const getKaraokeByBossAPI = () => {
    const idBoss: IGetKaraokeByBoss = {
      idUser: currentUser!.userId!.id,
    };
    dispatch(getKaraokeByBoss(idBoss));
  };

  useEffect(() => {
    if (!place) {
      getKaraokeByBossAPI();
    } else {
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
        getAllRoomAPI();
      }, 500);
      dispatch(resetAction());
      setIsRemoveAction(false);
    }
  }, [actionSuccess]);

  useEffect(() => {
    if (place) {
      getAllRoomAPI();
    }
  }, [page]);

  const getAllRoomAPI = () => {
    const payload: IGetRoomByKaraokeId = {
      id: place?._id || "",
      page: page - 1,
      size: SIZE_PER_PAGE,
    };
    dispatch(getRoomByKaraokeId(payload));
  };

  const handleChangePage = (nextPage: number) => {
    setPage(nextPage);
  };

  const handleConfirmRemove = (record: IRoom) => {
    dispatch(deleteRoomById({ id: record._id || "" }));
    setIsRemoveAction(true);
  };

  const renderAction = (record: IRoom) => {
    return (
      <div className="flex gap-1.5 justify-end items-center ">
        <RoomManagerDialog
          editField={record}
          ButtonMenu={
            <IconButton svgName="common/edit" title="Ch???nh s???a ph??ng" />
          }
        />
        <AlertDialog
          ButtonMenu={<IconButton svgName="common/delete" title="X??a ph??ng" />}
          title="X??a ph??ng"
          content="B???n c?? ch???c mu???n x??a ph??ng n??y kh??ng?"
          onConfirm={() => handleConfirmRemove(record)}
        />
      </div>
    );
  };
  const columns: IColumns = useMemo(
    () => [
      {
        text: "H??nh ???nh",
        dataField: "image",
        headerStyle: () => ({
          width: "20%",
        }),
        formatter: (image: ICustomSizeImages[]) => (
          <img
            src={image?.[0]?.small || image?.[0]?.default}
            alt="H??nh ???nh"
            className="w-6 h-4 object-cover block"
          />
        ),
      },
      {
        text: "T??n ph??ng",
        dataField: "name",
      },
      {
        text: "S??? kh??ch",
        dataField: "amount",
      },
      {
        text: "Gi?? ph??ng",
        dataField: "price",
        formatter: (price: number) => renderMoneyValue(price),
      },
      {
        text: "H??nh ?????ng",
        dataField: "actions",
        formatter: (_: string, record: IRoom) => renderAction(record),
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
            <div className={`${classNavigation} text-black text-xl`}>
              <p className="mb-1">Ph??ng</p>
              <div className="w-13 max-w-full h-0.5 bg-primary" />
            </div>
          </div>
          <div className="w-15 max-w-full">
            <button
              type="button"
              className={`${classNavigation} text-body text-xl hover:text-primary`}
              onClick={() => {
                history.push(`${PATH.ROOM}?q=calendar`);
              }}
            >
              <p className="mb-1">Qu???n l?? l???ch</p>
            </button>
          </div>
        </div>
        <div className="w-20">
          <RoomManagerDialog ButtonMenu={<AddButton>Th??m ph??ng</AddButton>} />
        </div>
      </div>
      <Table
        sizePerPage={SIZE_PER_PAGE}
        isEmptyData={!isLoading && totalCount === 0}
        columns={columns}
        data={allRoom}
        page={page}
        totalSize={totalCount}
        isRemote
        onPageChange={handleChangePage}
      />
    </div>
  );
};
export default RoomManager;
