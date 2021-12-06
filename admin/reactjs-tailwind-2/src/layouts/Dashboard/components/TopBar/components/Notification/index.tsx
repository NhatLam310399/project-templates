import React, { useState } from "react";
import { DropdownItem } from "components/Dropdown";
import * as Icons from "designs/Icons";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";

interface INotificationBarProps {
    className?: string;
}

const Notifications: React.FC<INotificationBarProps> = ({ className }) => {
    return (
        <div className={`${className}`}>
            <Menu
                menuButton={
                    <MenuButton className="block w-full">
                        <Icons.Bell className="fill-current hover:text-error" />
                    </MenuButton>
                }
                offsetY={0}
                arrow
                align="center"
            >
                {mockData.map(({ name }, index) => {
                    return (
                        <MenuItem
                            className="justify-center w-full p-1"
                            onClick={() => {}}
                            styles={{
                                active: {
                                    backgroundColor: "transparent",
                                },
                            }}
                            key={name}
                        >
                            <div className="flex">
                                <span className="text-lg font-normal font-sfpro">
                                    {name}{" "}
                                </span>
                            </div>
                        </MenuItem>
                    );
                })}
            </Menu>
        </div>
    );
};

const mockData = [{ name: "Thông báo 1" }];
export default Notifications;
