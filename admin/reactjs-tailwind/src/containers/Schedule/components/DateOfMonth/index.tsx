// import { Time } from "designs/icons/Common";

type IBooking = {
  name: string;
  time: string;
};

interface IDateOfMonthProps {
  schedule: {
    day: number;
    bookings: IBooking[];
  };
}

const DateOfMonth: React.FC<IDateOfMonthProps> = props => {
  const { day, bookings } = props.schedule;
  return (
    <DateOfMonthWrapper>
      <DayNumber day={day} />
      {bookings.map((item, key) => (
        <BookingItem booking={item} key={key} />
      ))}
    </DateOfMonthWrapper>
  );
};
export default DateOfMonth;

interface IBookingItemProps {
  booking: IBooking;
}
const BookingItem: React.FC<IBookingItemProps> = ({ booking }) => {
  return (
    <p className="bg-primary px-0.5 text-white flex justify-between text-sm my-0.5">
      <span>{booking.name}</span>{" "}
      <span className="flex gap-0.5">{/* <Time /> {booking.time} */}</span>
    </p>
  );
};

interface IDayNumberProps {
  day: number;
}

const DayNumber: React.FC<IDayNumberProps> = ({ day }) => {
  return <p className="text-right px-0.5 py-1">{day}</p>;
};

interface IDateOfMonthWrapperProps {
  children: React.ReactNode[] | React.ReactNode | string;
}

const DateOfMonthWrapper: React.FC<IDateOfMonthWrapperProps> = ({
  children,
}) => {
  return <div className="min-h-11 border border-body -mr -mt">{children}</div>;
};
