import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps, useHistory } from "react-router-dom";
import { ValidatorForm } from "react-material-ui-form-validator";

import { useDispatch, useSelector } from "react-redux";

import {
    IUserInput,
    ICreateUserInput,
    IUpdateUserByAdminInput,
    IUser,
} from "common/formatTypes";
import { regexPhoneNumber, regexEmail } from "common/functions/string/regex";
import { PATH } from "constants/routes";

import Button from "designs/ButtonNormal";
import Input from "designs/Input";
import { t } from "language";

import { createUserByAdmin, updateUserByAdmin } from "redux/actions/listUsers";
import { IRootState } from "redux/reducers";
import { setBreadcrumb } from "redux/actions/_config";
import { showNotification } from "redux/actions/notification";
import { resetAction } from "redux/actions/common";
import { getAllUserHasPermissions } from "services/listUsers";

type ISubmit = "EDIT" | "CONTINUE";

const ActionAccountPage: React.FC<RouteComponentProps> = props => {
    const state = props.location.state as IUser;
    const history = useHistory();
    const {
        users: { results = [], loading = true },
    } = useSelector((state: IRootState) => state.listUser);
    const [editField, setEditField] = useState<IUser>({});
    const dispatch = useDispatch();
    const [users, setUsers] = useState<IUser[]>([]);
    const [formFieldAccount, setFormFieldAccount] = useState<IUserInput>({});
    const { actionSuccess } = useSelector((state: IRootState) => state.common);
    const [type, setType] = useState<ISubmit>("CONTINUE");

    useEffect(() => {
        if (state) {
            setEditField(state);
        }
        getAllUser();
        setupBreadcrumb();
    }, [state]);

    useEffect(() => {
        if (actionSuccess) {
            dispatch(resetAction());
            history.push(PATH.MANAGE_EMPLOYER.ADD.COMPANY);
        }
    }, [actionSuccess]);

    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("breadcrumb.add-employer"),
                },
            ]),
        );
    };
    const getAllUser = async () => {
        const result = await getAllUserService();
        setUsers(result);
    };
    const handleSubmitAccount = () => {
        if (type === "CONTINUE") {
            history.push({
                pathname: PATH.MANAGE_EMPLOYER.ADD.COMPANY,
                state: editField,
            });
            return;
        }
        const listPhoneNumber = users?.map(user => user.phoneNumber);
        const listEmail = users?.map(user => user.email);

        if (formFieldAccount.phoneNumber) {
            const isExist = listPhoneNumber.includes(
                String(formFieldAccount.phoneNumber),
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
        if (formFieldAccount.email) {
            const isExist = listEmail.includes(String(formFieldAccount.email));
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
        const input = {
            ...formFieldAccount,
        };

        if (Object.keys(editField).length > 0) {
            const payload: IUpdateUserByAdminInput = {
                id: editField._id!,
                updateUserInput: input,
            };
            dispatch(updateUserByAdmin(payload));
        } else {
            const payload: ICreateUserInput = {
                createUserInput: {
                    ...input,
                    permission: "EMPLOYER",
                },
            };
            dispatch(createUserByAdmin(payload));
        }
    };

    const handleChangeAccountInput = (
        // using for all input have value with type below:
        value = "",
        name?: string,
    ) => {
        setType("EDIT");
        name && setFormFieldAccount({ ...formFieldAccount, [name]: value });
    };

    return (
        <div className="w-full">
            <h1 className="mb-3 font-semibold leading-none text-xxl">
                {t("manageEmployer.add-employer")}
            </h1>
            <h2 className="text-xl font-bold leading-none text-primary">
                {t("manageEmployer.account.title")}
            </h2>
            <ValidatorForm
                onSubmit={handleSubmitAccount}
                className="mt-2 font-medium font-sfpro"
            >
                <div className="grid grid-cols-2 gap-2">
                    <Input
                        className="col-span-2 laptop:col-span-1"
                        label={t("manageEmployer.account.full-name")}
                        value={editField?.displayName}
                        name="displayName"
                        placeholder={t("manageEmployer.account.full-name")}
                        onChange={handleChangeAccountInput}
                        validates={{
                            required: {
                                errorMessage: t(
                                    "manageEmployer.error.account.name",
                                ),
                            },
                        }}
                    />
                    <Input
                        className="col-span-2 laptop:col-span-1"
                        type="number"
                        label={t("manageEmployer.account.phone-number")}
                        value={editField?.phoneNumber}
                        name="phoneNumber"
                        placeholder={t(
                            "manageEmployer.placeholder.phone-number",
                        )}
                        onChange={handleChangeAccountInput}
                        validates={{
                            required: {
                                errorMessage: t(
                                    "manageEmployer.error.account.phone-number",
                                ),
                            },
                            matchRegexp: {
                                regexp: regexPhoneNumber,
                                errorMessage: t("common.validate-phone"),
                            },
                        }}
                    />
                    <Input
                        className="col-span-2 laptop:col-span-1"
                        label={t("manageEmployer.account.email")}
                        value={editField?.email}
                        name="email"
                        placeholder={t("manageEmployer.placeholder.email")}
                        onChange={handleChangeAccountInput}
                        validates={{
                            required: {
                                errorMessage: t(
                                    "manageEmployer.error.account.email",
                                ),
                            },
                            matchRegexp: {
                                regexp: regexEmail,
                                errorMessage: t("common.validate-email"),
                            },
                        }}
                    />
                    <Input
                        className="col-span-2 laptop:col-span-1"
                        label={t("manageEmployer.account.password")}
                        value={editField?.password?.slice(0, 11)}
                        name="password"
                        type={
                            Object.keys(editField).length > 0
                                ? "password"
                                : "text"
                        }
                        disabled={Object.keys(editField).length > 0}
                        placeholder={t("manageEmployer.placeholder.password")}
                        onChange={handleChangeAccountInput}
                        validates={{
                            required: {
                                errorMessage: t(
                                    "manageEmployer.error.account.password",
                                ),
                            },
                        }}
                    />
                </div>
                <div className="flex justify-end mt-3 gap-x-2">
                    <Button
                        className="w-16 h-4.5 border border-primary text-primary"
                        to={PATH.MANAGE_EMPLOYER.SELF}
                    >
                        {t("manageEmployer.cancel")}
                    </Button>
                    <Button
                        type="submit"
                        className="w-16 h-4.5 bg-primary text-white"
                        primary
                    >
                        {t("manageEmployer.next")}
                    </Button>
                </div>
            </ValidatorForm>
        </div>
    );
};

export default ActionAccountPage;

const getAllUserService = async () => {
    const response: any = await getAllUserHasPermissions({
        permissions: ["EMPLOYER", "ADMIN", "CANDIDATE", "MANAGER"],
    });
    const { results } = response?.data?.getAllUserHasPermissions || {};
    return results;
};
