import MonthDates from "./components/MonthDates";
import SelectDate from "./components/SelectDate";
import WeekDays from "./components/WeekDays";

const Schedule: React.FC = () => {
  return (
    <>
      <SelectDate typeOfDateOptions={typeOfDateOptions} />
      <WeekDays />
      <MonthDates schedules={schedules} />
    </>
  );
};

export default Schedule;
// reset structure data fake when have API
const typeOfDateOptions = [
  { name: "Ngày" },
  { name: "Tháng" },
  { name: "Năm" },
];

// will fix data structure when have API
const schedules = [
  {
    day: 1,
    bookings: [
      {
        name: "Đạt Đạt",
        time: "1:00 PM",
      },
      {
        name: "Ý Lê",
        time: "3:00 PM",
      },
    ],
  },
  {
    day: 2,
    bookings: [],
  },
  {
    day: 3,
    bookings: [
      {
        name: "Tấn Đạt",
        time: "1:00 AM",
      },
    ],
  },
  {
    day: 4,
    bookings: [],
  },
  {
    day: 5,
    bookings: [],
  },
  {
    day: 6,
    bookings: [],
  },
  {
    day: 7,
    bookings: [
      {
        name: "Lê Đạt",
        time: "5:00 AM",
      },
    ],
  },
  {
    day: 8,
    bookings: [],
  },
  {
    day: 9,
    bookings: [],
  },
  {
    day: 10,
    bookings: [
      {
        name: "Đinh Đạt",
        time: "0:00 PM",
      },
    ],
  },
  {
    day: 11,
    bookings: [],
  },
  {
    day: 12,
    bookings: [],
  },
  {
    day: 13,
    bookings: [],
  },
  {
    day: 14,
    bookings: [],
  },
  {
    day: 15,
    bookings: [],
  },
  {
    day: 16,
    bookings: [],
  },
  {
    day: 17,
    bookings: [],
  },
  {
    day: 18,
    bookings: [],
  },
  {
    day: 19,
    bookings: [],
  },
  {
    day: 20,
    bookings: [],
  },
  {
    day: 21,
    bookings: [],
  },
  {
    day: 22,
    bookings: [],
  },
  {
    day: 23,
    bookings: [],
  },
  {
    day: 24,
    bookings: [],
  },
  {
    day: 25,
    bookings: [],
  },
  {
    day: 26,
    bookings: [],
  },
  {
    day: 27,
    bookings: [],
  },
  {
    day: 28,
    bookings: [],
  },
  {
    day: 29,
    bookings: [],
  },
  {
    day: 30,
    bookings: [],
  },
  {
    day: 31,
    bookings: [],
  },
  {
    day: 1,
    bookings: [],
  },
  {
    day: 2,
    bookings: [],
  },
  {
    day: 3,
    bookings: [],
  },
  {
    day: 4,
    bookings: [],
  },
];
