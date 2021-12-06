import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import i18n, { t } from "language";

import { IUser } from "common/formatTypes";

import Dialog, { DialogTitle } from "components/Dialog";
import {
    listPermissionUpgrade,
    IPermissionUserUpgrade,
} from "constants/users/permissions";

import Input from "designs/Input";
import Select from "designs/Select";

import { setPermissionForUser } from "redux/actions/listUsers";

interface IAdminProps {
    ButtonMenu: React.ReactElement;
    editField?: IUser;
    className?: string;
}

const Admin: React.FC<IAdminProps> = ({ ButtonMenu, editField, className }) => {
    const dispatch = useDispatch();
    const [permissionSelected, setPermissionSelected] =
        useState<IPermissionUserUpgrade>();

    useEffect(() => {
        if (editField) {
            const userPermission = listPermissionUpgrade.filter(
                user => user.type === editField?.permission,
            );
            setPermissionSelected(userPermission[0]);
        }
    }, [editField]);

    const handleSubmit = () => {
        if (!permissionSelected) return;
        if (permissionSelected?.type === editField?.permission) return;
        dispatch(
            setPermissionForUser({
                id: editField?._id!,
                permission: permissionSelected?.type!,
            }),
        );
    };

    const handleClose = () => {
        setPermissionSelected(undefined);
    };
    const name = editField?.displayName
        ? editField?.displayName
        : editField?.email;
    const label = editField?.displayName
        ? t("userList.full-name")
        : t("userList.email");
    return (
        <Dialog
            ButtonMenu={ButtonMenu}
            onConfirm={handleSubmit}
            onClose={handleClose}
            className={className}
            size="sm"
        >
            <DialogTitle className="mb-3">
                {t("userList.title-up-permission")}
            </DialogTitle>

            <div className="grid grid-cols-1 gap-2">
                <Input
                    label={t("userList.phone-number")}
                    value={editField?.phoneNumber}
                    name="code"
                    disabled
                />
                <Input label={label} value={name} name="displayName" disabled />
                <Select
                    label={t("userList.role")}
                    options={listPermissionUpgrade}
                    value={permissionSelected?.name}
                    onSelectOption={option => {
                        setPermissionSelected(option);
                    }}
                />
            </div>
        </Dialog>
    );
};

export default Admin;
