import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RouteComponentProps } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";

import {
  getQueryFromLocation,
  shouldDecreasePageIndex,
  renderMoneyValue,
  renderRatioValue,
} from "common/functions";
import { ICoupon, IGetCoupons, IRootState } from "common/typings";
import { usePage } from "common/hooks/usePage";

import SearchBoxTable from "components/SearchboxTable";
import AlertDialog from "components/AlertDialog";
import { AddButton } from "components/Dialog/components/AddButton";

import IconButton from "designs/IconButton";
import Tag from "designs/Tag";
import Table, { IColumns } from "designs/Table";

import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";
import { deleteCoupon, getPublicCoupons } from "redux/actions/coupon";

import CouponDialog from "./Dialog";

const SIZE_PER_PAGE = 10;

const CouponCode: React.FC<RouteComponentProps> = ({ location }) => {
  const dispatch = useDispatch();

  const { allCoupon, couponTotalCount } = useSelector(
    (state: IRootState) => state.coupon,
  );
  const { actionSuccess, isLoading } = useSelector(
    (state: IRootState) => state.common,
  );

  const [keyword, setKeyword] = useState<string>("");
  const [isRemoveAction, setIsRemoveAction] = useState<boolean>(false);
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page || 1);

  const getPublicCouponsApi = (name = "") => {
    const payload: IGetCoupons = {
      name,
      page: page - 1,
      size: SIZE_PER_PAGE,
    };
    dispatch(getPublicCoupons(payload));
  };

  useEffect(() => {
    getPublicCouponsApi();
  }, []);

  useEffect(() => {
    getPublicCouponsApi(keyword);
  }, [page]);

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
      if (keyword) {
        getPublicCouponsApi(keyword);
      } else {
        getPublicCouponsApi();
      }
    }
  }, [actionSuccess]);

  const handleFetchData = (text: string) => {
    setKeyword(text);
    if (page > 1) {
      setPage(1);
    } else {
      getPublicCouponsApi(text);
    }
  };

  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const handleDelete = (record: ICoupon) => {
    dispatch(deleteCoupon({ id: record._id! }));
    setIsRemoveAction(true);
  };

  const renderAction = (record: ICoupon) => {
    return (
      <div className="flex items-center justify-end gap-1">
        <CouponDialog
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
          title="X??a m?? khuy???n m??i"
          content={`B???n c?? ch???c ch???n mu???n x??a m?? khuy???n m??i ${record.name} kh??ng?`}
          onConfirm={() => handleDelete(record)}
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
        formatter: (discountPercent: number, record: ICoupon) =>
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

  const setupBreadcrumb = () => {
    dispatch(
      setBreadcrumb([
        {
          name: "Th??ng tin booking",
        },
        {
          name: "Khuy???n m??i",
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
        <CouponDialog ButtonMenu={<AddButton>Th??m m?? khuy???n m??i</AddButton>} />
        <div className="max-w-full w-26">
          <SearchBoxTable onFetchData={handleFetchData} />
        </div>
      </div>
      <Table
        data={allCoupon}
        isEmptyData={!isLoading && couponTotalCount === 0}
        columns={columns}
        page={page}
        onPageChange={handleChangePage}
        totalSize={couponTotalCount}
        sizePerPage={SIZE_PER_PAGE}
        isRemote
      />
    </div>
  );
};
export default CouponCode;
