import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import dayjs from "dayjs";

import {
  shouldDecreasePageIndex,
  renderMoneyValue,
  renderRatioValue,
  getQueryFromLocation,
} from "common/functions";
import { ICoupon, IGetCouponByKaraoke } from "common/typings/Coupon";

import { usePage } from "common/hooks/usePage";

import AlertDialog from "components/AlertDialog";
import { AddButton } from "components/Dialog";

import { PATH } from "constants/routes";

import Table, { IColumns } from "designs/Table";
import Tag from "designs/TagStatus";
import IconButton from "designs/IconButton";

import { getCouponByKaraoke, deleteCoupon } from "redux/actions/coupon";
import { resetAction } from "redux/actions/common";
import { IRootState } from "redux/reducers";
import { setBreadCrumb } from "redux/actions/_config";

import CouponCodeDiaLog from "./Dialog";

const SIZE_PER_PAGE = 10;

const Coupon: React.FC<RouteComponentProps> = ({ location }) => {
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
  const dispatch = useDispatch();

  const { actionSuccess, isLoading } = useSelector(
    (state: IRootState) => state.common,
  );
  const { allCoupon, couponTotalCount } = useSelector(
    (state: IRootState) => state.coupon,
  );
  const { place } = useSelector((state: IRootState) => state.place);

  const [isRemoveAction, setIsRemoveAction] = useState<boolean>(false);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      setIsRemoveAction(false);

      if (
        isRemoveAction &&
        shouldDecreasePageIndex(page, couponTotalCount, SIZE_PER_PAGE)
      ) {
        setPage(page - 1);
        return;
      }
      setTimeout(() => {
        getAllCouponAPI();
      }, 500);
    }
  }, [actionSuccess]);

  useEffect(() => {
    if (place) {
      getAllCouponAPI();
    }
  }, [page, place]);

  const getAllCouponAPI = () => {
    const payload: IGetCouponByKaraoke = {
      idKara: place?._id,
      page: page - 1,
      size: SIZE_PER_PAGE,
    };
    dispatch(getCouponByKaraoke(payload));
  };

  const handleChangePage = (nextPage: number) => {
    setPage(nextPage);
  };
  const handleConfirmRemove = (record: ICoupon) => {
    dispatch(deleteCoupon({ id: record._id || "" }));
    setIsRemoveAction(true);
  };
  const renderAction = (record: ICoupon) => {
    return (
      <div className="flex items-center justify-end gap-1.5">
        <CouponCodeDiaLog
          editField={record}
          ButtonMenu={
            <IconButton svgName="common/edit" title="Chỉnh sửa mã khuyến mãi" />
          }
        />
        <AlertDialog
          ButtonMenu={
            <IconButton svgName="common/delete" title="Xóa mã khuyến mãi" />
          }
          title="Xóa khuyến mãi"
          content="Bạn có chắc muốn xóa khuyến mãi này?"
          onConfirm={() => handleConfirmRemove(record)}
        />
      </div>
    );
  };
  const columns: IColumns = useMemo(
    () => [
      {
        text: "Tên khuyến mãi",
        dataField: "name",
      },
      {
        text: "Mã khuyến mãi",
        dataField: "couponCode",
      },
      {
        text: "Ngày kết thúc",
        dataField: "validTill",
        formatter: (validTill: Date) => dayjs(validTill).format("DD/MM/YYYY"),
      },
      {
        text: "Số lượng",
        dataField: "remainingCoupon",
      },
      {
        text: "Giá trị",
        dataField: "discountValue",
        formatter: (discountValue: number, record: ICoupon) => {
          if (record?.type === "value") {
            return renderMoneyValue(discountValue);
          }
          return "Null";
        },
      },
      {
        text: "Phần trăm",
        dataField: "discountPercent",
        formatter: (discountPercent: number) =>
          renderRatioValue(discountPercent),
      },

      {
        text: "Trạng thái",
        dataField: "status",
        formatter: (text: string, record: ICoupon) => (
          <Tag active={record?.status || false}>
            {record?.status ? "Hoạt động" : "Tạm dừng"}
          </Tag>
        ),
      },
      {
        text: "Hành động",
        dataField: "actions",
        formatter: (_: string, record: ICoupon) => renderAction(record),
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
          name: "Bảng điều khiển",
          path: PATH.OVERVIEW,
        },
        {
          name: "Khuyến mãi",
          path: PATH.DEAL,
        },
      ]),
    );
  };

  return (
    <div>
      <div className="w-20 mb-4 float-right">
        <CouponCodeDiaLog
          editField={null}
          ButtonMenu={<AddButton>Thêm mã khuyến mãi</AddButton>}
        />
      </div>
      <Table
        sizePerPage={SIZE_PER_PAGE}
        columns={columns}
        data={allCoupon}
        page={page}
        totalSize={couponTotalCount}
        isRemote
        onPageChange={handleChangePage}
        isEmptyData={!isLoading && couponTotalCount === 0}
      />
    </div>
  );
};
export default Coupon;
