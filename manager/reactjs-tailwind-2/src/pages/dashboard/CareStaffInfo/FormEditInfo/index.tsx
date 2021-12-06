/* eslint-disable react/destructuring-assignment */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ValidatorForm } from "react-material-ui-form-validator";

import {
  IDistrict,
  IGetUserByID,
  IProvince,
  IUpdateUserProfileInput,
  IUserInput,
  IWard,
} from "common/typings";
import { CUSTOM_SIZE_UPLOAD_AVATAR } from "constants/image";

import SingleImageUploader from "components/SingleImageUploader";

import Button from "designs/Button";
import Input from "designs/Input";
import Select from "designs/Select";

import { IRootState } from "redux/reducers";
import { getUserById } from "redux/actions/users";
import { getDistricts, getProvinces, getWards } from "redux/actions/location";

const FormEditInfo: React.FC = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: IRootState) => state.auth);
  const { user } = useSelector((state: IRootState) => state.users);

  // location
  const { provinces, districts, wards } = useSelector(
    (state: IRootState) => state.location,
  );

  const [provinceSelected, setProvinceSelected] = useState<IProvince | null>(
    null,
  );
  const [districtSelected, setDistrictSelected] = useState<IDistrict | null>(
    null,
  );
  const [wardSelected, setWardSelected] = useState<IWard | null>(null);
  const [streetName, setStreetName] = useState<string | undefined>("");

  const [name, setName] = useState<string | undefined>("");
  const [avatarFile, setAvatarFile] = useState<File | null>();

  const userId = currentUser?.userInfo?._id || "";
  const avatar: string | undefined =
    user?.urlAvt?.small || user?.urlAvt?.medium || user?.urlAvt?.default;

  const getUserApi = () => {
    const payload: IGetUserByID = { id: userId };
    dispatch(getUserById(payload));
  };

  useEffect(() => {
    dispatch(getProvinces({ name: "" }));
  }, []);

  useEffect(() => {
    if (userId) {
      if (!user) {
        getUserApi();
      } else {
        const { province, district, ward, street, displayName } = user;
        province && handleSelectProvince(province);
        district && handleSelectDistrict(district);
        ward && handleSelectWard(ward);
        street && setStreetName(street);
        displayName && setName(displayName);
      }
    }
  }, [user, userId]);

  const handleSelectProvince = (option: IProvince | null) => {
    setProvinceSelected(option);
    dispatch(getDistricts({ name: "", province_code: option?.code }));
    districtSelected && setDistrictSelected(null);
    wardSelected && setWardSelected(null);
  };

  const handleSelectDistrict = (option: IDistrict | null) => {
    setDistrictSelected(option);
    dispatch(getWards({ name: "", district_code: option?.code }));
    wardSelected && setWardSelected(null);
  };

  const handleSelectWard = (option: IWard) => {
    setWardSelected(option);
  };

  const handleUploadAvatar = (file: File) => {
    setAvatarFile(file);
  };

  const handleSubmit = () => {
    const userInput: IUserInput = {
      displayName: name,
      locationTypeInput: {
        province_code: provinceSelected?.code,
        district_code: districtSelected?.code,
        ward_code: wardSelected?.code,
        street_name: streetName,
      },
    };

    if (avatarFile) {
      userInput.urlAvt = avatarFile;
      userInput.customSizeForUploadImage = CUSTOM_SIZE_UPLOAD_AVATAR;
    }
    const payload: IUpdateUserProfileInput = {
      updateUserInput: userInput,
    };
    // dispatch(updateUserProfile(payload));
  };

  return (
    <div>
      <ValidatorForm
        onSubmit={handleSubmit}
        className="p-1 phone:p-3 flex items-end justify-center flex-col"
      >
        <div className="flex flex-col gap-2 mb-4 w-full">
          <div className="grid phone:grid-cols-2 gap-2 grid-cols-1">
            <Input
              type="text"
              label="Tên nhân viên chăm sóc"
              className="w-full"
              placeholder="Nhập tên"
              name="displayName"
              initValue={name}
              onChange={value => {
                setName(value);
              }}
              validates={{
                required: {
                  errorMessage: "Vui lòng nhập tên.",
                },
              }}
            />
            <Input
              label="Số điện thoại"
              className="w-full"
              name="phoneNumber"
              initValue={user?.phoneNumber}
              disabled
            />
            <SingleImageUploader
              label="Ảnh đại diện"
              onChange={handleUploadAvatar}
              image={avatar}
              imageCrop
              className="phone:col-start-1 phone:col-end-3 phone:row-start-2 phone:row-end-3 laptop:col-start-2 laptop:col-end-3 laptop:row-start-1"
            />
          </div>
          <div className="grid grid-cols-1 phone:grid-cols-2 gap-2">
            <div>
              <Select
                title="Tỉnh/Thành phố"
                placeholder="Chọn Tỉnh/Thành phố"
                value={provinceSelected?.name}
                onSelectOption={handleSelectProvince}
                options={provinces}
                required
                errorMessage="Vui lòng chọn Tỉnh/Thành phố"
              />
            </div>
            <div className="">
              <Select
                title="Quận/Huyện"
                placeholder="Chọn Quận/Huyện"
                value={districtSelected?.name}
                onSelectOption={handleSelectDistrict}
                options={districts}
                disabled={!provinceSelected}
                required
                errorMessage="Vui lòng chọn Quận/Huyện"
              />
            </div>
            <div className="">
              <Select
                title="Phường/Xã"
                placeholder="Chọn Phường/Xã"
                value={wardSelected?.name}
                onSelectOption={handleSelectWard}
                options={wards}
                disabled={!districtSelected}
                required
                errorMessage="Vui lòng chọn Phường/Xã"
              />
            </div>
            <Input
              type="text"
              label="Địa chỉ chi tiết"
              className="w-full"
              placeholder="Nhập địa chỉ chi tiết"
              name="street"
              initValue={streetName}
              onChange={value => {
                setStreetName(value);
              }}
            />
          </div>
        </div>
        <Button
          primary
          className="w-full phone:w-auto"
          innerClassName=" py-1.5 px-7 font-semibold text-lg normal-case"
          type="submit"
        >
          Lưu
        </Button>
      </ValidatorForm>
    </div>
  );
};
export default FormEditInfo;
