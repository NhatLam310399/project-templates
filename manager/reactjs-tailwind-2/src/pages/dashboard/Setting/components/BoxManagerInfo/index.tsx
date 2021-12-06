import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValidatorForm } from "react-material-ui-form-validator";

import { IUpdateUserProfileInput, IUser, IUserInput } from "common/typings";
import { IWard, IProvince, IDistrict } from "common/typings/Location";
import { renderLocation } from "common/functions/string";

import { ASPECT_RATIO_16_9 } from "constants/aspect";
import { typeTitle } from "constants/setting";
import { CUSTOM_SIZE_UPLOAD_AVATAR } from "constants/image";

import Select from "designs/Select";
import Input from "designs/Input";
import Button from "designs/Button";
import { IRootState } from "redux/reducers";
import { resetAction } from "redux/actions/common";
import { updateUserProfile } from "redux/actions/users";

import SingleImageUploader from "components/SingleImageUploader";

import {
  getAllProvinceServiceAPI,
  getDistrictServiceAPI,
  getWardServiceAPI,
} from "../BoxStoreInfo";

interface IBoxManagerInfo {}

const BoxManagerInfo: React.FC<IBoxManagerInfo> = props => {
  const { place } = useSelector((state: IRootState) => state.place);
  const { user } = place || {};
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
  const [fullAddress, setFullAddress] = useState<string>("");

  const dispatch = useDispatch();
  const { actionSuccess } = useSelector((state: IRootState) => state.common);
  const formField = useRef<IUser>({}).current;

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
    }
  }, [actionSuccess]);
  useEffect(() => {
    getProvinces();
  }, []);

  useEffect(() => {
    if (user) {
      getDistrict(user.province?.code || "");
      getWards(user.district?.code || "");
      user?.province && setProvinceSelected(user?.province);
      user?.district && setDistrictSelected(user?.district);
      user?.ward && setWardSelected(user?.ward);
      user?.street && setFullAddress(user?.street);
    }
  }, [user]);

  const getProvinces = async () => {
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
  const handleChangeName = (displayName: string) => {
    formField.displayName = displayName;
  };

  const handleChangePhoneNumber = (phoneNumber: string) => {
    formField.phoneNumber =
      user?.phoneNumber !== phoneNumber ? phoneNumber : undefined;
  };

  const handleSelectedProvinces = (option: IProvince) => {
    setProvinceSelected(option);
    setDistrictSelected(null);
    setWardSelected(null);
    getDistrict(option.code || "");
    const location = renderLocation([option?.name]);
    setFullAddress(location);
  };
  const handleSelectedDistrict = (option: IDistrict) => {
    setDistrictSelected(option);
    setWardSelected(null);
    getWards(option.code || "");
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
  };
  const handleStreet = (street: string) => {
    setFullAddress(street);
  };

  const handleImageFile = (file: File) => {
    setImageFile(file);
  };
  const handleOnSubmit = () => {
    const userInput: IUserInput = {
      urlAvt: imageFile,
      customSizeForUploadImage: CUSTOM_SIZE_UPLOAD_AVATAR,
      displayName: formField.displayName,
      phoneNumber: formField.phoneNumber,
      locationTypeInput: {
        province_code: provinceSelected?.code,
        district_code: districtSelected?.code,
        ward_code: wardSelected?.code,
        street_name: fullAddress,
      },
    };
    if (!imageFile) {
      delete userInput.urlAvt;
    }
    const payload: IUpdateUserProfileInput = {
      updateUserInput: userInput,
    };
    dispatch(updateUserProfile(payload));
  };
  return (
    <div>
      <ValidatorForm onSubmit={handleOnSubmit} className="mb-4">
        <div className="grid grid-cols-1 gap-y-2 laptop:gap-2 laptop:grid-cols-2">
          <Input
            name="name"
            className="row-start-2 row-end-3 laptop:row-auto"
            label={typeTitle("ownName")}
            placeholder={`Nhập ${typeTitle("ownName")?.toLocaleLowerCase()}`}
            initValue={user?.displayName || ""}
            onChange={handleChangeName}
            validates={{
              required: {
                errorMessage: `Vui lòng nhập ${typeTitle(
                  "ownName",
                )?.toLocaleLowerCase()}.`,
              },
            }}
          />
          <SingleImageUploader
            label="Ảnh đại diện"
            onChange={handleImageFile}
            image={user?.urlAvt?.small || user?.urlAvt?.default}
            className="col-start-1 col-end-2 row-start-1 row-end-2 laptop:col-start-2 laptop:col-end-3 laptop:row-end-3"
          />
          <Input
            name="name"
            label="Số điện thoại"
            initValue={user?.phoneNumber || ""}
            onChange={handleChangePhoneNumber}
            placeholder="Nhập số điện thoại"
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
            title="Tỉnh/ Thành phố"
            value={provinceSelected?.name}
            required
            errorMessage="Vui lòng chọn tỉnh/ thành phố "
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
            label="Địa chỉ chi tiết"
            placeholder="Nhập địa chỉ chi tiết"
            onChange={handleStreet}
            className="row-start-7 row-end-8 laptop:row-auto "
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
export default BoxManagerInfo;
