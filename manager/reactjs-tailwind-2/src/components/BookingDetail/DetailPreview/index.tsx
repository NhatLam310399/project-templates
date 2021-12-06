import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import dayjs from "dayjs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { calTime, renderLocation, renderPrice } from "common/functions";

import SVG from "designs/SVG";
import { IBooking } from "common/typings";

interface IDetailBookingPaymentProps {
  booking: IBooking | null;
  isExport: boolean;
  onClose: () => void;
}

const DetailBookingPayment: React.FC<IDetailBookingPaymentProps> = props => {
  const { booking, isExport = false, onClose } = props;
  const {
    name,
    phoneNumber,
    email,
    place,
    room,
    hourPrice,
    timeStart,
    billCode,
    timeEnd,
    coupon,
    rewardPoints,
    bookingCode,
  } = booking || {};
  const ref = useRef(null);

  useEffect(() => {
    if (isExport) {
      exportBill();
    }
  }, [isExport]);
  const exportBill = () => {
    html2canvas(ref.current!).then(canvas => {
      const imageData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "px", "letter");
      const width = pdf.internal.pageSize.getWidth();
      pdf.setProperties({
        title: `HD_${billCode}`,
      });
      pdf.addImage(imageData, "PNG", (width - 270) / 2, -30, 270, 500);

      window.open(URL.createObjectURL(pdf.output("blob")));
      onClose && onClose();
    });
  };

  const textNormal = "text-lg font-normal text-black";
  const listInfo = [
    {
      field: "Phòng",
      value: room?.name,
    },
    {
      field: "Thời gian bắt đầu:",
      value: dayjs(timeStart).format("HH:mm:ss, DD/MM/YYYY"),
    },
    {
      field: "Thời gian kết thúc:",
      value: dayjs(timeEnd).format("HH:mm:ss, DD/MM/YYYY"),
    },
    {
      field: "Tổng thời gian:",
      value: `${calTime(timeStart, timeEnd)}/Giờ`,
    },
    {
      field: "Giá phòng:",
      value: `${renderPrice(hourPrice)}/Giờ`,
    },
  ];
  return (
    <div ref={ref} className="flex flex-col items-center w-full p-3 bg-white">
      <h1 className="mt-3 text-3xl font-bold text-black ">{place?.name}</h1>
      {place?.street ||
        (place?.ward && (
          <p className={`mt-2 ${textNormal}`}>
            {place?.street}, {place?.ward?.name}
          </p>
        ))}
      {place?.district ||
        (place?.province && (
          <p className={textNormal}>
            {place?.district?.name}, {place?.province?.name}
          </p>
        ))}
      <p className={textNormal}>
        {place?.phoneNumber && `SĐT: ${place?.phoneNumber} -`}
        {place?.email && `Email: ${place?.email}`}
      </p>
      <h3 className="mt-3 font-bold text-black text-mxl">HÓA ĐƠN THANH TOÁN</h3>
      <p className={textNormal}>Số HĐ : {billCode}</p>
      <div className="w-full pb-3 mt-3 border-b border-dashed border-body">
        <div className="flex items-center justify-between">
          <p className={`${textNormal}`}>Khách hàng: {name}</p>
          <p className={`${textNormal}`}>SĐT: {phoneNumber}</p>
        </div>
        <p className={`${textNormal} w-full`}>Email: {email}</p>
      </div>

      <div className="w-full pb-3 mt-3 border-b border-dashed border-body">
        <p className={`${textNormal} w-1/2`}>
          #Mã đặt phòng:
          <span className="text-primary-dark font-bold text-lg ml-0.5">
            {bookingCode}
          </span>
        </p>
        {listInfo?.map((item, index) => (
          <div className="flex justify-between w-full mt-2">
            <p className={textNormal}>{item.field}:</p>
            <p className={`${textNormal} ${index === 0 && `font-semibold`}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between w-full mt-3">
        <p className="text-lg font-semibold">Hình thức thanh toán</p>
        {coupon?.name && <p className="text-lg font-semibold">Mã khuyến mãi</p>}
      </div>
      <div className="flex items-center justify-between w-full mt-1 ">
        <div className="flex flex-row items-center justify-start gap-1 text-lg font-medium">
          <SVG name="booking/payment" width="20" height="20" />
          <p className="font-normal">Trả tại quầy</p>
        </div>
        {coupon?.name && (
          <p className="w-1/2 font-normal text-right">{coupon?.name}</p>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between w-full mt-2 ">
        <p className="text-lg font-semibold">Phụ thu dịch vụ</p>
        <p className="text-xl font-bold text-primary-dard">
          {" "}
          {renderPrice(booking?.surcharge, "vnd")}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-between w-full mt-2">
        <p className="text-lg font-semibold">Tổng tiền</p>
        <p className="text-xl font-bold text-primary-dark">
          {renderPrice(booking?.totalPayment, "vnd")}
        </p>
      </div>
      <h3 className="w-full mt-6 text-xl font-bold text-center">
        Chúc quý khách vui vẻ, hẹn gặp lại!
      </h3>
    </div>
  );
};

export default DetailBookingPayment;
