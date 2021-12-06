import { numberWithCommas, prettyVietnamDongs } from "@common/functions";
import { i18n } from "next-i18next";
import { useCallback } from "react";

const usePrice = () => {
  const renderCompactedPrice = useCallback((price: number): string => {
    const prettyPrice = prettyVietnamDongs(price);
    const { number, sign } = prettyPrice;
    const formattedPrice = `${number} ${i18n.t(sign)}`;
    return formattedPrice;
  }, []);

  const renderFullPrice = useCallback((price: number) => {
    if (!price) return "0 ₫";
    const formattedPrice = numberWithCommas(price);
    const result = `${formattedPrice} ₫`;
    return result;
  }, []);

  return { renderCompactedPrice, renderFullPrice };
};

export default usePrice;
