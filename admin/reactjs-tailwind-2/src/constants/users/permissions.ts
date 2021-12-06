import { IPermissionType } from "common/formatTypes";
import { t } from "language";

export type IPermissionItem = {
    type: IPermissionType;
    name: string;
    lowerPermissions: IPermissionType[];
};

export type IPermission = {
    [key in IPermissionType]: IPermissionItem;
};

export const renderPermissionOptions = (
    accountPermission: IPermissionType,
): IPermissionItem[] => {
    const PERMISSION: IPermission = {
        ADMIN: {
            type: "ADMIN",
            name: t("userList.admin"),
            lowerPermissions: ["MANAGER", "EMPLOYER", "CANDIDATE"],
        },
        MANAGER: {
            type: "MANAGER",
            name: t("userList.manager"),
            lowerPermissions: ["CANDIDATE", "EMPLOYER"],
        },
        EMPLOYER: {
            type: "EMPLOYER",
            name: t("userList.employer"),
            lowerPermissions: ["CANDIDATE"],
        },
        CANDIDATE: {
            type: "CANDIDATE",
            name: t("userList.candidate"),
            lowerPermissions: [],
        },
    };

    if (!accountPermission) return [];
    const permissions = PERMISSION[accountPermission].lowerPermissions.map(
        permission => PERMISSION[permission],
    );
    return [PERMISSION[accountPermission], ...permissions];
};
export interface IPermissionUser {
    type?: "CANDIDATE" | "EMPLOYER";
    name?: string;
}
export const listPermission: IPermissionUser[] = [
    {
        type: "CANDIDATE",
        name: t("userList.candidate"),
    },
    {
        type: "EMPLOYER",
        name: t("userList.employer"),
    },
];
export interface IPermissionUserUpgrade {
    type?: "ADMIN" | "MANAGER" | "CANDIDATE";
    name?: string;
}
export const listPermissionUpgrade: IPermissionUserUpgrade[] = [
    {
        type: "CANDIDATE",
        name: t("userList.candidate"),
    },
    {
        type: "MANAGER",
        name: t("userList.manager"),
    },
    {
        type: "ADMIN",
        name: t("userList.admin"),
    }
];
