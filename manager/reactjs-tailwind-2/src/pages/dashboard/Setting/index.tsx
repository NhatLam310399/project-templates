import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IGetKaraokeByBoss } from "common/typings";
import TabTitle from "components/TabTitle";

import { PATH } from "constants/routes";
import { typeTitle } from "constants/setting/permissionTitle";

import { IRootState } from "redux/reducers";
import {
  COMPANY_NAV_SETTING,
  ISettingNavItem,
  KARAOKE_NAV_SETTING,
} from "constants/setting";
import { getKaraokeByBoss } from "redux/actions/place";
import { setBreadCrumb } from "redux/actions/_config";

import BoxStoreVideo from "./components/BoxStoreVideo";
import BoxStoreImage from "./components/BoxStoreImage";
import BoxManagerInfo from "./components/BoxManagerInfo";
import BoxStoreInfo from "./components/BoxStoreInfo";
import StopSchedule from "./components/StopSchedule";

const Setting = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: IRootState) => state.auth);
  const { place } = useSelector((state: IRootState) => state.place);
  const [currentNav, setCurrentNav] = useState<string>("place");
  const { actionSuccess } = useSelector((state: IRootState) => state.common);

  useEffect(() => {
    if (actionSuccess) {
      getKaraokeByBossAPI();
    }
  }, [actionSuccess]);

  const getKaraokeByBossAPI = () => {
    const idBoss: IGetKaraokeByBoss = {
      idUser: currentUser?.userId?.id,
    };
    dispatch(getKaraokeByBoss(idBoss));
  };

  useEffect(() => {
    setupBreadCrumb();
  }, []);

  const setupBreadCrumb = () => {
    dispatch(
      setBreadCrumb([
        {
          name: "Bảng điều khiển",
          path: PATH.OVERVIEW,
        },
        {
          name: "Cài đặt",
          path: PATH.SETTING,
        },
      ]),
    );
  };

  const renderContent = () => {
    switch (currentNav) {
      case "own":
        return <BoxManagerInfo />;
      case "image":
        return <BoxStoreImage />;
      case "video":
        return <BoxStoreVideo />;
      case "closingTime":
        return <StopSchedule />;
      case "place":
      default:
        return <BoxStoreInfo />;
    }
  };

  const navSettingList =
    place?.type === "KARAOKE" ? KARAOKE_NAV_SETTING : COMPANY_NAV_SETTING;

  return place ? (
    <div className="setting grid gap-1 laptop:gap-3 grid-cols-1 phone:grid-cols-auto-1fr">
      <div className="w-27 max-w-full">
        {navSettingList.map((item: ISettingNavItem, index: number) => (
          <TabTitle
            key={String(index)}
            isActive={item?.value === currentNav}
            onChange={() => {
              setCurrentNav(item?.value);
            }}
          >
            {item?.name}
          </TabTitle>
        ))}
      </div>
      <div className="">{renderContent()}</div>
    </div>
  ) : null;
};
export default Setting;
