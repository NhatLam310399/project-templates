import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PATH } from "constants/routes";
import { IRootState } from "common/typings";

import { setBreadCrumb } from "redux/actions/_config";

import Message from "./Message";

interface ICustomerCare {}
const CustomerCare: React.FC<ICustomerCare> = props => {
  const dispatch = useDispatch();
  const {
    allCareStaff: { totalCount },
  } = useSelector((state: IRootState) => state.careStaff);

  useEffect(() => {
    setupBreadCrumb();
  }, []);

  const setupBreadCrumb = () => {
    dispatch(
      setBreadCrumb([
        {
          name: "Bảng điều khiển",
          path: PATH.CUSTOMER_CARE.CARED,
        },
        {
          name: "Chăm sóc khách hàng",
          path: PATH.CUSTOMER_CARE.CARED,
        },
      ]),
    );
  };

  return (
    <div className="setting flex flex-col laptop:flex-row gap-3">
      <div className="flex-none w-27">
        <div className="min-h-5 bg-primary text-white block w-full text-left py-1.5 px-2 text-lg leading-none">
          <div className="w-full flex items-center gap-1">
            <div className="">Chăm sóc khách hàng</div>
            <div className="w-2 h-2 flex items-center justify-center rounded-full bg-error text-white text-xs font-medium">
              {totalCount}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-auto min-w-0 w-full phone:w-auto phone:flex-1">
        <Message />
      </div>
    </div>
  );
};

export default CustomerCare;
