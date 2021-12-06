import React, { useRef, useState, useEffect } from "react";
import {
    IPages,
    ICreatePagesInput,
    IUpdatePagesInput,
    IRootState,
    ITypes,
    IPageInput,
} from "common/formatTypes";
import Dialog, { DialogTitle } from "components/Dialog";
import Input from "designs/Input";
import Editor from "designs/Editor";
import { useDispatch, useSelector } from "react-redux";
import Select from "designs/Select";
import SingleImageUploader from "components/SingleImageUploader";

import { getTypesByCode } from "redux/actions/types";
import { STATIC_PAGE } from "constants/typeByCodes";
import { CUSTOM_SIZE_UPLOAD_PAGE_IMAGE } from "constants/image";
import {
    createPages,
    updatePages,
    getAllPages,
} from "redux/actions/generalSetting";
import { t } from "language";
import { ASPECT_RATIO_16_9 } from "constants/aspect";
import { IOption } from "designs/Select/interface";
import { showNotification } from "redux/actions/notification";

interface IStaticPageDialogProps {
    ButtonMenu: React.ReactElement;
    isEdit?: boolean;
    editField?: IPages | null;
    className?: string;
}

const StaticPageDialog: React.FC<IStaticPageDialogProps> = props => {
    const { ButtonMenu, isEdit, editField, className } = props;
    const { listTypes } = useSelector((state: IRootState) => state.types);
    const {
        pages: { results: listPages },
    } = useSelector((state: IRootState) => state.generalSetting);
    const [optionTypes, setOptionTypes] = useState<IOption[]>([]);
    const dispatch = useDispatch();

    const [formField, setFormField] = useState<IPageInput>({});
    const [typeSelected, setTypeSelected] = useState<ITypes>();

    useEffect(() => {
        getAllTypesAPI();
        getAllStaticPageAPI();
    }, []);

    useEffect(() => {
        if (editField) {
            renderTypes(editField?.type);
        }
    }, [listPages, listTypes]);

    const renderTypes = (initTypes?: ITypes) => {
        const draftList = [...listTypes];
        listPages.map(item => {
            const listId = draftList.map(item => item._id);
            const index = listId.indexOf(item.type?._id);
            if (index !== -1) {
                draftList.splice(index, 1);
            }
        });
        initTypes && draftList.push(initTypes); //add type of page when edit
        setOptionTypes(draftList);
    };
    const getAllTypesAPI = () => {
        dispatch(
            getTypesByCode({
                code: STATIC_PAGE,
            }),
        );
    };

    const getAllStaticPageAPI = () => {
        dispatch(
            getAllPages({
                filterPages: {},
            }),
        );
    };

    const handleSubmit = () => {
        const input: IPageInput = {
            ...formField,
            customImageSizeUpload: CUSTOM_SIZE_UPLOAD_PAGE_IMAGE,
        };

        if (editField) {
            const payload: IUpdatePagesInput = {
                id: editField._id!,
                fieldsToUpdate: input,
            };

            dispatch(updatePages(payload));
        } else {
            const payload: ICreatePagesInput = {
                createPagesInput: input,
            };
            dispatch(createPages(payload));
        }
    };

    const handleChangeInput = (
        // using for all input have value with type below:
        value = "",
        name?: string,
    ) => {
        name && setFormField({ ...formField, [name]: value });
    };
    const handleSelectedOption = (option: ITypes) => {
        setTypeSelected(option);
        setFormField(state => ({
            ...state,
            type: option._id,
        }));
    };
    const handleClose = () => {
        setFormField({});
        if (!editField) {
            setTypeSelected(undefined);
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
                {isEdit
                    ? t("staticPage.title-edit")
                    : t("staticPage.title-add")}
            </DialogTitle>
            <div className="grid grid-cols-1 gap-2 laptop:grid-cols-2 text-">
                <div className="flex flex-col gap-2">
                    <Input
                        label={t("staticPage.title")}
                        name="name"
                        value={editField?.name}
                        onChange={handleChangeInput}
                        validates={{
                            required: {
                                errorMessage: t("staticPage.null.page"),
                            },
                        }}
                    />
                    <Input
                        label={t("staticPage.link")}
                        name="url"
                        value={editField?.url}
                        onChange={handleChangeInput}
                        validates={{
                            required: {
                                errorMessage: t("staticPage.null.link"),
                            },
                        }}
                    />
                    <Select
                        label={t("staticPage.type")}
                        value={typeSelected?.name || editField?.type?.name}
                        options={optionTypes}
                        required
                        errorMessage={t("staticPage.null.validate")}
                        onSelectOption={handleSelectedOption}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <div>
                        <p className="text-lg font-medium text-black mb-0.5">
                            {t("staticPage.image")}
                        </p>
                        <SingleImageUploader
                            image={editField?.image?.small}
                            className=""
                            onChange={image => {
                                setFormField(state => ({
                                    ...state,
                                    image,
                                }));
                            }}
                            aspect={ASPECT_RATIO_16_9}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-2">
                <p className="text-lg font-medium">
                    {t("staticPage.content")}{" "}
                    <span className="text-lg font-medium text-error">*</span>
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
                    errorMessage={t("staticPage.null.content")}
                />
            </div>
        </Dialog>
    );
};

export default StaticPageDialog;
