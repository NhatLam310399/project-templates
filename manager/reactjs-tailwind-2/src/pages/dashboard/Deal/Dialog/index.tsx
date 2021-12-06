import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ICoupon,
  ICouponInput,
  ICreateCoupon,
  IUpdateCoupon,
} from "common/typings";

import Dialog, { DialogTitle } from "components/Dialog";

import { discountType, IDiscountType } from "constants/discountType";

import Input from "designs/Input";
import Checkbox from "designs/Checkbox";
import DatePicker from "designs/DatePicker";
import Select from "designs/Select";

import { createCoupon, updateCoupon } from "redux/actions/coupon";
import { resetAction } from "redux/actions/common";
import { IRootState } from "redux/reducers";
import { showNotification } from "redux/actions/notification";

interface ICouponDialogProps {
  ButtonMenu: React.ReactElement;
  editField?: ICoupon | null;
}

const CouponDialog: React.FC<ICouponDialogProps> = props => {
  const { ButtonMenu, editField } = props;
  const dispatch = useDispatch();
  const [typeSelected, setTypeSelected] = useState<IDiscountType>(
    discountType[0],
  );
  const { place } = useSelector((state: IRootState) => state.place);

  const { actionSuccess } = useSelector((state: IRootState) => state.common);
  const { allCoupon = [] } = useSelector((state: IRootState) => state.coupon);
  const formFieldRef = useRef<ICouponInput>({});
  const formField = formFieldRef.current;

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
    }
  }, [actionSuccess]);

  useEffect(() => {
    if (editField) {
      if (editField.type === "percent") {
        setTypeSelected(discountType[0]);
      } else {
        setTypeSelected(discountType[1]);
      }
    }
  }, [editField]);

  const handleSelectedDiscountType = (option: any) => {
    setTypeSelected(option);
  };

  const handleCouponCode = (couponCode: string) => {
    formField.couponCode = couponCode;
  };

  const handleChangeDateEnd = (newDate: Date | null) => {
    if (newDate !== null) {
      formField.validTill = newDate;
    }
  };

  const handleDiscountPercent = (value: string) => {
    formField.discountPercent = Number(value) / 100;
  };

  const handleDiscountBooking = (value: string) => {
    formField.discountBooking = Number(value);
  };

  const handleName = (name: string) => {
    formField.name = name;
  };

  const handleRemainingCoupon = (value: string) => {
    formField.remainingCoupon = Number(value);
  };

  const handleDiscountValue = (value: string) => {
    formField.discountValue = Number(value);
  };

  const handleClose = () => {
    if (editField) return;

    formFieldRef.current = {};
    setTypeSelected(discountType[0]);
  };

  const handleOnSubmit = () => {
    const listCouponCode = allCoupon?.map(coupon => coupon?.couponCode);
    if (formField.couponCode) {
      const isExist = listCouponCode.indexOf(formField.couponCode) > -1;

      if (isExist) {
        dispatch(
          showNotification({
            message: "Mã khuyến mãi đã tồn tại, thử lại sau !",
            type: "error",
            title: "",
          }),
        );
        return;
      }
    }

    const couponInput: ICouponInput = {
      ...formField,
      type: typeSelected?.value,
      discountPercent:
        typeSelected.value === "percent" ? formField.discountPercent : 0,
      isPublic: true,
      karaoke: place?._id,
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
      size="md"
    >
      <div className="w-full">
        <DialogTitle className="mb-4 normal-case text-black text-xl laptop:text-mxl">
          {editField ? "Chỉnh sửa mã khuyến mãi" : "Thêm mã khuyến mãi"}
        </DialogTitle>
        <div className="grid w-full grid-cols-1 gap-2 phone:grid-cols-2">
          <div className="space-y-2">
            <Input
              label="Mã khuyến mãi"
              placeholder="Nhập mã khuyến mãi"
              initValue={editField?.couponCode || ""}
              name="couponCode"
              onChange={handleCouponCode}
              validates={{
                required: {
                  errorMessage: "Vui lòng nhập mã khuyến mãi.",
                },
              }}
            />
            <Input
              label="Tên mã khuyến mãi"
              placeholder="Nhập Tên mã khuyến mãi"
              initValue={editField?.name || ""}
              name="name"
              onChange={handleName}
            />

            <DatePicker
              label="Ngày kết thúc"
              placeholder="Chọn ngày kết thúc"
              date={editField?.validTill}
              onChange={handleChangeDateEnd}
              minDate={new Date()}
              minDateMessage="Ngày kết thúc phải lớn hơn ngày bắt đầu"
            />
            <div className="flex gap-1 items-center">
              <Checkbox
                isChecked={editField?.status}
                onChange={status => {
                  formField.status = status;
                }}
              />
              <p className="font-semibold text-primary">Đang hoạt động</p>
            </div>
          </div>

          <div className="space-y-2">
            <Select
              onSelectOption={handleSelectedDiscountType}
              options={discountType}
              title="Hình thức khuyến mãi"
              placeholder="Chọn hình thức khuyến mãi"
              value={typeSelected?.name}
              required
              errorMessage="Vui lòng chọn hình thức khuyến mãi"
              disabled={!!editField}
            />
            {typeSelected?.value === "percent" ? (
              <>
                <Input
                  label="Phần trăm giá dịch vụ"
                  placeholder="Nhập % giá trị giảm"
                  initValue={
                    (editField && Number(editField?.discountPercent) * 100) ||
                    ""
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
                    min: {
                      min: 1,
                      errorMessage: "Phần trăm khuyến mãi phải lớn hơn 0",
                    },
                    max: {
                      max: 100,
                      errorMessage:
                        "Phần trăm khuyến mãi phải nhỏ hơn hoặc bằng 100",
                    },
                  }}
                />
                <Input
                  label="Giá trị hóa đơn tối thiểu"
                  placeholder="Nhập giá trị hóa đơn tối thiểu"
                  initValue={editField?.discountBooking}
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
                  initValue={editField?.discountValue}
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
                  label="Gíá trị giảm"
                  placeholder="Nhập gíá trị giảm"
                  initValue={editField?.discountValue?.toString() || ""}
                  name="discountValue"
                  onChange={handleDiscountValue}
                  validates={{
                    required: {
                      errorMessage: "Vui lòng nhập gíá trị giảm.",
                    },
                    isNumber: {
                      errorMessage: "Vui lòng nhập số hợp lệ.",
                    },
                    min: {
                      min: 1,
                      errorMessage: "Giá tiền khuyến mãi phải lớn hơn 0.",
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
                min: {
                  min: 0,
                  errorMessage: "Số lượng phải lớn hơn hoặc bằng 0",
                },
              }}
            />
            <Input
              label="Điểm quy đổi"
              placeholder="Nhập điểm quy đổi"
              initValue={editField?.point?.toString() || ""}
              name="point"
              onChange={point => {
                formField.point = Number(point);
              }}
              validates={{
                required: {
                  errorMessage: "Vui lòng nhập điểm quy đổi.",
                },
                isNumber: {
                  errorMessage: "Vui lòng nhập đúng định dạng.",
                },
                min: {
                  min: 1,
                  errorMessage: "Điểm quy đổi phải lớn hơn 0.",
                },
              }}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CouponDialog;
