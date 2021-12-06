import React from "react";
import dayjs from "dayjs";

import { IBooking } from "common/typings";
import { calTime, renderLocation, renderPrice } from "common/functions";
import SVG from "designs/SVG";

import KaraokeIcon from "assets/images/karaoke.png";
import { IBookingInfo, IUserInfo } from "./interface";

interface IDetailBookingInfoProps {
  booking: IBooking | null;
}

const DetailBookingInfo: React.FC<IDetailBookingInfoProps> = props => {
  const { booking } = props;
  const {
    name,
    phoneNumber,
    email,
    place,
    room,
    hourPrice,
    timeStart,
    timeEnd,
    coupon,
    rewardPoints,
    bookingCode,
  } = booking || {};

  const userInfos: IUserInfo[] = [
    {
      label: "Họ và tên:",
      value: name,
    },
    {
      label: "Số điện thoại:",
      value: phoneNumber,
    },
    {
      label: "Email:",
      value: email,
    },
  ];

  const bookingInfos: IBookingInfo[] = [
    {
      label: "Số khách",
      svgName: "booking/user",
      value: room?.amount,
    },
    {
      label: "Ngày đặt",
      svgName: "booking/calendar",
      value: dayjs(timeStart).format("DD/MM/YYYY"),
    },
    {
      label: "Thời gian nhận phòng",
      svgName: "booking/time",
      value: dayjs(timeStart).format("HH:mm"),
    },
    {
      label: "Dự kiến trả phòng",
      svgName: "booking/time",
      value: dayjs(timeEnd).format("HH:mm"),
    },
    {
      label: "Tổng giờ hát",
      svgName: "booking/time",
      value: calTime(timeEnd, timeStart),
    },
  ];

  const pricePointInfos: IBookingInfo[] = [
    {
      label: "Giá phòng",
      svgName: "booking/money",
      value: renderPrice(hourPrice),
    },
    {
      label: "Điểm thưởng",
      svgName: "booking/star",
      value: rewardPoints,
    },
  ];

  const { street, ward, district, province } = place || {};
  const locationDisplay = renderLocation([
    street,
    ward?.name,
    district?.name,
    province?.name,
  ]);

  return (
    <>
      <h3 className="mb-3 text-xl font-bold text-black">Thông tin cá nhân</h3>
      <div className="flex flex-col gap-2 mb-4 text-lg text-black">
        {userInfos.map(
          ({ label, value }) =>
            value && (
              <div className="flex flex-row gap-1 " key={label}>
                <h4 className="font-normal whitespace-nowrap">{label}</h4>
                <p className="font-bold truncate"> {value} </p>
              </div>
            ),
        )}
      </div>
      <h3 className="mb-3 text-xl font-bold text-black">Thông tin đặt phòng</h3>
      <div className="w-full mb-4">
        <div className="flex w-full gap-1">
          <div className="relative flex flex-shrink-0 w-5 h-5 overflow-hidden rounded-md">
            <img
              className="absolute object-cover w-full h-full"
              src={(place?.logo?.small as string) || KaraokeIcon}
              alt="logo"
            />
          </div>
          <div>
            <p className="text-lg font-bold text-black truncate">
              {place?.name}
            </p>
            <p className="text-sm font-normal truncate text-body mt-1">
              {locationDisplay}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 my-2">
          <p className="text-sm font-normal">
            #Mã đặt phòng:
            <span className="ml-1 font-bold text-md text-primary">
              {bookingCode}
            </span>
          </p>
        </div>
        <div className="my-2.5 flex items-center gap-1">
          <SVG name="booking/room" width="18" height="18" />
          <p className="text-sm font-normal">
            Phòng <span className="font-bold">{room?.name}</span>
          </p>
        </div>
        <div className="grid w-full grid-cols-2 gap-2">
          {bookingInfos.map(({ label, value, svgName }) => (
            <RenderBookingInfo label={label} value={value} svgName={svgName} />
          ))}
        </div>
        <div className="grid w-full grid-cols-2 gap-2 mt-2">
          {pricePointInfos.map(({ label, value, svgName }) => (
            <RenderBookingInfo label={label} value={value} svgName={svgName} />
          ))}
        </div>
      </div>
      <h3 className="mb-3 text-xl font-bold text-black">
        Thông tin thanh toán
      </h3>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <div className="flex flex-col col-span-1 gap-y-1">
          <p className="text-lg font-semibold">Hình thức thanh toán</p>
          <div className="flex flex-row items-center justify-start gap-1 text-lg font-medium">
            <SVG name="booking/payment" width="20" height="20" />
            <p className="font-normal">Trả tại quầy</p>
          </div>
        </div>
        {coupon?.name && (
          <div className="flex flex-col items-start col-span-1 gap-y-1">
            <p className="text-lg font-semibold">Mã khuyến mãi</p>
            <p className="font-normal">
              {coupon?.name || "Không có mã khuyến mãi"}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailBookingInfo;

export const RenderBookingInfo: React.FC<IBookingInfo> = ({
  label,
  svgName,
  value,
}) => {
  return (
    <div className="flex flex-col items-start col-span-1 gap-y-1">
      <p className="text-lg title font-medium">{label}</p>
      <p className="flex items-center gap-1">
        <SVG name={svgName} width="20" height="20" className="w-2 h-2" />
        <span className="text-lg font-bold">{value}</span>
      </p>
    </div>
  );
};
