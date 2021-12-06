/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";
import dayjs from "dayjs";

import {
  IGetAllTransaction,
  IRootState,
  ITransactionType,
} from "common/typings";
import {
  getQueryFromLocation,
  shouldDecreasePageIndex,
  renderMoneyValue,
} from "common/functions";
import { usePage } from "common/hooks/usePage";

import AlertDialog from "components/AlertDialog";
import SearchBoxTable from "components/SearchboxTable";

import Table, { IColumns } from "designs/Table";
import IconButton from "designs/IconButton";

import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";
import {
  deleteTransaction,
  getAllTransaction,
} from "redux/actions/transaction";

const SIZE_PER_PAGE = 10;

const ExchangeInfo: React.FC<RouteComponentProps> = ({ location }) => {
  const {
    allTransaction: { results, totalCount },
  } = useSelector((state: IRootState) => state.transaction);
  const { actionSuccess, isLoading } = useSelector(
    (state: IRootState) => state.common,
  );
  const dispatch = useDispatch();

  const [page, setPage] = usePage(getQueryFromLocation(location)?.page || 1);
  const [keyword, setKeyword] = useState<string>("");

  const getAllTransactionApi = (tradeName = "") => {
    const payload: IGetAllTransaction = {
      filterTransaction: {
        tradeName,
      },
      page: page - 1,
      size: SIZE_PER_PAGE,
    };
    dispatch(getAllTransaction(payload));
  };

  useEffect(() => {
    getAllTransactionApi();
  }, []);

  useEffect(() => {
    getAllTransactionApi(keyword);
  }, [page]);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      if (shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)) {
        setPage(page - 1);
        return;
      }
      if (keyword) {
        getAllTransactionApi(keyword);
      } else {
        getAllTransactionApi();
      }
    }
  }, [actionSuccess]);

  const handleFetchData = (text: string) => {
    setKeyword(text);
    if (page > 1) {
      setPage(1);
    } else {
      getAllTransactionApi(text);
    }
  };

  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const handleDelete = (record: ITransactionType) => {
    dispatch(deleteTransaction({ id: record._id! }));
  };

  const renderAction = (record: ITransactionType) => {
    return (
      <div className="flex items-center justify-end gap-1">
        <AlertDialog
          className="block leading-none"
          ButtonMenu={<IconButton title="Xoá" svgName="common/delete" />}
          title="Xóa thông tin giao dịch"
          content="Bạn có chắc chắn muốn xóa thông tin giao dịch này không?"
          onConfirm={() => handleDelete(record)}
        />
      </div>
    );
  };
  const columns: IColumns = useMemo(
    () => [
      {
        text: "Tên sản phẩm",
        dataField: "trade.name",
      },
      {
        text: "Người liên hệ",
        dataField: "userBuy.username",
      },
      {
        text: "Người bán",
        dataField: "companySell.name",
      },
      {
        text: "Giá",
        dataField: "price",
        formatter: (price: number) => {
          return `${renderMoneyValue(price)} vnd`;
        },
      },
      {
        text: "Ngày mua",
        dataField: "createdAt",
        formatter: (createdAt: Date) => dayjs(createdAt).format("DD/MM/YYYY"),
      },
      {
        text: "Hành động",
        dataField: "actions",
        formatter: (text: string, record: ITransactionType) =>
          renderAction(record),
      },
    ],
    [],
  );

  const setupBreadcrumb = () => {
    dispatch(
      setBreadcrumb([
        {
          name: "Quản lý chợ",
        },
        {
          name: "Thông tin giao dịch",
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
        isEmptyData={!isLoading && totalCount === 0}
        data={results}
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
export default ExchangeInfo;
