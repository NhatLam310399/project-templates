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
            <IconButton svgName="common/edit" title="Ch???nh s???a m?? khuy???n m??i" />
          }
        />
        <AlertDialog
          ButtonMenu={
            <IconButton svgName="common/delete" title="X??a m?? khuy???n m??i" />
          }
          title="X??a khuy???n m??i"
          content="B???n c?? ch???c mu???n x??a khuy???n m??i n??y?"
          onConfirm={() => handleConfirmRemove(record)}
        />
      </div>
    );
  };
  const columns: IColumns = useMemo(
    () => [
      {
        text: "T??n khuy???n m??i",
        dataField: "name",
      },
      {
        text: "M?? khuy???n m??i",
        dataField: "couponCode",
      },
      {
        text: "Ng??y k???t th??c",
        dataField: "validTill",
        formatter: (validTill: Date) => dayjs(validTill).format("DD/MM/YYYY"),
      },
      {
        text: "S??? l?????ng",
        dataField: "remainingCoupon",
      },
      {
        text: "Gi?? tr???",
        dataField: "discountValue",
        formatter: (discountValue: number, record: ICoupon) => {
          if (record?.type === "value") {
            return renderMoneyValue(discountValue);
          }
          return "Null";
        },
      },
      {
        text: "Ph???n tr??m",
        dataField: "discountPercent",
        formatter: (discountPercent: number) =>
          renderRatioValue(discountPercent),
      },

      {
        text: "Tr???ng th??i",
        dataField: "status",
        formatter: (text: string, record: ICoupon) => (
          <Tag active={record?.status || false}>
            {record?.status ? "Ho???t ?????ng" : "T???m d???ng"}
          </Tag>
        ),
      },
      {
        text: "H??nh ?????ng",
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
          name: "B???ng ??i???u khi???n",
          path: PATH.OVERVIEW,
        },
        {
          name: "Khuy???n m??i",
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
          ButtonMenu={<AddButton>Th??m m?? khuy???n m??i</AddButton>}
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
