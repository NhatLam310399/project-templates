import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ITradeCreateInput,
  ITrade,
  ICreateTrade,
  IUpdateTrade,
  IRootState,
  ICustomUploadInput,
  ITradeUpdateInput,
  ITypes,
} from "common/typings";

import MultipleImagesUploader from "components/MultipleImagesUploader";
import Dialog from "components/Dialog";
import SingleVideoUploader from "components/SingleVideoUploader";

import { CUSTOM_SIZE_UPLOAD_STORE_IMAGE } from "constants/image";

import Input from "designs/Input";
import TextArea from "designs/TextArea";
import Select from "designs/Select";

import { createTrade, updateTrade } from "redux/actions/trade";

interface ITradeDialogProps {
  ButtonMenu: React.ReactElement;
  editField?: ITrade;
}

const TradeListDialog: React.FC<ITradeDialogProps> = props => {
  const { ButtonMenu, editField } = props;
  const dispatch = useDispatch();
  const { place } = useSelector((state: IRootState) => state.place);
  const {
    listTypes: { results: allTypes },
  } = useSelector((state: IRootState) => state.types);

  const [formField, setFormField] = useState<ITradeCreateInput>({});
  const [typeSelected, setTypeSelected] = useState<ITypes>();
  const [createImageList, setCreateImageList] = useState<File[]>([]);
  const [updateImageList, setUpdateImageList] = useState<ICustomUploadInput[]>(
    [],
  );

  useEffect(() => {
    if (editField) {
      const { type } = editField;
      setTypeSelected(type);
    }
  }, [editField]);

  const handleOnSubmit = () => {
    const input = {
      ...formField,
      type: typeSelected?._id,
      customSizeForUploadImage: CUSTOM_SIZE_UPLOAD_STORE_IMAGE,
    };

    if (editField) {
      const updateInput = {
        ...input,
        images: updateImageList,
      } as ITradeUpdateInput;
      const payload: IUpdateTrade = {
        id: editField._id!,
        tradeInput: updateInput,
      };
      dispatch(updateTrade(payload));
    } else {
      const payload: ICreateTrade = {
        tradeInput: {
          ...input,
          images: createImageList,
          company: place?._id,
        },
      };
      dispatch(createTrade(payload));
    }
  };

  const handleClose = () => {
    if (editField) return;

    // Reset every state to initial
    setCreateImageList([]);
    setUpdateImageList([]);
    setTypeSelected(undefined);
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
          {editField ? "Ch???nh s???a s???n ph???m" : "Th??m s???n ph???m"}
        </div>
        <div className="grid grid-cols-1 gap-2 laptop:grid-cols-2">
          <div className="">
            <Input
              label="T??n s???n ph???m"
              initValue={editField?.name}
              name="name"
              onChange={name => {
                setFormField(state => ({ ...state, name }));
              }}
              validates={{
                required: {
                  errorMessage: "Vui l??ng nh???p t??n s???n ph???m.",
                },
              }}
              placeholder="Nh????p t??n s???n ph???m."
            />
            <Select
              className="mt-2"
              title="Lo???i s???n ph???m"
              placeholder="Ch???n lo???i s???n ph???m"
              value={typeSelected?.name}
              options={allTypes}
              onSelectOption={value => {
                setTypeSelected(value);
              }}
              required
              errorMessage="Vui l??ng cho??n lo???i s???n ph???m."
            />
            <Input
              className="mt-2"
              label="Gi?? s???n ph???m"
              initValue={editField?.price}
              name="price"
              onChange={price => {
                setFormField(state => ({ ...state, price: Number(price) }));
              }}
              validates={{
                required: {
                  errorMessage: "Vui l??ng nh???p gi?? s???n ph???m.",
                },
                isFloat: {
                  errorMessage: "Vui l??ng nh???p ????ng ?????nh d???ng.",
                },
              }}
              placeholder="Nh????p gi?? s???n ph???m."
            />
            <Input
              className="mt-2"
              label="S??? l?????ng s???n ph???m"
              initValue={editField?.quantity}
              name="quantity"
              onChange={quantity => {
                setFormField(state => ({
                  ...state,
                  quantity: Number(quantity),
                }));
              }}
              validates={{
                required: {
                  errorMessage: "Vui l??ng nh???p s??? l?????ng s???n ph???m.",
                },
                isNumber: {
                  errorMessage: "Vui l??ng nh???p ????ng ?????nh d???ng.",
                },
              }}
              placeholder="Nh????p gi?? s???n ph???m."
            />
            <TextArea
              className="mt-2"
              label="M?? ta??"
              placeholder="M?? ta?? s???n ph???m."
              initValue={editField?.description}
              name="description"
              onChange={description => {
                setFormField(state => ({ ...state, description }));
              }}
              validates={{
                required: {
                  errorMessage: "Vui l??ng nh???p m?? ta?? s???n ph???m.",
                },
              }}
            />
          </div>
          <div className="">
            <MultipleImagesUploader
              label="H??nh ???nh s???n ph???m"
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
              label="Video s???n ph???m."
              video={editField?.videos}
              onChange={videos => {
                setFormField(state => ({ ...state, videos }));
              }}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default TradeListDialog;
