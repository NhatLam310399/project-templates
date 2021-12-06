/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    IDistrict,
    IGraphQLResponse,
    IProvince,
    IStreet,
    IWard,
} from "common/formatTypes";
import Input from "designs/Input";
import Select from "designs/Select";
import { t } from "language";
import React, { useEffect, useState } from "react";
import {
    getDistrictsByProvince,
    getProvinces,
    getStreetById,
    getWardsByDistrict,
} from "services/location";

export interface ILocationInfos {
    province?: IProvince;
    district?: IDistrict;
    ward?: IWard;
    street?: string;
}

interface IStreetFieldProps {
    onChange: (locationInfos: ILocationInfos) => void;
    idStreet?: string;
    className?: string;
    required?: boolean;
}

const AddressField: React.FC<IStreetFieldProps> = props => {
    const { onChange, idStreet, className = "", required = true } = props;

    const [provinceList, setProvinceList] = useState<IProvince[]>([]);
    const [districtList, setDistrictList] = useState<IDistrict[]>([]);
    const [wardList, setWardList] = useState<IWard[]>([]);
    const [street, setStreet] = useState<IStreet | null>(null);

    const [provinceSelected, setProvinceSelected] = useState<IProvince | null>(
        null,
    );
    const [districtSelected, setDistrictSelected] = useState<IDistrict | null>(
        null,
    );
    const [wardSelected, setWardSelected] = useState<IWard | null>(null);
    const [streetName, setStreetName] = useState("");

    useEffect(() => {
        getProvinceService().then((result: IProvince[]) => {
            setProvinceList(result);
        });
    }, []);

    useEffect(() => {
        if (idStreet) {
            getStreetService(idStreet).then((result: IStreet) => {
                setStreet(result);
            });
        }
    }, [idStreet]);

    useEffect(() => {
        if (street) {
            const { name = "", province, district, ward } = street;

            if (!province || !district || !ward) return;
            setProvinceSelected(province);
            setDistrictSelected(district);
            setWardSelected(ward);
            setStreetName(name);

            Promise.all([
                getDistrictService(province.code),
                getWardService(district.code),
            ]).then(result => {
                const [listDistrict, listWard] = result;
                setDistrictList(listDistrict);
                setWardList(listWard);
            });

            onChange({ province, district, ward, street: name });
        }
    }, [street]);

    const handleProvinceSelected = async (option: IProvince) => {
        setProvinceSelected(option);
        if (districtSelected) setDistrictSelected(null);
        if (wardSelected) setWardSelected(null);
        const listDistrict = await getDistrictService(option.code);
        setDistrictList(listDistrict);
        if (wardList.length > 0) setWardList([]);
        onChange({ province: option, street: streetName });
    };
    const handleDistrictSelected = async (option: IDistrict) => {
        setDistrictSelected(option);
        if (wardSelected) setWardSelected(null);
        const listWard = await getWardService(option.code);
        setWardList(listWard);
        onChange({
            province: provinceSelected!,
            district: option,
            street: streetName,
        });
    };

    const handleWardSelected = (option: IWard) => {
        setWardSelected(option);
        const locationInfos = {
            province: provinceSelected!,
            district: districtSelected!,
            ward: option,
            street: streetName,
        };
        onChange(locationInfos);
    };

    const handleNameChange = (name: string) => {
        setStreetName(name);
        const locationInfos = {
            province: provinceSelected!,
            district: districtSelected!,
            ward: wardSelected!,
            street: name,
        };
        onChange(locationInfos);
    };

    const getRequiredInput = () => {
        if (required) {
            return {
                required: {
                    errorMessage: t("common.validate-required"),
                },
            };
        }
        return {};
    };

    return (
        <div className={className}>
            <Select
                label={t("location.province")}
                placeholder={t("location.enter-province")}
                options={provinceList}
                value={provinceSelected?.name}
                onSelectOption={handleProvinceSelected}
                required={required}
                errorMessage={t("common.validate-required-province")}
            />
            <Select
                placeholder={t("location.enter-district")}
                label={t("location.district")}
                options={districtList}
                value={districtSelected?.name}
                onSelectOption={handleDistrictSelected}
                required={required}
                errorMessage={t("common.validate-required-district")}
                disabled={!provinceSelected}
            />
            <Select
                placeholder={t("location.enter-ward")}
                label={t("location.ward")}
                options={wardList}
                value={wardSelected?.name}
                onSelectOption={handleWardSelected}
                required={required}
                errorMessage={t("common.validate-required-ward")}
                disabled={!districtSelected}
            />
            <Input
                placeholder={t("location.enter-detail-address")}
                label={t("location.detail-address")}
                value={streetName}
                name="name"
                onChange={handleNameChange}
                validates={getRequiredInput()}
            />
        </div>
    );
};

export default AddressField;

// streets page using same Reducer, so call new api not affect redux streets page => not rerender
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

const getWardService = async (districtCode = "") => {
    const result: any = await getWardsByDistrict({
        name: "",
        districtCode,
    });
    const { wards: listWard } = result?.data?.getWardsByDistrict || {};
    return listWard;
};

const getStreetService = async (id: string) => {
    const result: any = await getStreetById({
        id,
    });
    const { getStreetById: street } = result?.data || {};
    return street;
};
