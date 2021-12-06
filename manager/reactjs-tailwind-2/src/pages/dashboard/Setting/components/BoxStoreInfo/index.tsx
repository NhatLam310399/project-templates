import React, { useEffect, useRef, useState } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import { useSelector, useDispatch } from "react-redux";

import {
  IGetWards,
  IWard,
  IProvince,
  IDistrict,
  IGetDistricts,
} from "common/typings/Location";
import { renderLocation } from "common/functions/string";
import {
  IUser,
  IPlace,
  IUpdatePlace,
  IPlaceCreateInput,
  ILocation,
  IGraphQLResponse,
} from "common/typings";

import SingleImageUploader from "components/SingleImageUploader";
import LocationMap from "components/LocationMapInfo";

import { HO_CHI_MINH_LOCATION } from "constants/location";
import { CUSTOM_SIZE_UPLOAD_AVATAR } from "constants/image";
import { typeTitle } from "constants/setting";

import Select from "designs/Select";
import TextArea from "designs/TextArea";
import Button from "designs/Button";
import Input from "designs/Input";

import { resetAction } from "redux/actions/common";
import { IRootState } from "redux/reducers";
import { updateKaraoke } from "redux/actions/place";

import { updatePlaceApi } from "pages/dashboard/Setting/helper";

import {
  getProvinces,
  getWardsByDistrict,
  getDistricts,
} from "services/location";

