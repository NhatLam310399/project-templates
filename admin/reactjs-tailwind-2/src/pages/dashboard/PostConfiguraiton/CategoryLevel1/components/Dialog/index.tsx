import React, { useState } from "react";
import i18n, { t } from "language";
import {
    ICreateCategoryLevel1Input,
    IUpdateCategoryLevel1Input,
    ICategoryLevel1,
    ICategoryLevel1Input,
} from "common/formatTypes";
import Dialog, { DialogTitle } from "components/Dialog";
import Input from "designs/Input";
import TextArea from "designs/TextArea";

import { useDispatch } from "react-redux";
import {
    createCategoryLevel1,
    updateCategoryLevel1,
} from "redux/actions/newsConfig";

interface ICategoryLevel1DialogProps {
    ButtonMenu: React.ReactElement;
    isEdit?: boolean;
    editField?: ICategoryLevel1;
    className?: string;
}

const CategoryLevel1Dialog: React.FC<ICategoryLevel1DialogProps> = ({
    ButtonMenu,
    editField,
    className,
}) => {
    const dispatch = useDispatch();
    const [inputFields, setInputFields] = useState<ICategoryLevel1Input>({});

    const handleSubmit = () => {
        if (editField) {
            const payload: IUpdateCategoryLevel1Input = {
                id: editField._id!,
                categoryLevel1Input: {
                    ...inputFields,
                },
            };
            dispatch(updateCategoryLevel1(payload));
        } else {
            const payload: ICreateCategoryLevel1Input = {
                categoryLevel1Input: {
                    ...inputFields,
                },
            };
            dispatch(createCategoryLevel1(payload));
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
        >
            <DialogTitle className="mb-3">
                {editField ? t("job.edit-category-1") : t("job.add-category-1")}
            </DialogTitle>

            <div className="">
                <Input
                    placeholder={t("job.category-name-placeholder")}
                    label={t("job.category-name")}
                    value={editField?.name}
                    name="name"
                    onChange={handleChangeInput}
                    className="mb-2"
                    validates={{
                        required: {
                            errorMessage: t("job.validate-required-category"),
                        },
                    }}
                />
                <TextArea
                    label={t("job.description")}
                    value={editField?.description}
                    name="description"
                    onChange={description => {
                        setInputFields(state => ({
                            ...state,
                            description,
                        }));
                    }}
                />
            </div>
        </Dialog>
    );
};

export default CategoryLevel1Dialog;
