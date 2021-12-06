import CSS from "csstype";
import React from "react";

export interface IDropdown {
    isOpen?: boolean;
    children?: any;
    className?: string;
    style?: CSS.Properties;
    hasScroll?: boolean;
}

export interface IUserBarItem {
    className?: string;
    avatarURL?: string;
    name?: string;
    additionalInfo?: string;
    nameByHtmlElement?: string;
    onClick?: (e: any) => void;
}

interface IDropdownHeader {
    onToggle: (isOpen: boolean) => void;
    className?: string;
    style?: CSS.Properties;
    children: any;
    /**
     * default is true
     */
    hasArrowIcon?: boolean;
}
