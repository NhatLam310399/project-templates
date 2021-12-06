import React, { useEffect, useRef, useState } from "react";
import {
    ICreateDistrict,
    IDistrict,
    IDistrictInput,
    IProvince,
    IUpdateDistrict,
} from "common/formatTypes";
import Input from "designs/Input";
import Dialog, { DialogTitle } from "components/Dialog";
import { useDispatch } from "react-redux";
import { updateDistrict, createDistrict } from "redux/actions/location";
import { t } from "language";
import { getDistrictsByProvince, getProvinces } from "services/location";
import Select from "designs/Select";

interface IDistrictDialogProps {
    ButtonMenu: React.ReactElement;
    editField?: IDistrict;
    className?: string;
}

const DistrictDialog: React.FC<IDistrictDialogProps> = props => {
    const { ButtonMenu, editField, className } = props;

    const [provinceList, setProvinceList] = useState<IProvince[]>([]);

    const [provinceSelected, setProvinceSelected] = useState<IProvince | null>(
        null,
    );

    const formField = useRef<IDistrictInput>({}).current;

    useEffect(() => {
        getProvinceAPI();
    }, []);

    const dispatch = useDispatch();

    const handleChangeName = (name: string) => {
        formField.name = name;
    };
    const handleChangeLat = (latitude: string) => {
        formField.latitude = latitude ? Number(latitude) : undefined;
    };
    const handleChangeLong = (longitude: string) => {
        formField.longitude = longitude ? Number(longitude) : undefined;
    };
    const getProvinceAPI = async () => {
        const result = await getProvinceService();

        setProvinceList(result);
    };
    const handleSelectProvince = (option: IProvince) => {
        setProvinceSelected(option);
        formField.provinceCode = option?.code;
        formField.provinceName = option?.name;
    };
    const handleSubmit = () => {
        const districtInput: IDistrictInput = {
            provinceCode: formField.provinceCode || editField?.provinceCode,
            name: formField.name,
            latitude: formField.latitude,
            longitude: formField.longitude,
            provinceName: formField.provinceName || editField?.provinceName,
        };
        if (editField) {
            const payload: IUpdateDistrict = {
                id: editField?._id || "",
                districtInput,
            };
            dispatch(updateDistrict(payload));
        } else {
            const payload: ICreateDistrict = {
                districtInput,
            };
            dispatch(createDistrict(payload));
        }
    };
    const handleClose = () => {
        setProvinceSelected(null);
    };
    return (
        <Dialog
            className={className}
            ButtonMenu={ButtonMenu}
            onConfirm={handleSubmit}
            onClose={handleClose}
        >
            <div className="grid grid-cols-1 gap-2">
                <DialogTitle className="mb-3">
                    {editField
                        ? t("location.edit-district")
                        : t("location.add-district")}
                </DialogTitle>
                <Select
                    label={t("location.province")}
                    options={provinceList}
                    value={provinceSelected?.name || editField?.provinceName}
                    onSelectOption={handleSelectProvince}
                    required
                    errorMessage={t("location.not-select-province")}
                />
                <Input
                    placeholder={t("location.enter-district")}
                    label={t("location.district")}
                    value={editField?.name || ""}
                    name="name"
                    type="text"
                    onChange={handleChangeName}
                    validates={{
                        required: {
                            errorMessage: t("location.not-null-district"),
                        },
                    }}
                />
                <Input
                    placeholder={t("location.enter-long")}
                    label={t("location.long")}
                    value={editField?.longitude || ""}
                    name="longitude"
                    onChange={handleChangeLong}
                    type="number"
                />
                <Input
                    placeholder={t("location.enter-lat")}
                    label={t("location.lat")}
                    value={editField?.latitude || ""}
                    name="latitude"
                    onChange={handleChangeLat}
                    type="number"
                />
            </div>
        </Dialog>
    );
};

const getProvinceService = async () => {
    const result: any = await getProvinces({
        name: "",
    });
    const { provinces: listProvince } = result?.data?.getProvinces || {};
    return listProvince;
};

const getDistrictService = async (provinceCode = "") => {
    const result: any = await getDistrictsByProvince({
        districtName: "",
        provinceCode,
    });
    const { districts: listDistrict } =
        result?.data?.getDistrictsByProvince || {};
    return listDistrict;
};

export default DistrictDialog;
