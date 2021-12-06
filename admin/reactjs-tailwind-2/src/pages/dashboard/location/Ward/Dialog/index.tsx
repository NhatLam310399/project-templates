import React, { useEffect, useRef, useState } from "react";
import {
    IDistrict,
    ICreateWards,
    IProvince,
    IUpdateWards,
    IWard,
    IWardInput,
} from "common/formatTypes";
import Input from "designs/Input";
import Dialog, { DialogTitle } from "components/Dialog";
import { useDispatch } from "react-redux";
import { updateWard, createWard } from "redux/actions/location";
import { t } from "language";
import { getDistrictsByProvince, getProvinces } from "services/location";
import Select from "designs/Select";

interface IWardDialogProps {
    ButtonMenu: React.ReactElement;
    editField?: IWard;
    className?: string;
}

const WardDialog: React.FC<IWardDialogProps> = props => {
    const { ButtonMenu, editField, className } = props;

    const [provinceList, setProvinceList] = useState<IProvince[]>([]);
    const [districtList, setDistrictList] = useState<IDistrict[]>([]);

    const [provinceSelected, setProvinceSelected] = useState<IProvince | null>(
        null,
    );
    const [districtSelected, setDistrictSelected] = useState<IDistrict | null>(
        null,
    );
    let formField = useRef<IWardInput>({}).current;

    useEffect(() => {
        getAllProvincesAPI();
    }, []);
    useEffect(() => {
        if (editField) {
            getAllDistrictAPI(editField?.provinceCode || "");
        }
    }, [editField]);

    const dispatch = useDispatch();

    const handleProvinceSelected = async (option: IProvince) => {
        setProvinceSelected(option);
        formField.provinceCode = option?.code;
        formField.provinceName = option?.name;
        setDistrictSelected(null);
        getAllDistrictAPI(option?.code || "");
    };
    const handleDistrictSelected = async (option: IDistrict) => {
        setDistrictSelected(option);
        formField.districtCode = option?.code;
        formField.districtName = option?.name;
    };
    const onChangeLat = (latitude: string) => {
        formField.latitude = latitude ? Number(latitude) : undefined;
    };
    const onChangeLong = (longitude: string) => {
        formField.longitude = longitude ? Number(longitude) : undefined;
    };
    const onChangeName = (name: string) => {
        formField.name = name;
    };
    const handleOnSubmit = () => {
        const wardInput: IWardInput = {
            latitude: formField.latitude,
            longitude: formField.longitude,
            name: formField.name,
            districtCode: formField.districtCode || editField?.districtCode,
            provinceCode: formField.provinceCode || editField?.provinceCode,
            provinceName: formField.provinceName || editField?.provinceName,
            districtName: formField.districtName || editField?.districtName,
        };
        if (editField) {
            const payload: IUpdateWards = {
                id: editField?._id || "",
                wardInput,
            };
            dispatch(updateWard(payload));
        } else {
            const payload: ICreateWards = {
                wardInput,
            };
            dispatch(createWard(payload));
        }
    };
    const getAllProvincesAPI = async () => {
        const result = await getProvinceService();
        setProvinceList(result);
    };
    const getAllDistrictAPI = async (provinceCode: string) => {
        const result = await getDistrictService(provinceCode);
        setDistrictList(result);
    };
    const handleClose = () => {
        setProvinceSelected(null);
        setDistrictSelected(null);
    };
    return (
        <Dialog
            className={className}
            ButtonMenu={ButtonMenu}
            onConfirm={handleOnSubmit}
            onClose={handleClose}
        >
            <div className="grid grid-cols-1 gap-2">
                <DialogTitle className="mb-3">
                    {editField
                        ? t("location.edit-ward")
                        : t("location.add-ward")}
                </DialogTitle>
                <Select
                    label={t("location.province")}
                    options={provinceList}
                    value={provinceSelected?.name || editField?.provinceName}
                    onSelectOption={handleProvinceSelected}
                    required
                    errorMessage={t("location.not-select-province")}
                />
                <Select
                    label={t("location.district")}
                    options={districtList}
                    value={districtSelected?.name || editField?.districtName}
                    onSelectOption={handleDistrictSelected}
                    required
                    errorMessage={t("location.not-select-district")}
                    disabled={!provinceSelected && !editField?.provinceName}
                />
                <Input
                    label={t("location.ward")}
                    placeholder={t("location.enter-ward")}
                    value={editField?.name || ""}
                    name="name "
                    onChange={onChangeName}
                    validates={{
                        required: {
                            errorMessage: t("location.not-null-ward"),
                        },
                    }}
                />
                <Input
                    placeholder={t("location.enter-long")}
                    type="number"
                    label={t("location.long")}
                    value={editField?.longitude || ""}
                    name="longitude"
                    onChange={onChangeLong}
                />
                <Input
                    placeholder={t("location.enter-lat")}
                    label={t("location.lat")}
                    type="number"
                    value={editField?.latitude || ""}
                    name="latitude"
                    onChange={onChangeLat}
                />
            </div>
        </Dialog>
    );
};

export default WardDialog;

const getProvinceService = async () => {
    const result: any = await getProvinces({});
    const { provinces: listProvince } = result?.data?.getProvinces || {};
    return listProvince;
};

const getDistrictService = async (provinceCode = "") => {
    const result: any = await getDistrictsByProvince({
        provinceCode,
    });
    const { districts: listDistrict } =
        result?.data?.getDistrictsByProvince || {};
    return listDistrict;
};
