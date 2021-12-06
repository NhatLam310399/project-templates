import { IBooking } from "common/typings";
import dayjs from "dayjs";
import EmailIcon from "designs/icons/Email";
import PhoneIcon from "designs/icons/Phone";
import SVG from "designs/SVG";
import TagBookingStatus from "designs/TagBookingStatus";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface IBookingCardProps {
  booking: IBooking;
  active: boolean;
  onClick?: () => void;
}

const BookingCard: React.FC<IBookingCardProps> = ({
  booking,
  active,
  onClick,
}) => {
  const { email, name, phoneNumber, createdAt, status } = booking || {};
  const [isSmall, setIsSmall] = useState<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerHeight = containerRef?.current?.offsetWidth || 0;
    if (containerHeight < 430) {
      setIsSmall(true);
    } else setIsSmall(false);
  }, []);

  const dateDisplay = dayjs(createdAt).format("DD/MM/YYYY");

  return (
    <div
      ref={containerRef}
      className={`flex rounded-md flex-row  w-full cursor-pointer bg-tertiary hover:shadow-line
      ${active ? `border-2 border-solid border-primary ` : ``}
    `}
      onClick={() => onClick && onClick()}
    >
      <div className="flex items-center justify-center flex-shrink-0 px-1 font-medium text-white w-11 text-md phone:text-lg bg-primary">
        {dateDisplay}
      </div>
      <div
        className={`relative flex w-full text-md px-2 py-1 ${
          isSmall ? "flex-col items-start " : "flex-row  items-center"
        }`}
      >
        <div
          className={`flex flex-col gap-1 overflow-hidden ${
            isSmall ? "w-full" : "w-2/3"
          }`}
        >
          <div className="text-lg font-medium truncate ">{name}</div>
          <div className="flex flex-row gap-1">
            <EmailIcon />
            <p className="truncate">{email}</p>
          </div>
          <div className="flex flex-row gap-1 ">
            <PhoneIcon />
            <p className="truncate">{phoneNumber}</p>
          </div>
        </div>
        {status && (
          <TagBookingStatus
            className={`${isSmall ? "relative mt-1" : "absolute left-3/4"} `}
            type={status}
          />
        )}
      </div>
      <div className="flex items-center justify-center w-5 border-l border-solid border-line">
        <SVG name="customer/right-arrow" />
      </div>
    </div>
  );
};

export default BookingCard;
