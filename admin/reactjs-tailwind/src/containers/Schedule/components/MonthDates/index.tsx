import DateOfMonth from "../DateOfMonth";

type IBooking = {
  name: string;
  time: string;
};
type ISchedule = {
  day: number;
  bookings: IBooking[];
};

interface IMonthDateProps {
  schedules: ISchedule[];
}
const MonthDate: React.FC<IMonthDateProps> = props => {
  return (
    <MonthDateContainer>
      {props.schedules.map((item, key) => (
        <DateOfMonth schedule={item} key={key} />
      ))}
    </MonthDateContainer>
  );
};
export default MonthDate;

interface MonthDateContainerProps {
  children: React.ReactNode | React.ReactNode | string;
}
const MonthDateContainer: React.FC<MonthDateContainerProps> = props => {
  return (
    <div className="overflow-hidden">
      <div className="grid grid-cols-7 -m">{props.children}</div>
    </div>
  );
};
