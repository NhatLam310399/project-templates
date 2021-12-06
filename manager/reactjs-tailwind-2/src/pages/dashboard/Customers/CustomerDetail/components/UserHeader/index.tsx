import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Skeleton } from "@material-ui/lab";

import { IGetDetailBooking, IRootState, IUrlParams } from "common/typings";
import EmailIcon from "designs/icons/Email";
import NameIcon from "designs/icons/Name";
import PhoneIcon from "designs/icons/Phone";
import { getUserById } from "redux/actions/users";
import { getDetailBooking } from "redux/actions/booking";

interface IUserHeader {}

type IUserInfo = {
  type: "text" | "email" | "phone";
  Icon: ReactNode;
  value: string;
};

type IBookingStatus = {
  name: string;
  value: string | number;
};

const UserHeader: React.FC<IUserHeader> = props => {
  const { id } = useParams<IUrlParams>();
  const dispatch = useDispatch();

  const { user } = useSelector((state: IRootState) => state.users);
  const { place } = useSelector((state: IRootState) => state.place);
  const {
    detailBooking: [bookingStatusAssemble],
  } = useSelector((state: IRootState) => state.booking);

  const { isLoading } = useSelector((state: IRootState) => state.common);
  const {
    displayName = "",
    email = "",
    phoneNumber = "",
    urlAvt = {},
  } = user || {};

  useEffect(() => {
    dispatch(getUserById({ id }));
  }, []);

  const getDetailBookingApi = () => {
    const payload: IGetDetailBooking = {
      filterDetailBooking: {
        placeId: place?._id,
        user: id,
      },
      size: 1,
    };
    dispatch(getDetailBooking(payload));
  };

  useEffect(() => {
    if (place) {
      getDetailBookingApi();
    }
  }, [place]);

  const userInfos: IUserInfo[] = [
    {
      type: "text",
      Icon: <NameIcon />,
      value: displayName,
    },
    {
      type: "email",
      Icon: <EmailIcon />,
      value: email,
    },
    {
      type: "phone",
      Icon: <PhoneIcon />,
      value: phoneNumber,
    },
  ];

  const listBookingStatus: IBookingStatus[] = [
    {
      name: "Hoàn thành",
      value: bookingStatusAssemble?.successBooking || 0,
    },
    {
      name: "Đang chờ xử lý",
      value: bookingStatusAssemble?.waitingForApprovedBooking || 0,
    },
    {
      name: "Đã duyệt",
      value: bookingStatusAssemble?.approvedBooking || 0,
    },
    {
      name: "Đã hủy",
      value: bookingStatusAssemble?.canceledBooking || 0,
    },
  ];

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-0 left-0 z-0 w-full h-full">
        <div className="w-full h-1/2 bg-primary " />
        <div className="w-full h-1/2 " />
      </div>
      <div className="relative z-10 flex flex-row items-center w-full pt-5 mt-5 phone:pt-0 h-25">
        <div className="absolute flex items-center justify-center w-10 transform -translate-x-1/2 phone:top-0 -top-5 phone:transform-none phone:left-0 left-1/2 phone:h-full phone:relative phone:w-3/12">
          <img
            src={urlAvt?.medium || urlAvt.default}
            className="h-auto rounded-full phone:w-2/3 max-w-16"
            alt={displayName}
          />
        </div>
        {/* Content */}
        <div className="grid items-center w-full h-full grid-rows-2 text-lg font-normal phone:w-9/12">
          <div className="text-white bg-primary">
            <UserInfoTop userInfos={userInfos} isLoading={isLoading} />
          </div>
          {bookingStatusAssemble && (
            <div className="">
              <BookingStatus listBookingStatus={listBookingStatus} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHeader;

const UserInfoTop: React.FC<{ userInfos: IUserInfo[]; isLoading: boolean }> = ({
  userInfos,
  isLoading,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {userInfos.map(({ type, Icon, value }, index) => {
        let href = "#";
        if (type === "email") href = `mailto:${value}`;
        if (type === "phone") href = `tel:${value}`;
        if (isLoading)
          return (
            <Skeleton
              key={String(index)}
              variant="rect"
              height="15"
              width={`${100 / (index / 4 + 1)}%`}
            />
          );
        return (
          <div className="flex flex-row items-center w-full" key={type}>
            {Icon}
            <a href={href} className="ml-1 overflow-hidden overflow-ellipsis">
              {value}
            </a>
          </div>
        );
      })}
    </div>
  );
};

const BookingStatus: React.FC<{ listBookingStatus: IBookingStatus[] }> = ({
  listBookingStatus,
}) => {
  return (
    <div className="">
      <h2 className="mb-2 text-xl font-bold">Trạng thái đặt phòng</h2>
      <div className="flex flex-row gap-1">
        {listBookingStatus.map(({ name, value }, index) => (
          <div className="w-full max-w-20 flex flex-col gap-1.5">
            <p className="truncate">{name}</p>
            <p className="font-bold ">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
