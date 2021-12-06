/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";
import dayjs from "dayjs";

import {
  ICouponNews,
  ICustomSizeImages,
  IGetAllCouponNews,
  IRootState,
} from "common/typings";
import { usePage } from "common/hooks/usePage";
import {
  getQueryFromLocation,
  shouldDecreasePageIndex,
  filterTextFromHtmlString,
  textWithLimitWords,
} from "common/functions";
import { BANNER } from "constants/image";

import SearchBoxTable from "components/SearchboxTable";
import AlertDialog from "components/AlertDialog";

import Table, { IColumns } from "designs/Table";
import { AddButton } from "components/Dialog/components/AddButton";
import IconButton from "designs/IconButton";

import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";
import { deleteCouponNewsById, getAllCouponNews } from "redux/actions/coupon";

import CouponNewsDialog from "./Dialog";

const SIZE_PER_PAGE = 10;

const CouponNews: React.FC<RouteComponentProps> = ({ location }) => {
  const dispatch = useDispatch();

  const { allCouponNews = [], couponNewsTotalCount = 0 } = useSelector(
    (state: IRootState) => state.coupon,
  );
  const { actionSuccess, isLoading } = useSelector(
    (state: IRootState) => state.common,
  );

  const [keyword, setKeyword] = useState<string>("");
  const [isRemoveAction, setIsRemoveAction] = useState<boolean>(false);
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page || 1);

  const getCouponsNewsApi = (name = "") => {
    const payload: IGetAllCouponNews = {
      page: page - 1,
      size: SIZE_PER_PAGE,
      filterCouponNews: {
        name,
      },
    };
    dispatch(getAllCouponNews(payload));
  };

  useEffect(() => {
    getCouponsNewsApi();
  }, []);

  useEffect(() => {
    getCouponsNewsApi(keyword);
  }, [page]);

  useEffect(() => {
    if (actionSuccess) {
      setIsRemoveAction(false);
      dispatch(resetAction());
      if (
        isRemoveAction &&
        shouldDecreasePageIndex(page, couponNewsTotalCount, SIZE_PER_PAGE)
      ) {
        setPage(page - 1);
        return;
      }
      if (keyword) {
        getCouponsNewsApi(keyword);
      } else {
        getCouponsNewsApi();
      }
    }
  }, [actionSuccess]);

  const handleFetchData = (text: string) => {
    setKeyword(text);
    if (page > 1) {
      setPage(1);
    } else {
      getCouponsNewsApi(text);
    }
  };

  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const handleDelete = (record: ICouponNews) => {
    dispatch(deleteCouponNewsById({ id: record._id! }));
  };

  const renderAction = (record: ICouponNews) => {
    return (
      <div className="flex items-center justify-end gap-1">
        <CouponNewsDialog
          editField={record}
          ButtonMenu={
            <IconButton
              svgName="common/edit"
              title="Chỉnh sửa"
              className="block leading-none"
            />
          }
        />
        <AlertDialog
          className="block leading-none"
          ButtonMenu={<IconButton svgName="common/delete" title="Xoá" />}
          title="Xóa tin khuyến mãi"
          content="Bạn có chắc chắn muốn xóa tin khuyến mãi này không?"
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
        headerStyle: () => ({ width: "100px" }),
        formatter: (image: ICustomSizeImages) => {
          return (
            <img
              src={image?.small || image?.default || BANNER}
              alt="Hình sản phẩm"
              className="block object-cover w-6 h-3 rounded whitespace-nowrap"
            />
          );
        },
      },
      {
        text: "Tên tin khuyến mãi",
        dataField: "name",
      },
      {
        text: "Nội dung",
        headerStyle: () => ({ width: "40%" }),
        dataField: "description",
        formatter: (html: string) => {
          const plainString = filterTextFromHtmlString(html);
          const description = textWithLimitWords(plainString, 30);
          return description;
        },
      },
      {
        text: "Ngày tạo",
        dataField: "createdAt",
        formatter: (date: Date) => dayjs(date).format("DD/MM/YYYY"),
      },
      {
        text: "Hành động",
        dataField: "actions",
        formatter: (text: string, record: ICouponNews) => renderAction(record),
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
          name: "Tin khuyến mãi",
        },
      ]),
    );
  };

  useEffect(() => {
    setupBreadcrumb();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-2 mb-3 phone:gap-0 phone:flex-row phone:items-center phone:space-x-1">
        <CouponNewsDialog
          ButtonMenu={<AddButton>Thêm tin khuyến mãi</AddButton>}
        />

        <div className="max-w-full w-26">
          <SearchBoxTable onFetchData={handleFetchData} />
        </div>
      </div>

      <Table
        data={allCouponNews}
        isEmptyData={!isLoading && couponNewsTotalCount === 0}
        columns={columns}
        page={page}
        onPageChange={handleChangePage}
        totalSize={couponNewsTotalCount}
        sizePerPage={SIZE_PER_PAGE}
        isRemote
      />
    </div>
  );
};
export default CouponNews;
