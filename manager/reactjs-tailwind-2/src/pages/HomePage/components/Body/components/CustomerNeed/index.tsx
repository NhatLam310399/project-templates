import CustomerNeedBackground from "assets/images/body-customer-need-image.png";
import SVG from "designs/SVG";

const CustomerNeed: React.FC = () => {
  return (
    <div
      className="w-full px-2 py-5 bg-center bg-no-repeat bg-cover phone:px-5 phone:py-8 laptop:px-0 laptop:pl-15.5"
      style={{ backgroundImage: `url(${CustomerNeedBackground})` }}
    >
      <div className="z-20 block w-full h-full gap-3 text-white laptop:flex laptop:flex-row">
        <div className="memb-4 font-bold text-center text-mxl phone:text-2xl laptop:w-1/2 laptop:text-left laptop:text-4xl laptop:pr-20 laptop:mt-6 ">
          <h4 className="laptop:ml-15 ">
            NHU CẦU CỦA KHÁCH HÀNG VÀ NHỮNG BẤT CẬP
          </h4>
        </div>
        <div className="flex flex-col justify-center w-full text-xl font-bold text-justify text-white phone:text-2xl laptop:pl-0 laptop:w-1/2 laptop:px-5">
          <div className="mb-5 ">
            <h4 className="mb-2 text-xl laptop:text-mxl">
              Đối với cơ sở kinh doanh
            </h4>
            {businessList.map((item, index) => {
              return (
                <div
                  key={String(index)}
                  className="flex items-center w-full mb-2 text-lg font-normal text-justify text-white"
                >
                  <SVG name="home/list-style-dark" width="32" height="32" />
                  <span className="ml-1">{item}</span>
                </div>
              );
            })}
          </div>
          <div className="text-white">
            <h4 className="mb-2 text-xl laptop:text-mxl">Đối với khách hàng</h4>
            {customerList.map((item, index) => {
              return (
                <div
                  key={String(index)}
                  className="flex items-center w-full mb-2 text-lg font-normal text-justify text-white"
                >
                  <SVG name="home/list-style-dark" width="32" height="32" />
                  <span className="ml-1">{item}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerNeed;

const businessList = [
  "Muốn bán được nhiều giờ hát nhưng không có công cụ hỗ trợ",
  "Ngoài những giờ cao điểm có muốn sale giảm giá cũng ko biết cách tiếp cận khách hàng như thế nào",
  "Đội ngũ nhân viên muốn chăm sóc khách hàng nhưng chưa có công cụ hỗ trợ, chưa đủ kỹ năng công nghệ chuyển đổi số.",
  "Muốn tăng sản lượng doanh thu nhưng thiếu chiến lược. Mơ hồ định hướng.",
];

const customerList = [
  "Muốn tìm kiếm phòng hát ở gần nhưng ko thể.",
  "Muốn chọn phòng đẹp nhưng ko được xem trước.",
  "Muốn lựa chọn phòng theo số người sử dụng nhưng ko được.",
  "Muốn đặt phòng trước phù hợp cho các dịp lễ tết nhưng không thể.",
  "Muốn lựa chọn phòng chất lượng và tùy chọn giá dịch vụ cũng không thể.",
  "Muốn tìm kiếm các khung giờ giảm giá , khuyến mại cũng ko biết tìm ở đâu",
];
