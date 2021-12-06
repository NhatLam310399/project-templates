/* eslint-disable react/button-has-type */
import { IRootState } from "common/formatTypes";
import Breadcrumb from "components/Breadcrumb";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Icons from "designs/Icons";
import { setCollapseDrawer, setHoverDrawer } from "redux/actions/_config";
import UserInfo from "./components/UserInfo";
// import Notifications from "./components/Notification";
import BarToggle from "./components/BarToggle";

interface ITopBarProps {}

const TopBar: React.FC<ITopBarProps> = () => {
    const { isCollapse, isHoverDrawer } = useSelector(
        (state: IRootState) => state._config,
    );
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(setCollapseDrawer(!isCollapse));
        dispatch(setHoverDrawer(!isHoverDrawer));
    };
    return (
        <div>
            <div className="block laptop:flex items-center py-1 px-1.5 h-7 laptop:px-6 shadow bg-white border-b border-gray">
                <div className="flex items-center justify-between gap-2 mb-1 laptop:block">
                    <div className="flex items-center flex-initial gap-2">
                        {/* <Notifications className="order-2 laptop:order-none" /> */}
                        <UserInfo />
                    </div>
                    <div className="laptop:hidden">
                        <BarToggle />
                    </div>
                </div>
                <div className="flex items-center flex-1 order-first gap-3">
                    <button
                        className="hidden laptop:block "
                        onClick={handleClick}
                    >
                        <Icons.BarToggle className="w-2.5" />
                    </button>
                    <Breadcrumb />
                </div>
            </div>
        </div>
    );
};

export default TopBar;
