export const SIGNS_NUMBER = {
  UNITS: "UNITS",
  THOUSANDS: "THOUSANDS",
  MILLIONS: "MILLIONS",
  BILLIONS: "BILLIONS",
};

export const typesOfVietnamDongCurrency = [
  {
    minLength: 1,
    sign: "UNITS",
  },
  {
    minLength: 4,
    sign: "THOUSANDS",
  },
  {
    minLength: 7,
    sign: "MILLIONS",
  },
  {
    minLength: 10,
    sign: "BILLIONS",
  },
];
export const DD_MM_YYYY = "DD-MM-YYYY";
export const YYYY_MM_DD = "YYYY-MM-DD";
