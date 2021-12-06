import { t } from "language";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import Input from "designs/Input";
import TextArea from "designs/TextArea";
import Dialog, { DialogTitle } from "components/Dialog";
import {
    ICreateNotifySetting,
    INotifySettingInput,
    INotifySetting,
    IUpdateNotifySetting,
} from "common/formatTypes";
import { IPermissionUser, listPermission } from "constants/users/permissions";
import {
    createNotifySetting,
    updateNotifySetting,
} from "redux/actions/otherSetting";
import Select from "designs/Select";

interface INotifySettingsDialogProps {
    ButtonMenu: React.ReactElement;
    isEdit?: boolean;
    editField?: INotifySetting | null;
    className?: string;
}

const NotifySettingsDialog: React.FC<INotifySettingsDialogProps> = props => {
    const dispatch = useDispatch();
    const { ButtonMenu, isEdit, editField, className } = props;

    const field = useRef<INotifySetting>({ ...editField } || {});
    const [permission, setPermission] = useState<IPermissionUser | null>(null);
    useEffect(() => {
        if (editField) {
            if (editField?.permission === listPermission[0].type) {
                setPermission(listPermission[0]);
            } else {
                setPermission(listPermission[1]);
            }
        }
    }, [editField]);
    const handleSubmit = () => {
        const input: INotifySettingInput = {
            name: field.current?.name || "",
            description: field.current.description!,
            permission: permission?.type || editField?.permission,
        };

        if (editField) {
            const payload: IUpdateNotifySetting = {
                id: editField._id!,
                notifySettingInput: input,
            };
            dispatch(updateNotifySetting(payload));
        } else {
            const payload: ICreateNotifySetting = {
                notifySettingInput: input,
            };
            dispatch(createNotifySetting(payload));
        }
    };

    const handleClose = () => {
        field.current = {};
        setPermission(null);
    };
    const handleChosePermission = (value: IPermissionUser) => {
        setPermission(value);
    };
    return (
        <Dialog
            ButtonMenu={ButtonMenu}
            onConfirm={handleSubmit}
            onClose={handleClose}
            className={className}
        >
            <div className="w-full m-auto">
                <DialogTitle className="mb-3">
                    {isEdit
                        ? t("otherSetting.notification.edit-title")
                        : t("otherSetting.notification.add-title")}
                </DialogTitle>
                <Input
                    label={t("otherSetting.notification.name")}
                    value={editField?.name}
                    placeholder={t(
                        "otherSetting.notification.placeholder.name",
                    )}
                    name="name"
                    onChange={value => {
                        field.current.name = value;
                    }}
                    validates={{
                        required: {
                            errorMessage: t(
                                "otherSetting.notification.error.name",
                            ),
                        },
                    }}
                />
                <Select
                    className="mt-2"
                    required
                    errorMessage={t(
                        "otherSetting.notification.error.permission",
                    )}
                    value={permission?.name}
                    onSelectOption={handleChosePermission}
                    options={listPermission}
                    placeholder={t(
                        "otherSetting.notification.placeholder.permission",
                    )}
                    label={t("otherSetting.notification.permission")}
                />
                <TextArea
                    className="mt-2"
                    placeholder={t(
                        "otherSetting.notification.placeholder.description",
                    )}
                    label={t("otherSetting.notification.description")}
                    value={editField?.description}
                    onChange={value => {
                        field.current.description = value;
                    }}
                    name="description"
                    required
                    errorMessage={t(
                        "otherSetting.notification.error.description",
                    )}
                />
            </div>
        </Dialog>
    );
};

export default NotifySettingsDialog;
