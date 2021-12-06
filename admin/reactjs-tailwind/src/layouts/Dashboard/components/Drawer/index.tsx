import React, { Fragment, useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { dashboardRoutes } from "routes/Routes";
import { IRootState, IRoute, IRoutes } from "common/typings";
import { withRouter, RouteComponentProps } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setExtendDrawer } from "redux/actions/_config";

import NavItem from "./components/NavItem";

interface ILeftSidebar extends RouteComponentProps {
  className?: string;
}

const Drawer: React.FC<ILeftSidebar> = props => {
  const { location } = props;
  const { isExtendDrawer } = useSelector((state: IRootState) => state._config);
  const history = useHistory();
  const [currentPath, setCurrentPath] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    setCurrentPath(history.location.pathname);
  }, [location]);

  const handleClickCloseDrawer = () => {
    if (isExtendDrawer) {
      dispatch(setExtendDrawer(!isExtendDrawer));
    }
  };

  useEffect(() => {
    const isLaptop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isLaptop) {
      dispatch(setExtendDrawer(false));
    }
  }, []);
  return (
    <>
      <div
        className={`fixed top-0 right-0 z-40 w-screen h-screen bg-black opacity-80 ${
          isExtendDrawer ? "block laptop:hidden" : "hidden"
        }`}
        onClick={handleClickCloseDrawer}
      />
      <div
        className={`fixed laptop:static duration-300 top-0 z-50 transform bg-white shadow-md ${
          isExtendDrawer
            ? `translate-x-0 w-25`
            : `-translate-x-full w-25 laptop:w-7.5`
        } laptop:transform-none min-h-screen`}
      >
        <nav
          className={`
           sticky top-0 left-0 w-full h-screen max-h-screen  pt-2 px-1.5 space-y-1 ${
             isExtendDrawer ? "overflow-y-auto" : ""
           }
        `}
        >
          {dashboardRoutes.map(route => {
            return (
              <NavItem
                key={route.path}
                route={route}
                currentPath={currentPath}
                handleClickCloseDrawer={handleClickCloseDrawer}
              />
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default withRouter(Drawer);
