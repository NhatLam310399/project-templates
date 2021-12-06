import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IRootState, IUpdateTrade, ITrade } from "common/typings";

import Dialog, { DialogTitle } from "components/Dialog";
import Select from "designs/Select";

import { updateTrade } from "redux/actions/trade";

interface IHotProduct {
  ButtonMenu: React.ReactElement;
}

const HotProduct: React.FC<IHotProduct> = props => {
  const { ButtonMenu } = props;

  const dispatch = useDispatch();
  const {
    trades: { results, totalCount },
  } = useSelector((state: IRootState) => state.trade);

  const [tradeSelect, setTradeSelect] = useState<ITrade | null>(null);

  const handleSubmit = () => {
    const payload: IUpdateTrade = {
      id: tradeSelect?._id || "",
      tradeInput: {
        isHot: true,
      },
    };
    dispatch(updateTrade(payload));
  };

  const handleChooseProduct = (option: ITrade) => {
    setTradeSelect(option);
  };

  const handleClose = () => {
    setTradeSelect(null);
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
          Thêm sản phẩm nổi bật
        </span>
      </DialogTitle>
      <Select
        floatTitle={false}
        className="mt-2"
        onSelectOption={handleChooseProduct}
        options={results}
        value={tradeSelect?.name}
        required
        errorMessage="Vui lòng chọn sản phẩm nổi bật"
        label="Sản phẩm"
        placeholder={
          totalCount === 0
            ? "Chưa có danh sách sản phẩm "
            : "Chọn sản phẩm nổi bật"
        }
        disabled={totalCount === 0}
      />
    </Dialog>
  );
};

export default HotProduct;
