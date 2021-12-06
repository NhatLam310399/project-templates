import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  IBasicDocumentInput,
  IBasicDocumentType,
  ICreateBasicDocument,
  IUpdateBasicDocument,
  IRootState,
} from "common/typings";

import Dialog from "components/Dialog";
import SingleImageUploader from "components/SingleImageUploader";
import SingleFileUploader from "components/SingleFileUploader";
import SingleVideoUploader from "components/SingleVideoUploader";

import Input from "designs/Input";
import Select from "designs/Select";
import TextArea from "designs/TextArea";

import { DOCUMENT_TYPE_CODE } from "constants/types";

import {
  createBasicDocument,
  updateBasicDocument,
} from "redux/actions/document";
import { getTypesByCode } from "redux/actions/types";

interface IDocumentListDialogProps {
  ButtonMenu: React.ReactElement;
  editField?: IBasicDocumentType;
}

const DocumentListDialog: React.FC<IDocumentListDialogProps> = props => {
  const { ButtonMenu, editField } = props;

  const dispatch = useDispatch();

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [formField, setFormField] = useState<IBasicDocumentInput>({});
  const [typeDoc, setTypeDoc] = useState(editField?.type);

  const {
    listTypes: { results = [] },
  } = useSelector((state: IRootState) => state.types);

  useEffect(() => {
    if (!isOpenDialog) return;
    dispatch(getTypesByCode({ code: DOCUMENT_TYPE_CODE }));

    if (editField) {
      const { type } = editField;
      typeDoc && setTypeDoc(type);
    }
  }, [isOpenDialog]);

  const handleOnSubmit = () => {
    const basicDocumentInput: IBasicDocumentInput = {
      ...formField,
      type: typeDoc?._id,
    };

    if (editField) {
      const payload: IUpdateBasicDocument = {
        id: editField._id!,
        basicDocumentUpdateInput: basicDocumentInput,
      };
      dispatch(updateBasicDocument(payload));
    } else {
      const payload: ICreateBasicDocument = {
        basicDocumentCreateInput: basicDocumentInput,
      };
      dispatch(createBasicDocument(payload));
    }
  };

  const handleClose = () => {
    if (editField) return;

    // Reset every state to initial
    setFormField({ name: "" });
    setTypeDoc(undefined);
  };

  return (
    <Dialog
      ButtonMenu={ButtonMenu}
      onConfirm={handleOnSubmit}
      onClose={handleClose}
      onToggle={isOpen => setIsOpenDialog(isOpen)}
      size="lg"
    >
      <div className="w-full m-auto rounded-md">
        <div className="mb-4 font-bold text-black normal-case text-xl laptop:text-mxl">
          {editField ? "Chỉnh sửa tài liệu" : "Thêm tài liệu"}
        </div>
        <div className="grid grid-cols-1 gap-2 laptop:grid-cols-2">
          <div>
            <Input
              label="Tên tài liệu"
              initValue={editField?.name}
              name="name"
              onChange={name => {
                setFormField(state => ({ ...state, name }));
              }}
              validates={{
                required: {
                  errorMessage: "Vui lòng nhập tên tài liệu.",
                },
              }}
              placeholder="Nhập tên tài liệu"
            />
            <Select
              label="Loại tài liệu"
              className="mt-2"
              placeholder="Chọn loại tài liệu"
              value={typeDoc?.name}
              onSelectOption={option => setTypeDoc(option as any)}
              options={results}
              required
              errorMessage="Vui lòng chọn loại tài liệu"
              floatTitle={false}
            />
            <Input
              className="mt-2"
              label="Giá"
              initValue={editField?.price}
              name="price"
              onChange={price => {
                setFormField(state => ({ ...state, price: Number(price) }));
              }}
              validates={{
                required: {
                  errorMessage: "Vui lòng nhập giá tài liệu.",
                },
                isNumber: {
                  errorMessage: "Vui lòng nhập số hợp lệ.",
                },
              }}
              placeholder="Nhập giá tài liệu"
            />
            <TextArea
              className="mt-2"
              label="Mô tả"
              initValue={editField?.introduce}
              name="introduce"
              onChange={introduce => {
                setFormField(state => ({ ...state, introduce }));
              }}
              placeholder="Mô tả tài liệu"
            />
          </div>
          <div className="">
            <SingleImageUploader
              label="Hình ảnh"
              image={editField?.images?.small || editField?.images?.default}
              onChange={images => {
                setFormField(state => ({ ...state, images }));
              }}
              required
              errorMessage="Vui lòng tải lên hình ảnh"
            />
            <SingleVideoUploader
              className="mt-2"
              label="Video mô tả tài liệu"
              video={editField?.video}
              onChange={video => {
                setFormField(state => ({ ...state, video }));
              }}
            />
            <SingleFileUploader
              className="mt-2"
              label="File tài liệu"
              file={editField?.fileName}
              onChange={(file, fileName) => {
                setFormField(state => ({ ...state, file, fileName }));
              }}
              // required
              // errorMessage="Vui lòng chọn file tài liệu"
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DocumentListDialog;
