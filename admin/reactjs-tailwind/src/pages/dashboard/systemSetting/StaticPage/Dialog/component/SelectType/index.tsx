import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IRootState, IStaticPage, ICategory } from "common/typings";
import { STATIC_PAGE } from "constants/types";

import Select from "designs/Select";

import { getAllCategories } from "redux/actions/categories";

interface ISelectTypeProps {
  editField?: IStaticPage | null;
  onChangeType: (type: ICategory) => void;
}

const SelectType: React.FC<ISelectTypeProps> = props => {
  const { editField, onChangeType } = props;

  const dispatch = useDispatch();
  const {
    categories: { result = [] },
  } = useSelector((state: IRootState) => state.categories);

  const [typeSelected, setTypeSelected] = useState<ICategory | null>(
    editField?.category || null,
  );

  useEffect(() => {
    dispatch(
      getAllCategories({
        filterCategory: {
          code: STATIC_PAGE,
        },
      }),
    );
  }, []);

  const handleType = (type: ICategory) => {
    setTypeSelected(type);
    onChangeType(type);
  };

  return (
    <Select
      floatTitle={false}
      label="Định dạng"
      value={typeSelected?.name}
      options={result}
      required
      errorMessage="Vui lòng chọn định dạng"
      onSelectOption={handleType}
      placeholder="Chọn định dạng"
    />
  );
};

export default SelectType;
