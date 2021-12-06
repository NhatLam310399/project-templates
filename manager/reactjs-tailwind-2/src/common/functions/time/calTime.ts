/* eslint-disable no-plusplus */
import dayjs from "dayjs";

export const calTime = (time1?: Date, time2?: Date) => {
  const date1: any = dayjs(time1).toDate();
  const date2: any = dayjs(time2).toDate();

  const diffInSeconds = Math.abs(date1 - date2) / 1000;
  const hours = Math.floor((diffInSeconds / 60 / 60) % 24);
  const minutes = Math.floor((diffInSeconds / 60) % 60);

  const hour = +`0${hours}`.slice(-1);
  const minute = `0${minutes}`.slice(-2);

  if (hour === 0) {
    return `${minute} phút`;
  }
  return `${hour} giờ ${minute} phút`;
};

export const getYearOption = (year1: number, year2: number) => {
  const yearOptions = [];
  for (let i = year1; i <= year2; i++) {
    yearOptions.push({ name: `${i}`, value: new Date(`${i}`) });
  }
  return yearOptions;
};
