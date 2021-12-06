import { ITypeCurrency } from "common/formatTypes";

export const numberWithCommas = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const renderPrices = (
    num: number | undefined,
    typeCurrency: ITypeCurrency = "VND",
): string => {
    if (typeof num !== "number") return "";
    const price = numberWithCommas(num);

    switch (typeCurrency) {
        case "VND":
            return `${price}₫`;
        case "USD":
            return `$${price}`;
    }
};
