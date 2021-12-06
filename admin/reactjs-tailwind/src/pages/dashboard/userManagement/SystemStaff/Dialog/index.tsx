import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import {
  ICreateUserByAdmin,
  IDistrict,
  IGender,
  IProvince,
  IRootState,
  IUpdateUserByAdminInput,
  IUser,
  IUserInput,
  IWard,
  IPermissionType,
} from "common/typings";
import { randomId } from "common/functions";
import { getLoggedInAccount } from "common/utils/auth";
import { renderLocation } from "common/functions/location";

import { IPermissionItem, LIST_GENDER, PERMISSION } from "constants/users";
import { CUSTOM_SIZE_UPLOAD_AVATAR } from "constants/image";
import { PATH } from "constants/routes";

import Dialog, { DialogTitle } from "components/Dialog";
import AvatarUploader from "components/AvatarUploader";

import Input from "designs/Input";
import Select from "designs/Select";
import DatePicker from "designs/DatePicker";

import { getWards, getProvinces, getDistricts } from "redux/actions/location";
import { createUserByAdmin, updateUserByAdmin } from "redux/actions/users";

interface ISystemStaffDialogProps extends RouteComponentProps {
  ButtonMenu: React.ReactElement;
  isEdit?: boolean;
  editField?: IUser | null;
}
// haven't design
const SystemStaffDialog: React.FC<ISystemStaffDialogProps> = props => {
  const { ButtonMenu, isEdit, editField, history } = props;

  const dispatch = useDispatch();
  const { provinces, districts, wards } = useSelector(
    (state: IRootState) => state.location,
  );

  const [currentAccountPermission, setCurrentAccountPermission] = useState<
    IPermissionType | undefined
  >(getLoggedInAccount()?.userInfo?.permission);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const field = useRef<IUser>({});
  const [avatarFile, setAvatarFile] = useState<File | null>();
  const [genderSelected, setGenderSelected] = useState<IGender>();

  const [permissionSelected, setPermissionSelected] =
    useState<IPermissionItem | null>(PERMISSION.MANAGER);

  const [provinceSelected, setProvinceSelected] = useState<IProvince | null>();
  const [districtSelected, setDistrictSelected] = useState<IDistrict | null>();
  const [wardSelected, setWardSelected] = useState<IWard | null>();
  const [streetName, setStreetName] = useState(editField?.street);

  useEffect(() => {
    if (!isOpenDialog) return;

    dispatch(getProvinces({ name: "" }));
    if (editField) {
      const { province, district, ward, street, permission, gender } =
        editField;
      permission && setPermissionSelected(PERMISSION[permission]);
      province && handleSelectProvince(province);
      district && handleSelectDistrict(district);
      ward && handleSelectWard(ward);
      street && setStreetName(street);
      if (gender) {
        const genderItem = LIST_GENDER.find(item => item.value === gender);
        setGenderSelected(genderItem);
      }
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

  const renderPermissionOptions = (): IPermissionItem[] => {
    if (!currentAccountPermission) return [];
    const permissions = PERMISSION[
      currentAccountPermission
    ].lowerPermissions.map(permission => PERMISSION[permission]);
    return [PERMISSION[currentAccountPermission], ...permissions];
  };

  const handleSubmit = () => {
    const userInput: IUserInput = {
      phoneNumber: isEdit ? undefined : field.current.phoneNumber,
      email:
        field.current.email !== editField?.email
          ? field.current.email
          : undefined,
      gender: genderSelected?.value,
      permission: permissionSelected?.type || "MANAGER",
      displayName: field.current.displayName || "",
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

    if (!isEdit) {
      // Create
      userInput.password = randomId(true);
      const payload: ICreateUserByAdmin = {
        createUserInput: userInput,
      };
      dispatch(createUserByAdmin(payload));
    } else {
      // Edit
      delete (userInput as any).password;
      const payload: IUpdateUserByAdminInput = {
        id: editField?._id || null,
        updateUserInput: userInput,
      };
      dispatch(updateUserByAdmin(payload));
    }

    switch (permissionSelected?.type) {
      case "ADMIN":
        history.push(PATH.USER_MANAGEMENT.ADMINISTRATOR);
        break;
      case "CARE_STAFF":
        history.push(PATH.USER_MANAGEMENT.CUSTOMER_CARE_STAFF);
        break;
      case "USER":
        history.push(PATH.USER_MANAGEMENT.LIST_USERS);
        break;
      default:
        break;
    }
  };

  const handleClose = () => {
    if (isEdit) return;

    // Reset every state to initial
    field.current = {};
    setAvatarFile(null);
    setGenderSelected(undefined);
    setStreetName("");
    setProvinceSelected(null);
    setDistrictSelected(null);
    setWardSelected(null);
  };

  return (
    <Dialog
      ButtonMenu={ButtonMenu}
      onConfirm={handleSubmit}
      onClose={handleClose}
      size="lg"
      onToggle={isOpen => setIsOpenDialog(isOpen)}
    >
      <div className="w-full m-auto ">
        <DialogTitle className="mb-4">
          <p className="text-xl text-black normal-case laptop:text-mxl">
            {isEdit
              ? `Chỉnh sửa tài khoản: ${editField?.displayName} `
              : "Thêm tài khoản nhân viên hệ thống"}
          </p>
        </DialogTitle>
        <div className="grid grid-cols-1 gap-4 laptop:grid-cols-2">
          <div className="LEFT-SIDE">
            <Select
              label="Quyền hạn"
              value={permissionSelected?.name}
              onSelectOption={option => setPermissionSelected(option as any)}
              options={renderPermissionOptions()}
              required
              errorMessage="Vui lòng chọn quyền hạn"
              disabled={!isEdit}
              floatTitle={false}
            />
            <Input
              placeholder="Nhập số điện thoại"
              label="Số điện thoại"
              disabled={isEdit}
              name="phoneNumber"
              initValue={editField?.phoneNumber}
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
                  errorMessage: "Vui lòng nhập đúng định dạng số điện thoại",
                },
              }}
            />
            <Input
              placeholder="Nhập họ tên"
              label="Họ và tên"
              name="name"
              className="mt-2"
              initValue={editField?.displayName}
              onChange={value => {
                field.current.displayName = value;
              }}
              validates={{
                required: {
                  errorMessage: "Vui lòng nhập họ và tên",
                },
              }}
            />
            <Input
              label="Email"
              type="text"
              name="email"
              placeholder="Nhập email"
              initValue={editField?.email}
              className="mt-2"
              onChange={value => {
                field.current.email = value;
              }}
              validates={{
                isEmail: {
                  errorMessage: "Vui lòng nhập đúng định dạng email",
                },
              }}
            />
            <Select
              label="Giới tính"
              value={genderSelected?.name}
              className="mt-2"
              floatTitle={false}
              placeholder="Chọn giới tính"
              onSelectOption={value => {
                setGenderSelected(value);
              }}
              options={LIST_GENDER}
            />
            <DatePicker
              label="Ngày sinh"
              className="mt-2"
              placeholder="Chọn ngày sinh"
              date={editField?.birthday}
              disableFuture
              onChange={newDate => {
                field.current.birthday = newDate;
              }}
              floatTitle={false}
            />
          </div>
          <div className="RIGHT-SIDE -mt-3 laptop:mt-0">
            <div className="">
              <p className="text-lg font-medium leading-none mb-0.5">
                Hình ảnh
              </p>
              <div className="flex flex-col items-center w-full">
                <AvatarUploader
                  image={editField?.urlAvt?.small || editField?.urlAvt?.default}
                  onChange={file => setAvatarFile(file)}
                />
              </div>
            </div>
            <Select
              label="Tỉnh/ thành phố"
              className="mt-2"
              value={provinceSelected?.name}
              onSelectOption={handleSelectProvince}
              options={provinces}
              floatTitle={false}
              placeholder="Chọn tỉnh/ thành phố"
            />
            <Select
              label="Quận/ huyện"
              value={districtSelected?.name}
              className="mt-2"
              onSelectOption={handleSelectDistrict}
              options={districts}
              disabled={!provinceSelected}
              floatTitle={false}
              placeholder="Chọn quận/ huyện"
            />
            <Select
              label="Phường/ xã"
              value={wardSelected?.name}
              className="mt-2"
              onSelectOption={handleSelectWard}
              options={wards}
              disabled={!districtSelected}
              floatTitle={false}
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

export default withRouter(SystemStaffDialog);
