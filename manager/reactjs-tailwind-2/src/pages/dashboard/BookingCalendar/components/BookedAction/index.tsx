import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogActions } from "@material-ui/core";
import { ValidatorForm } from "react-material-ui-form-validator";

import {
  IBooking,
  IBookingStatus,
  IRootState,
  IUpdateBooking,
} from "common/typings";
import { useDialogStyles } from "common/styles/muiStyles/useStyles";
import { renderPrice } from "common/functions";
import DetailBookingInfo from "components/BookingDetail/DetailInfo";

import Button from "designs/Button";
import Input from "designs/Input";

import { setTypeDialogActive, updateBooking } from "redux/actions/booking";
import { resetAction } from "redux/actions/common";

import PreviewDialog from "./PreviewDialog";
import PaymentSuccess from "./PaymentSuccess";

interface IBookedActionProps {
  booking: IBooking | null;
}
const BookedAction: React.FC<IBookedActionProps> = props => {
  const { booking } = props;
  const dispatch = useDispatch();
  const [openPaymentSuccess, setOpenPaymentSuccess] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const { typeDialogActive = "CLOSE" } = useSelector(
    (state: IRootState) => state.booking,
  );
  const [surcharge, setSurcharge] = useState<number>(0);
  useEffect(() => {
    dispatch(setTypeDialogActive("PAYMENT"));
  }, []);
  useEffect(() => {
    if (typeDialogActive === "PAYMENT_SUCCESS") {
      setOpenPaymentSuccess(true);
    } else {
      setOpenPaymentSuccess(false);
    }
    if (typeDialogActive === "EXPORT") {
      setOpenPreview(true);
    } else {
      setOpenPreview(false);
    }
  }, [typeDialogActive]);
  const updateBookingApi = (status: IBookingStatus) => {
    const payload: IUpdateBooking = {
      updateBookingInput: {
        status,
      },
      id: booking!._id!,
    };
    dispatch(updateBooking(payload));
  };
  const handleCanceled = () => {
    updateBookingApi("canceled");
  };

  const handleConfirm = () => {
    const totalPayment = booking!.totalPayment! + surcharge;
    const payload: IUpdateBooking = {
      updateBookingInput: {
        status: "finished",
        totalPayment,
        surcharge,
      },
      id: booking!._id!,
    };
    dispatch(updateBooking(payload));
  };
  return (
    <>
      <ValidatorForm onSubmit={() => {}} className="my-4">
        <Input
          className="w-full"
          type="number"
          name="surcharge"
          onChange={fee => {
            setSurcharge(Number(fee));
          }}
          label="Phụ thu dịch vụ: Đồ ăn + đồ uống"
          placeholder="Nhập phụ phí"
          validates={{
            isNumber: {
              errorMessage: "Vui lòng nhập đúng định dạng.",
            },
          }}
        />
      </ValidatorForm>
      <div className="flex flex-wrap items-center gap-1 justify-evenly">
        <Button
          error
          className="flex-none max-w-full w-17"
          innerClassName="h-4.5 text-lg"
          onClick={handleCanceled}
        >
          <span className="normal-case">Hủy đơn</span>
        </Button>

        <BookedActionDialog
          className="flex-none max-w-full w-17"
          booking={booking}
          surcharge={surcharge}
          onConfirm={handleConfirm}
          ButtonMenu={
            <Button primary className="w-full" innerClassName="h-4.5 text-lg">
              <span className="normal-case">Thanh toán</span>
            </Button>
          }
        />
      </div>
      <PreviewDialog booking={booking} open={openPreview} />
      <PaymentSuccess
        booking={booking}
        open={openPaymentSuccess}
        surcharge={surcharge}
      />
    </>
  );
};

export default BookedAction;

interface IBookedActionDialogProps {
  booking: IBooking | null;
  ButtonMenu: React.ReactElement;
  surcharge?: number;
  className?: string;
  onConfirm: () => void;
}

const BookedActionDialog: React.FC<IBookedActionDialogProps> = props => {
  const {
    ButtonMenu,

    onConfirm,
    booking,
    surcharge = 0,
    className,
  } = props;
  const dispatch = useDispatch();
  const classes = useDialogStyles();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setTypeDialogActive("PAYMENT"));
    onConfirm && onConfirm();
    setOpenDialog(false);
  };

  return (
    <>
      <div className={className} onClick={() => setOpenDialog(true)}>
        {ButtonMenu}
      </div>
      <Dialog
        className={classes.root}
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: "white",
          },
        }}
      >
        <div className="p-2 phone:p-4 bg-tertiary">
          <h1 className="mb-3 text-xl font-bold phone:text-mxl">
            Xác nhận hoàn thành đơn đặt phòng
          </h1>
          <DetailBookingInfo booking={booking} />
          <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
            <p className="text-lg font-semibold">Phụ phu dịch vụ</p>
            <p className="text-xl font-bold text-primary">
              {renderPrice(surcharge, "vnd")}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between">
            <p className="text-lg font-semibold">Tổng tiền</p>
            <p className="text-xl font-bold text-primary">
              {renderPrice(booking!.totalPayment! + surcharge, "vnd")}
            </p>
          </div>
          <DialogActions className="gap-2 mt-3 phone:mt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex items-center justify-center h-4 max-w-full bg-white w-17 hover:bg-gray"
            >
              <p className="font-medium text-primary">Hủy</p>
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              className="flex items-center justify-center h-4 max-w-full w-17 bg-primary hover:bg-primary-dark"
            >
              <p className="font-medium text-white">Xác nhận</p>
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};
