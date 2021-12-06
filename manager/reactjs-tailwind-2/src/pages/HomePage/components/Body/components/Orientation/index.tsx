import OrientationBackground from "assets/images/body-orientation-image.png";
import SVG from "designs/SVG";

const Orientation: React.FC = () => {
  return (
    <div
      className="flex items-center w-full px-2 mt-0 text-white bg-center bg-no-repeat bg-cover phone:px-5 laptop:mt-0 h-50 phone:h-63 desktop:px-15"
      style={{ backgroundImage: `url(${OrientationBackground})` }}
    >
      <div className="flex flex-col justify-center w-full h-full font-bold ">
        <h2 className="mb-5 text-center text-mxl phone:text-2xl laptop:text-4xl phone:mb-5 laptop:mb-10">
          ĐỊNH HƯỚNG VÀ TÔN CHỈ HOẠT ĐỘNG CỦA APP
        </h2>
        {orientationList.map((item, index) => {
          return (
            <div
              key={String(index)}
              className="flex items-center w-full mb-2 text-lg font-bold text-justify text-white laptop:text-xl"
            >
              <SVG name="home/list-style-light" width="32" height="32" />
              <span className="ml-2">{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orientation;

const orientationList = [
  "ĐÓNG GÓP MỘT PHẦN CHO XÃ HỘI PHÁT TRIỂN HƠN.",
  "GIÚP MỘT PHẦN SỨC NHỎ CHO CÁC CƠ SỞ KINH DOANH BAR – KARAOKE",
  "HOẠT ĐỘNG VÌ MỤC ĐÍCH CỘNG ĐỒNG",
];
