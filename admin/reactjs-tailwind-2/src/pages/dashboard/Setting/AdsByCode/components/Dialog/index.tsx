import React, { useRef, useState, useEffect } from "react";
import {
    IAds,
    IAdsInput,
    ICreateAds,
    IRootState,
    ITypes,
    IUpdateAds,
} from "common/formatTypes";
import Dialog, { DialogTitle } from "components/Dialog";
import Input from "designs/Input";
import { useDispatch, useSelector } from "react-redux";
import Select from "designs/Select";

import { getTypesByCode } from "redux/actions/types";
import { ADS_BY_CODE } from "constants/typeByCodes";
import { createAds, updateAds } from "redux/actions/ads";
import { t } from "language";
import TextArea from "designs/TextArea";

interface IConfigAdsByCodeDialogProps {
    ButtonMenu: React.ReactElement;
    isEdit?: boolean;
    editField?: IAds | null;
    className?: string;
}

const ConfigAdsByCodeDialog: React.FC<IConfigAdsByCodeDialogProps> = props => {
    const dispatch = useDispatch();
    const { listTypes: listAdsPositions = [] } = useSelector(
        (state: IRootState) => state.types,
    );
    const { ButtonMenu, isEdit, editField, className } = props;
    const [formField, setFormField] = useState<IAdsInput>({});
    const [adsLocationSelected, setAdsLocationSelected] = useState<ITypes>();

    useEffect(() => {
        dispatch(getTypesByCode({ code: ADS_BY_CODE }));
    }, []);

    useEffect(() => {
        if (editField) {
            setAdsLocationSelected(editField?.displayLocation);
        }
    }, [editField]);

    const handleSubmit = () => {
        const input: IAdsInput = {
            ...formField,
        };

        if (isEdit) {
            const payload: IUpdateAds = {
                id: editField?._id || null,
                fieldsToUpdate: input,
            };
            dispatch(updateAds(payload));
        } else {
            const payload: ICreateAds = {
                createAdsInput: input,
            };
            dispatch(createAds(payload));
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
            setAdsLocationSelected(undefined);
        }
    };

    return (
        <Dialog
            ButtonMenu={ButtonMenu}
            onConfirm={handleSubmit}
            onClose={handleClose}
            className={className}
        >
            <div className="w-full m-auto">
                <DialogTitle className="text-xxl mb-3">
                    {isEdit
                        ? t("configAds.title-edit")
                        : t("configAds.title-add")}
                </DialogTitle>
                <TextArea
                    className="mb-2"
                    label={t("configAds.ads_code")}
                    value={editField?.code}
                    name="code"
                    onChange={code => {
                        setFormField(state => ({
                            ...state,
                            code,
                        }));
                    }}
                    required
                    errorMessage={t("generalSetting.null.code")}
                />
                <Input
                    className="my-2"
                    label={t("configAds.ads_name")}
                    value={editField?.name}
                    name="name"
                    onChange={handleChangeInput}
                    validates={{
                        required: {
                            errorMessage: t("generalSetting.null.ads-name"),
                        },
                    }}
                />
                <Select
                    label={t("configAds.ads_position")}
                    value={adsLocationSelected?.name}
                    options={listAdsPositions}
                    className="mb-2"
                    required
                    errorMessage={t("generalSetting.null.select-position")}
                    onSelectOption={option => {
                        setAdsLocationSelected(option);
                        setFormField(state => ({
                            ...state,
                            displayLocation: option._id,
                        }));
                    }}
                />
                <Input
                    className="mb-2"
                    label={t("configAds.ads_link")}
                    value={editField?.link}
                    name="link"
                    onChange={handleChangeInput}
                    validates={{
                        required: {
                            errorMessage: t("generalSetting.null.link"),
                        },
                    }}
                />
            </div>
        </Dialog>
    );
};

export default ConfigAdsByCodeDialog;
