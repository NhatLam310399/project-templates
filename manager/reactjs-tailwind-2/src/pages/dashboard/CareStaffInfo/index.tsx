import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { PATH } from "constants/routes";

import { setBreadCrumb } from "redux/actions/_config";

import FormEditInfo from "./FormEditInfo";

interface ICustomerCare {}
const CustomerCare: React.FC<ICustomerCare> = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    setupBreadCrumb();
  }, []);

  const setupBreadCrumb = () => {
    dispatch(
      setBreadCrumb([
        {
          name: "Bảng điều khiển",
          path: PATH.CUSTOMER_CARE.ACCOUNT_INFO,
        },
        {
          name: "Thông tin tài khoản",
          path: PATH.CUSTOMER_CARE.ACCOUNT_INFO,
        },
      ]),
    );
  };

  return (
    <div className="setting flex flex-col laptop:flex-row gap-3">
      <div className="flex-none w-27">
        <div className="min-h-5 bg-primary text-white block w-full text-left py-1.5 px-2 text-lg leading-none">
          <div className="w-full flex items-center gap-1">
            <div className="">Thông tin tài khoản</div>
          </div>
        </div>
      </div>
      <div className="flex-auto min-w-0 w-full phone:w-auto phone:flex-1">
        <FormEditInfo />
      </div>
    </div>
  );
};

export default CustomerCare;
