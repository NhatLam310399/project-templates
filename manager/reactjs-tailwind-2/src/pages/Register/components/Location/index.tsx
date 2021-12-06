import { MutableRefObject, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  IDistrict,
  IPlaceCreateInput,
  IProvince,
  IWard,
  ILocation,
} from "common/typings";

import Input from "designs/Input";
import Autocomplete from "designs/Autocomplete";

import { getDistricts, getProvinces, getWards } from "redux/actions/location";
import { IRootState } from "redux/reducers";
import { renderLocation } from "common/functions";

interface IImageAndLocationProps {
  field: MutableRefObject<IPlaceCreateInput>;
  location: MutableRefObject<ILocation>;
  // Because we use useRef. so it won't rerender if we update anything
  // This will make sure that parent will be rerender when it is called
  rerenderParent: () => void;
}

const Location: React.FC<IImageAndLocationProps> = props => {
  const dispatch = useDispatch();
  const { provinces, districts, wards } = useSelector(
    (state: IRootState) => state.location,
  );
  const { field, location, rerenderParent } = props;

  const [provinceSelected, setProvinceSelected] = useState<IProvince | null>(
    null,
  );
  const [districtSelected, setDistrictSelected] = useState<IDistrict | null>(
    null,
  );
  const [wardSelected, setWardSelected] = useState<IWard | null>(null);

  useEffect(() => {
    dispatch(getProvinces({ name: "" }));
  }, []);

  const handleSelectProvince = (option: IProvince | null) => {
    setProvinceSelected(option);
    dispatch(getDistricts({ name: "", province_code: option?.code }));
    field.current.locationTypeInput.province_code = option?.code;
    field.current.locationTypeInput.street_name = renderLocation([
      option?.name,
    ]);
    location.current.province = option || {};
    districtSelected && setDistrictSelected(null);
    wardSelected && setWardSelected(null);
  };

  const handleSelectDistrict = (option: IDistrict | null) => {
    setDistrictSelected(option);
    dispatch(getWards({ name: "", district_code: option?.code }));
    field.current.locationTypeInput.district_code = option?.code;
    field.current.locationTypeInput.street_name = renderLocation([
      option?.name,
      provinceSelected?.name,
    ]);
    location.current.district = option || {};
    wardSelected && setWardSelected(null);
    rerenderParent();
  };

  const handleSelectWard = (option: IWard) => {
    setWardSelected(option);
    location.current.ward = option;
    field.current.locationTypeInput.ward_code = option.code;
    field.current.locationTypeInput.street_name = renderLocation([
      option?.name,
      districtSelected?.name,
      provinceSelected?.name,
    ]);
    rerenderParent();
  };

  return (
    <div className="w-full mt-4">
      <p className="mb-3 text-xl font-bold">Thông tin địa điểm</p>
      <div className="grid w-full h-full grid-cols-1 gap-2 phone:grid-cols-2">
        <Autocomplete
          title="Tỉnh/ thành phố"
          placeholder="Chọn tỉnh/ thành phố"
          optionSelected={provinceSelected}
          onSelectOption={handleSelectProvince}
          options={provinces}
          required
          errorMessage="Vui lòng chọn tỉnh/ thành phố"
        />
        <Autocomplete
          title="Quận/ huyện"
          placeholder="Chọn quận/ huyện"
          optionSelected={districtSelected}
          onSelectOption={handleSelectDistrict}
          options={districts}
          disabled={!provinceSelected}
          required
          errorMessage="Vui lòng chọn quận/ huyên"
        />
        <Autocomplete
          title="Phường/ xã"
          placeholder="Chọn phường/ xã"
          optionSelected={wardSelected}
          onSelectOption={handleSelectWard}
          options={wards}
          disabled={!districtSelected}
          required
          errorMessage="Vui lòng chọn phường/ xã"
        />
        <Input
          label="Địa chỉ chi tiết"
          placeholder="Nhập địa chỉ chi tiết"
          name="street-name"
          className=" w-full"
          initValue={renderLocation([
            wardSelected?.name,
            districtSelected?.name,
            provinceSelected?.name,
          ])}
          onChange={value => {
            field.current.locationTypeInput.street_name = value;
          }}
        />
      </div>
    </div>
  );
};

export default Location;
