import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IProvince,
  IDistrict,
  IStreet,
  IWard,
  IRootState,
} from "common/typings";
import {
  getDistrictsByProvince,
  getWardsByDistrict,
  getProvinces,
  getStreetById,
} from "services/location";
import Select from "designs/Select";
import Input from "designs/Input";

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
}

const AddressField: React.FC<IStreetFieldProps> = props => {
  const { onChange, idStreet, className = "" } = props;

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

  return (
    <div className={className}>
      <Select
        label="Tên tỉnh/ thành phố"
        options={provinceList}
        value={provinceSelected?.name}
        onSelectOption={handleProvinceSelected}
        required
        errorMessage="Vui lòng chọn tỉnh/ thành phố"
      />
      <Select
        label="Tên quận/ huyện"
        options={districtList}
        value={districtSelected?.name}
        onSelectOption={handleDistrictSelected}
        required
        errorMessage="Vui lòng chọn quận/ huyện"
      />
      <Select
        label="Tên phường/ xã"
        options={wardList}
        value={wardSelected?.name}
        onSelectOption={handleWardSelected}
        required
        errorMessage="Vui lòng chọn phường/ xã"
      />
      <Input
        label="Tên đường phố/ số nhà"
        initValue={streetName}
        name="name"
        onChange={handleNameChange}
        validates={{
          required: {
            errorMessage: "Vui lòng nhập đường phố/ số nhà.",
          },
        }}
      />
    </div>
  );
};

export default AddressField;

// streets page using same Reducer, so call new api not affect redux streets page => not rerender
const getProvinceService = async () => {
  const result = await getProvinces({
    name: "",
  });
  const { provinces: listProvince } = result?.data?.getProvinces || {};
  return listProvince;
};

const getDistrictService = async (province_code = "") => {
  const result = await getDistrictsByProvince({
    name: "",
    province_code,
  });
  const { districts: listDistrict } =
    result?.data?.getDistrictsByProvince || {};
  return listDistrict;
};

const getWardService = async (district_code = "") => {
  const result = await getWardsByDistrict({
    name: "",
    district_code,
  });
  const { wards: listWard } = result?.data?.getWardsByDistrict || {};
  return listWard;
};

const getStreetService = async (id: string) => {
  const result = await getStreetById({
    id,
  });
  const { getStreetById: street } = result?.data || {};
  return street;
};
