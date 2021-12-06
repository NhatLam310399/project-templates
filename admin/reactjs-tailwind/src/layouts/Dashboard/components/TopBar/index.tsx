import { IRootState } from "common/typings";
import Breadcrumb from "components/Breadcrumb";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SVG from "designs/SVG";
// import HamburgerIcon from "designs/icons/Hamburger";
import { setExtendDrawer } from "redux/actions/_config";
import { CloseWhiteIcon, HamburgerIcon } from "designs/icons/Common";
import UserInfo from "./components/UserInfo";

interface ITopBarProps {}

const TopBar: React.FC<ITopBarProps> = () => {
  const { breadcrumb } = useSelector((state: IRootState) => state._config);
  const { isExtendDrawer } = useSelector((state: IRootState) => state._config);
  const title = breadcrumb[breadcrumb.length - 1]?.name || "";
  const dispatch = useDispatch();
  const handleClickHamburger = () => {
    dispatch(setExtendDrawer(!isExtendDrawer));
  };
  const UserNotification = () => {
    return (
      <div className="relative cursor-pointer">
        <SVG name="common/bell" />
        <span className="absolute top-0 right-0 flex w-1 h-1 ">
          <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-error" />
          <span className="relative inline-flex w-1 h-1 rounded-full bg-error" />
        </span>
      </div>
    );
  };

  return (
    <>
      <div className="px-1.5 laptop:px-4 py-1.5 bg-primary">
        <div className="flex gap-1 flex-col-reverse phone:flex-row items-center justify-between flex-wrap phone:flex-nowrap">
          <div className="w-full phone:w-auto flex gap-2 items-center justify-between flex-none flex-row-reverse phone:flex-row">
            <button
              type="button"
              className="block"
              onClick={handleClickHamburger}
            >
              {isExtendDrawer ? <CloseWhiteIcon /> : <HamburgerIcon />}
            </button>
            <div className="text-xl font-bold text-white leading-none">
              {title}
            </div>
          </div>
          <div className="w-full phone:w-auto flex flex-none items-center gap-2">
            <UserInfo className="" />
          </div>
        </div>
      </div>
      <div className="pt-2 pb-2.5 px-1.5 phone:px-4">
        <Breadcrumb />
      </div>
    </>
  );
};

export default TopBar;
