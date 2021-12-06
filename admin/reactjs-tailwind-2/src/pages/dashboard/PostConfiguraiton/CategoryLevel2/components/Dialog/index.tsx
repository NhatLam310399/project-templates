import React, { useState, useEffect } from "react";
import { t } from "language";
import {
    ICategoryLevel2Input,
    ICategoryLevel1,
    ICategoryLv2,
    IRootState,
    IUpdateCategoryLv2,
} from "common/formatTypes";
import Dialog, { DialogTitle } from "components/Dialog";
import Input from "designs/Input";
import Select from "designs/Select";
import { useDispatch, useSelector } from "react-redux";
import TextArea from "designs/TextArea";
import {
    createCategoryLevel2,
    getAllCategoryLevel1,
    updateCategoryLevel2,
} from "redux/actions/newsConfig";

interface IJobSeekerDialogProps {
    ButtonMenu: React.ReactElement;
    editField?: ICategoryLv2;
    className?: string;
}

const CategoryLv2Dialog: React.FC<IJobSeekerDialogProps> = ({
    ButtonMenu,
    editField,
    className,
}) => {
    const dispatch = useDispatch();
    const { allCategoryLevel1: { results: categoryLv1List = [] } = {} } =
        useSelector((state: IRootState) => state.newsConfig);
    const [categoryLv1Selected, setCategoryLv1Selected] =
        useState<ICategoryLevel1>({});
    const [inputFields, setInputFields] = useState<ICategoryLevel2Input>({});

    useEffect(() => {
        dispatch(getAllCategoryLevel1({ filterCategoryLevel1: {} }));
    }, []);

    useEffect(() => {
        setCategoryLv1Selected(editField?.categoryLevel1 || {});
    }, [editField?.categoryLevel1]);

    const handleSubmit = () => {
        if (editField) {
            const payload: IUpdateCategoryLv2 = {
                id: editField?._id || "",
                categoryLevel2Input: inputFields,
            };
            dispatch(updateCategoryLevel2(payload));
        } else {
            const payload: ICategoryLevel2Input = inputFields;
            dispatch(createCategoryLevel2({ categoryLevel2Input: payload }));
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
        if (!editField) {
            setCategoryLv1Selected({});
        }
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
                {editField ? t("job.edit-category-2") : t("job.add-category-2")}
            </DialogTitle>

            <div className="w-full">
                <div className="flex flex-col gap-2">
                    <Input
                        placeholder={t("job.category-name-placeholder")}
                        label={t("job.category-name")}
                        value={editField?.name}
                        name="name"
                        onChange={handleChangeInput}
                        validates={{
                            required: {
                                errorMessage: t("common.validate-required"),
                            },
                        }}
                    />
                    <Select
                        placeholder={t("job.category-lv1-placeholder")}
                        errorMessage={t("job.validate-required-category-lv1")}
                        label={t("job.category-1-name")}
                        options={categoryLv1List}
                        value={categoryLv1Selected?.name}
                        onSelectOption={option => {
                            setCategoryLv1Selected(option);
                            setInputFields({
                                ...inputFields,
                                categoryLevel1: option?._id,
                            });
                        }}
                        required
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

export default CategoryLv2Dialog;
