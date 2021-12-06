import React from "react";
import { IBooking } from "common/typings";

import SVG from "designs/SVG";

interface IPaymentInformationProps {
  editField?: IBooking;
}

const PaymentInformation: React.FC<IPaymentInformationProps> = props => {
  const { editField = {} } = props;
  const { coupon, totalPayment } = editField || {};
  return (
    <div className="">
      <h3 className="mb-3 text-xl font-bold ">Thông tin thanh toán</h3>
      <div className="flex justify-between flex-wrap mb-2">
        <div>
          <p className="mb-1 font-medium font-lg">Hình thức thanh toán</p>
          <p className="flex items-center gap-1 text-lg">
            <SVG name="booking/payment" />
            Trả tại quầy
          </p>
        </div>
        {coupon?.name && (
          <div>
            <p className="font-medium font-lg mb-1">Mã khuyến mãi</p>
            <p className="text-lg">{coupon?.name}</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between flex-wrap">
        <p className="font-medium font-lg">Tổng tiền</p>
        <p className="text-xl font-bold text-primary">
          {totalPayment?.toLocaleString("vi-VN") || 0} vnđ
        </p>
      </div>
    </div>
  );
};

export default PaymentInformation;
