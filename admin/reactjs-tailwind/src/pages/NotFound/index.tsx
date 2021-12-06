import React from "react";
import Button from "designs/Button";
import SVG from "designs/SVG";
import { PATH } from "constants/routes";

const NotFound: React.FC = () => {
  return (
    <div className="text-black h-screen w-full py-5 px-2 laptop:px-0 text-bold flex flex-col items-center justify-center">
      <div className="mb-2">
        <SVG name="error/404page" width={750} height={500} />
      </div>
      <h2 className="text-2xl laptop:text-4xl text-center font-bold mb-2 text-primary">
        Có lỗi xảy ra với hệ thống !
      </h2>
      <p className="mb-2 text-primary text-xl laptop:text-mxl text-center">
        Bạn có thể đã nhập sai địa chỉ hoặc trang có thể đã bị di chuyển.
      </p>
      <div>
        <Button
          primary
          className=" text-white font-medium"
          innerClassName="laptop:px-15 px-8 text-xl normal-case font-sans"
          to={PATH.ACCOUNT.LOGIN}
        >
          Về trang chủ
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
