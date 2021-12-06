import React, { useState } from "react";
import { t } from "language";
import {
    IJobTypeInput,
    ICreateJobType,
    IUpdateJobType,
    IJobType,
} from "common/formatTypes";
import Dialog, { DialogTitle } from "components/Dialog";
import Input from "designs/Input";

import { useDispatch } from "react-redux";

import TextArea from "designs/TextArea";
import { createJobType, updateJobType } from "redux/actions/newsConfig";

interface IJobTypeDialogProps {
    ButtonMenu: React.ReactElement;
    editField?: IJobType;
    className?: string;
}

const JobTypeDialog: React.FC<IJobTypeDialogProps> = ({
    ButtonMenu,
    editField,
    className,
}) => {
    const dispatch = useDispatch();
    const [inputFields, setInputFields] = useState<IJobTypeInput>({});

    const handleSubmit = () => {
        if (editField) {
            const payload: IUpdateJobType = {
                id: editField?._id || "",
                jobTypeInput: inputFields,
            };
            dispatch(updateJobType(payload));
        } else {
            const payload: ICreateJobType = {
                jobTypeInput: inputFields,
            };
            dispatch(createJobType(payload));
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
                {editField ? t("job.edit-job-type") : t("job.add-job-type")}
            </DialogTitle>

            <div className="w-full">
                <div className="flex flex-col gap-2">
                    <Input
                        placeholder={t("job.job-type-placeholder")}
                        label={t("job.job-type-name")}
                        value={editField?.name}
                        name="name"
                        onChange={handleChangeInput}
                        validates={{
                            required: {
                                errorMessage: t(
                                    "job.validate-required-job-type",
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

export default JobTypeDialog;
