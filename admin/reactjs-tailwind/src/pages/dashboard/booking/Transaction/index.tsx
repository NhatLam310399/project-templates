import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";

import {
  getQueryFromLocation,
  shouldDecreasePageIndex,
} from "common/functions";
import { IBooking, IGetAllBooking, IRootState } from "common/typings";
import { usePage } from "common/hooks/usePage";

import SearchBoxTable from "components/SearchboxTable";
import AlertDialog from "components/AlertDialog";

import Table, { IColumns } from "designs/Table";
import IconButton from "designs/IconButton";

import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";
import { deleteBooking, getAllBooking } from "redux/actions/booking";

import BillDialog from "./Dialog";

const SIZE_PER_PAGE = 10;

const Bill: React.FC<RouteComponentProps> = ({ location }) => {
  const dispatch = useDispatch();

  const {
    booking: { results = [], totalCount = 0 },
  } = useSelector((state: IRootState) => state.booking);
  const { actionSuccess, isLoading } = useSelector(
    (state: IRootState) => state.common,
  );

  const [keyword, setKeyword] = useState<string>("");
  const [isRemoveAction, setIsRemoveAction] = useState<boolean>(false);
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page || 1);

  const getAllBookingAPI = (bookingCode = "") => {
    const payload: IGetAllBooking = {
      page: page - 1,
      size: SIZE_PER_PAGE,
      filterBooking: {
        bookingCode: bookingCode || undefined,
      },
    };

    dispatch(getAllBooking(payload));
  };

  useEffect(() => {
    getAllBookingAPI();
  }, []);

  useEffect(() => {
    getAllBookingAPI(keyword);
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
        getAllBookingAPI(keyword);
      } else {
        getAllBookingAPI();
      }
    }
  }, [actionSuccess]);

  const handleFetchData = (text: string) => {
    setKeyword(text);
    if (page > 1) {
      setPage(1);
    } else {
      getAllBookingAPI(text);
    }
  };

  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const handleDelete = (record: IBooking) => {
    dispatch(deleteBooking({ id: record._id! }));
    setIsRemoveAction(true);
  };

  const renderAction = (record: IBooking) => {
    return (
      <div className="flex items-center justify-end gap-1">
        <BillDialog
          editField={record}
          ButtonMenu={
            <IconButton
              title="Xem"
              svgName="common/eye"
              className="block leading-none"
            />
          }
        />
        <AlertDialog
          className="block leading-none"
          ButtonMenu={<IconButton title="Xoá" svgName="common/delete" />}
          title="Xóa giao dịch"
          content="Bạn có chắc chắn muốn xóa giao dịch này không?"
          onConfirm={() => handleDelete(record)}
        />
      </div>
    );
  };

  const columns: IColumns = useMemo(
    () => [
      {
        text: "ID đặt phòng",
        dataField: "bookingCode",
      },
      {
        text: "Cơ sở đặt phòng",
        dataField: "place.name",
      },
      {
        text: "Phòng đặt",
        dataField: "room.name",
      },

      {
        text: "Hành động",
        dataField: "actions",
        formatter: (text: string, record: IBooking) => renderAction(record),
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
          name: "Thống kê giao dịch",
        },
      ]),
    );
  };

  useEffect(() => {
    setupBreadcrumb();
  }, []);

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
export default Bill;
