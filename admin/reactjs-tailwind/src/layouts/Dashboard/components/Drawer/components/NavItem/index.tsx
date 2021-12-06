import React, { Fragment, useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { IRootState, IRoute, IRoutes } from "common/typings";
import { useDispatch, useSelector } from "react-redux";

import { MinusIcon, PlusIcon } from "designs/icons/Common";
import ButtonMenu from "../ButtonMenu";
import SubMenu from "../SubMenu";

interface INavItemProps {
  route: IRoutes;
  currentPath: string;
  handleClickCloseDrawer: () => void;
}

const NavItem: React.FC<INavItemProps> = props => {
  const { route, currentPath, handleClickCloseDrawer } = props;
  const { isExtendDrawer } = useSelector((state: IRootState) => state._config);
  const history = useHistory();

  const [active, setActive] = useState(currentPath === route.path);
  const [extend, setExtend] = useState(false);
  const hasChildren = route?.children?.length;
  useEffect(() => {
    setActive(currentPath === route.path || currentPath?.includes(route.path));
  }, [currentPath]);

  useEffect(() => {
    if (!isExtendDrawer) {
      extend && setExtend(false);
    }
  }, [isExtendDrawer]);

  const handleClick = () => {
    if (hasChildren) setExtend(state => !state);
    else {
      history.push(route.path);
    }
  };

  const closeDrawer = () => {
    // handleClickCloseDrawer();
  };

  const buttonWrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const wrapElement = buttonWrapRef.current!;

    if (!isExtendDrawer) {
      wrapElement.addEventListener("mouseenter", mouseEnterHandler);
      wrapElement.addEventListener("mouseleave", mouseLeaveHandle);
    } else {
      wrapElement.removeEventListener("mouseenter", mouseEnterHandler);
      wrapElement.removeEventListener("mouseleave", mouseLeaveHandle);
    }
  }, [isExtendDrawer]);

  const mouseEnterHandler = React.useCallback(() => {
    setExtend(true);
    const wrapElement = buttonWrapRef.current!;
    const subMenuElement = wrapElement.querySelector(
      ".sub-menu-wrap",
    ) as HTMLDivElement;
    // handle overflow height screen sub menu
    if (subMenuElement) {
      subMenuElement.style.visibility = "hidden";
      const offsetSubMenu =
        subMenuElement.clientHeight + wrapElement.offsetTop + 5;
      const overflowHeight = offsetSubMenu - window.innerHeight;
      if (overflowHeight > 0) {
        subMenuElement.style.top = `${-overflowHeight}px`;
      }
      subMenuElement.style.visibility = "visible";
    }
  }, []);

  const mouseLeaveHandle = React.useCallback(() => {
    setExtend(false);
    const wrapElement = buttonWrapRef.current!;
    const subMenuElement = wrapElement.querySelector(
      ".sub-menu-wrap",
    ) as HTMLDivElement;
    if (subMenuElement) {
      subMenuElement.removeAttribute("style");
    }
  }, []);

  return (
    <div className="relative" ref={buttonWrapRef}>
      <ButtonMenu
        onClick={handleClick}
        active={active}
        disabled={!!hasChildren && !isExtendDrawer}
      >
        <div className="flex items-center gap-1 ">
          <div className="flex-none">
            <route.Icon className="fill-current w-2.5 block " />
          </div>
          <p
            className={`${
              isExtendDrawer ? "text-sm" : "text-sm laptop:text-none"
            } flex-auto font-medium truncate`}
          >
            {route.name}
          </p>
          {hasChildren &&
            (extend ? (
              <MinusIcon className="w-1 fill-current" />
            ) : (
              <PlusIcon className="w-1 fill-current" />
            ))}
        </div>
      </ButtonMenu>
      {hasChildren && (
        <SubMenu
          onCloseDrawer={closeDrawer}
          routes={route.children || []}
          currentPath={currentPath}
          extend={extend}
        />
      )}
    </div>
  );
};

export default NavItem;
