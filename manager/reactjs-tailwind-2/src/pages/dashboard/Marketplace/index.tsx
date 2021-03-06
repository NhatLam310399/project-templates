/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";

import AlertDialog from "components/AlertDialog";

import { usePage } from "common/hooks/usePage";
import {
  ICustomSizeImages,
  IRootState,
  IGetAllTrade,
  ITrade,
  IGetTypesByCode,
} from "common/typings";
import {
  getQueryFromLocation,
  renderMoneyValue,
  shouldDecreasePageIndex,
} from "common/functions";

import Table, { IColumns } from "designs/Table";
import IconButton from "designs/IconButton";
import { SkeletonAvatar } from "designs/Avatar";

import { resetAction } from "redux/actions/common";
import { setBreadCrumb } from "redux/actions/_config";
import { deleteTrade, getAllTrade } from "redux/actions/trade";

import { getTypesByCode } from "redux/actions/types";
import { AddButton } from "components/Dialog";

import Dialog from "./Dialog";

const SIZE_PER_PAGE = 10;

const ProductList: React.FC<RouteComponentProps> = ({ location }) => {
  const {
    allTrade: { results, totalCount },
  } = useSelector((state: IRootState) => state.trade);
  const { place } = useSelector((state: IRootState) => state.place);
  const { actionSuccess, isLoading } = useSelector(
    (state: IRootState) => state.common,
  );
  const dispatch = useDispatch();

  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);

  const getAllTradeApi = (name = "") => {
    const payload: IGetAllTrade = {
      filterTrade: {
        company: place?._id,
      },
      page: page - 1,
      size: SIZE_PER_PAGE,
    };
    dispatch(getAllTrade(payload));
  };

  useEffect(() => {
    const payload: IGetTypesByCode = {
      code: "PRODUCT",
    };
    dispatch(getTypesByCode(payload));
  }, []);

  useEffect(() => {
    if (place) {
      getAllTradeApi();
    }
  }, [page, place]);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      if (shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)) {
        setPage(page - 1);
        return;
      }

      getAllTradeApi();
    }
  }, [actionSuccess]);

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
              title="Ch???nh s???a"
              svgName="common/edit"
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
              src={image?.[0]?.small || image?.[0]?.default || SkeletonAvatar}
              alt="H??nh s???n ph???m"
              className="block object-cover w-6 h-3 rounded whitespace-nowrap"
            />
          );
        },
      },
      {
        text: "T??n s???n ph???m",
        dataField: "name",
      },
      {
        text: "Danh m???c s???n ph???m",
        dataField: "type.name",
      },
      {
        text: "Gi?? s???n ph???m",
        dataField: "price",
        formatter: (price: number) => renderMoneyValue(price),
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
      setBreadCrumb([
        {
          name: "B???ng ??i???u khi???n",
        },
        {
          name: "Qu???n l?? ch???",
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
        <Dialog ButtonMenu={<AddButton>Th??m s???n ph???m</AddButton>} />
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
