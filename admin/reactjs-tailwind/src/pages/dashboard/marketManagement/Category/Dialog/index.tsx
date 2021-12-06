import React, { useState } from "react";
import { useDispatch } from "react-redux";

import SingleImageUploader from "components/SingleImageUploader";
import Dialog, { DialogTitle } from "components/Dialog";

import {
  ITypes,
  ICreateTypes,
  IUpdateTypes,
  ITypesInput,
} from "common/typings";

import TextArea from "designs/TextArea";

import { createTypes, updateTypes } from "redux/actions/types";
import Input from "designs/Input";
import { CUSTOM_SIZE_IMAGE_PAGE } from "constants/image";

interface IProductCategoryDialogProps {
  ButtonMenu: React.ReactElement;
  editField?: ITypes;
}

const ProductCategoryDialog: React.FC<IProductCategoryDialogProps> = props => {
  const { ButtonMenu, editField } = props;
  const dispatch = useDispatch();
  const [formField, setFormField] = useState<ITypesInput>({});

  const handleOnSubmit = () => {
    if (editField) {
      const payload: IUpdateTypes = {
        id: editField._id!,
        fieldsToUpdate: {
          ...formField,
          customSizeForUploadImage: CUSTOM_SIZE_IMAGE_PAGE,
        },
      };
      dispatch(updateTypes(payload));
    } else {
      const payload: ICreateTypes = {
        createTypesInput: {
          ...formField,
          code: "PRODUCT",
          customSizeForUploadImage: CUSTOM_SIZE_IMAGE_PAGE,
        },
      };
      dispatch(createTypes(payload));
    }
  };

  const handleClose = () => {
    if (editField) return;

    // Reset every state to initial
    setFormField({ name: "" });
  };

  return (
    <Dialog
      ButtonMenu={ButtonMenu}
      onConfirm={handleOnSubmit}
      onClose={handleClose}
    >
      <div className="w-full m-auto bg-white p-2 rounded-md">
        <DialogTitle className="mb-4 text-black normal-case text-mxl">
          {editField ? "Chỉnh sửa danh mục sản phẩm" : "Thêm danh mục sản phẩm"}
        </DialogTitle>
        <SingleImageUploader
          label="Hình ảnh"
          image={editField?.image?.small || editField?.image?.default}
          onChange={image => {
            setFormField(state => ({ ...state, image }));
          }}
          required
          errorMessage="Vui lòng tải lên hình ảnh"
        />
        <Input
          className="mt-2"
          label="Tên danh mục sản phẩm"
          initValue={editField?.name}
          name="name"
          placeholder="Nhập tên danh mục"
          onChange={name => {
            setFormField(state => ({ ...state, name }));
          }}
          validates={{
            required: {
              errorMessage: "Vui lòng nhập tên danh mục",
            },
          }}
        />
        <TextArea
          className="mt-2"
          label="Mô tả"
          initValue={editField?.value}
          placeholder="Mô tả tài liệu"
          name="value"
          onChange={value => {
            setFormField(state => ({ ...state, value }));
          }}
        />
      </div>
    </Dialog>
  );
};

export default ProductCategoryDialog;
