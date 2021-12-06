import { useState } from "react";
import { IDropdown } from "./interface";
import classNames from "classnames";

function Dropdown(props: IDropdown) {
    let { isOpen = false, children, className = "" } = props;

    if (!isOpen) return null;
    return (
        <div
            className={classNames(className, {
                "absolute block p-0.5 z-10 w-full shadow-2xl top-6 bg-white":
                    isOpen,
            })}
        >
            {children}
        </div>
    );
}

function DropdownItem(props: any) {
    let { children, className = "", ...res } = props;

    return (
        <div className="p-0.5 hover:text-white hover:bg-primary" {...res}>
            {children}
        </div>
    );
}

export { Dropdown, DropdownItem };
