import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ICoupon,
  ICouponInput,
  ICreateCoupon,
  IUpdateCoupon,
} from "common/typings";
import Dialog from "components/Dialog";
import { discountType, IDiscountType } from "constants/discountType";

import Input from "designs/Input";
import Checkbox from "designs/Checkbox";
import DatePicker from "designs/DatePicker";
import Select from "designs/Select";

import { resetAction } from "redux/actions/common";
import { IRootState } from "redux/reducers";
import { createCoupon, updateCoupon } from "redux/actions/coupon";
import { showNotification } from "redux/actions/notification";

interface ICouponDialogProps {
  ButtonMenu: React.ReactElement;
  editField?: ICoupon | null;
}

const CouponDialog: React.FC<ICouponDialogProps> = props => {
  const { ButtonMenu, editField } = props;
  const dispatch = useDispatch();

  const { actionSuccess } = useSelector((state: IRootState) => state.common);
  const { allCoupon = [] } = useSelector((state: IRootState) => state.coupon);

  // const [startDate, setStartDate] = useState<Date>();
  const [typeSelected, setTypeSelected] = useState<IDiscountType>(
    discountType[0],
  );
  const [status, setStatus] = useState<boolean>(true);

  const field = useRef<ICoupon>({});
  const formField = field.current;

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
    }
  }, [actionSuccess]);

  useEffect(() => {
    if (editField) {
      editField?.status && setStatus(editField?.status);
      if (editField.type === "percent") {
        setTypeSelected(discountType[0]);
      } else {
        setTypeSelected(discountType[1]);
      }
    }
  }, [editField]);

  const handleName = (name: string) => {
    formField.name = name;
  };

  const handleChangeDateEnd = (newDate: Date | null) => {
    if (newDate !== null) {
      formField.validTill = newDate;
    }
  };
  const handleCouponCode = (couponCode: string) => {
    formField.couponCode = couponCode;
  };
  const handleRemainingCoupon = (value: string) => {
    formField.remainingCoupon = Number(value);
  };
  const handlePoint = (point: string) => {
    formField.point = Number(point);
  };
  const handleSelectedDiscountType = (option: any) => {
    setTypeSelected(option);
  };
  const handleDiscountValue = (value: string) => {
    formField.discountValue = Number(value);
  };
  const handleDiscountPercent = (value: string) => {
    formField.discountPercent = Number(value) / 100;
  };
  const handleStatusCheck = (isChecked: boolean) => {
    setStatus(isChecked);
  };
  const handleDiscountBooking = (value: string) => {
    formField.discountBooking = Number(value);
  };
  const handleClose = () => {
    if (editField) return;

    field.current = {};
    setTypeSelected(discountType[0]);
    setStatus(true);
  };

  const handleOnSubmit = () => {
    const listCouponCode = allCoupon?.map(coupon => coupon?.couponCode);
    if (formField.couponCode) {
      const isExist = listCouponCode.indexOf(formField.couponCode) > -1;

      if (isExist) {
        dispatch(
          showNotification({
            message: "M?? khuy???n m??i ???? t???n t???i, th??? l???i sau!",
            type: "error",
            title: "",
          }),
        );
        return;
      }
    }

    const couponInput: ICouponInput = {
      name: formField.name,
      validTill: formField.validTill,
      couponCode: formField.couponCode,
      remainingCoupon: formField.remainingCoupon,
      point: formField.point,
      discountBooking: formField.discountBooking,
      type: typeSelected.type,
      discountValue: formField.discountValue,
      discountPercent:
        typeSelected.type === "percent" ? formField.discountPercent : 0,
      status,
      isPublic: true,
    };
    if (editField) {
      const payload: IUpdateCoupon = {
        id: editField?._id || "",
        updateCouponInput: couponInput,
      };
      dispatch(updateCoupon(payload));
    } else {
      const payload: ICreateCoupon = {
        createCouponInput: couponInput,
      };
      dispatch(createCoupon(payload));
    }
  };

  return (
    <Dialog
      ButtonMenu={ButtonMenu}
      onConfirm={handleOnSubmit}
      onClose={handleClose}
      size="lg"
    >
      <div className="mb-4 text-black normal-case laptop:text-mxl text-xl font-bold">
        {editField ? "Ch???nh s???a m?? khuy???n m??i" : "Th??m m?? khuy???n m??i"}
      </div>
      <div className="grid grid-cols-1 gap-2 phone:grid-cols-2 ">
        <div className="space-y-2">
          <Input
            label="M?? khuy???n m??i"
            placeholder="Nh???p m?? khuy???n m??i"
            initValue={editField?.couponCode || ""}
            name="couponCode"
            onChange={handleCouponCode}
            validates={{
              required: {
                errorMessage: "Vui l??ng nh???p m?? khuy???n m??i",
              },
            }}
          />
          <Input
            label="T??n khuy???n m??i"
            placeholder="Nh???p t??n khuy???n m??i"
            initValue={editField?.name || ""}
            name="name"
            onChange={handleName}
          />
          <DatePicker
            floatTitle={false}
            label="Ng??y k???t th??c"
            placeholder="Ch???n ng??y k???t th??c"
            date={editField?.validTill}
            onChange={handleChangeDateEnd}
            minDate={new Date()}
            minDateMessage="Ng??y k???t th??c ph???i l???n h??n ng??y b???t ?????u"
          />
          <div className="flex gap-x-1 items-center">
            <Checkbox isChecked={status} onChange={handleStatusCheck} />
            <p className="font-medium">T??nh tr???ng</p>
          </div>
        </div>
        <div className="space-y-2">
          <Select
            floatTitle={false}
            onSelectOption={handleSelectedDiscountType}
            options={discountType}
            label="H??nh th???c khuy???n m??i"
            value={typeSelected?.name}
            required
            errorMessage="Vui l??ng ch???n h??nh th???c khuy???n m??i "
            disabled={!!editField}
          />
          {typeSelected?.type === "percent" ? (
            <>
              <Input
                label="Ph???n tr??m gi?? d???ch v???"
                placeholder="Nh???p % gi?? tr??? gi???m"
                initValue={
                  (editField && Number(editField?.discountPercent) * 100) || ""
                }
                name="discountPercent"
                onChange={handleDiscountPercent}
                validates={{
                  required: {
                    errorMessage: "Vui l??ng nh???p ph???n tr??m gi?? d???ch v???",
                  },
                  isNumber: {
                    errorMessage: "Vui l??ng nh???p s??? h???p l???.",
                  },
                  minNumber: {
                    min: 1,
                    errorMessage: "Ph???n tr??m khuy???n m??i ph???i l???n h??n 0",
                  },
                  maxNumber: {
                    max: 100,
                    errorMessage:
                      "Ph???n tr??m khuy???n m??i ph???i nh??? h??n ho???c b???ng 100",
                  },
                }}
              />
              <Input
                label="Gi?? tr??? ????n h??ng t???i thi???u"
                placeholder="Nh???p gi?? tr??? ????n h??ng t???i thi???u"
                initValue={editField?.discountBooking?.toString() || ""}
                name="discountBooking"
                onChange={handleDiscountBooking}
                validates={{
                  isNumber: {
                    errorMessage: "Vui l??ng nh???p s??? h???p l???.",
                  },
                }}
              />
              <Input
                label="S??? ti???n gi???m t???i ??a"
                placeholder="Nh???p s??? ti???n gi???m t???i ??a"
                initValue={editField?.discountValue?.toString() || ""}
                name="discountValue"
                onChange={handleDiscountValue}
                validates={{
                  isNumber: {
                    errorMessage: "Vui l??ng nh???p s??? h???p l???.",
                  },
                }}
              />
            </>
          ) : (
            <>
              <Input
                label="Gi?? tr??? gi???m"
                placeholder="Nh???p s??? ti???n gi???m"
                initValue={editField?.discountValue || ""}
                name="discountValue"
                onChange={handleDiscountValue}
                validates={{
                  required: {
                    errorMessage: "Vui l??ng nh???p gi?? tr??? gi???m",
                  },
                  isNumber: {
                    errorMessage: "Vui l??ng nh???p s??? h???p l???.",
                  },
                  minNumber: {
                    min: 1,
                    errorMessage: "Gi?? ti???n khuy???n m??i ph???i l???n h??n 0",
                  },
                }}
              />
            </>
          )}
          <Input
            label="S??? l?????ng"
            placeholder="Nh????p s???? l??????ng khuy????n ma??i"
            initValue={editField?.remainingCoupon?.toString() || ""}
            name="remainingCoupon"
            onChange={handleRemainingCoupon}
            validates={{
              isNumber: {
                errorMessage: "Vui l??ng nh???p s??? h???p l???.",
              },
              minNumber: {
                min: 1,
                errorMessage: "S??? l?????ng ph???i l???n h??n 0",
              },
            }}
          />
          <Input
            label="??i???m quy ?????i"
            placeholder="Nh???p ??i???m quy ?????i"
            initValue={editField?.point?.toString() || ""}
            name="point"
            onChange={handlePoint}
            validates={{
              required: {
                errorMessage: "Vui l??ng nh???p ??i???m quy ?????i",
              },
              isNumber: {
                errorMessage: "Vui l??ng nh???p s??? h???p l???.",
              },
              minNumber: {
                min: 0,
                errorMessage: "??i???m quy ?????i ph???i l???n h??n ho???c b???ng 0",
              },
            }}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default CouponDialog;
