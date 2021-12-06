import PhoneIcon from "assets/svg/home/phone.svg";
import AddressIcon from "assets/svg/home/address.svg";
import WebsiteIcon from "assets/svg/home/website.svg";
import SVG from "designs/SVG";

const Contact: React.FC = () => {
  return (
    <div className="flex items-center w-full h-40 px-2 text-white phone:px-4 laptop:px-0 desktop:pr-0 desktop:h-50 desktop:pl-15 bg-secondary">
      <div className="w-full desktop:w-1/2">
        <h2 className="mb-5 font-bold text-center text-mxl phone:text-2xl laptop:text-4xl desktop:text-left">
          CÔNG TY CỔ PHẦN K APP
        </h2>

        <div className="flex items-center w-full mb-3.5  font-bold  ">
          <SVG name="home/phone" width="32" height="32" />
          <span className="ml-2 text-lg phone:ml-5 laptop:text-xl">
            SĐT :
            <a href="tel:0964636139" className="mx-1">
              0964636139
            </a>
            -
            <a href="tel:0368878887" className="ml-1">
              0368878887
            </a>
          </span>
        </div>

        <div className="flex items-center w-full mb-3.5  font-bold ">
          <SVG name="home/address" width="32" height="32" />
          <span className="ml-2 text-lg phone:ml-5 laptop:text-xl">
            SỐ NHÀ 2045, ĐẠI LỘ HÙNG VƯƠNG &nbsp;– &nbsp;GIA CẨM &nbsp;–
            &nbsp;TP VIỆT TRÌ &nbsp;– &nbsp;PHÚ THỌ
          </span>
        </div>

        <div className="flex items-center w-full mb-3.5  font-bold ">
          <SVG name="home/website" width="32" height="32" />
          <span className="flex flex-col ml-2 text-lg phone:ml-5 laptop:text-xl">
            <a className="mb-0.5" href="https://www.ktv-app.com/">
              WEBSITE : HTTP://KTV-APP.COM
            </a>

            <a href="https://bookingktv-app.com/">
              WEBSITE : HTTP://BOOKINGKTV-APP.COM
            </a>
          </span>
        </div>
      </div>
      <div className="box-border items-center justify-center hidden w-1/2 h-full p-5 desktop:block">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3716.7941746771435!2d105.38505211516882!3d21.31914778584182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31348d5cc2545e4b%3A0x1fbd53df379ccdd6!2zMjA0NSDEkOG6oWkgbOG7mSBIw7luZyBWxrDGoW5nLCBQaC5HaWEgQ-G6qW0sIFRow6BuaCBwaOG7kSBWaeG7h3QgVHLDrCwgUGjDuiBUaOG7jSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1624893211355!5m2!1svi!2s"
          width={"100%"}
          height={"100%"}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
        <br />
      </div>
    </div>
  );
};

export default Contact;
