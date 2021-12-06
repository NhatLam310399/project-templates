import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IRoomCreateInput,
  ICreateRoom,
  IUpdateRoom,
  IRoom,
  ICustomUploadInput,
  IRoomUpdateInput,
  ICustomUploadInputVideo,
} from "common/typings";

import Dialog, { DialogTitle } from "components/Dialog";
import MultipleImagesUploader from "components/MultipleImagesUploader";

import { CUSTOM_SIZE_LICENSE_IMAGE } from "constants/image";
import Input from "designs/Input";

import { createRoom, updateRoom } from "redux/actions/room";

import { IRootState } from "redux/reducers";
import TextArea from "designs/TextArea";
import RoomVideos from "../RoomVideos";

interface IRoomDialogProps {
  ButtonMenu: React.ReactElement;
  editField?: IRoom;
}

const RoomDialog: React.FC<IRoomDialogProps> = props => {
  const { ButtonMenu, editField } = props;
  const dispatch = useDispatch();
  const { place } = useSelector((state: IRootState) => state.place);
  const [formField, setFormField] = useState<IRoomCreateInput>({});
  const [createImageList, setCreateImageList] = useState<File[]>([]);
  const [updateImageList, setUpdateImageList] = useState<ICustomUploadInput[]>(
    [],
  );
  const [createVideoList, setCreateVideoList] = useState<File[]>();
  const [updateVideoList, setUpdateVideoList] =
    useState<ICustomUploadInputVideo[]>();

  const handleOnSubmit = () => {
    const input = {
      ...formField,
      place: place?._id,
    };
    if (editField) {
      const updateInput = {
        ...input,
        image: updateImageList,
        video: updateVideoList,
      } as IRoomUpdateInput;
      const payload: IUpdateRoom = {
        id: editField?._id || "",
        roomUpdateInput: updateInput,
      };
      dispatch(updateRoom(payload));
    } else {
      const payload: ICreateRoom = {
        roomCreateInput: {
          ...input,
          image: createImageList,
          video: createVideoList,
          customSizeForUploadImage: CUSTOM_SIZE_LICENSE_IMAGE,
        },
      };
      dispatch(createRoom(payload));
    }
  };

  const handleClose = () => {
    if (editField) return;

    setCreateImageList([]);
    setUpdateImageList([]);
    setFormField({});
  };

  return (
    <Dialog
      ButtonMenu={ButtonMenu}
      onConfirm={handleOnSubmit}
      onClose={handleClose}
      size="md"
    >
      <div className="w-full">
        <DialogTitle className="mb-4 text-black normal-case text-xl laptop:text-mxl">
          {editField ? "Chỉnh sửa phòng" : "Thêm phòng"}
        </DialogTitle>
        <div className="grid gap-2 phone:gap-3 grid-cols-1 phone:grid-cols-2">
          <div>
            <Input
              label="Tên phòng"
              className="mb-2"
              initValue={editField?.name}
              name="name"
              placeholder="Nhập tên phòng"
              onChange={name => {
                setFormField(state => ({ ...state, name }));
              }}
              validates={{
                required: {
                  errorMessage: "Vui lòng nhập tên phòng",
                },
              }}
            />
            <Input
              label="Số khách"
              className="mb-2"
              initValue={editField?.amount}
              name="amount"
              type="number"
              placeholder="Nhập số khách"
              onChange={amount => {
                setFormField(state => ({ ...state, amount: Number(amount) }));
              }}
              validates={{
                isNumber: {
                  errorMessage: "Vui lòng nhập đúng định dạng số.",
                },
              }}
            />
            <Input
              label="Giá phòng"
              className="mb-2"
              initValue={editField?.price}
              name="price"
              type="number"
              placeholder="Nhập giá phòng"
              onChange={price => {
                setFormField(state => ({ ...state, price: Number(price) }));
              }}
              validates={{
                required: {
                  errorMessage: "Vui lòng nhập giá phòng",
                },
                isNumber: {
                  errorMessage: "Vui lòng nhập đúng định dạng số.",
                },
              }}
            />
            <TextArea
              label="Giới thiệu phòng"
              placeholder="Giới thiệu về phòng"
              initValue={editField?.description}
              name="description"
              onChange={description => {
                setFormField(state => ({ ...state, description }));
              }}
            />
          </div>
          <div>
            <MultipleImagesUploader
              className="mb-2 mt-0.5"
              label="Hình ảnh phòng"
              images={editField?.image}
              isEdit={!!editField}
              onCreateChange={imagesList => {
                setCreateImageList(imagesList);
              }}
              onUpdateChange={imagesList => {
                setUpdateImageList(imagesList);
              }}
            />
            <RoomVideos
              editField={editField}
              onCreateVideos={video => {
                setCreateVideoList(video);
              }}
              onUpdateVideos={video => {
                setUpdateVideoList(video);
              }}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default RoomDialog;
