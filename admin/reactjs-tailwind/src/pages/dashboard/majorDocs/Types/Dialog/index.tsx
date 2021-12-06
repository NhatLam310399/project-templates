import React, { useState } from "react";

import { createTypes, updateTypes } from "redux/actions/types";
import { useDispatch } from "react-redux";

import {
  ICreateTypes,
  ITypes,
  ITypesInput,
  IUpdateTypes,
} from "common/typings";

import Input from "designs/Input";
import TextArea from "designs/TextArea";

import Dialog from "components/Dialog";

import { DOCUMENT_TYPE_CODE } from "constants/types";

interface ITypesDialogProps {
  ButtonMenu: React.ReactElement;
  editField?: ITypes;
}

const TypesDialog: React.FC<ITypesDialogProps> = props => {
  const { ButtonMenu, editField } = props;
  const dispatch = useDispatch();
  const [formField, setFormField] = useState<ITypesInput>({});

  const handleName = (name: string) => {
    setFormField(state => ({ ...state, name }));
  };
  const handleValue = (value: string) => {
    setFormField(state => ({ ...state, value }));
  };

  const handleOnSubmit = () => {
    if (editField) {
      const payload: IUpdateTypes = {
        id: editField._id!,
        fieldsToUpdate: formField,
      };
      dispatch(updateTypes(payload));
    } else {
      const payload: ICreateTypes = {
        createTypesInput: {
          ...formField,
          code: DOCUMENT_TYPE_CODE,
        },
      };
      dispatch(createTypes(payload));
    }
  };
  return (
    <Dialog ButtonMenu={ButtonMenu} onConfirm={handleOnSubmit}>
      <div className="w-full m-auto rounded-md">
        <div className="mb-4 font-bold text-black normal-case text-xl laptop:text-mxl">
          {editField ? "Chỉnh sửa loại tài liệu" : "Thêm loại tài liệu"}
        </div>
        <Input
          className="mb-2"
          label="Tên loại tài liệu"
          initValue={editField?.name || ""}
          name="name"
          placeholder="Nhập tên loại tài liệu"
          onChange={handleName}
          validates={{
            required: {
              errorMessage: "Vui lòng nhập tên loại tài liệu",
            },
          }}
        />
        <TextArea
          className="mb-2"
          label="Mô tả"
          placeholder="Mô tả loại tài liệu"
          initValue={editField?.value || ""}
          name="price"
          onChange={handleValue}
          validates={{
            required: {
              errorMessage: "Vui lòng nhập mô tả",
            },
          }}
        />
      </div>
    </Dialog>
  );
};

export default TypesDialog;
