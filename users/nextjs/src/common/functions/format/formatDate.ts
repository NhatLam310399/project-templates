import dayjs from "dayjs";
export const formatDate = (date: Date, locale: string) => {
  if (locale === "vi") return dayjs(date).format("DD/MM/YYYY");
  return dayjs(date).format("MMMM D, YYYY");
};
