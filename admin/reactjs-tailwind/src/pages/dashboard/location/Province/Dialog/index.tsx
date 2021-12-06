import React, { useRef } from "react";
import { useDispatch } from "react-redux";

import { IProvince, IProvinceInput } from "common/typings";

import Dialog, { DialogTitle } from "components/Dialog";
import Input from "designs/Input";

import { updateProvince } from "redux/actions/location";

interface IProvinceDialogProps {
  ButtonMenu: React.ReactElement;
  editField?: IProvince;
}

const ProvinceDialog: React.FC<IProvinceDialogProps> = props => {
  const { ButtonMenu, editField } = props;

  const formField = useRef<IProvinceInput>({}).current;

  const dispatch = useDispatch();

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
    if (editField) {
      const payload = {
        id: editField._id || "",
        input: formField,
      };
      dispatch(updateProvince(payload));
    }
  };

  return (
    <Dialog ButtonMenu={ButtonMenu} onConfirm={handleOnSubmit}>
      <div className="w-full p-2 m-auto rounded-md ">
        <DialogTitle className="mb-4 text-black normal-case text-mxl">
          Chỉnh sửa thông tin tỉnh/ thành phố
        </DialogTitle>
        <Input
          className="mb-2"
          label="Tên tỉnh/ Thành phố"
          initValue={editField?.name}
          name="name"
          type="text"
          onChange={onChangeName}
          validates={{
            required: {
              errorMessage: "Vui lòng nhập tên tỉnh/ thành phố",
            },
          }}
          placeholder="Nhập tên tỉnh/thành phố"
        />
        <Input
          className="mb-2"
          label="Kinh độ"
          initValue={editField?.longitude?.toString() || ""}
          name="longitude"
          onChange={onChangeLong}
          placeholder="Nhập kinh độ"
          validates={{
            isFloat: {
              errorMessage: "Vui lòng nhập số hợp lệ.",
            },
          }}
        />
        <Input
          className=""
          label="Vĩ độ"
          initValue={editField?.latitude?.toString() || ""}
          name="latitude"
          onChange={onChangeLat}
          placeholder="Nhập vĩ độ"
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

export default ProvinceDialog;
