/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";

import { usePage } from "common/hooks/usePage";
import {
  ICustomSizeImages,
  IRootState,
  IGetAllTrade,
  ITrade,
} from "common/typings";
import {
  getQueryFromLocation,
  renderMoneyValue,
  shouldDecreasePageIndex,
} from "common/functions";

import SearchBoxTable from "components/SearchboxTable";
import AlertDialog from "components/AlertDialog";

import Table, { IColumns } from "designs/Table";
import IconButton from "designs/IconButton";
import { SkeletonLogo } from "designs/Logo";

import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";
import { deleteTrade, getAllTrade } from "redux/actions/trade";

import Dialog from "./Dialog";

const SIZE_PER_PAGE = 10;

const ProductList: React.FC<RouteComponentProps> = ({ location }) => {
  const {
    trades: { results, totalCount },
  } = useSelector((state: IRootState) => state.trade);
  const { actionSuccess, isLoading } = useSelector(
    (state: IRootState) => state.common,
  );
  const dispatch = useDispatch();

  const [page, setPage] = usePage(getQueryFromLocation(location)?.page || 1);
  const [keyword, setKeyword] = useState<string>("");

  const getAllTradeApi = (name = "") => {
    const payload: IGetAllTrade = {
      filterTrade: {
        name,
      },
      page: page - 1,
      size: SIZE_PER_PAGE,
    };
    dispatch(getAllTrade(payload));
  };

  useEffect(() => {
    getAllTradeApi(keyword);
  }, [page]);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      if (shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)) {
        setPage(page - 1);
        return;
      }
      if (keyword) {
        getAllTradeApi(keyword);
      } else {
        getAllTradeApi();
      }
    }
  }, [actionSuccess]);

  const handleFetchData = (text: string) => {
    setKeyword(text);
    if (page > 1) {
      setPage(1);
    } else {
      getAllTradeApi(text);
    }
  };

  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const handleDelete = (record: ITrade) => {
    dispatch(deleteTrade({ id: record._id! }));
  };

  const renderAction = (record: ITrade) => {
    return (
      <div className="flex items-center justify-end gap-1">
        <Dialog
          editField={record}
          ButtonMenu={
            <IconButton
              title="Chi ti???t"
              svgName="common/eye"
              className="block leading-none"
            />
          }
        />
        <AlertDialog
          className="block leading-none"
          ButtonMenu={<IconButton title="Xo??" svgName="common/delete" />}
          title="X??a s???n ph???m"
          content={`B???n c?? ch???c ch???n mu???n x??a s???n ph???m ${record.name} kh??ng?`}
          onConfirm={() => handleDelete(record)}
        />
      </div>
    );
  };
  const columns: IColumns = useMemo(
    () => [
      {
        text: "H??nh ???nh",
        dataField: "images",
        formatter: (image: ICustomSizeImages[]) => {
          return (
            <img
              src={image?.[0]?.small || image?.[0]?.default || SkeletonLogo}
              alt="H??nh s???n ph???m"
              className="block object-cover w-10 h-4 rounded whitespace-nowrap"
            />
          );
        },
      },
      {
        text: "T??n s???n ph???m",
        dataField: "name",
      },
      {
        text: "Lo???i s???n ph???m",
        dataField: "type.name",
      },
      {
        text: "N??i b??n",
        dataField: "province.name",
      },
      {
        text: "C??ng ty uy t??n",
        dataField: "company.name",
      },
      {
        text: "Gi?? b??n",
        dataField: "price",
        formatter: (price: number) => `${renderMoneyValue(price)} vnd`,
      },
      {
        text: "H??nh ?????ng",
        dataField: "actions",
        formatter: (_: null, record: ITrade) => renderAction(record),
      },
    ],
    [],
  );

  const setupBreadcrumb = () => {
    dispatch(
      setBreadcrumb([
        {
          name: "Qu???n l?? ch???",
        },
        {
          name: "Danh s??ch s???n ph???m",
        },
      ]),
    );
  };

  useEffect(() => {
    setupBreadcrumb();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-end gap-1 mb-3">
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
export default ProductList;
