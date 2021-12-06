import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import {
  ICreateDistrict,
  IDistrict,
  IDistrictInput,
  IProvince,
  IUpdateDistrict,
} from "common/typings";

import Dialog, { DialogTitle } from "components/Dialog";
import Input from "designs/Input";
import Select from "designs/Select";

import { createDistrict, updateDistrict } from "redux/actions/location";
import * as services from "services/location";

interface IDistrictDialogProps {
  ButtonMenu: React.ReactElement;
  editField?: IDistrict | null;
}

const DistrictDialog: React.FC<IDistrictDialogProps> = props => {
  const { ButtonMenu, editField = null } = props;

  const dispatch = useDispatch();

  const formField = useRef<IDistrictInput>({}).current;

  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [province, setProvince] = useState<IProvince | null>(null);

  useEffect(() => {
    getAllProvinceAPI();
  }, []);

  const getAllProvinceAPI = async () => {
    const result = await getAllProvinceService();
    setProvinces(result);
  };
  const getAllProvinceService = async () => {
    const response = await services.getProvinces({});
    const { provinces: results } = response?.data?.getProvinces || {};
    return results;
  };

  const handleChangeName = (name: string) => {
    formField.name = name;
  };
  const handleChangeLat = (latitude: string) => {
    formField.latitude = latitude ? Number(latitude) : undefined;
  };
  const handleChangeLong = (longitude: string) => {
    formField.longitude = longitude ? Number(longitude) : undefined;
  };
  const handleOnSubmit = () => {
    const districtInput: IDistrictInput = {
      province_code: formField.province_code || editField?.province_code,
      name: formField.name,
      latitude: formField.latitude,
      longitude: formField.longitude,
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
  const handleSelectProvince = (option: IProvince) => {
    setProvince(option);
    formField.province_code = option.code;
  };
  const handleClose = () => {
    setProvince(null);
  };

  return (
    <Dialog
      ButtonMenu={ButtonMenu}
      onClose={handleClose}
      onConfirm={handleOnSubmit}
    >
      <div className="w-full p-2 m-auto rounded-md ">
        <DialogTitle className="mb-4 text-black normal-case text-mxl">
          {editField
            ? "Chỉnh sửa thông tin quận/ Huyện"
            : "Thêm thông tin quận/ Huyện"}
        </DialogTitle>

        <Select
          floatTitle={false}
          className="mb-2"
          onSelectOption={handleSelectProvince}
          options={provinces}
          value={province?.name || editField?.province_name}
          required
          label="Tên tỉnh/ thành phố"
          errorMessage="Vui lòng chọn tỉnh/ thành phố"
          placeholder="Chọn tỉnh/thành phố"
        />
        <Input
          className="mb-2"
          label="Tên quận/ Huyện"
          placeholder="Nhập tên quận/ huyện"
          initValue={editField?.name || ""}
          name="name"
          onChange={handleChangeName}
          validates={{
            required: {
              errorMessage: "Vui lòng nhập tên quận/ huyện",
            },
          }}
        />
        <Input
          className="mb-2"
          label="Kinh độ"
          initValue={editField?.longitude?.toString() || ""}
          name="longitude"
          placeholder="Kinh độ"
          onChange={handleChangeLong}
          validates={{
            isFloat: {
              errorMessage: "Vui lòng nhập số hợp lệ.",
            },
          }}
        />
        <Input
          className=""
          placeholder="Vĩ độ"
          label="Vĩ độ"
          initValue={editField?.latitude?.toString() || ""}
          name="latitude"
          onChange={handleChangeLat}
          validates={{
            isFloat: {
              errorMessage: "Vui lòng nhập số hợp lệ.",
            },
          }}
        />
      </div>
    </Dialog>
  );
};

export default DistrictDialog;
