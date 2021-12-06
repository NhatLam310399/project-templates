/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RouteComponentProps } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";

import { IBasicDocumentType, IGetAllOrders, IRootState } from "common/typings";
import {
  getQueryFromLocation,
  shouldDecreasePageIndex,
  renderMoneyValue,
} from "common/functions";
import { usePage } from "common/hooks/usePage";
import { PATH } from "constants/routes";

import SearchBoxTable from "components/SearchboxTable";
import AlertDialog from "components/AlertDialog";

import IconButton from "designs/IconButton";
import Table, { IColumns } from "designs/Table";

import { setBreadcrumb } from "redux/actions/_config";
import { getAllOrders, deleteOrder } from "redux/actions/orders";
import { resetAction } from "redux/actions/common";

const SIZE_PER_PAGE = 10;

const ExchangeHistory: React.FC<RouteComponentProps> = ({ location }) => {
  const {
    allOrders: { results: orders = [], totalCount = 0 },
  } = useSelector((state: IRootState) => state.orders);
  const { actionSuccess } = useSelector((state: IRootState) => state.common);
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);

  const [keyword, setKeyword] = useState<string>("");

  const dispatch = useDispatch();

  const getAllOrdersAPI = (text = "") => {
    const payload: IGetAllOrders = {
      filterOrder: {
        fullName: text,
      },
      page: page - 1,
      size: SIZE_PER_PAGE,
    };
    dispatch(getAllOrders(payload));
  };

  useEffect(() => {
    if (orders.length < 1) {
      getAllOrdersAPI();
    }
  }, []);

  useEffect(() => {
    getAllOrdersAPI(keyword);
  }, [page]);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      if (shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)) {
        setPage(page - 1);
        return;
      }
      getAllOrdersAPI();
    }
  }, [actionSuccess]);

  const handleDelete = (record: Record<any, any>) => {
    dispatch(deleteOrder({ id: record._id! }));
  };

  const renderAction = (record: Record<any, any>) => {
    return (
      <div className="flex items-center justify-end gap-1">
        <AlertDialog
          className="block leading-none"
          ButtonMenu={<IconButton title="Xoá" svgName="common/delete" />}
          title="Xóa giao dịch"
          content={`Bạn có chắc chắn muốn xóa giao dịch ${record.name} không?`}
          onConfirm={() => handleDelete(record)}
        />
      </div>
    );
  };
  const columns: IColumns = useMemo(
    () => [
      {
        text: "Tên tài liệu",
        dataField: "basicDocument",
        formatter: (basicDocument: IBasicDocumentType) => basicDocument.name,
      },
      {
        text: "Người mua",
        dataField: "fullName",
      },
      {
        text: "Hình thức thanh toán",
        dataField: "paymentMethods",
      },
      {
        text: "Giá",
        dataField: "totalPrice",
        formatter: (totalPrice: number) =>
          `${renderMoneyValue(totalPrice)} vnd`,
      },
      {
        text: "Ngày mua",
        dataField: "dateOfPayment",
        formatter: (date: Date) => dayjs(date).format("DD/MM/YYYY"),
      },
      {
        text: "Hành động",
        dataField: "actions",
        formatter: (text: string, record: Record<any, any>) =>
          renderAction(record),
      },
    ],
    [],
  );

  const setupBreadcrumb = () => {
    dispatch(
      setBreadcrumb([
        {
          name: "Tài liệu ngành",
          href: PATH.OVERVIEW,
        },
        {
          name: "Lịch sử giao dịch",
        },
      ]),
    );
  };

  useEffect(() => {
    setupBreadcrumb();
  }, []);

  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const handleFetchData = text => {
    setKeyword(text);
    if (page > 1) {
      setPage(1);
    } else {
      getAllOrdersAPI(text);
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-3">
        <div className="max-w-full w-26">
          <SearchBoxTable onFetchData={handleFetchData} />
        </div>
      </div>
      <Table
        isEmptyData={totalCount === 0}
        data={orders}
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
export default ExchangeHistory;
