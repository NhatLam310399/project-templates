import React, { useEffect, useState } from "react";
import { Dialog, DialogActions } from "@material-ui/core";

import { IBooking, IRootState } from "common/typings";
import { renderPrice } from "common/functions";

import { useDialogStyles } from "common/styles/muiStyles/useStyles";
import DetailBookingInfo from "components/BookingDetail/DetailInfo";
import { useDispatch, useSelector } from "react-redux";
import { setTypeDialogActive } from "redux/actions/booking";

interface IPaymentSuccessProps {
  booking: IBooking | null;
  surcharge?: number;
  className?: string;
  open: boolean;
}

const PaymentSuccess: React.FC<IPaymentSuccessProps> = props => {
  const { open = false, booking, surcharge = 0, className } = props;
  const classes = useDialogStyles();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setOpenDialog(open);
  }, [open]);

  const handleClose = () => {
    dispatch(setTypeDialogActive("CLOSE"));
  };

  const handleOpenPreview = () => {
    dispatch(setTypeDialogActive("EXPORT"));
  };

  return (
    <>
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
            Xác nhận thành công
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
              <p className="font-medium text-primary">Đóng</p>
            </button>
            <button
              type="button"
              onClick={handleOpenPreview}
              className="flex items-center justify-center h-4 max-w-full w-17 bg-primary hover:bg-primary-dark"
            >
              <p className="font-medium text-white">In hóa đơn</p>
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};
export default PaymentSuccess;
