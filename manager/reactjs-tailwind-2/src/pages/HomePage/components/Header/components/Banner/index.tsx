import BannerBackground from "assets/images/header-banner-image.png";
import IphoneX from "assets/images/header-banner-img.png";
import AppstoreDownload from "assets/svg/home/app-store-download.svg";
import GoogleplayDownload from "assets/svg/home/google-play-download.svg";

import { Link } from "react-router-dom";

const Banner: React.FC = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${BannerBackground})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="relative w-full"
    >
      <div className="z-10 bg-black bg-opacity-40 px-4 laptop:px-10 h-full">
        <div className="z-20 laptop:grid laptop:grid-cols-2 gap-0 items-center justify-center py-5">
          <img
            src={IphoneX}
            alt="IphoneX"
            className="hidden w-6/12 laptop:block mx-auto"
          />
          <div className="flex flex-col desktop:p-0 items-center justify-center mt-0 laptop:items-start laptop:justify-start">
            <h1 className="text-center desktop:text-left mb-1.5 phone:mb-3 font-bold text-white text-2xl phone:text-3xl desktop:text-4xl">
              PHẦN MỀM BOOKING ONLINE
            </h1>
            <p className="mb-3 font-bold text-center text-white phone:mb-5 text-md laptop:text-2xl phone:text-xl laptop:text-left">
              GIẢI PHÁP CHUYỂN ĐỐI SỐ 4.0 DÀNH CHO CÁC CƠ SỞ KINH DOANH KARAOKE
            </p>
            <div className="flex">
              <Link to="/" className="h-6 w-17 desktop:w-25 desktop:h-7 mr-3">
                <img
                  src={AppstoreDownload}
                  alt="Apple store download"
                  className="w-full"
                />
              </Link>
              <Link to="/" className="h-6 w-17 desktop:w-25 desktop:h-7">
                <img
                  src={GoogleplayDownload}
                  alt="Gooleplay download"
                  className="w-full"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
