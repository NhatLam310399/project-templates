import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RouteComponentProps } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { IDistrict, IRootState, IGetDistricts } from "common/typings";
import { usePage } from "common/hooks/usePage";
import {
  getQueryFromLocation,
  shouldDecreasePageIndex,
} from "common/functions";

import AlertDialog from "components/AlertDialog";
import { AddButton } from "components/Dialog/components/AddButton";
import SearchBoxTable from "components/SearchboxTable";

import Table, { IColumns } from "designs/Table";
import Select from "designs/Select";
import IconButton from "designs/IconButton";

import { setBreadcrumb } from "redux/actions/_config";
import { resetAction } from "redux/actions/common";
import {
  getProvinces,
  getDistricts,
  deleteDistrict,
} from "redux/actions/location";

import DistrictDialog from "./Dialog";

const SIZE_PER_PAGE = 10;

const District: React.FC<RouteComponentProps> = ({ location }) => {
  const { provinces, districts, districtsTotalCount } = useSelector(
    (state: IRootState) => state.location,
  );
  const { actionSuccess } = useSelector((state: IRootState) => state.common);
  const dispatch = useDispatch();

  const [provinceSelected, setProvinceSelected] = useState<IDistrict | null>(
    null,
  );

  const [keyword, setKeyword] = useState("");
  const [isRemoveAction, setIsRemoveAction] = useState<boolean>(false);

  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);

  useEffect(() => {
    dispatch(getProvinces({ name: "" }));
    setupBreadcrumb();
  }, []);

  useEffect(() => {
    if (provinces.length > 0) {
      handleProvinceSelected(provinces[0]);
    }
  }, [provinces]);

  useEffect(() => {
    if (provinceSelected) {
      getDistrictApi(provinceSelected?.code, keyword);
    }
  }, [page]);

  useEffect(() => {
    if (page > 1) {
      setPage(1);
    } else {
      getDistrictApi(provinceSelected?.code, keyword);
    }
  }, [keyword]);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      if (
        isRemoveAction &&
        shouldDecreasePageIndex(page, districtsTotalCount, SIZE_PER_PAGE)
      ) {
        setPage(page - 1);
      }
      if (keyword) {
        getDistrictApi(provinceSelected!.code, keyword);
      } else {
        getDistrictApi(provinceSelected!.code);
      }
    }
  }, [actionSuccess]);

  const handleProvinceSelected = (option: IDistrict) => {
    setProvinceSelected(option);
    if (page > 1) {
      setPage(1);
    } else {
      getDistrictApi(option.code);
    }
  };
  const handleDelete = (record: IDistrict) => {
    dispatch(deleteDistrict({ id: record?._id || "" }));
    setIsRemoveAction(true);
  };
  const renderAction = (record: IDistrict) => {
    return (
      <div className="flex items-center justify-end space-x-1">
        <AlertDialog
          ButtonMenu={
            <IconButton svgName="common/delete" title="Xo?? qu???n/ huy???n" />
          }
          title="X??a qu???n/ huy???n"
          content="B???n c?? ch???c ch???n mu???n xo?? qu???n/ huy???n n??y kh??ng?"
          onConfirm={() => handleDelete(record)}
        />
        <DistrictDialog
          editField={record}
          ButtonMenu={<IconButton svgName="common/edit" title="Ch???nh s???a" />}
        />
      </div>
    );
  };

  const columns: IColumns = useMemo(
    () => [
      {
        text: "T??n qu???n huy???n",
        dataField: "name",
      },
      {
        text: "Kinh ?????",
        dataField: "longitude",
      },
      {
        text: "V?? ?????",
        dataField: "latitude",
      },
      {
        text: "H??nh ?????ng",
        dataField: "actions",
        formatter: (text: string, record: IDistrict) => renderAction(record),
      },
    ],
    [],
  );

  const setupBreadcrumb = () => {
    dispatch(
      setBreadcrumb([
        {
          name: "C???u h??nh ?????a ??i???m",
        },
        {
          name: "Qu???n/ Huy???n",
        },
      ]),
    );
  };

  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const getDistrictApi = (province_code = "", name = "") => {
    const payload: IGetDistricts = {
      province_code,
      district_name: name,
      page: page - 1,
      size: SIZE_PER_PAGE,
    };
    dispatch(getDistricts(payload));
  };

  const handleFetchData = text => {
    setKeyword(text);
  };

  return (
    <div>
      <div className="flex flex-col-reverse items-end justify-between gap-2 mb-4 laptop:flex-row laptop:items-center ">
        <div className="flex flex-col items-center w-full gap-2 laptop:w-auto phone:flex-auto phone:flex-row">
          <div className="w-full laptop:w-auto">
            <DistrictDialog
              ButtonMenu={<AddButton>Th??m qu???n/ huy???n</AddButton>}
            />
          </div>
          <div className="w-full laptop:w-20">
            <Select
              floatTitle={false}
              options={provinces}
              onSelectOption={handleProvinceSelected}
              value={provinceSelected?.name || ""}
            />
          </div>
        </div>
        <div className="w-26 max-w-full">
          <SearchBoxTable onFetchData={handleFetchData} />
        </div>
      </div>
      <Table
        data={districts}
        columns={columns}
        page={page}
        onPageChange={handleChangePage}
        sizePerPage={SIZE_PER_PAGE}
        isRemote
        totalSize={districtsTotalCount}
      />
    </div>
  );
};
export default District;
