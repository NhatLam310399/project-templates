import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IClosingTimeInput,
  ICreateClosingTime,
  IUpdateClosingTime,
  IClosingTime,
  IRoom,
} from "common/typings";

import {
  createClosingTime,
  updateClosingTime,
} from "redux/actions/closingTime";
import { IRootState } from "redux/reducers";

import MultiSelect from "designs/MultiSelect";
import DatePicker from "designs/DatePicker";

import Dialog, { DialogTitle } from "components/Dialog";

interface IClosingTimeDialogProps {
  ButtonMenu: React.ReactElement;
  editField?: IClosingTime;
}

const ClosingTimeDialog: React.FC<IClosingTimeDialogProps> = props => {
  const { ButtonMenu, editField } = props;
  const dispatch = useDispatch();
  const { place } = useSelector((state: IRootState) => state.place);
  const {
    rooms: { results: allRoom },
  } = useSelector((state: IRootState) => state.room);
  const [roomsSelect, setRoomsSelect] = useState<IRoom[]>([]);
  const [formField, setFormField] = useState<IClosingTimeInput>({});

  const handleRoomsSelect = (room: IRoom[]) => {
    setRoomsSelect(room);
  };

  const handleOnSubmit = () => {
    const room =
      roomsSelect?.length > 0 ? roomsSelect.map(item => item._id!) : undefined;
    const input = {
      ...formField,
      karaoke: place?._id,
      room,
    };
    if (editField) {
      const payload: IUpdateClosingTime = {
        id: editField?._id || "",
        closingTimeUpdateInput: input,
      };
      dispatch(updateClosingTime(payload));
    } else {
      const payload: ICreateClosingTime = {
        closingTimeCreateInput: input,
      };
      dispatch(createClosingTime(payload));
    }
  };

  const handleClose = () => {
    setFormField({});
    setRoomsSelect([]);
  };

  return (
    <Dialog
      ButtonMenu={ButtonMenu}
      onConfirm={handleOnSubmit}
      onClose={handleClose}
      size="sm"
    >
      <div className="w-full">
        <DialogTitle className="mb-4 normal-case text-black text-xl laptop:text-mxl">
          {editField
            ? "Ch???nh s???a l???ch d???ng ho???t ?????ng"
            : "Th??m l???ch d???ng ho???t ?????ng"}
        </DialogTitle>
        <div className="mb-2">
          <MultiSelect
            title="Ch???n ph??ng"
            placeholder="L???a ch???n ph??ng"
            onSelectOption={handleRoomsSelect}
            initValue={editField?.room}
            options={allRoom}
            enableAll
            required
            errorMessage="Kh??ng ???????c ????? tr???ng ?? n??y."
          />
        </div>
        <div className="">
          <DatePicker
            label="Ng??y d???ng ho???t ?????ng"
            placeholder="dd/mm/yyyy"
            date={editField?.dayOffStart}
            onChange={date => {
              setFormField(state => ({
                ...state,
                dayOffStart: date!,
              }));
            }}
            minDate={new Date()}
            required
            errorMessage="Kh??ng ???????c ????? tr???ng ?? n??y."
          />
        </div>
      </div>
    </Dialog>
  );
};

export default ClosingTimeDialog;
