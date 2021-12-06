import { getScaleWidthHeightFromObject } from ".";

export type IPrintStatus = "Good" | "Average" | "Poor";

class PrintQualityRes {
  status: IPrintStatus;
  quality: string;

  constructor(status: IPrintStatus, quality: string) {
    this.status = status;
    this.quality = quality;
  }

  toString() {
    return `${this.status} / ${this.quality}`;
  }
}

/**
 * @description This will calc the DPI, DPI is "Dots per inch"
 *  Visit here to understand what is DPI: https://tinhte.vn/thread/dpi-man-hinh-thet-bi-cua-ban-la-bao-nhieu.845089/#:~:text=%22DPI%22%20l%C3%A0%20ch%E1%BB%AF%20vi%E1%BA%BFt%20t%E1%BA%AFt,%3D%20106276%20dots%2Finch%20vu%C3%B4ng.
 */

export const getPrintQuality = (object: fabric.Object): PrintQualityRes => {
  const { typeObject } = object;
  if (typeObject === "IMAGE") {
    let status: IPrintStatus = "Good";
    const { width } = getScaleWidthHeightFromObject(object);
    const clipPath = object.clipPath;

    const originWidth = object.originWidth || 1;
    const clipPathWidthByInch = clipPath?.widthByInch || 1;
    const clipPathWidth = clipPath?.width || 1;

    const objectWidthByInch = (clipPathWidthByInch * width) / clipPathWidth;

    const DPI = originWidth / objectWidthByInch;

    if (DPI < 75) status = "Poor";
    else if (DPI < 120) status = "Average";

    return new PrintQualityRes(status, `${DPI.toFixed(0)} DPI`);
  }
  return new PrintQualityRes("Good", "Vector");
};
