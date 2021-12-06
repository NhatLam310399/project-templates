import React, { useEffect, useRef, useState } from "react";
import {
    ICreateCareerCounseling,
    ICareerCounseling,
    ICareerCounselingInput,
    IRootState,
    IUpdateCareerCounseling,
    ICategory,
    ITag,
} from "common/formatTypes";
import Dialog, { DialogTitle } from "components/Dialog";
import Input from "designs/Input";
import Select from "designs/Select";
import Editor from "designs/Editor";
import Checkbox from "designs/Checkbox";
import TextArea from "designs/TextArea";
import SingleImageUploader from "components/SingleImageUploader";
import i18n, { t } from "language";
import MultiSelect from "designs/MultiSelectV2";
import { useDispatch, useSelector } from "react-redux";
import {
    createCareerCounseling,
    getAllTag,
    updateCareerCounseling,
} from "redux/actions/blog";

import { ASPECT_RATIO_16_9 } from "constants/aspect";
import { CUSTOM_SIZE_UPLOAD_BLOG } from "constants/image";
import { useStyles } from "./styles";

interface IBlogPostDialogProps {
    ButtonMenu: React.ReactElement;
    isEdit?: boolean;
    editField?: ICareerCounseling;
    className?: string;
}

const BlogPostDialog: React.FC<IBlogPostDialogProps> = props => {
    const dispatch = useDispatch();
    const { ButtonMenu, isEdit, editField, className } = props;
    const classes = useStyles();

    const [formField, setFormField] = useState<ICareerCounselingInput>({});
    const {
        allCategory: { results: categoryList },
        allTag: { results: tagList },
    } = useSelector((state: IRootState) => state.blog);
    const [categorySelected, setCategorySelected] = useState<ICategory>();
    useEffect(() => {
        dispatch(getAllTag({ filterTag: {} }));
    }, []);
    useEffect(() => {
        if (editField) {
            setCategorySelected(editField?.category);
        }
    }, [editField]);
    const handleSubmit = () => {
        const input: ICareerCounselingInput = {
            ...formField,
            customSizeForUploadImage: CUSTOM_SIZE_UPLOAD_BLOG,
        };

        if (editField) {
            const payload: IUpdateCareerCounseling = {
                id: editField._id!,
                careerCounselingInput: input,
            };

            dispatch(updateCareerCounseling(payload));
        } else {
            const payload: ICreateCareerCounseling = {
                careerCounselingInput: input,
            };
            dispatch(createCareerCounseling(payload));
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
        if (!editField) {
            setCategorySelected(undefined);
        }
    };

    const handleSelect = (options: ITag[]) => {
        const listTag = options.map(item => item._id);
        setFormField(state => ({
            ...state,
            tags: listTag as string[],
        }));
    };

    return (
        <Dialog
            ButtonMenu={ButtonMenu}
            onConfirm={handleSubmit}
            onClose={handleClose}
            className={className}
            size="lg"
        >
            <div className="w-full m-auto">
                <DialogTitle className="mb-3">
                    {isEdit
                        ? t("blog.title-edit-post")
                        : t("blog.title-add-post")}
                </DialogTitle>
                <div className={`${classes.layout} laptop:grid`}>
                    <div className={classes.layoutLeft}>
                        <Input
                            className="mb-4"
                            label={t("blog.title")}
                            value={editField?.name}
                            placeholder={t("blog.enter-title")}
                            name="name"
                            onChange={handleChangeInput}
                            validates={{
                                required: {
                                    errorMessage: t("blog.error.post.title"),
                                },
                            }}
                        />
                        <Select
                            label={t("blog.category")}
                            value={categorySelected?.name}
                            placeholder={t("blog.choose-category")}
                            options={categoryList}
                            className="mb-4"
                            required
                            errorMessage={t("blog.error.post.category")}
                            onSelectOption={option => {
                                setCategorySelected(option);
                                setFormField(state => ({
                                    ...state,
                                    category: option._id,
                                }));
                            }}
                        />
                        <MultiSelect
                            label={t("blog.tags")}
                            initValue={editField?.tags || []}
                            options={tagList}
                            onSelectOption={handleSelect}
                            className="p-0 mb-4"
                            required={true}
                            errorMessage={t("blog.error.post.tags")}
                        />
                    </div>
                    <div className={classes.layoutRight}>
                        <div className="mb-2">
                            <div className="text-lg font-medium">
                                {t("blog.image")}
                            </div>
                            <SingleImageUploader
                                image={
                                    editField?.urlImage?.small ||
                                    editField?.urlImage?.default
                                }
                                onChange={urlImage => {
                                    setFormField(state => ({
                                        ...state,
                                        urlImage,
                                    }));
                                }}
                                aspect={ASPECT_RATIO_16_9}
                            />
                        </div>
                        <TextArea
                            className="mb-2"
                            label={t("blog.description")}
                            placeholder={t("blog.blog-description")}
                            name="description"
                            value={editField?.description}
                            onChange={description => {
                                setFormField(state => ({
                                    ...state,
                                    description,
                                }));
                            }}
                            errorMessage={t("blog.error.post.description")}
                            required
                        />
                        <Checkbox
                            label={t("blog.enabled")}
                            size="medium"
                            isChecked={editField?.enabled}
                            onChange={enabled => {
                                setFormField(state => ({
                                    ...state,
                                    enabled,
                                }));
                            }}
                            className="mb-2 transform scale-120"
                        />
                    </div>
                    <div className={classes.layoutBottom}>
                        <div className="mb-2">
                            <p className="text-lg font-medium">
                                {t("blog.content")}{" "}
                            </p>
                            <Editor
                                className="mt-1"
                                initValue={editField?.content}
                                onChange={content => {
                                    setFormField(state => ({
                                        ...state,
                                        content,
                                    }));
                                }}
                                required
                                errorMessage={t("blog.error.post.content")}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default BlogPostDialog;
