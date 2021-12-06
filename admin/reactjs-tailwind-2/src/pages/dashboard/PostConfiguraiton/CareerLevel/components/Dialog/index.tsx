import React, { useState, useEffect } from "react";
import { t } from "language";
import {
    ICategoryLevel2Input,
    ICategoryLv2,
    ICreateJobLevel,
    IUpdateJobLevel,
} from "common/formatTypes";
import Dialog, { DialogTitle } from "components/Dialog";
import Input from "designs/Input";

import { useDispatch } from "react-redux";

import TextArea from "designs/TextArea";
import {
    createJobLevel,
    getAllCategoryLevel1,
    updateJobLevel,
} from "redux/actions/newsConfig";

interface IJobSeekerDialogProps {
    ButtonMenu: React.ReactElement;
    editField?: ICategoryLv2;
    className?: string;
}

const CareerLevelDialog: React.FC<IJobSeekerDialogProps> = ({
    ButtonMenu,
    editField,
    className,
}) => {
    const dispatch = useDispatch();
    const [inputFields, setInputFields] = useState<ICategoryLevel2Input>({});

    useEffect(() => {
        dispatch(getAllCategoryLevel1({ filterCategoryLevel1: {} }));
    }, []);

    const handleSubmit = () => {
        if (editField) {
            const payload: IUpdateJobLevel = {
                id: editField?._id || "",
                jobLevelInput: inputFields,
            };
            dispatch(updateJobLevel(payload));
        } else {
            const payload: ICreateJobLevel = {
                jobLevelInput: inputFields,
            };
            dispatch(createJobLevel(payload));
        }
    };

    const handleChangeInput = (
        // using for all input have value with type below:
        value = "",
        name?: string,
    ) => {
        name && setInputFields({ ...inputFields, [name]: value });
    };

    const handleClose = () => {
        setInputFields({});
    };

    return (
        <Dialog
            ButtonMenu={ButtonMenu}
            onConfirm={handleSubmit}
            onClose={handleClose}
            className={className}
            size="sm"
        >
            <DialogTitle className="mb-3">
                {editField
                    ? t("job.edit-career-level")
                    : t("job.add-career-level")}
            </DialogTitle>

            <div className="w-full">
                <div className="flex flex-col gap-2">
                    <Input
                        placeholder={t("job.position-placeholder")}
                        label={t("job.position")}
                        value={editField?.name}
                        name="name"
                        onChange={handleChangeInput}
                        validates={{
                            required: {
                                errorMessage: t(
                                    "job.validate-required-position",
                                ),
                            },
                        }}
                    />
                    <TextArea
                        label={t("job.description")}
                        name="description"
                        value={editField?.description}
                        onChange={value =>
                            setInputFields({
                                ...inputFields,
                                description: value,
                            })
                        }
                    />
                </div>
            </div>
        </Dialog>
    );
};

export default CareerLevelDialog;
