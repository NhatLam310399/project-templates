import { Dialog, DialogActions } from "@material-ui/core";
import { useDialogStyles } from "common/styles/muiStyles/useStyles";
import pdf from "html-pdf";
import fs from "fs";
import { IBooking, IGraphQLResponse, IRootState } from "common/typings";
import { useEffect, useRef, useState } from "react";
import DetailPreview from "components/BookingDetail/DetailPreview";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooking } from "services/booking";
import { setTypeDialogActive } from "redux/actions/booking";

interface IPreviewBill {
  booking: IBooking | null;
  open: boolean;
  className?: string;
}

const PreviewBill: React.FC<IPreviewBill> = props => {
  const { booking: bookingProps, open } = props;
  const classes = useDialogStyles();
  const [isExport, setIsExport] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [booking, setBooking] = useState<IBooking>();
  const dispatch = useDispatch();

  useEffect(() => {
    setOpenDialog(open);
    if (open) {
      getBookingByBookingCode();
    }
  }, [open]);

  const handleClose = () => {
    dispatch(setTypeDialogActive("CLOSE"));
  };
  const getBookingByBookingCode = async () => {
    const response: IGraphQLResponse = await getAllBooking({
      filterBooking: {
        bookingCode: bookingProps?.bookingCode,
        status: "finished",
      },
    });
    const { getAllBooking: result } = response.data || {};
    if (result?.results?.length > 0) {
      const value = result?.results?.[0];
      setBooking(value);
    }
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
            Xem trước hóa đơn
          </h1>
          <DetailPreview
            onClose={handleClose}
            isExport={isExport}
            booking={booking!}
          />
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
              onClick={() => setIsExport(true)}
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

export default PreviewBill;
