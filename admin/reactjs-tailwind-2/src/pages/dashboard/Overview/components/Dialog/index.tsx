import React, { useState, useEffect, useMemo } from "react";
import i18n, { t } from "language";
import { useDispatch, useSelector } from "react-redux";

import { CUSTOM_SIZE_UPLOAD_AVATAR } from "constants/image";
import { renderGenderOptions } from "constants/users/genders";
import {
    ICreateUserInput,
    ILocationTypeInput,
    IPermissionType,
    IUpdateUserByAdminInput,
    IUpdateUserProfile,
    IUser,
    IUserInput,
} from "common/formatTypes";
import { regexPhoneNumber, regexEmail } from "common/functions/string/regex";
import Dialog, { DialogTitle } from "components/Dialog";
import AddressField, { ILocationInfos } from "components/AddressField";

import Input from "designs/Input";
import SingleImageUploader from "components/SingleImageUploader";
import Select from "designs/Select";
import Checkbox from "designs/Checkbox";
import DatePicker from "designs/DatePicker";

import {
    createUserByAdmin,
    updateUserByAdmin,
    setEnableForUser,
} from "redux/actions/listUsers";
import { showNotification } from "redux/actions/notification";
import { getAllUser } from "services/listUsers";
import { updateUserProfile } from "redux/actions/profile";

interface IPrivacyInfoProps {
    ButtonMenu: React.ReactElement;
    editField: IUser | null;
    className?: string;
}

