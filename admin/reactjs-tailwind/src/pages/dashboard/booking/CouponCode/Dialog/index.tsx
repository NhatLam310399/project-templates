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
            message: "Mã khuyến mãi đã tồn tại, thử lại sau!",
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
        {editField ? "Chỉnh sửa mã khuyến mãi" : "Thêm mã khuyến mãi"}
      </div>
      <div className="grid grid-cols-1 gap-2 phone:grid-cols-2 ">
        <div className="space-y-2">
          <Input
            label="Mã khuyến mãi"
            placeholder="Nhập mã khuyến mãi"
            initValue={editField?.couponCode || ""}
            name="couponCode"
            onChange={handleCouponCode}
            validates={{
              required: {
                errorMessage: "Vui lòng nhập mã khuyến mãi",
              },
            }}
          />
          <Input
            label="Tên khuyến mãi"
            placeholder="Nhập tên khuyến mãi"
            initValue={editField?.name || ""}
            name="name"
            onChange={handleName}
          />
          <DatePicker
            floatTitle={false}
            label="Ngày kết thúc"
            placeholder="Chọn ngày kết thúc"
            date={editField?.validTill}
            onChange={handleChangeDateEnd}
            minDate={new Date()}
            minDateMessage="Ngày kết thúc phải lớn hơn ngày bắt đầu"
          />
          <div className="flex gap-x-1 items-center">
            <Checkbox isChecked={status} onChange={handleStatusCheck} />
            <p className="font-medium">Tình trạng</p>
          </div>
        </div>
        <div className="space-y-2">
          <Select
            floatTitle={false}
            onSelectOption={handleSelectedDiscountType}
            options={discountType}
            label="Hình thức khuyến mãi"
            value={typeSelected?.name}
            required
            errorMessage="Vui lòng chọn hình thức khuyến mãi "
            disabled={!!editField}
          />
          {typeSelected?.type === "percent" ? (
            <>
              <Input
                label="Phần trăm giá dịch vụ"
                placeholder="Nhập % giá trị giảm"
                initValue={
                  (editField && Number(editField?.discountPercent) * 100) || ""
                }
                name="discountPercent"
                onChange={handleDiscountPercent}
                validates={{
                  required: {
                    errorMessage: "Vui lòng nhập phần trăm giá dịch vụ",
                  },
                  isNumber: {
                    errorMessage: "Vui lòng nhập số hợp lệ.",
                  },
                  minNumber: {
                    min: 1,
                    errorMessage: "Phần trăm khuyến mãi phải lớn hơn 0",
                  },
                  maxNumber: {
                    max: 100,
                    errorMessage:
                      "Phần trăm khuyến mãi phải nhỏ hơn hoặc bằng 100",
                  },
                }}
              />
              <Input
                label="Giá trị đơn hàng tối thiểu"
                placeholder="Nhập giá trị đơn hàng tối thiểu"
                initValue={editField?.discountBooking?.toString() || ""}
                name="discountBooking"
                onChange={handleDiscountBooking}
                validates={{
                  isNumber: {
                    errorMessage: "Vui lòng nhập số hợp lệ.",
                  },
                }}
              />
              <Input
                label="Số tiền giảm tối đa"
                placeholder="Nhập số tiền giảm tối đa"
                initValue={editField?.discountValue?.toString() || ""}
                name="discountValue"
                onChange={handleDiscountValue}
                validates={{
                  isNumber: {
                    errorMessage: "Vui lòng nhập số hợp lệ.",
                  },
                }}
              />
            </>
          ) : (
            <>
              <Input
                label="Giá trị giảm"
                placeholder="Nhập số tiền giảm"
                initValue={editField?.discountValue || ""}
                name="discountValue"
                onChange={handleDiscountValue}
                validates={{
                  required: {
                    errorMessage: "Vui lòng nhập giá trị giảm",
                  },
                  isNumber: {
                    errorMessage: "Vui lòng nhập số hợp lệ.",
                  },
                  minNumber: {
                    min: 1,
                    errorMessage: "Giá tiền khuyến mãi phải lớn hơn 0",
                  },
                }}
              />
            </>
          )}
          <Input
            label="Số lượng"
            placeholder="Nhập số lượng khuyến mãi"
            initValue={editField?.remainingCoupon?.toString() || ""}
            name="remainingCoupon"
            onChange={handleRemainingCoupon}
            validates={{
              isNumber: {
                errorMessage: "Vui lòng nhập số hợp lệ.",
              },
              minNumber: {
                min: 1,
                errorMessage: "Số lượng phải lớn hơn 0",
              },
            }}
          />
          <Input
            label="Điểm quy đổi"
            placeholder="Nhập điểm quy đổi"
            initValue={editField?.point?.toString() || ""}
            name="point"
            onChange={handlePoint}
            validates={{
              required: {
                errorMessage: "Vui lòng nhập điểm quy đổi",
              },
              isNumber: {
                errorMessage: "Vui lòng nhập số hợp lệ.",
              },
              minNumber: {
                min: 0,
                errorMessage: "Điểm quy đổi phải lớn hơn hoặc bằng 0",
              },
            }}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default CouponDialog;
