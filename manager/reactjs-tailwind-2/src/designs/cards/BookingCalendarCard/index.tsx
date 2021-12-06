import { IBooking } from "common/typings";
import React, { useState } from "react";
import SVG from "designs/SVG";
import dayjs from "dayjs";
import TagBookingStatus from "designs/TagBookingStatus";

interface IBookingCalendarCard {
  bookingCalendar: IBooking | null;
  className?: string;
  active?: boolean;
  onClick?: (bookCalendar: IBooking) => void;
}

const BookingCalendarCard: React.FC<IBookingCalendarCard> = props => {
  const { bookingCalendar = {}, active, className = "", onClick } = props;
  const {
    createdAt,
    phoneNumber,
    name,
    email,
    status,
    createdBy = {},
  } = bookingCalendar || {};
  const {
    displayName,
    phoneNumber: userPhoneNumber,
    email: userEmail,
  } = createdBy;

  const handleClick = () => {
    bookingCalendar && onClick && onClick(bookingCalendar);
  };
  return (
    <div
      className={`flex flex-col cursor-pointer hover:shadow-line desktop:flex-row desktop:h-10 border border-solid ${
        active ? `border-primary` : `border-white`
      }  ${className}`}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center justify-center flex-none w-full h-auto p-1 text-white desktop:p-2 desktop:h-full desktop:w-auto gap-x-2 desktop:gap-x-0 text-medium gap-y-1 bg-primary">
        <p className="text-lg">
          {dayjs(createdAt?.toString()).format("DD/MM/YYYY")}
        </p>
        {/* <p className="p-0.5 text-md border border-white border-1 rounded-md hidden desktop:block">
          {dayjs(createdAt?.toString()).format("HH:mm A")}
        </p> */}
      </div>
      <div className="flex-auto flex flex-col  items-start gap-y-1 desktop:gap-y-0  desktop:flex-row h-full  px-1  desktop:px-2 py-1.5 bg-tertiary desktop:justify-between desktop:items-center">
        <div className="flex-auto flex h-10 desktop:h-auto flex-col w-full gap-y-0.5">
          <p className="w-full text-lg font-medium text-center text-black truncate desktop:text-left">
            {name || displayName}
          </p>

          <div className="flex items-center justify-start font-normal gap-x-1 text-md black ">
            <>
              <SVG
                name="common/email"
                width="20"
                height="20"
                className="w-2 h-2"
              />
              <p className="pr-1 break-all truncate">
                {email || userEmail || "Không có địa chỉ email"}
              </p>
            </>
          </div>
          <div className="flex items-center justify-start font-normal truncate gap-x-1 text-md text black ">
            <SVG
              name="common/black-phone"
              width="20"
              height="20"
              className="w-2 h-2"
            />
            <p className="truncate">{phoneNumber || userPhoneNumber}</p>
          </div>
        </div>
        <div className="flex items-center justify-start flex-none w-full desktop:w-auto">
          <TagBookingStatus type={status} />
        </div>
      </div>
      <div className="flex items-center justify-center w-full pt-0 border-l h-7 phone:h-auto desktop:pt-auto desktop:w-auto border-line bg-tertiary">
        <button
          type="button"
          className="flex items-center justify-center w-full p-2 pt-0 desktop:pt-auto desktop:p-2 desktop:h-full desktop:w-7"
          onClick={handleClick}
        >
          <SVG
            name="common/right-arrow"
            width="15"
            height="9"
            className="hidden w-2.5 h-2.5 desktop:block"
          />
          <span className="block w-full h-full text-lg font-normal text-primary desktop:hidden">
            Xem thông tin
          </span>
        </button>
      </div>
    </div>
  );
};

export default BookingCalendarCard;
