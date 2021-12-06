import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import {
  ICreateWards,
  IDistrict,
  IGetDistricts,
  IProvince,
  IUpdateWards,
  IWard,
  IWardInput,
} from "common/typings";

import Dialog, { DialogTitle } from "components/Dialog";
import Select from "designs/Select";
import Input from "designs/Input";

import { createWard, updateWard } from "redux/actions/location";
import * as services from "services/location";

interface IWardDialogProps {
  ButtonMenu: React.ReactElement;
  editField?: IWard | null;
}

const WardDialog: React.FC<IWardDialogProps> = props => {
  const { ButtonMenu, editField = null } = props;

  const dispatch = useDispatch();

  const formField = useRef<IWardInput>({}).current;

  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [province, setProvince] = useState<IProvince | null>(null);
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [district, setDistrict] = useState<IDistrict | null>(null);

  useEffect(() => {
    getAllProvincesAPI();
  }, []);

  useEffect(() => {
    if (editField) {
      getAllDistrictAPI(editField?.province_code || "");
    }
  }, [editField]);

  const getAllProvincesAPI = async () => {
    const result = await getAllProvincesService();
    setProvinces(result);
  };
  const getAllDistrictAPI = async (provinceCode: string) => {
    const result = await getAllDistrictService(provinceCode);
    setDistricts(result);
  };

  const onChangeLat = (latitude: string) => {
    formField.latitude = latitude ? Number(latitude) : undefined;
  };
  const onChangeLong = (longitude: string) => {
    formField.longitude = longitude ? Number(longitude) : undefined;
  };
  const onChangeName = (name: string) => {
    formField.name = name;
  };

  const handleOnSubmit = () => {
    const wardInput: IWardInput = {
      latitude: formField.latitude,
      longitude: formField.longitude,
      name: formField.name,
      district_code: formField.district_code || editField?.district_code,
      province_code: formField.province_code || editField?.province_code,
      district_name: formField.district_name || editField?.district_name,
    };
    if (editField) {
      const payload: IUpdateWards = {
        id: editField?._id || "",
        wardInput,
      };
      dispatch(updateWard(payload));
    } else {
      const payload: ICreateWards = {
        wardInput,
      };
      dispatch(createWard(payload));
    }
  };
  const handleSelectProvince = (option: IProvince) => {
    setProvince(option);
    formField.province_code = option?.code;
    setDistrict(null);
    getAllDistrictAPI(option?.code || "");
  };
  const handleSelectDistrict = (option: IDistrict) => {
    setDistrict(option);
    formField.district_code = option?.code;
    formField.district_name = option?.name;
  };

  const handleClose = () => {
    setProvince(null);
    setDistrict(null);
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
            ? " Chỉnh sửa thông tin phường/xã"
            : "Thêm thông tin phường/xã"}
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
        <Select
          floatTitle={false}
          className="mb-2"
          onSelectOption={handleSelectDistrict}
          options={districts}
          value={district?.name || editField?.district_name}
          required
          label="Tên quận/ huyện"
          errorMessage="Vui lòng chọn quận/ huyện"
          placeholder="Chọn quận/ huyện"
        />
        <Input
          className="mb-2"
          placeholder="Nhập tên phường/ xã"
          label="Tên phường/ xã"
          initValue={editField?.name || ""}
          name="name"
          onChange={onChangeName}
          validates={{
            required: {
              errorMessage: "Vui lòng nhập tên phường/ xã",
            },
          }}
        />
        <Input
          className="mb-2"
          label="Kinh độ"
          initValue={editField?.longitude?.toString() || ""}
          name="longitude"
          onChange={onChangeLong}
          placeholder="Nhập kinh độ"
          validates={{
            isFloat: {
              errorMessage: "Vui lòng nhập số hợp lệ.",
            },
          }}
        />
        <Input
          label="Vĩ độ"
          initValue={editField?.latitude?.toString() || ""}
          name="latitude"
          onChange={onChangeLat}
          placeholder="Nhập vĩ độ"
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

export default WardDialog;
const getAllProvincesService = async (name = "") => {
  const response = await services.getProvinces({ name });
  const { provinces: results } = response?.data?.getProvinces || {};
  return results;
};
const getAllDistrictService = async (province_code: string) => {
  const payload: IGetDistricts = {
    province_code,
  };
  const response = await services.getDistrictsByProvince(payload);
  const { districts: results } = response?.data?.getDistrictsByProvince || {};
  return results;
};
