import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  IGetAllKaraoke,
  IKaraoke,
  IRootState,
  ISetPlaceHighlight,
} from "common/typings";

import Dialog, { DialogTitle } from "components/Dialog";
import Select from "designs/Select";

import { getAllKaraoke } from "redux/actions/karaoke";
import { setIsPlaceHighlight } from "redux/actions/company";

interface IHotKaraoke {
  ButtonMenu: React.ReactElement;
}

const HotKaraoke: React.FC<IHotKaraoke> = props => {
  const { ButtonMenu } = props;

  const dispatch = useDispatch();
  const {
    allKaraoke: { results = [], totalCount },
  } = useSelector((state: IRootState) => state.karaoke);

  const [karaoke, setKaraoke] = useState<IKaraoke | null>(null);
  const { actionSuccess } = useSelector((state: IRootState) => state.common);

  const handleSubmit = () => {
    const payload: ISetPlaceHighlight = {
      id: karaoke?._id || "",
      isHighlight: true,
    };
    dispatch(setIsPlaceHighlight(payload));
  };
  const handleClose = () => {
    setKaraoke(null);
  };
  const handleChooseKaraoke = (option: IKaraoke) => {
    setKaraoke(option);
  };
  useEffect(() => {
    getAllKaraokeAPI();
  }, []);

  useEffect(() => {
    if (actionSuccess) getAllKaraokeAPI();
  }, [actionSuccess]);

  const getAllKaraokeAPI = () => {
    const payload: IGetAllKaraoke = {
      filterPlace: {
        highlight: false,
      },
    };
    dispatch(getAllKaraoke(payload));
  };

  return (
    <Dialog
      ButtonMenu={ButtonMenu}
      onConfirm={handleSubmit}
      onClose={handleClose}
      size="sm"
    >
      <DialogTitle className="col-span-1 mb-4 laptop:col-span-2">
        <span className="font-bold text-black normal-case text-xl laptop:text-mxl">
          Thêm quán karaoke nổi bật
        </span>
      </DialogTitle>
      <Select
        floatTitle={false}
        className="mt-2"
        onSelectOption={handleChooseKaraoke}
        options={results}
        value={karaoke?.name}
        required
        errorMessage="Vui lòng chọn quán karaoke"
        label="Quán karaoke nổi bật"
        placeholder="Chọn quán karaoke"
      />
    </Dialog>
  );
};

export default HotKaraoke;
