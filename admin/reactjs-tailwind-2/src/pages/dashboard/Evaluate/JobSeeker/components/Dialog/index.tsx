import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    IRatingCreateInput,
    IRating,
    IRatingInput,
    IRatingUpdateInput,
    IRootState,
    IGetAllUserHasPermissions,
    IUser,
} from "common/formatTypes";
import { listRatingType } from "constants/evaluated";
import Dialog, { DialogTitle } from "components/Dialog";
import Input from "designs/Input";
import Select from "designs/Select";
import { IOption } from "designs/Select/interface";
import { t } from "language";

import { createRating, ratingUpdate } from "redux/actions/rating";
import { getAllUserHasPermissions } from "redux/actions/listUsers";
import { resetAction } from "redux/actions/common";

interface IRatingCandidateDialogProps {
    ButtonMenu: React.ReactElement;
    isEdit?: boolean;
    editField?: IRating;
    className?: string;
}

const RatingCandidateDialog: React.FC<IRatingCandidateDialogProps> = ({
    ButtonMenu,
    editField,
    className,
}) => {
    const {
        users: { results: listUsers = [] },
    } = useSelector((state: IRootState) => state.listUser);
    const {
        allRating: { results = [] },
    } = useSelector((state: IRootState) => state.rating);
    const [listEmployerOption, setListEmployerOption] = useState<IOption[]>([]);
    const [newListUser, setNewListUser] = useState<IUser[]>([]);
    const [inputFields, setInputFields] = useState<IRatingInput>({});
    const [ratingTypeSelected, setRatingTypeSelected] = useState<string>("");
    const [userSelected, setUserSelected] = useState<string>("");
    const { actionSuccess } = useSelector((state: IRootState) => state.common);
    const dispatch = useDispatch();

    useEffect(() => {
        if (actionSuccess) {
            dispatch(resetAction());
            getUserNotRating();
        }
    }, [actionSuccess]);
    useEffect(() => {
        getAllUserHasPermissionsAPI();
    }, []);
    useEffect(() => {
        if (listUsers.length > 0) {
            getUserNotRating();
        }
    }, [listUsers]);

    useEffect(() => {
        if (newListUser) {
            setListEmployerOption(
                newListUser?.map(item => ({
                    name: item.displayName || "",
                    id: item._id,
                })),
            );
        }
    }, [newListUser]);

    const getAllUserHasPermissionsAPI = () => {
        const payload: IGetAllUserHasPermissions = {
            permissions: ["CANDIDATE"],
        };
        dispatch(getAllUserHasPermissions(payload));
    };
    const getUserNotRating = () => {
        const newRating = [...results];
        const newUsers = [...listUsers];
        newRating?.map(rating => {
            const listUserId = newUsers.map(user => user._id);
            const index = listUserId.indexOf(rating?.user?._id);
            if (index !== -1) {
                newUsers.splice(index, 1);
            }
            setNewListUser(newUsers);
        });
    };
    const handleSubmit = () => {
        if (editField) {
            const payload: IRatingUpdateInput = {
                id: editField._id!,
                ratingUpdateInput: {
                    ...inputFields,
                },
            };
            dispatch(ratingUpdate(payload));
        } else {
            const payload: IRatingCreateInput = {
                ratingCreateInput: {
                    ...inputFields,
                },
            };
            dispatch(createRating(payload));
        }
    };
    const handleChangeInput = (
        // using for all input have value with type below:
        value = "",
        name?: string,
    ) => {
        name && setInputFields({ ...inputFields, [name]: parseInt(value) });
    };

    const handleClose = () => {
        setInputFields({});
        setUserSelected("");
        setRatingTypeSelected("");
    };

    return (
        <Dialog
            ButtonMenu={ButtonMenu}
            onConfirm={handleSubmit}
            onClose={handleClose}
            className={className}
        >
            <DialogTitle className="mb-3">
                {editField
                    ? t("evaluate.title-edit-job-seeker")
                    : t("evaluate.title-add-job-seeker")}
            </DialogTitle>

            <div className="">
                {!editField ? (
                    <Select
                        className="mb-2"
                        label={t("evaluate.name-job-seeker")}
                        options={listEmployerOption}
                        value={userSelected}
                        onSelectOption={option => {
                            setUserSelected(option.name!);
                            setInputFields({
                                ...inputFields,
                                user: option.id!,
                            });
                        }}
                        placeholder={t("evaluate.placeholder-candidate")}
                        required
                        errorMessage={t("evaluate.error-candidate")}
                    />
                ) : (
                    <Input
                        label={t("evaluate.name-job-seeker")}
                        value={editField?.user?.displayName}
                        name="point"
                        disabled
                        onChange={handleChangeInput}
                        className="mb-2"
                    />
                )}
                <Select
                    className="mb-2"
                    label={t("evaluate.rating")}
                    options={listRatingType}
                    value={ratingTypeSelected || editField?.rate}
                    onSelectOption={option => {
                        setRatingTypeSelected(option.name!);
                        setInputFields({ ...inputFields, rate: option.name! });
                    }}
                    placeholder={t("evaluate.placeholder-rating")}
                />
                <Input
                    placeholder={t("evaluate.placeholder-point")}
                    label={t("evaluate.point")}
                    value={editField?.user?.point}
                    name="point"
                    onChange={handleChangeInput}
                    className="mb-2"
                    validates={{}}
                />
            </div>
        </Dialog>
    );
};

export default RatingCandidateDialog;
