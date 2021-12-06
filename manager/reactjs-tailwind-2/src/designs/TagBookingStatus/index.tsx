import { IBookingStatus } from "common/typings";

interface ITagBookingStatus {
  type?: IBookingStatus;
  className?: string;
}

const statuses: {
  type: IBookingStatus;
  name: string;
  cssProperty: string;
}[] = [
  {
    type: "booked",
    name: "Đã duyệt",
    cssProperty: "text-primary border-primary",
  },
  {
    type: "waiting_for_approved",
    name: "Đang xử lý",
    cssProperty: "text-body border-body",
  },
  {
    type: "finished",
    name: "Hoàn thành",
    cssProperty: "text-success border-success",
  },
  {
    type: "canceled",
    name: "Hủy lịch",
    cssProperty: "text-error border-error",
  },
  {
    type: "except_canceled",
    name: "Hủy lịch",
    cssProperty: "text-error border-error",
  },
];

const TagBookingStatus: React.FC<ITagBookingStatus> = ({
  type,
  className = "",
}) => {
  const status = statuses.find(item => item.type === type);
  return (
    <div
      className={`px-1 py-0.1 inline-block text-sm border rounded-md border-solid whitespace-nowrap ${status?.cssProperty} ${className}`}
    >
      {status?.name}
    </div>
  );
};

export default TagBookingStatus;
