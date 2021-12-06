import React, { useState } from "react";
import {
    IBenefit,
    IBenefitInput,
    ICreateBenefit,
    IUpdateBenefit,
} from "common/formatTypes";
import Input from "designs/Input";
import Dialog, { DialogTitle } from "components/Dialog";
import { useDispatch } from "react-redux";
import SingleImageUploader from "components/SingleImageUploader";
import { t } from "language";
import TextArea from "designs/TextArea";
import { createBenefit, updateBenefit } from "redux/actions/benefit";
import { CUSTOM_SIZE_UPLOAD_ICON } from "constants/image";

interface IBenefitDialogProps {
    ButtonMenu: React.ReactElement;
    editField?: IBenefit;
    className?: string;
}

const BenefitDialog: React.FC<IBenefitDialogProps> = props => {
    const { ButtonMenu, editField, className } = props;
    const dispatch = useDispatch();

    const [formField, setFormField] = useState<IBenefitInput>({});

    const handleSubmit = () => {
        const input = {
            ...formField,
            customSizeForUploadImage: CUSTOM_SIZE_UPLOAD_ICON,
        };
        if (editField) {
            const payload: IUpdateBenefit = {
                id: editField._id!,
                benefitInput: input,
            };
            dispatch(updateBenefit(payload));
        } else {
            const payload: ICreateBenefit = {
                benefitInput: input,
            };
            dispatch(createBenefit(payload));
        }
    };

    const handleChangeInput = (
        // using for all input have value with type below:
        value = "",
        name?: string,
    ) => {
        name && setFormField({ ...formField, [name]: value });
    };

    const handleClose = () => {
        setFormField({});
    };

    return (
        <Dialog
            ButtonMenu={ButtonMenu}
            onConfirm={handleSubmit}
            size="sm"
            onClose={handleClose}
            className={className}
        >
            <DialogTitle className="mb-4 ">
                {editField ? t("job.edit-benefit") : t("job.add-benefit")}
            </DialogTitle>
            <div className="w-full">
                <div className="flex flex-col gap-2">
                    <div>
                        <p className="text-lg font-medium text-black mb-0.5">
                            {t("job.image")}
                        </p>
                        <SingleImageUploader
                            image={
                                editField?.icon?.small ||
                                editField?.icon?.default
                            }
                            onChange={icon => {
                                setFormField(state => ({
                                    ...state,
                                    icon,
                                }));
                            }}
                        />
                    </div>
                    <Input
                        placeholder={t("job.benefit-placeholder")}
                        label={t("job.benefit-name")}
                        value={editField?.name}
                        name="name"
                        onChange={handleChangeInput}
                        validates={{
                            required: {
                                errorMessage: t(
                                    "job.validate-required-benefit",
                                ),
                            },
                        }}
                    />
                    <TextArea
                        className="mb-2"
                        label={t("job.description")}
                        value={editField?.description}
                        name="description"
                        onChange={description => {
                            setFormField(state => ({
                                ...state,
                                description,
                            }));
                        }}
                    />
                </div>
            </div>
        </Dialog>
    );
};

export default BenefitDialog;
