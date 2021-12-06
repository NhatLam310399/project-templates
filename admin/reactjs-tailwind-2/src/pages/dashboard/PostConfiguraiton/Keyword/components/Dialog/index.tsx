import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import {
    IKeyword,
    IKeywordInput,
    ICreateKeyword,
    IUpdateKeyword,
} from "common/formatTypes";
import Dialog, { DialogTitle } from "components/Dialog";
import TextArea from "designs/TextArea";
import Checkbox from "designs/Checkbox";
import Input from "designs/Input";
import { t } from "language";
import { createKeyword, updateKeyword } from "redux/actions/newsConfig";

interface IKeywordDialogProps {
    ButtonMenu: React.ReactElement;
    editField?: IKeyword;
    className?: string;
}

const KeywordDialog: React.FC<IKeywordDialogProps> = props => {
    const { ButtonMenu, editField, className } = props;
    const dispatch = useDispatch();
    const [status, setStatus] = useState(false);
    let formField = useRef<IKeywordInput>({}).current;

    useEffect(() => {
        if (editField) {
            setStatus(editField?.isHot!);
        }
    }, [editField]);

    const handleSubmit = () => {
        if (editField) {
            const payload: IUpdateKeyword = {
                id: editField._id!,
                keywordInput: formField,
            };
            dispatch(updateKeyword(payload));
        } else {
            const payload: ICreateKeyword = {
                keywordInput: formField,
            };
            dispatch(createKeyword(payload));
        }
    };

    const handleChangeName = (value: string) => {
        formField.name = value;
    };
    const handleChangeDescription = (value: string) => {
        formField.description = value;
    };
    const handleChangeIsHot = (isCheck: boolean) => {
        formField.isHot = isCheck;
    };

    return (
        <Dialog
            ButtonMenu={ButtonMenu}
            onConfirm={handleSubmit}
            size="sm"
            className={className}
        >
            <DialogTitle className="mb-3 ">
                {editField ? t("job.edit-tag") : t("job.add-tag")}
            </DialogTitle>
            <div className="w-full">
                <div className="flex flex-col gap-2">
                    <Input
                        placeholder={t("job.tag-placeholder")}
                        className="mb-2"
                        label={t("job.keyword-name")}
                        value={editField?.name}
                        name="name"
                        onChange={handleChangeName}
                        validates={{
                            required: {
                                errorMessage: t("job.validate-required-tag"),
                            },
                        }}
                    />
                    <TextArea
                        className="mb-2"
                        label={t("job.description")}
                        value={editField?.description}
                        name="description"
                        onChange={handleChangeDescription}
                    />
                    <Checkbox
                        isChecked={status}
                        onChange={handleChangeIsHot}
                        label={t("job.hot-keyword")}
                    />
                </div>
            </div>
        </Dialog>
    );
};

export default KeywordDialog;
