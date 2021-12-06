import { IRootState, IRoute } from "common/typings";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const SubMenu: React.FC<{
  routes: IRoute[];
  currentPath: string;
  onCloseDrawer: () => void;
  extend: boolean;
}> = props => {
  const { routes, currentPath, onCloseDrawer, extend } = props;
  const { isExtendDrawer } = useSelector((state: IRootState) => state._config);
  const history = useHistory();
  return (
    <div
      className={`sub-menu-wrap ${
        isExtendDrawer
          ? `py-1 ${extend ? "block" : "hidden"}`
          : `static laptop:absolute laptop:pl-1.5 top-1 left-full ${
              extend ? "block" : "hidden"
            }`
      }`}
    >
      <ul
        className={`ml-1.5 ${
          isExtendDrawer
            ? "block"
            : "laptop:bg-white laptop:rounded-lg laptop:shadow"
        } `}
      >
        {routes.map(route => {
          const routePath = route.path?.replace(/:id*/g, "");
          const isActive =
            currentPath === routePath || currentPath.includes(routePath);
          const handleClick = () => {
            onCloseDrawer && onCloseDrawer();
            history.push(route.path);
          };
          if (route.hiddenRoute) return null;
          return (
            <li className="text-sm" key={route.name} onClick={handleClick}>
              <button
                type="button"
                className={`p-1.3 w-full flex items-center gap-1 rounded-lg hover:bg-line leading-none ${
                  isActive ? "text-primary" : "text-body"
                }`}
              >
                <span
                  className={`text-xs transform scale-50 flex-none rounded-full ${
                    isExtendDrawer ? "" : "block laptop:hidden"
                  }`}
                >
                  &#9679;
                </span>
                <p
                  className={`text-sm font-medium text-left flex-auto truncate ${
                    isExtendDrawer ? "" : "laptop:px-1 laptop:min-w-20"
                  }`}
                >
                  {route.name}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SubMenu;
