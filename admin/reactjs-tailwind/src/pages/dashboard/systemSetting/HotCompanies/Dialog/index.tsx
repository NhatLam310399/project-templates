import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ICompany, IRootState, ISetPlaceHighlight } from "common/typings";

import Dialog, { DialogTitle } from "components/Dialog";
import Select from "designs/Select";

import { getAllCompany, setIsPlaceHighlight } from "redux/actions/company";

interface IHotCompanies {
  ButtonMenu: React.ReactElement;
}

const HotCompanies: React.FC<IHotCompanies> = props => {
  const { ButtonMenu } = props;

  const dispatch = useDispatch();
  const {
    allCompany: { results = [] },
  } = useSelector((state: IRootState) => state.company);

  const [company, setCompany] = useState<ICompany | null>(null);
  const { actionSuccess } = useSelector((state: IRootState) => state.common);

  useEffect(() => {
    getAllCompanyAPI();
  }, []);

  useEffect(() => {
    if (actionSuccess) {
      getAllCompanyAPI();
    }
  }, [actionSuccess]);

  const getAllCompanyAPI = () => {
    dispatch(
      getAllCompany({
        filterPlace: {
          highlight: false,
        },
      }),
    );
  };
  const handleSubmit = () => {
    const payload: ISetPlaceHighlight = {
      id: company?._id || "",
      isHighlight: true,
    };
    dispatch(setIsPlaceHighlight(payload));
  };
  const handleClose = () => {
    setCompany(null);
  };
  const handleChooseCompany = (option: ICompany) => {
    setCompany(option);
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
          Thêm công ty nổi bật
        </span>
      </DialogTitle>
      <Select
        floatTitle={false}
        className="mt-2"
        onSelectOption={handleChooseCompany}
        options={results}
        value={company?.name}
        required
        errorMessage="Vui lòng chọn công ty"
        label="Công ty nổi bật"
        placeholder="Chọn công ty"
      />
    </Dialog>
  );
};

export default HotCompanies;
