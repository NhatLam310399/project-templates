/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { shouldDecreasePageIndex } from "common/functions";
import { getQueryFromLocation } from "common/functions/route/getQueryFromLocation";
import { usePage } from "common/hooks/usePage";
import {
  IGetAllTrade,
  ITrade,
  ITypes,
  IUpdateTrade,
  IUser,
} from "common/typings";

import AlertDialog from "components/AlertDialog";
import { AddButton } from "components/Dialog/components/AddButton";

import IconButton from "designs/IconButton";
import Table, { IColumns } from "designs/Table";

import { setBreadcrumb } from "redux/actions/_config";
import { resetAction } from "redux/actions/common";
import { getAllTrade, getAllHotTrade, updateTrade } from "redux/actions/trade";
import { IRootState } from "redux/reducers";

import { AVATAR } from "constants/image";
import Dialog from "./Dialog";

const SIZE_PER_PAGE = 10;

const HotProductsPages: React.FC<RouteComponentProps> = ({ location }) => {
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page || 1);
  const [isRemoveAction, setIsRemoveAction] = useState<boolean>(false);

  const dispatch = useDispatch();
  const {
    hotTrades: { results: allHotTrade = [], totalCount = 0 },
  } = useSelector((state: IRootState) => state.trade);
  const { actionSuccess } = useSelector((state: IRootState) => state.common);

  useEffect(() => {
    setupBreadcrumb();
    // get api for dialog
    getAllTradeAPI();
  }, []);

  const setupBreadcrumb = () => {
    dispatch(
      setBreadcrumb([
        {
          name: "Cài đặt hệ thống",
        },
        {
          name: "Sản phẩm nổi bật",
        },
      ]),
    );
  };

  useEffect(() => {
    getAllTradeHighlightAPI();
  }, [location]);

  useEffect(() => {
    if (!actionSuccess) return;
    dispatch(resetAction());
    setIsRemoveAction(false);
    getAllTradeAPI();
    if (
      isRemoveAction &&
      shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)
    ) {
      setPage(page - 1);
      // Because of when you setPage, location will be changed
      // so useEffect has Api caller in top will be call
      return;
    }
    getAllTradeHighlightAPI();
  }, [actionSuccess]);

  const getAllTradeHighlightAPI = () => {
    const payload: IGetAllTrade = {
      page: page - 1,
      size: SIZE_PER_PAGE,
      filterTrade: {
        isHot: true,
      },
    };
    dispatch(getAllHotTrade(payload));
  };

  const getAllTradeAPI = () => {
    const payload: IGetAllTrade = {
      filterTrade: {
        isHot: false,
      },
    };
    dispatch(getAllTrade(payload));
  };

  const handleDelete = (record: ITrade) => {
    const payload: IUpdateTrade = {
      id: record._id!,
      tradeInput: {
        isHot: false,
      },
    };
    dispatch(updateTrade(payload));
    setIsRemoveAction(true);
  };

  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const renderAction = (record: ITrade) => {
    return (
      <div className="flex items-center justify-end gap-1">
        <AlertDialog
          ButtonMenu={
            <IconButton
              svgName="common/delete"
              title="Xoá khỏi danh sách nổi bật"
            />
          }
          title="Xoá sản phẩm nổi bật"
          content="Bạn có chắc chắn muốn xoá sản phẩm nổi bật này không?"
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
        headerStyle: () => ({
          width: "15%",
        }),
        formatter: (record: ITrade) => {
          const imgUrl =
            record?.images?.[0]?.small || record?.images?.[0]?.default;
          return (
            <img
              src={imgUrl || AVATAR}
              alt="Hình sản phẩm"
              className="block object-cover w-3 h-3 rounded whitespace-nowrap"
            />
          );
        },
      },
      {
        text: "Người tạo",
        dataField: "user",
        formatter: (user: IUser) => user?.displayName || "",
      },
      {
        text: "Tên sản phẩm",
        dataField: "name",
      },
      {
        text: "Loại sản phẩm",
        dataField: "type",
        formatter: (type: ITypes) => type?.name || "",
      },

      {
        text: "Hành động ",
        dataField: "actions",
        formatter: (cell: null, record: ITrade) => renderAction(record),
      },
    ],
    [],
  );

  return (
    <div>
      <div className="flex mb-3">
        <div className="flex-none">
          <Dialog ButtonMenu={<AddButton>Thêm sản phẩm</AddButton>} />
        </div>
      </div>

      <Table
        isEmptyData={totalCount === 0}
        isRemote
        data={allHotTrade}
        columns={columns}
        totalSize={totalCount}
        page={page}
        onPageChange={handleChangePage}
        sizePerPage={SIZE_PER_PAGE}
      />
    </div>
  );
};
export default withRouter(HotProductsPages);
