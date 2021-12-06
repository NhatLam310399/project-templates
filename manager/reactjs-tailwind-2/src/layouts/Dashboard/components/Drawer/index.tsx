import { useEffect, useState, Dispatch, SetStateAction, Fragment } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { karaokeRoutes, companyRoutes, careStaffRoutes } from "routes/Routes";
import { IRoutes } from "common/typings";
import { IRootState } from "redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { setExtendDrawer } from "redux/actions/_config";
import UserInfo from "./components/UserInfo";

const Drawer: React.FC = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { isExtendDrawer } = useSelector((state: IRootState) => state._config);
  const { place } = useSelector((state: IRootState) => state.place);
  const { currentUser } = useSelector((state: IRootState) => state.auth);

  const [currentPath, setCurrentPath] = useState<string>("");
  useEffect(() => {
    setCurrentPath(history.location.pathname);
  }, [pathname]);

  const handleClickHamburger = () => {
    if (isExtendDrawer) {
      dispatch(setExtendDrawer(!isExtendDrawer));
    }
  };
  const handleClickItem = (route: IRoutes) => {
    // history.push(route.path);
    setCurrentPath(route.path);
    dispatch(setExtendDrawer(false));
  };
  const activeClass = "translate-x-0";
  const inactiveClass = "-translate-x-full laptop:translate-x-0";
  const dashboardRoutes =
    currentUser?.userInfo?.permission === "CARE_STAFF"
      ? careStaffRoutes
      : place?.type === "KARAOKE"
      ? karaokeRoutes
      : companyRoutes;
  return (
    <>
      <div
        className={`overlay ${
          isExtendDrawer ? "opacity-40 z-10" : "opacity-0 -z-1"
        } h-screen w-screen transition duration-200 ease-linear absolute z-10 bg-black`}
        onClick={handleClickHamburger}
      />
      <div
        className={` ${
          isExtendDrawer ? activeClass : inactiveClass
        } fixed left-0 laptop:static w-17 h-screen z-20 shadow duration-300 transform`}
      >
        <div className="sticky top-0 flex flex-col justify-between w-full h-full max-h-screen">
          <div className="flex-1 overflow-y-auto scrollbar-hide bg-primary">
            {(currentUser?.userInfo?.permission === "CARE_STAFF" || place) &&
              dashboardRoutes?.map((route, index) => (
                <Link to={route.path} key={String(index)}>
                  <ButtonItem
                    setCurrentPath={setCurrentPath}
                    currentPath={currentPath}
                    route={route}
                    onClick={() => handleClickItem(route)}
                  />
                </Link>
              ))}
          </div>
          <UserInfo className="flex-none" />
        </div>
      </div>
    </>
  );
};
export default Drawer;

export const ButtonItem: React.FC<{
  route: IRoutes;
  currentPath: string;
  onClick?: () => void;
  setCurrentPath: Dispatch<SetStateAction<string>>;
}> = props => {
  const { route, onClick, currentPath } = props;
  const isActive = currentPath === route.path;
  const background = isActive
    ? "bg-white hover:bg-white text-primary"
    : "bg-primary hover:bg-primary-dark duration-300 text-white";

  const iconColor = isActive ? "text-primary " : "text-white";

  if (!route.Icon) return null;

  const handleOnClick = () => {
    onClick && onClick();
  };

  return (
    <button
      type="button"
      className={`${background} flex items-center justify-center text-center w-full h-13 p-1`}
      onClick={handleOnClick}
    >
      <div
        className={`flex flex-col items-center justify-center ${iconColor} `}
      >
        <route.Icon className={`w-2.5 block m-auto fill-current `} />
        <p className="w-full pt-1.5 text-lg leading-none">{route.name} </p>
      </div>
    </button>
  );
};
