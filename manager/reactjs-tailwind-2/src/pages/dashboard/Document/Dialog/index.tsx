import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  IDocumentInput,
  IDocumentType,
  ICreateDocument,
  IUpdateDocument,
  IRootState,
  ICustomUploadInput,
  IDocumentUpdateInput,
} from "common/typings";

import Dialog from "components/Dialog";
import SingleVideoUploader from "components/SingleVideoUploader";
import SingleFileUploader from "components/SingleFileUploader";
import MultipleImagesUploader from "components/MultipleImagesUploader";

import Input from "designs/Input";
import TextArea from "designs/TextArea";
import Select from "designs/Select";

import { createDocument, updateDocument } from "redux/actions/document";
import { CUSTOM_SIZE_UPLOAD_STORE_IMAGE } from "constants/image";

interface IDocumentListDialogProps {
  ButtonMenu: React.ReactElement;
  editField?: IDocumentType;
}

const DocumentListDialog: React.FC<IDocumentListDialogProps> = props => {
  const { ButtonMenu, editField } = props;
  const dispatch = useDispatch();
  const { place } = useSelector((state: IRootState) => state.place);

  const [formField, setFormField] = useState<IDocumentInput>({});
  const [typeSelected, setTypeSelected] = useState<string>();
  const [createImageList, setCreateImageList] = useState<File[]>([]);
  const [updateImageList, setUpdateImageList] = useState<ICustomUploadInput[]>(
    [],
  );

  useEffect(() => {
    if (editField) {
      const { type } = editField;
      if(type==="RELATED"){
        setTypeSelected("Tài liệu liên quan");
      }
      else{
        setTypeSelected("Tài liệu thiết kế");
      }
    }
  }, [editField]);

  const renderType = () => {
    if(typeSelected==="Tài liệu thiết kế"){
      return "DESIGN"
    }
    else{
      return "RELATED"
    }
  }

  const handleOnSubmit = () => {
    const input = {
      ...formField,
      type: renderType(),
      customSizeForUploadImage: CUSTOM_SIZE_UPLOAD_STORE_IMAGE,
    };
    if (editField) {
      const updateInput = {
        ...input,
        images: updateImageList,
      } as IDocumentUpdateInput;
      const payload: IUpdateDocument = {
        id: editField._id!,
        documentUpdateInput: updateInput,
      };

      dispatch(updateDocument(payload));
    } else {
      const payload: ICreateDocument = {
        documentCreateInput: {
          ...input,
          images: createImageList,
          place: place?._id,
        },
      };
      dispatch(createDocument(payload));
    }
  };

  const handleClose = () => {
    if (editField) return;

    // Reset every state to initial
    setCreateImageList([]);
    setUpdateImageList([]);
    setTypeSelected("");
    setFormField({});
  };

  return (
    <Dialog
      ButtonMenu={ButtonMenu}
      onConfirm={handleOnSubmit}
      onClose={handleClose}
      size="md"
    >
      <div className="w-full m-auto rounded-md">
        <div className="mb-4 font-bold text-black normal-case text-mxl">
          {editField ? "Chỉnh sửa tài liệu" : "Thêm tài liệu"}
        </div>
        <div className="grid grid-cols-1 gap-2 laptop:grid-cols-2">
          <div className="">
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
              className="mt-2"
              title="Loại tài liệu"
              placeholder="Chọn loại tài liệu"
              value={typeSelected}
              options={[
                {
                  name: "Tài liệu thiết kế",
                },
                {
                  name: "Tài liệu liên quan",
                },
              ]}
              onSelectOption={value => {
                setTypeSelected(value?.name)
              }}
              required
              errorMessage="Vui lòng chọn loại tài liệu."
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
            <SingleFileUploader
              className="mt-2"
              label="File tài liệu"
              file={editField?.fileName || editField?.file}
              onChange={(file, fileName) => {
                setFormField(state => ({ ...state, file, fileName }));
              }}
            />
          </div>
          <div className="">
            <MultipleImagesUploader
              label="Hình ảnh tài liệu"
              onCreateChange={imagesList => {
                setCreateImageList(imagesList);
              }}
              onUpdateChange={imagesList => {
                setUpdateImageList(imagesList);
              }}
              isEdit={!!editField}
              images={editField?.images}
            />
            <SingleVideoUploader
              className="mt-2"
              label="Video tài liệu"
              video={editField?.video}
              onChange={video => {
                setFormField(state => ({ ...state, video }));
              }}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DocumentListDialog;