interface IBoxStoreInfo {}
const BoxStoreInfo: React.FC<IBoxStoreInfo> = props => {
  const { place = {} } = useSelector((state: IRootState) => state.place);

  const [imageFile, setImageFile] = useState<File>();
  const [provinceSelected, setProvinceSelected] = useState<IProvince | null>(
    null,
  );
  const [districtSelected, setDistrictSelected] = useState<IDistrict | null>(
    null,
  );
  const [wardSelected, setWardSelected] = useState<IWard | null>(null);
  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [districts, setDistrict] = useState<IDistrict[]>([]);
  const [wards, setWards] = useState<IWard[]>([]);
  const [fullAddress, setFullAddress] = useState<string>();
  const dispatch = useDispatch();

  const fieldRef = useRef<IPlaceCreateInput>({
    locationTypeInput: {},
    location: {
      type: "Point",
      coordinates: [HO_CHI_MINH_LOCATION.lng, HO_CHI_MINH_LOCATION.lat],
    },
  });
  const locationRef = useRef<ILocation>({});

  const { actionSuccess } = useSelector((state: IRootState) => state.common);
  const formField = useRef<IPlace>({ ...place } || {}).current;

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
    }
  }, [actionSuccess]);

  useEffect(() => {
    getProvincesAPI();
  }, []);
  useEffect(() => {
    if (place) {
      const {
        province,
        district,
        ward,
        location: { coordinates } = {},
        street,
      } = place;
      getDistrict(province?.code || "");
      getWards(district?.code || "");
      province && setProvinceSelected(province);
      district && setDistrictSelected(district);
      ward && setWardSelected(ward);
      street && setFullAddress(street);
      if (coordinates) {
        fieldRef.current.location.coordinates = [...coordinates];
      }
    }
  }, [place]);

  const getProvincesAPI = async () => {
    const result = await getAllProvinceServiceAPI();
    setProvinces(result);
  };
  const getDistrict = async (provinceCode: string) => {
    const result = await getDistrictServiceAPI(provinceCode);
    setDistrict(result);
  };
  const getWards = async (districtCode: string) => {
    const result = await getWardServiceAPI(districtCode);
    setWards(result);
  };

  const handleChangeName = (name: string) => {
    formField.name = name;
  };
  const handleSelectedProvinces = (option: IProvince) => {
    setProvinceSelected(option);
    setDistrictSelected(null);
    setWardSelected(null);

    getDistrict(option.code || "");
    fieldRef.current.locationTypeInput.province_code = option.code;
    locationRef.current.province = option;
    const location = renderLocation([option?.name]);
    setFullAddress(location);
  };
  const handleSelectedDistrict = (option: IDistrict) => {
    setDistrictSelected(option);
    setWardSelected(null);
    getWards(option.code || "");
    fieldRef.current.locationTypeInput.district_code = option.code;
    locationRef.current.district = option;
    const location = renderLocation([option?.name, provinceSelected?.name]);
    setFullAddress(location);
  };
  const handleSelectedWard = (option: IWard) => {
    setWardSelected(option);
    const location = renderLocation([
      option?.name,
      districtSelected?.name,
      provinceSelected?.name,
    ]);
    setFullAddress(location);
    fieldRef.current.locationTypeInput.ward_code = option.code;
    locationRef.current.ward = option;
  };
  const handleStreet = (street: string) => {
    setFullAddress(street);
  };
  const handleIntroduce = (introduce: string) => {
    formField.introduce = introduce;
  };

  const handleImageFile = (file: File) => {
    setImageFile(file);
  };
  const handleOnSubmit = () => {
    const { current: field } = fieldRef;
    console.log(field, place?.type);

    const payload: IUpdatePlace = {
      id: place?._id || "",
      placeUpdateInput: {
        customSizeForUploadImage: CUSTOM_SIZE_UPLOAD_AVATAR,
        logo: imageFile,
        name: formField.name,
        introduce: formField.introduce,
        locationTypeInput: {
          province_code: provinceSelected?.code,
          district_code: districtSelected?.code,
          ward_code: wardSelected?.code,
          street_name: fullAddress,
        },
        location: {
          ...field.location,
        },
      },
    };
    if (!imageFile) {
      delete payload.placeUpdateInput.logo;
    }
    updatePlaceApi(payload, place?.type);
  };
  return (
    <div>
      <ValidatorForm onSubmit={handleOnSubmit} className="mb-4">
        <div className="grid grid-cols-1 gap-y-2 laptop:gap-2 laptop:grid-cols-2">
          <Input
            className="row-start-2 row-end-3 laptop:row-auto"
            name="name"
            initValue={place?.name || ""}
            label={typeTitle("placeName")}
            placeholder={`Nhập ${typeTitle("placeName")?.toLocaleLowerCase()}`}
            onChange={handleChangeName}
            validates={{
              required: {
                errorMessage: `Vui lòng nhập ${typeTitle(
                  "placeName",
                )?.toLocaleLowerCase()}.`,
              },
            }}
          />
          <SingleImageUploader
            label="Logo"
            aspect={16 / 9}
            onChange={handleImageFile}
            image={place?.logo?.small}
            className="col-start-1 col-end-2 row-start-1 row-end-2 laptop:col-start-2 laptop:col-end-3 laptop:row-end-3"
            required
            errorMessage="Vui lòng thêm logo"
          />
          <Input
            name="phoneNumber"
            initValue={place?.phoneNumber || ""}
            label="Số điện thoại"
            required
            disabled
            validates={{
              required: {
                errorMessage: "Vui lòng nhập số điện thoại",
              },
            }}
            className="row-start-3 row-end-4 laptop:row-auto "
          />
          <Select
            onSelectOption={handleSelectedProvinces}
            options={provinces}
            title="Tỉnh / thành phố"
            value={provinceSelected?.name}
            required
            errorMessage="Vui lòng chọn tỉnh / thành phố "
            className="row-start-4 row-end-5 laptop:row-auto "
          />
          <Select
            onSelectOption={handleSelectedDistrict}
            options={districts}
            value={districtSelected?.name}
            title="Quận/ huyện"
            required
            errorMessage="Vui lòng chọn quận/ huyện"
            className="row-start-5 row-end-6 laptop:row-auto "
          />
          <Select
            onSelectOption={handleSelectedWard}
            options={wards}
            value={wardSelected?.name}
            title="Phường/ xã"
            required
            errorMessage="Vui lòng chọn phường/ xã"
            className="row-start-6 row-end-7 laptop:row-auto "
          />
          <Input
            name="street"
            initValue={fullAddress}
            label="Địa chỉ cụ thể"
            placeholder="Nhập địa chỉ chi tiết của bạn"
            onChange={handleStreet}
            className="row-start-7 row-end-8 laptop:row-auto "
          />
        </div>
        <TextArea
          name="introduce"
          placeholder="Mô tả cơ sở"
          initValue={place?.introduce}
          label="Mô tả cơ sở"
          className="mt-4"
          onChange={handleIntroduce}
          validates={{
            required: {
              errorMessage: "Vui lòng nhập nội dung mô tả",
            },
          }}
        />
        <div className="">
          <LocationMap
            location={locationRef}
            field={fieldRef}
            centerCoordinates={place?.location?.coordinates}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <Button
            primary
            type="submit"
            className="w-17 max-w-full "
            innerClassName="h-4.5 text-lg normal-case"
          >
            Lưu
          </Button>
        </div>
      </ValidatorForm>
    </div>
  );
};
export default BoxStoreInfo;
export const getAllProvinceServiceAPI = async () => {
  const response: IGraphQLResponse = await getProvinces({ name: "" });
  const { getProvinces: result = null } = response?.data || {};
  return result?.provinces || [];
};
export const getDistrictServiceAPI = async (provinceCode: string) => {
  const response: IGraphQLResponse = await getDistricts({
    province_code: provinceCode,
    name: "",
  });
  const { getDistrictsByProvince: result = null } = response?.data || {};
  return result?.districts || [];
};
export const getWardServiceAPI = async (districtCode: string) => {
  const response: IGraphQLResponse = await getWardsByDistrict({
    district_code: districtCode,
    name: "",
  });
  const { getWardsByDistrict: result = null } = response?.data || {};
  return result?.wards || [];
};
