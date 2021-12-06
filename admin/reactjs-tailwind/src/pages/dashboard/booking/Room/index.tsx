/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";

import {
  ICustomSizeImages,
  IGetAllRoom,
  IRoom,
  IRootState,
} from "common/typings";
import { usePage } from "common/hooks/usePage";
import {
  getQueryFromLocation,
  shouldDecreasePageIndex,
  renderMoneyValue,
} from "common/functions";

import SearchBoxTable from "components/SearchboxTable";
import AlertDialog from "components/AlertDialog";

import Table, { IColumns } from "designs/Table";
import IconButton from "designs/IconButton";
import { SkeletonLogo } from "designs/Logo";

import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";
import { deleteRoomById, getAllRoom } from "redux/actions/room";

const SIZE_PER_PAGE = 10;

const Room: React.FC<RouteComponentProps> = ({ location }) => {
  const dispatch = useDispatch();

  const { actionSuccess, isLoading } = useSelector(
    (state: IRootState) => state.common,
  );
  const {
    rooms: { results = [], totalCount = 0 },
  } = useSelector((state: IRootState) => state.room);

  const [keyword, setKeyword] = useState<string>("");
  const [isRemoveAction, setIsRemoveAction] = useState<boolean>(false);
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page || 1);

  const getAllRoomAPI = (name = "") => {
    const payload: IGetAllRoom = {
      page: page - 1,
      size: SIZE_PER_PAGE,
      filterRoom: {
        name,
      },
    };
    dispatch(getAllRoom(payload));
  };

  useEffect(() => {
    getAllRoomAPI();
    setupBreadcrumb();
  }, []);

  useEffect(() => {
    getAllRoomAPI(keyword);
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
      if (keyword) {
        getAllRoomAPI(keyword);
      } else {
        getAllRoomAPI();
      }
    }
  }, [actionSuccess]);

  const handleFetchData = (text: string) => {
    setKeyword(text);
    if (page > 1) {
      setPage(1);
    } else {
      getAllRoomAPI(text);
    }
  };

  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const handleDelete = (record: IRoom) => {
    dispatch(deleteRoomById({ id: record._id! }));
    setIsRemoveAction(true);
  };

  const renderAction = (record: IRoom) => {
    return (
      <div className="flex items-center justify-end gap-1">
        <AlertDialog
          className="block leading-none"
          ButtonMenu={<IconButton title="Xoá" svgName="common/delete" />}
          title="Xóa phòng"
          content={`Bạn có chắc chắn muốn xóa phòng ${record.name} không?`}
          onConfirm={() => handleDelete(record)}
        />
      </div>
    );
  };
  const columns: IColumns = useMemo(
    () => [
      {
        text: "Hình ảnh",
        dataField: "image",
        headerStyle: () => ({ width: "10%" }),
        formatter: (image: ICustomSizeImages[]) => {
          return (
            <img
              src={image?.[0]?.small || image?.[0]?.default || SkeletonLogo}
              alt="Hình phòng"
              className="block object-cover w-6 h-3 rounded "
            />
          );
        },
      },
      {
        text: "Tên phòng",
        dataField: "name",
      },
      {
        text: "Tên cơ sở",
        dataField: "place.name",
      },

      {
        text: "Số khách",
        dataField: "amount",
      },
      {
        text: "Giá phòng",
        dataField: "price",
        formatter: (price: number) => {
          return `${renderMoneyValue(price)} vnd`;
        },
      },
      {
        text: "Hành động",
        dataField: "actions",
        formatter: (text: string, record: IRoom) => renderAction(record),
      },
    ],
    [],
  );

  const setupBreadcrumb = () => {
    dispatch(
      setBreadcrumb([
        {
          name: "Thông tin booking",
        },
        {
          name: "Thông tin phòng",
        },
      ]),
    );
  };

  return (
    <div>
      <div className="flex justify-end mb-3">
        <div className="max-w-full w-26">
          <SearchBoxTable onFetchData={handleFetchData} />
        </div>
      </div>
      <Table
        data={results}
        isEmptyData={!isLoading && totalCount === 0}
        columns={columns}
        page={page}
        onPageChange={handleChangePage}
        totalSize={totalCount}
        sizePerPage={SIZE_PER_PAGE}
        isRemote
      />
    </div>
  );
};
export default Room;
