import { t } from "language";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import {
    ICategory,
    ICategoryInput,
    ICreateCategory,
    IUpdateCategory,
    ICareerCounseling,
} from "common/formatTypes";
import Input from "designs/Input";
import TextArea from "designs/TextArea";

import Dialog, { DialogTitle } from "components/Dialog";
import { createCategory, updateCategory } from "redux/actions/blog";

interface IBlogPostDialogProps {
    ButtonMenu: React.ReactElement;
    isEdit?: boolean;
    editField?: ICareerCounseling | null;
    className?: string;
}

const BlogCategoryDialog: React.FC<IBlogPostDialogProps> = props => {
    const dispatch = useDispatch();
    const { ButtonMenu, isEdit, editField, className } = props;
    const field = useRef<ICategory>({ ...editField } || {});

    const handleSubmit = () => {
        const input: ICategoryInput = {
            name: field.current?.name || "",
            description: field.current.description!,
        };

        if (editField) {
            const payload: IUpdateCategory = {
                id: editField._id!,
                categoryInput: input,
            };

            dispatch(updateCategory(payload));
        } else {
            const payload: ICreateCategory = {
                categoryInput: input,
            };
            dispatch(createCategory(payload));
        }
    };

    const handleClose = () => {
        field.current = {};
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
                        ? t("blog.title-edit-category")
                        : t("blog.title-add-category")}
                </DialogTitle>
                <Input
                    label={t("blog.title-category")}
                    value={editField?.name}
                    placeholder={t("blog.enter-category")}
                    name="title"
                    onChange={value => {
                        field.current.name = value;
                    }}
                    validates={{
                        required: {
                            errorMessage: t("blog.error.category.title"),
                        },
                    }}
                />
                <TextArea
                    className="mt-4"
                    label={t("blog.description")}
                    placeholder={t("blog.blog-description")}
                    value={editField?.description}
                    onChange={value => {
                        field.current.description = value;
                    }}
                    name="description"
                />
            </div>
        </Dialog>
    );
};

export default BlogCategoryDialog;
