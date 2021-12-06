import React from "react";
import dayjs from "dayjs";

import { IBooking } from "common/typings";

import Avatar from "designs/Avatar";
import SVG from "designs/SVG";
import { SkeletonLogo } from "designs/Logo";
import { renderLocation } from "common/functions";

interface IBookingInformationProps {
  editField?: IBooking;
}

const BookingInformation: React.FC<IBookingInformationProps> = props => {
  const { editField = {} } = props;
  const { room, place, bookingCode, timeStart, timeEnd, cost, hourPrice } =
    editField || {};
  const { street, ward, district, province } = place || {};
  const location = renderLocation([
    street,
    ward?.name,
    district?.name,
    province?.name,
  ]);
  return (
    <>
      <h3 className="mb-3 text-xl font-bold text-black">Thông tin đặt phòng</h3>
      <div className="flex items-center gap-1 mb-2">
        <div className="flex-none w-5">
          <img
            src={place?.logo?.small || place?.logo?.default || SkeletonLogo}
            alt="logo"
            className="block m-auto w-full max-h-5 object-cover rounded"
          />
        </div>
        <div className="flex-auto">
          <p className="text-lg font-bold text-black ">{place?.name}</p>
          {location && (
            <p className="text-sm text-body mt-0.5">
              {renderLocation([
                street,
                ward?.name,
                district?.name,
                province?.name,
              ])}
            </p>
          )}
        </div>
      </div>
      <div className="mb-2">
        <p className="text-sm text-black">
          #Mã đặt phòng:
          <span className="ml-1 font-bold text-primary text-md">
            {bookingCode}
          </span>
        </p>
      </div>
      <div className="flex items-center gap-1 mb-2 text-sm text-black">
        <SVG name="booking/room" className="w-2 h-2" />
        <p className="font-sm">
          Phòng: <span className="font-bold text-sm">{room?.name}</span>
        </p>
      </div>
      <div className="mb-2 grid w-full grid-cols-1 phone:grid-cols-2 gap-2">
        <div className="">
          <p className="text-lg title font-medium mb-1.5">Số khách</p>
          <p className="flex items-center gap-1">
            <SVG
              name="booking/user"
              width="20"
              height="20"
              className="w-2 h-2"
            />
            <span className="text-lg font-bold">{room?.amount || 0}</span>
          </p>
        </div>
        <div className="">
          <p className="text-lg title font-medium mb-1.5">Đơn giá</p>
          <p className="flex items-center gap-1">
            <SVG
              name="booking/money"
              width="20"
              height="20"
              className="w-2 h-2"
            />
            <span className="text-lg font-bold">
              {hourPrice?.toLocaleString("vi-VN") || 0}đ
            </span>
          </p>
        </div>
        <div className="">
          <p className="text-lg title font-medium mb-1.5">Thời gian từ</p>
          <p className="flex items-center gap-1">
            <SVG
              name="booking/time"
              width="20"
              height="20"
              className="w-2 h-2"
            />
            <span className="text-lg font-bold">
              {dayjs(timeStart).format("HH:mm")}
            </span>
          </p>
        </div>
        <div className="">
          <p className="text-lg title font-medium mb-1.5">Thời gian đến</p>
          <p className="flex items-center gap-1">
            <SVG
              name="booking/time"
              width="20"
              height="20"
              className="w-2 h-2"
            />
            <span className="text-lg font-bold">
              {dayjs(timeEnd).format("HH:mm")}
            </span>
          </p>
        </div>
        <div className="">
          <p className="text-lg title font-medium mb-1.5">Ngày đặt</p>
          <p className="flex items-center gap-1">
            <SVG
              name="booking/calendar"
              width="20"
              height="20"
              className="w-2 h-2"
            />
            <span className="text-lg font-bold">
              {dayjs(timeStart).format("DD/MM/YYYY")}
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-start justify-between">
        <p className="text-lg title font-medium">Giá phòng</p>
        <p className="text-xl font-bold text-primary">
          {cost?.toLocaleString("vi-VN") || 0} vnđ
        </p>
      </div>
    </>
  );
};

export default BookingInformation;
