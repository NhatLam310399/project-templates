import React, { useEffect } from "react";
import * as Icons from "designs/Icons";
import { IRootState } from "common/formatTypes";
import { useDispatch, useSelector } from "react-redux";
import { setExtendDrawer, setCollapseDrawer } from "redux/actions/_config";

const BarToggle = () => {
    const dispatch = useDispatch();

    const { isExtendDrawer } = useSelector(
        (state: IRootState) => state._config,
    );
    const handleClickBar = () => {
        dispatch(setExtendDrawer(!isExtendDrawer));
    };

    useEffect(() => {
        const { matches } = window.matchMedia("(max-width: 1024px)");
        if (matches) {
            const bodyElement = document.body;
            if (isExtendDrawer) {
                bodyElement.style.overflow = "hidden";
            } else {
                bodyElement.hasAttribute("style") &&
                    bodyElement.removeAttribute("style");
            }
            dispatch(setCollapseDrawer(false));
        }
    }, [isExtendDrawer]);

    return (
        <button
            onClick={handleClickBar}
            type="button"
            className="flex justify-center items-center "
        >
            <Icons.BarToggle className="fill-current hover:text-error" />
        </button>
    );
};

export default BarToggle;
