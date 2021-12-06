import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  ICategory,
  ICreatePagesInput,
  ICreateStaticPage,
  IStaticPage,
  IUpdatePagesInput,
  IUpdateStaticPages,
} from "common/typings";

import { ASPECT_RATIO_16_9 } from "constants/aspect";
import { CUSTOM_SIZE_IMAGE_PAGE } from "constants/image";

import Dialog, { DialogTitle } from "components/Dialog";
import SingleImageUploader from "components/SingleImageUploader";

import Editor from "designs/Editor";
import Input from "designs/Input";

import { createPages, updatePages } from "redux/actions/staticPage";

import SelectType from "./component/SelectType";

interface IStaticPageDialogProps {
  ButtonMenu: React.ReactElement;
  isEdit?: boolean;
  editField?: IStaticPage | null;
}

const StaticPageDialog: React.FC<IStaticPageDialogProps> = props => {
  const { ButtonMenu, isEdit, editField } = props;

  const dispatch = useDispatch();

  const [imageFile, setImageFile] = useState<File | null>();
  const [field, setField] = useState<IUpdatePagesInput | null>(null);

  const handleSubmit = () => {
    if (!field) {
      return;
    }

    let input = {
      ...field,
    };
    if (imageFile) {
      input = {
        ...input,
        image: imageFile,
        customImageSizeUpload: CUSTOM_SIZE_IMAGE_PAGE,
      };
    }
    if (editField) {
      const payload: IUpdateStaticPages = {
        id: editField._id!,
        fieldsToUpdate: input,
      };
      dispatch(updatePages(payload));
    } else {
      if (!input.title) {
        return;
      }
      const payload: ICreateStaticPage = {
        createPagesInput: input as ICreatePagesInput,
      };
      dispatch(createPages(payload));
    }
  };

  const handleClose = () => {
    setImageFile(null);
    setField(null);
  };
  return (
    <Dialog
      ButtonMenu={ButtonMenu}
      onConfirm={handleSubmit}
      onClose={handleClose}
      size="lg"
    >
      <div className="grid w-full grid-cols-1 gap-2 m-auto rounded-md laptop:grid-cols-2 ">
        <DialogTitle className="col-span-1 mb-2 laptop:col-span-2">
          <span className="font-bold text-black normal-case text-xl laptop:text-mxl">
            {isEdit ? "Chỉnh sửa trang tĩnh" : "Thêm trang tĩnh"}
          </span>
        </DialogTitle>
        <div className="grid row-start-3 row-end-4 gap-2 laptop:row-auto laptop:col-span-1">
          <Input
            placeholder="Nhập tên trang tĩnh"
            label="Tên trang tĩnh"
            name="name"
            initValue={editField?.title}
            className=""
            onChange={title => {
              setField(state => ({ ...state, title }));
            }}
            validates={{
              required: {
                errorMessage: "Vui lòng nhập tên trang tĩnh",
              },
            }}
          />
          <Input
            placeholder="Nhập đường dẫn"
            label="Đường dẫn"
            name="url"
            initValue={editField?.url}
            className=""
            onChange={url => {
              setField(state => ({ ...state, url }));
            }}
            validates={{
              required: {
                errorMessage: "Vui lòng nhập tên đường dẫn",
              },
              matchRegexp: {
                errorMessage: "Nhập đúng định dạng đường dẫn. VD: /abc-xyz",
                regexp: "^\\/([a-zA-Z_0-9-]+)*$",
              },
            }}
          />
          <div>
            <SelectType
              editField={editField}
              onChangeType={(option: ICategory) => {
                setField(state => ({ ...state, category: option._id }));
              }}
            />
          </div>
        </div>

        <div className="row-start-2 row-end-3 laptop:row-auto laptop:col-span-1">
          <div className="flex flex-col items-center w-full">
            <SingleImageUploader
              label="Hình ảnh"
              image={editField?.image?.small}
              onChange={file => setImageFile(file)}
              aspect={ASPECT_RATIO_16_9}
            />
          </div>
        </div>
        <div className="col-span-1 laptop:col-span-2">
          <Editor
            label="Nội dung"
            className="mt-1"
            initValue={field?.content || editField?.content}
            onChange={content => {
              setField(state => ({ ...state, content }));
            }}
            required
            errorMessage="Vui lòng nhập nội dung"
          />
        </div>
      </div>
    </Dialog>
  );
};

export default StaticPageDialog;
