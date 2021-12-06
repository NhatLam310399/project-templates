import { IUser } from "common/typings";
import SVG from "designs/SVG";
import dayjs from "dayjs";
import { Skeleton } from "@material-ui/lab";

interface ICustomerCard {
  user?: IUser;
  className?: string;
  loading?: boolean;
  children?: React.ReactNode;
}

type IUserInfo = {
  type: "text" | "email" | "phone";
  iconName: string;
  value: string | undefined;
};

const CustomerCard: React.FC<ICustomerCard> = props => {
  const { user = {}, className = "", loading, children } = props;

  const userInfos: IUserInfo[] = [
    {
      type: "text",
      iconName: "customer/name-icon",
      value: user?.displayName,
    },
    {
      type: "email",
      iconName: "customer/email-icon",
      value: user?.email,
    },
    {
      type: "phone",
      iconName: "customer/phone-icon",
      value: user?.phoneNumber,
    },
  ];

  return (
    <div
      className={`phone:min-h-20 w-full px-2 py-1 gap-2 bg-tertiary hover:shadow-line cursor-pointer rounded-md shadow-sm  ${className}`}
    >
      <div className="w-full grid grid-cols-1fr-auto items-center gap-1 user-information ">
        <div className="min-w-0 flex flex-col gap-1 text-black text-md desktop:text-lg leading-none">
          {userInfos.map(({ type, iconName, value }, index) => {
            let href = "";
            if (type === "email") href = `mailto:#${value}`;
            if (type === "phone") href = `tel:#${value}`;
            if (loading)
              return (
                <Skeleton
                  key={String(index)}
                  variant="rect"
                  height="15"
                  width={`${100 / (index / 4 + 1)}%`}
                />
              );
            return value ? (
              <div
                className="flex items-center gap-1 w-full"
                key={String(index)}
              >
                <SVG name={iconName} className="flex-none w-1.5 desktop:w-2" />
                <div className="flex-1 min-w-0 truncate">
                  {href ? (
                    <a className="block" href={href}>
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </div>
              </div>
            ) : null;
          })}
        </div>
        <div className="w-7 h-7 phone:w-10 phone:h-10">
          {loading ? (
            <Skeleton width="100%" height="100%" variant="circle" />
          ) : (
            <img
              src={user?.urlAvt?.medium || user?.urlAvt?.default}
              className="block w-full h-full object-cover rounded-full max-w-full max-h-full"
              alt={user?.displayName}
            />
          )}
        </div>
      </div>
      {loading ? (
        <Skeleton variant="rect" width="100%" height="100%" />
      ) : (
        <div className="mt-2">{children}</div>
      )}
    </div>
  );
};

export default CustomerCard;
