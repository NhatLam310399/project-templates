import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { dashboardRoutes } from "routes/Routes";
import ButtonWrapper from "designs/ButtonWrapper";
import SVG from "designs/SVG";
import { IRoutes } from "common/formatTypes";
import { withRouter, RouteComponentProps } from "react-router";
import { IRootState } from "redux/reducers";
import { setExtendDrawer, setCollapseDrawer } from "redux/actions/_config";
import ArrowIcon from "designs/Icons/Arrow";

interface ILeftSidebar extends RouteComponentProps {
    className?: string;
}

const classActive = "translate-x-0";
const classInActive = "translate-x-full laptop:translate-x-0";

const Drawer: React.FC<ILeftSidebar> = props => {
    const { location } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const [currentPath, setCurrentPath] = useState("");
    const { currentUser = {} } = useSelector((state: IRootState) => state.auth);
    const [dashboard, setDashboard] = useState<IRoutes[]>([]);

    const { isExtendDrawer, isCollapse, isHoverDrawer } = useSelector(
        (state: IRootState) => state._config,
    );

    useEffect(() => {
        if (currentUser !== null) {
            const { permission } = currentUser?.userInfo || {};
            if (permission === "MANAGER") {
                const routerList = dashboardRoutes?.filter(
                    router => router.permission === "MANAGER",
                );
                setDashboard(routerList);
            } else {
                setDashboard(dashboardRoutes);
            }
        }
    }, [currentUser]);

    useEffect(() => {
        setCurrentPath(history.location.pathname);
    }, [location]);

    const handleChange = (path: string) => {
        setCurrentPath(path);
    };

    const handleClickOverlay = () => {
        if (isExtendDrawer) {
            dispatch(setExtendDrawer(false));
        }
    };
    const handleMouseEnter = () => {
        isHoverDrawer && dispatch(setCollapseDrawer(false));
    };
    const handleMouseLeave = () => {
        isHoverDrawer && dispatch(setCollapseDrawer(true));
    };
    return (
        <>
            <span
                className={`${
                    isExtendDrawer ? "block" : "hidden"
                } fixed inset-0 bg-opacity-40 laptop:hidden laptop:pointer-events-none`}
                onClick={handleClickOverlay}
            />
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`${isExtendDrawer ? classActive : classInActive} 
                ${isCollapse ? "w-10" : "w-25"}
                fixed laptop:static top-0 right-0 z-50 h-full shadow-md bg-white transform duration-200 border-r border-gray`}
            >
                <nav className="sticky top-0 w-full max-h-screen px-2 overflow-y-auto">
                    <div
                        className={`py-4 px-2.5 ${
                            isCollapse ? "invisible" : "visible"
                        }`}
                    >
                        <SVG
                            name="logo/logo"
                            className="block object-contain w-auto mx-auto max-h-3 "
                        />
                    </div>
                    {dashboard.map((route, index) => (
                        <>
                            <DashboardRoute
                                route={route}
                                key={String(index)}
                                currentPath={currentPath}
                                onChange={handleChange}
                                isCollapse={isCollapse}
                            />
                        </>
                    ))}
                </nav>
            </div>
        </>
    );
};

const DashboardRoute: React.FC<{
    route: IRoutes;
    currentPath: string;
    onChange: (e: string) => void;
    isCollapse: boolean;
}> = props => {
    const { route, onChange, currentPath, isCollapse } = props;
    const Icon = route.Icon as React.FC<any>;
    const history = useHistory();

    const [active, setActive] = useState(currentPath === route.path);
    const [openSubMenu, setOpenSubMenu] = useState(currentPath === route.path);
    const hasChildren = route?.children?.length;
    useEffect(() => {
        setActive(
            currentPath === route.path || currentPath.includes(route.path),
        );
    }, [currentPath]);

    useEffect(() => {
        if (active) {
            setOpenSubMenu(true);
        }
    }, [active]);

    const handleClick = () => {
        if (hasChildren) {
            setOpenSubMenu(state => !state);
        } else {
            history.push(route.path);
            onChange(route.path);
        }
    };

    const SubMenu: React.FC<{ routes: IRoutes[] }> = subMenuProps => {
        const { routes } = subMenuProps;
        return (
            <ul
                className={`${
                    isCollapse ? "hidden" : "flex"
                } flex-col ml-2 mt-1`}
            >
                {routes.map((subMenuRoute, index) => {
                    const isActive = currentPath === subMenuRoute.path;
                    const subMenuClick = () => {
                        history.push(subMenuRoute.path);
                        onChange(subMenuRoute.path);
                        setOpenSubMenu(true);
                    };

                    if (subMenuRoute.hiddenRoute) return null;

                    return (
                        <>
                            <li
                                className="relative decoration-clone text-md"
                                key={String(index)}
                                onClick={subMenuClick}
                            >
                                <span
                                    className={`absolute left-1 text-normal top-1/2 w-0.5 h-0.5 rounded-full transform -translate-y-1/2 ${
                                        isActive ? "bg-primary" : "bg-black"
                                    }`}
                                />
                                <ButtonSubMenu>
                                    <p
                                        className={`leading-tight font-sfpro pl-2.5 py-1 ${
                                            isActive
                                                ? "text-primary font-bold"
                                                : "text-body"
                                        }`}
                                    >
                                        {subMenuRoute.name}
                                    </p>
                                </ButtonSubMenu>
                            </li>
                        </>
                    );
                })}
            </ul>
        );
    };
    return (
        <div className="relative mb-1 -mr-2">
            <ButtonMenu
                className={`relative leading-none rounded w-full justify-center ${
                    active ? "text-primary bg-tertiary " : "text-body"
                }`}
                onClick={handleClick}
            >
                <div
                    className={`absolute top-0 right-0 rounded-lg h-full w-0.5 bg-primary ${
                        active ? "block" : "hidden"
                    }`}
                />
                <Icon
                    className={`${
                        isCollapse ? "mr-0 -ml-2" : "mr-1"
                    } min-w-2 block  ${active ? "text-primary" : "text-body"}`}
                />
                <p
                    className={`text-md flex-auto font-sfpro font-medium ${
                        isCollapse ? "hidden" : "block"
                    }`}
                >
                    {route.name}
                </p>
                {hasChildren && (
                    <div className="w-auto">
                        <ArrowIcon
                            direction={openSubMenu ? "UP" : "DOWN"}
                            className={`block fill-current ${
                                active ? "text-white" : "text-black"
                            } ${isCollapse ? "hidden" : "block"}`}
                        />
                    </div>
                )}
            </ButtonMenu>
            {hasChildren && openSubMenu && (
                <SubMenu routes={route.children || []} />
            )}
            {/* subdropdown */}
        </div>
    );
};
export default withRouter(Drawer);

const ButtonMenu: React.FC<{
    className?: string;
    onClick: () => void;
}> = props => {
    const { className = "", children, onClick } = props;
    return (
        <ButtonWrapper onClick={onClick}>
            <div className={`flex flex-row items-center p-1 ${className}`}>
                {children}
            </div>
        </ButtonWrapper>
    );
};

const ButtonSubMenu: React.FC = ({ children }) => {
    return (
        <ButtonWrapper>
            <div>{children}</div>
        </ButtonWrapper>
    );
};
