import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import Dialog, { DialogTitle } from "components/Dialog";
import { IClosingTime, ICreateClosingTime } from "common/typings";

import DatePicker from "designs/DatePicker";

import {
  createClosingTime,
  updateClosingTime,
} from "redux/actions/closingTime";
import { resetAction } from "redux/actions/common";
import { IRootState } from "redux/reducers";
import { showNotification } from "redux/actions/notification";

interface IClosingTimeDialogProps {
  ButtonMenu: React.ReactElement;
  editField?: IClosingTime | null;
}

const ClosingTimeDialog: React.FC<IClosingTimeDialogProps> = props => {
  const { ButtonMenu, editField } = props;
  const dispatch = useDispatch();
  const {
    allClosingTime: { results = [] },
  } = useSelector((state: IRootState) => state.closingTime);
  const {
    rooms: { results: allRoom },
  } = useSelector((state: IRootState) => state.room);
  const { place } = useSelector((state: IRootState) => state.place);
  const { actionSuccess } = useSelector((state: IRootState) => state.common);
  const formFieldRef = useRef<IClosingTime>({});
  const formField = formFieldRef.current;
  const [date, setDate] = useState<string>("");
  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
    }
  }, [actionSuccess]);

  const handleChangeDateStart = (newDate: Date | null) => {
    if (newDate !== null) {
      formField.dayOffStart = newDate;
      const datFormat = dayjs(newDate.toString()).format("DD/MM/YYYY");
      setDate(datFormat);
    }
  };

  const handleOnSubmit = () => {
    const listDateOff = results?.map(day =>
      dayjs(day?.dayOffStart?.toString()).format("DD/MM/YYYY"),
    );
    const newDate = listDateOff?.indexOf(date) > -1;
    if (newDate) {
      dispatch(
        showNotification({
          message: "Ngày dừng hoạt động này đã tồn tại !",
          type: "error",
          title: "",
        }),
      );
      return;
    }

    const room = allRoom.map(item => item._id!);

    const payload: ICreateClosingTime = {
      closingTimeCreateInput: {
        dayOffStart: formField.dayOffStart,
        karaoke: place?._id,
        room,
      },
    };
    dispatch(createClosingTime(payload));
  };

  return (
    <Dialog
      ButtonMenu={ButtonMenu}
      onConfirm={handleOnSubmit}
      onClose={() => {
        formFieldRef.current = {};
      }}
      size="sm"
    >
      <div className="w-full">
        <DialogTitle className="mb-3 normal-case text-black text-xl laptop:text-mxl">
          Thêm lịch dừng hoạt động
        </DialogTitle>

        <DatePicker
          label="Ngày dừng hoạt động"
          placeholder="dd/mm/yyyy"
          date={editField?.dayOffStart}
          onChange={handleChangeDateStart}
          required
          disableFuture={false}
          minDate={new Date()}
          errorMessage="Vui lòng chọn ngày dừng hoạt động !"
          className="col-span-1"
        />
      </div>
    </Dialog>
  );
};

export default ClosingTimeDialog;
