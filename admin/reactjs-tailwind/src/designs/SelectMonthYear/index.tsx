import { NextRoundedIcon, PreviousRoundedIcon } from "designs/icons/Common";
import { useState, useEffect } from "react";

interface ISelectMonthYearProps {}
const SelectMonthYear: React.FC<ISelectMonthYearProps> = () => {
  const current = new Date();
  const [month, setMonth] = useState(current.getMonth());
  const [year, setYear] = useState(current.getFullYear());

  const setPreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month + 1);
    }
  };
  const setNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };
  useEffect(() => {}, [month, year]);
  return (
    <SelectMonthYearWrapper>
      <button onClick={setPreviousMonth}>{/* <PreviousRounded /> */}</button>
      {`${month + 1} - ${year}`}
      <button onClick={setNextMonth}>{/* <NextRounded /> */}</button>
    </SelectMonthYearWrapper>
  );
};
export default SelectMonthYear;

interface ISelectMonthYearWrapperProps {
  children: React.ReactNode[] | React.ReactNode | string;
}
const SelectMonthYearWrapper: React.FC<ISelectMonthYearWrapperProps> = ({
  children,
}) => {
  return (
    <div className="h-7 flex gap-1 justify-center items-center">{children}</div>
  );
};
