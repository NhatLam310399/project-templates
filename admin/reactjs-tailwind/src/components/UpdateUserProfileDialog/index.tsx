import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";

import {
  IDistrict,
  IProvince,
  IUpdateUserProfile,
  IUser,
  IUserInput,
  IWard,
  IRootState,
} from "common/typings";
import { renderLocation } from "common/functions/location";

import Dialog, { DialogTitle } from "components/Dialog";
import AvatarUploader from "components/AvatarUploader";

import Input from "designs/Input";
import Select from "designs/Select";
import DatePicker from "designs/DatePicker";

import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "redux/actions/profile";
import { getWards, getProvinces, getDistricts } from "redux/actions/location";

import { CUSTOM_SIZE_UPLOAD_AVATAR } from "constants/image";

interface IProfileDialogProps extends RouteComponentProps {
  ButtonMenu: React.ReactElement;
  isEdit?: boolean;
  editField?: IUser | null;
}

const ProfileDialog: React.FC<IProfileDialogProps> = props => {
  const { ButtonMenu, isEdit, editField } = props;
  const dispatch = useDispatch();

  const { provinces, districts, wards } = useSelector(
    (state: IRootState) => state.location,
  );

  const field = useRef<IUser>({ ...editField } || {});

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const [avatarFile, setAvatarFile] = useState<File | null>();
  const [gender, setGender] = useState(editField?.gender);
  const [streetName, setStreetName] = useState(editField?.street);

  const [provinceSelected, setProvinceSelected] = useState<IProvince | null>(
    editField?.province || null,
  );
  const [districtSelected, setDistrictSelected] = useState<IDistrict | null>(
    editField?.district || null,
  );
  const [wardSelected, setWardSelected] = useState<IWard | null>(
    editField?.ward || null,
  );

  useEffect(() => {
    if (!isOpenDialog) return;

    dispatch(getProvinces({ name: "" }));
    if (editField) {
      const { province, district, ward, street } = editField;
      province && handleSelectProvince(province);
      district && handleSelectDistrict(district);
      ward && handleSelectWard(ward);
      street && setStreetName(street);
    }
  }, [isOpenDialog]);

  const handleSelectProvince = (option: IProvince) => {
    setProvinceSelected(option);
    districtSelected && setDistrictSelected(null);
    wardSelected && setWardSelected(null);
    dispatch(getDistricts({ name: "", province_code: option.code }));
    setStreetName(renderLocation([option?.name]));
  };

  const handleSelectDistrict = (option: IDistrict) => {
    setDistrictSelected(option);
    wardSelected && setWardSelected(null);
    dispatch(getWards({ name: "", district_code: option.code }));
    setStreetName(renderLocation([option?.name, provinceSelected?.name]));
  };

  const handleSelectWard = (option: IWard) => {
    setWardSelected(option);
    setStreetName(
      renderLocation([
        option?.name,
        districtSelected?.name,
        provinceSelected?.name,
      ]),
    );
  };

  const handleSubmit = () => {
    const userInput: IUserInput = {
      gender,
      displayName: field.current.displayName || "",
      email:
        field.current.email !== editField?.email
          ? field.current.email
          : undefined,

      birthday: field.current?.birthday || null,
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
    const payload: IUpdateUserProfile = {
      updateUserInput: userInput,
    };

    dispatch(updateUserProfile(payload));
  };
  const handleClose = () => {
    if (isEdit) return;

    // Reset every state to initial
    field.current = {};
    setAvatarFile(null);
    setGender("");
    setProvinceSelected(null);
    setDistrictSelected(null);
    setWardSelected(null);
  };

  return (
    <Dialog
      ButtonMenu={ButtonMenu}
      onConfirm={handleSubmit}
      onClose={handleClose}
      onToggle={() => {
        setIsOpenDialog(state => !state);
      }}
      size="lg"
    >
      <div className="w-full m-auto rounded-md">
        <DialogTitle className="mb-4 text-black normal-case text-xl laptop:text-mxl">
          Chỉnh sửa thông tin cá nhân
        </DialogTitle>
        <div className="grid gap-6 laptop:grid-cols-2">
          <div className="LEFT-SIDE">
            <Input
              label="Quyền hạn"
              name="Quyền hạn"
              disabled
              initValue={editField?.permission}
            />
            <Input
              label="Số điện thoại"
              disabled={isEdit}
              name="phoneNumber"
              initValue={field.current?.phoneNumber}
              className="mt-2"
              onChange={value => {
                field.current.phoneNumber = value;
              }}
              validates={{
                required: {
                  errorMessage: "Vui lòng nhập số điện thoại",
                },
                matchRegexp: {
                  regexp:
                    "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
                  errorMessage: "Số điện thoại không hợp lệ",
                },
              }}
            />
            <Input
              label="Họ và tên"
              name="name"
              className="mt-2"
              placeholder="Nhập họ và tên"
              initValue={editField?.displayName}
              onChange={value => {
                field.current.displayName = value;
              }}
              validates={{
                required: {
                  errorMessage: "Vui lòng nhập họ tên",
                },
              }}
            />

            <Input
              label="Email"
              type="text"
              name="email"
              placeholder="Nhập email"
              className="mt-2"
              initValue={editField?.email}
              onChange={value => {
                field.current.email = value;
              }}
              validates={{
                isEmail: {
                  errorMessage: "Email không hợp lệ",
                },
              }}
            />
            <Select
              label="Giới tính"
              value={gender}
              floatTitle={false}
              placeholder="Chọn giới tính"
              className="mt-2"
              onSelectOption={value => {
                setGender(value.name);
              }}
              options={[
                {
                  name: "Nam",
                },
                {
                  name: "Nữ",
                },
                {
                  name: "Khác",
                },
              ]}
            />
            <DatePicker
              label="Ngày sinh"
              className="mt-2"
              floatTitle={false}
              date={editField?.birthday}
              onChange={newDate => {
                field.current.birthday = newDate;
              }}
            />
          </div>

          <div className="RIGHT-SIDE -mt-4 laptop:mt-0">
            <div>
              <p className="text-lg font-medium leading-none mb-0.5">
                Hình ảnh
              </p>
              <div className="flex flex-col items-center w-full">
                <AvatarUploader
                  image={editField?.urlAvt?.small || editField?.urlAvt?.default}
                  onChange={file => {
                    setAvatarFile(file);
                  }}
                />
              </div>
            </div>
            <Select
              className="mt-2"
              floatTitle={false}
              label="Tỉnh/ thành phố"
              placeholder="Chọn tỉnh/ thành phố"
              value={provinceSelected?.name}
              onSelectOption={handleSelectProvince}
              options={provinces}
            />
            <Select
              label="Quận/ huyện"
              floatTitle={false}
              value={districtSelected?.name}
              className="mt-2"
              onSelectOption={handleSelectDistrict}
              options={districts}
              disabled={!provinceSelected}
              placeholder="Chọn quận/ huyện"
            />
            <Select
              label="Phường/ xã"
              floatTitle={false}
              value={wardSelected?.name}
              className="mt-2"
              onSelectOption={handleSelectWard}
              options={wards}
              disabled={!districtSelected}
              placeholder="Chọn phường/ xã"
            />
            <Input
              label="Địa chỉ chi tiết"
              type="text"
              name="street"
              className="mt-2"
              placeholder="Nhập địa chỉ chi tiết"
              initValue={streetName}
              onChange={value => {
                setStreetName(value);
              }}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default withRouter(ProfileDialog);
