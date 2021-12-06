import IphoneX from "assets/images/body-benefit-image.png";
import SVG from "designs/SVG";

const Benefit: React.FC = () => {
  return (
    <div className="w-full px-2 py-5 phone:px-5 laptop:px-0">
      <div className="text-secondary">
        <h2 className="mb-4 font-bold text-center text-secondary text-mxl phone:text-2xl laptop:text-4xl ">
          BOOKING ONLINE XUẤT HIỆN CẢI THIỆN NHỮNG GÌ
        </h2>
        <div className="flex items-center justify-center w-full h-full desktop:pt-0">
          <div className="w-full laptop:px-5 desktop:w-1/2 desktop:pl-15">
            <div className="mb-5">
              <h4 className="mb-2 text-xl font-bold text-secondary laptop:text-mxl">
                Các cơ sở kinh doanh: Là phần mềm là cơ sở dữ liệu
              </h4>
              {businessList.map((item, index) => {
                return (
                  <div
                    key={String(index)}
                    className="flex items-center w-full mb-2 text-lg font-normal text-justify text-black"
                  >
                    <SVG name="home/list-style-dark" width="32" height="32" />
                    <span className="ml-1">{item}</span>
                  </div>
                );
              })}
            </div>
            <div>
              <h4 className="mb-2 text-xl font-bold text-secondary laptop:text-mxl">
                Đối với khác hàng
              </h4>
              {customerList.map((item, index) => {
                return (
                  <div
                    key={String(index)}
                    className="flex items-center w-full mb-2 text-lg font-normal text-justify text-black"
                  >
                    <SVG name="home/list-style-dark" width="32" height="32" />
                    <span className="ml-1">{item}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="hidden w-1/2 item-center desktop:block">
            <img src={IphoneX} alt="Iphone X" className="w-1/2 ml-15" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefit;

const businessList = [
  "Giúp bán được nhiều giờ hát nhờ có công cụ hỗ trợ đồng bộ các mạng xã hội  : fb-zalo-tiktok-google ads",
  "Ngoài những giờ cao điểm có thể sale giảm giá tiếp cận khách hàng trên địa bàn bằng quảng cáo ads ",
  "Đội ngũ nhân viên có thể chăm sóc khách hàng nhờ có công cụ hỗ trợ, được đào tạo kỹ năng công nghệ chuyển đổi số. Giúp bán hàng được hiệu quả hơn.",
  "Giúp chủ cơ sở có thể quản lý chỉ tiêu từng nhân viên nhờ có thuật toán thông minh của phần mềm.",
];

const customerList = [
  "Giúp tìm kiếm phòng hát ở gần.",
  "Có thể lựa chọn phòng đẹp và được xem trước nhờ hình ảnh và video demo.",
  "Có thể lựa chọn phòng theo số người sử dụng nhờ mô tả chi tiết từng phòng. ",
  "Có thể đặt phòng trước phù hợp cho các dịp lễ tết trên phần mềm hệ thống của từng quán.",
  "Giúp lựa chọn phòng chất lượng và có thể tùy chọn giá phòng theo nhu cầu.",
  "Có thể tìm kiếm các khung giờ giảm giá , khuyến mại mỗi khi các nhân viên sale trên phần mềm.",
];
