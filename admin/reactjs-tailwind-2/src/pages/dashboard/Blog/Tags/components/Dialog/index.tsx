import { t } from "language";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";

import Input from "designs/Input";
import TextArea from "designs/TextArea";
import Dialog, { DialogTitle } from "components/Dialog";
import { ICreateTag, ITagInput, ITag, IUpdateTag } from "common/formatTypes";
import { createTag, updateTag } from "redux/actions/blog";

interface IBlogTagsDialogProps {
    ButtonMenu: React.ReactElement;
    isEdit?: boolean;
    editField?: ITag | null;
    className?: string;
}

const BlogTagsDialog: React.FC<IBlogTagsDialogProps> = props => {
    const dispatch = useDispatch();
    const { ButtonMenu, isEdit, editField, className } = props;

    let formField = useRef<ITagInput>(null).current;

    const handleChangeName = (name: string) =>
        (formField = { ...formField, name });

    const handleChangeDescription = (description: string) => {
        formField = { ...formField, description };
    };

    const handleSubmit = () => {
        const input: ITagInput = {
            description: formField?.description,
            name: formField?.name!,
        };
        if (editField) {
            const payload: IUpdateTag = {
                id: editField?._id || "",
                tagInput: input,
            };
            dispatch(updateTag(payload));
        } else {
            const payload: ICreateTag = {
                tagInput: input,
            };
            dispatch(createTag(payload));
        }
    };
    const handleClose = () => {
        formField = null;
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
                        ? t("blog.title-edit-tags")
                        : t("blog.title-add-tags")}
                </DialogTitle>
                <Input
                    label={t("blog.title-tags")}
                    value={editField?.name}
                    placeholder={t("blog.enter-tag-name")}
                    name="title"
                    onChange={handleChangeName}
                    validates={{
                        required: {
                            errorMessage: t("blog.error.tags.title"),
                        },
                    }}
                />
                <TextArea
                    className="mt-4"
                    placeholder={t("blog.tag-description")}
                    label={t("blog.description")}
                    value={editField?.description}
                    onChange={handleChangeDescription}
                    name="description"
                />
            </div>
        </Dialog>
    );
};

export default BlogTagsDialog;
