import React, { useEffect } from "react";

import Breadcrumb from "components/Breadcrumb";
import Hamburger from "designs/icons/Hamburger";
import { useSelector, useDispatch } from "react-redux";
import { setExtendDrawer } from "redux/actions/_config";
import { IRootState } from "redux/reducers";
import { getKaraokeByBoss } from "redux/actions/place";

import UserNotification from "./components/UserNotification";

interface ITopBarProps {}

const TopBar: React.FC<ITopBarProps> = () => {
  const dispatch = useDispatch();
  const { isExtendDrawer } = useSelector((state: IRootState) => state._config);
  const { currentUser = {} } = useSelector((state: IRootState) => state.auth);
  const { place } = useSelector((state: IRootState) => state.place);
  const handleClickHamburger = () => {
    dispatch(setExtendDrawer(!isExtendDrawer));
  };
  useEffect(() => {
    if (currentUser) {
      if (currentUser.userInfo?.permission === "CARE_STAFF") {
      } else {
        !place &&
          dispatch(getKaraokeByBoss({ idUser: currentUser?.userInfo?._id }));
      }
    }
  }, [currentUser]);

  const { breadcrumb } = useSelector((state: IRootState) => state._config);
  const name = breadcrumb[breadcrumb.length - 1]?.name || "";
  return (
    <div className="top-bar relative flex flex-wrap phone:flex-nowrap items-center justify-between w-full py-2 min-h-11">
      <div className="flex flex-col justify-center h-full bg-white phone:pl-5 laptop:pl-0 ">
        <h4 className="mb-1 text-xl font-bold leading-none text-black phone:text-2xl laptop:text-3xl">
          {name}
        </h4>
        <Breadcrumb />
      </div>
      <div className="left-0 z-20 inline-block transform hamburger-wrapper top-1/2 phone:-translate-y-1/2 phone:absolute laptop:hidden">
        <Hamburger
          className={`fill-current text-secondary cursor-pointer ${
            isExtendDrawer ? "hidden" : "block"
          }`}
          onClick={handleClickHamburger}
        />
      </div>
      <div className="flex w-full phone:w-auto items-center gap-2 leading-none mt-1 phone:mt-0">
        <UserNotification />
        {place && (
          <h3 className="w-full  text-xl font-bold text-black phone:w-auto laptop:text-mxl">
            <span className="">Cở sở:</span> {place?.name}
          </h3>
        )}
      </div>
    </div>
  );
};

export default React.memo(TopBar);
