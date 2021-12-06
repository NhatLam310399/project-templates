import React, { useRef } from "react";
import { IProvince, IProvinceInput } from "common/formatTypes";
import Input from "designs/Input";
import Dialog, { DialogTitle } from "components/Dialog";
import { updateProvince } from "redux/actions/location";
import { useDispatch } from "react-redux";
import { t } from "language";
import { getProvinces } from "services/location";

interface IProvinceDialogProps {
    ButtonMenu: React.ReactElement;
    editField?: IProvince;
}

const ProvinceDialog: React.FC<IProvinceDialogProps> = props => {
    const { ButtonMenu, editField } = props;

    let formField = useRef<IProvinceInput>({}).current;

    const dispatch = useDispatch();

    const onChangeName = (name: string) => {
        formField = {
            ...formField,
            name: name ? name : undefined,
        };
    };

    const onChangeLat = (latitude: string) => {
        formField = {
            ...formField,
            latitude: latitude ? Number(latitude) : undefined,
        };
    };
    const onChangeLong = (longitude: string) => {
        formField = {
            ...formField,
            longitude: longitude ? Number(longitude) : undefined,
        };
    };

    const handleSubmit = () => {
        if (editField) {
            const payload = {
                id: editField._id || "",
                input: formField,
            };
            dispatch(updateProvince(payload));
        }
    };

    return (
        <Dialog ButtonMenu={ButtonMenu} onConfirm={handleSubmit}>
            <div className="grid grid-cols-1 gap-2 m-auto">
                <DialogTitle className="mb-3">
                    {editField
                        ? t("location.edit-province")
                        : t("location.add-province")}
                </DialogTitle>
                <Input
                    placeholder={t("location.enter-province")}
                    label={t("location.province")}
                    value={editField?.name}
                    name="longitude"
                    type="text"
                    onChange={onChangeName}
                    validates={{
                        required: {
                            errorMessage: t("location.not-null-province"),
                        },
                    }}
                />
                <Input
                    placeholder={t("location.enter-long")}
                    label={t("location.long")}
                    value={editField?.longitude}
                    name="longitude"
                    type="number"
                    onChange={onChangeLong}
                />
                <Input
                    placeholder={t("location.enter-lat")}
                    className=""
                    label={t("location.lat")}
                    value={editField?.latitude}
                    name="latitude"
                    type="number"
                    onChange={onChangeLat}
                />
            </div>
        </Dialog>
    );
};

export default ProvinceDialog;
