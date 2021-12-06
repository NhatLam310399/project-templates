interface IWeekDayProps {}
const WeekDays: React.FC<IWeekDayProps> = props => {
  return (
    <WeekDayContainer>
      {weekdays.map((item, key) => (
        <DayOfWeek dayName={item} key={key} />
      ))}
    </WeekDayContainer>
  );
};
export default WeekDays;

interface WeekDayContainerProps {
  children: React.ReactNode | React.ReactNode | string;
}
const WeekDayContainer: React.FC<WeekDayContainerProps> = props => {
  return (
    <div className="overflow-hidden">
      <div className="grid grid-cols-7 bg-tertiary -m">{props.children}</div>
    </div>
  );
};

interface IDayOfWeekProps {
  dayName: string;
}
const DayOfWeek: React.FC<IDayOfWeekProps> = ({ dayName }) => {
  return (
    <div className="border border-body -mr -mt bg-tertiary text-center p-0.5">
      {dayName}
    </div>
  );
};

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
