import { typesOfVietnamDongCurrency } from "@constants/formats/unit";

export function prettyVietnamDongs(num: number) {
  // firstly, sort typesOfVietnamDongCurrency to descending
  const descendingTypes = typesOfVietnamDongCurrency.sort(
    (a, b) => b.minLength - a.minLength,
  );
  // Now, find the first item which has minLength less then or equal length of current number
  // F.e: num = 10000 --> type will have sign is THOUSANDS
  let type = descendingTypes.find(
    (item) => item.minLength <= String(num).length,
  );

  let sign = type ? type.sign : "";
  let divider: number = type ? type.minLength - 1 : 0;
  let number = Number((num / 10 ** divider).toFixed(1));

  return { number, sign: `VND-sign.${sign}` };
}
