import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { IById } from "common/typings";
import Input from "designs/Input";
import Dialog, { DialogTitle } from "components/Dialog";

interface IExchangeHistoryDialogProps {
  ButtonMenu: React.ReactElement;
  editField?: any;
}

const ExchangeHistoryDialog: React.FC<IExchangeHistoryDialogProps> = props => {
  const { ButtonMenu, editField } = props;
  const dispatch = useDispatch();
  const [formField, setFormField] = useState<Record<any, any>>({});

  const handleName = (name: string) => {
    setFormField(state => ({ ...state, name }));
  };
  const handlePrice = (value: string) => {
    const discountValue = Number(value);
    setFormField(state => ({ ...state, discountValue }));
  };
  const handleRemainingCoupon = (value: string) => {
    const remainingCoupon = Number(value);
    setFormField(state => ({ ...state, remainingCoupon }));
  };

  const handleOnSubmit = () => {
    if (editField) {
      const payload: any = {
        id: editField._id!,
        updateCouponInput: formField,
      };
      // dispatch(updateCoupon(payload));
    } else {
      const payload: any = {
        createCouponInput: formField,
      };
      // dispatch(createCoupon(payload));
    }
  };
  return (
    <Dialog ButtonMenu={ButtonMenu} onConfirm={handleOnSubmit}>
      <div className="w-full m-auto bg-tertiary p-2 rounded-md">
        <DialogTitle className="mb-4 text-black normal-case text-xxl">
          {editField ? "Chỉnh sửa giao dịch" : "Thêm giao dịch"}
        </DialogTitle>
        <Input
          className="mb-2"
          label="Tên giao dịch"
          initValue={editField?.name}
          name="name"
          onChange={handleName}
          validates={{
            required: {
              errorMessage: "Vui lòng nhập.",
            },
          }}
        />
        <Input
          className="mb-2"
          label="Tổng tiền"
          initValue={editField?.price}
          name="price"
          onChange={handlePrice}
          validates={{
            required: {
              errorMessage: "Vui lòng nhập.",
            },
            isNumber: {
              errorMessage: "Vui lòng nhập số hợp lệ.",
            },
          }}
        />
      </div>
    </Dialog>
  );
};

export default ExchangeHistoryDialog;