const PrivacyInfo: React.FC<IPrivacyInfoProps> = ({
    ButtonMenu,
    editField,
    className = "",
}) => {
    const { language } = i18n;
    const dispatch = useDispatch();

    const genderList = useMemo(() => renderGenderOptions(), [language]);
    const [locationType, setLocationType] = useState<ILocationTypeInput>();
    const [genderSelected, setGenderSelected] = useState<string>("");
    const [users, setUsers] = useState<IUser[]>([]);
    const [inputFields, setInputFields] = useState<IUserInput>({});

    useEffect(() => {
        getAllUser();
    }, []);
    const getAllUser = async () => {
        const result = await getAllUserService();
        setUsers(result);
    };
    const onLocationChange = (locationInfos: ILocationInfos) => {
        const { province, district, ward, street = "" } = locationInfos;
        const newFormField: ILocationTypeInput = {
            provinceCode: province?.code,
            districtCode: district?.code,
            wardCode: ward?.code,
            streetName: street,
        };
        setLocationType(newFormField);
    };
    const handleSubmit = () => {
        const listPhoneNumber = users?.map(user => user.phoneNumber);
        const listEmail = users?.map(user => user.email);
        const listIdentityCard = users?.map(user => user.identityCard);

        if (inputFields.phoneNumber) {
            const isExist = listPhoneNumber.includes(
                String(inputFields.phoneNumber),
            );
            if (isExist) {
                dispatch(
                    showNotification({
                        message: t("userList.phone-number-existed"),
                        type: "error",
                        title: t("userList.error"),
                    }),
                );
                return;
            }
        }
        if (inputFields.email) {
            const isExist = listEmail.includes(String(inputFields.email));
            if (isExist) {
                dispatch(
                    showNotification({
                        message: t("userList.email-existed"),
                        type: "error",
                        title: t("userList.error"),
                    }),
                );
                return;
            }
        }
        if (inputFields.identityCard) {
            const isExist = listIdentityCard.includes(
                String(inputFields.identityCard),
            );
            if (isExist) {
                dispatch(
                    showNotification({
                        message: t("userList.identity-card-existed"),
                        type: "error",
                        title: t("userList.error"),
                    }),
                );
                return;
            }
        }

        const payload: IUpdateUserProfile = {
            updateUserInput: {
                ...inputFields,
                locationTypeInput: locationType,
                permission: editField?.permission,
            },
        };
        dispatch(updateUserProfile(payload));
    };

    const handleChangeInput = (
        // using for all input have value with type below:
        value = "",
        name?: string,
    ) => {
        name && setInputFields({ ...inputFields, [name]: value });
    };

    const handleChangeEnabled = (enabled: boolean) => {
        setInputFields(state => ({ ...state, enabled }));
    };

    const handleClose = () => {
        setInputFields({});
        if (!editField) {
            setGenderSelected("");
        }
    };
    return (
        <Dialog
            ButtonMenu={ButtonMenu}
            onConfirm={handleSubmit}
            onClose={handleClose}
            className={className}
            size="lg"
        >
            <DialogTitle className="mb-3 text-black text-xxl">
                {t("userList.privacy-info")}
            </DialogTitle>
            <div className="grid grid-cols-1 gap-2 laptop:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <Input
                        placeholder={t("userList.enter-phone-number")}
                        label={t("userList.phone-number")}
                        value={editField?.phoneNumber}
                        type="number"
                        name="phoneNumber"
                        onChange={handleChangeInput}
                        validates={{
                            required: {
                                errorMessage: t("common.validate-required"),
                            },
                            matchRegexp: {
                                regexp: regexPhoneNumber,
                                errorMessage: t("common.validate-phone"),
                            },
                        }}
                    />
                    <Input
                        placeholder={t("userList.enter-full-name")}
                        label={t("userList.full-name")}
                        value={editField?.displayName}
                        name="displayName"
                        onChange={handleChangeInput}
                        validates={{
                            required: {
                                errorMessage: t("common.validate-required"),
                            },
                        }}
                    />
                    <Input
                        placeholder={t("userList.enter-email")}
                        label="Email"
                        value={editField?.email}
                        name="email"
                        onChange={handleChangeInput}
                        validates={{
                            required: {
                                errorMessage: t("common.validate-required"),
                            },
                            matchRegexp: {
                                regexp: regexEmail,
                                errorMessage: t("common.validate-email"),
                            },
                        }}
                    />
                    <DatePicker
                        placeholder={t("userList.enter-birth-date")}
                        value={editField?.birthday}
                        label={t("userList.birthday")}
                        name="birthday"
                        onChange={birthday => {
                            setInputFields(state => ({ ...state, birthday }));
                        }}
                        disableFuture
                    />
                    <Input
                        placeholder={t("userList.enter-identification-number")}
                        label={t("userList.identification-number")}
                        value={editField?.identityCard}
                        name="identityCard"
                        onChange={handleChangeInput}
                    />
                    <Select
                        placeholder={t("userList.enter-gender")}
                        label={t("common.gender")}
                        options={genderList}
                        value={genderSelected}
                        onSelectOption={option => {
                            setGenderSelected(option.name!);
                            setInputFields(state => ({
                                ...state,
                                gender: option.gender,
                            }));
                        }}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="">
                        <p className="text-lg font-medium text-black mb-0.5">
                            {t("userList.avatar")}
                        </p>
                        <SingleImageUploader
                            image={
                                editField?.urlAvt?.small ||
                                editField?.urlAvt?.default
                            }
                            className="row-span-2"
                            name="urlAvt"
                            onChange={urlAvt => {
                                setInputFields(state => ({
                                    ...state,
                                    urlAvt,
                                    customSizeForUploadImage:
                                        CUSTOM_SIZE_UPLOAD_AVATAR,
                                }));
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-2 mt-1.5">
                        <AddressField
                            idStreet={editField?.street?._id}
                            onChange={onLocationChange}
                            className="grid grid-cols-1 gap-2"
                            required={false}
                        />
                        <div className="laptop:mt-3">
                            <Checkbox
                                label={t("userList.status")}
                                name="enabled"
                                isChecked={editField?.enabled}
                                onChange={handleChangeEnabled}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default PrivacyInfo;

const getAllUserService = async () => {
    const response: any = await getAllUser({});
    const { results } = response?.data?.getAllUsers || {};
    return results;
};
