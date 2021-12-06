import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RouteComponentProps } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import {
  IProvince,
  IDistrict,
  IWard,
  IRootState,
  IGetWards,
} from "common/typings";
import {
  shouldDecreasePageIndex,
  getQueryFromLocation,
} from "common/functions";
import { usePage } from "common/hooks/usePage";

import AlertDialog from "components/AlertDialog";
import { AddButton } from "components/Dialog/components/AddButton";
import SearchBoxTable from "components/SearchboxTable";

import IconButton from "designs/IconButton";
import Table, { IColumns } from "designs/Table";
import Select from "designs/Select";

import { setBreadcrumb } from "redux/actions/_config";
import { resetAction } from "redux/actions/common";
import {
  getProvinces,
  getDistricts,
  getWards,
  deleteWard,
} from "redux/actions/location";

import WardDialog from "./Dialog";

const SIZE_PER_PAGE = 10;

const Ward: React.FC<RouteComponentProps> = ({ location }) => {
  const {
    provinces,
    districts,
    wards,
    wardsTotalCount = 0,
  } = useSelector((state: IRootState) => state.location);
  const { actionSuccess } = useSelector((state: IRootState) => state.common);
  const dispatch = useDispatch();

  const [provinceSelected, setProvinceSelected] = useState<IProvince | null>(
    null,
  );
  const [districtSelected, setDistrictSelected] = useState<IDistrict | null>(
    null,
  );
  const [isRemoveAction, setIsRemoveAction] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");

  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);

  useEffect(() => {
    setupBreadcrumb();
    dispatch(getProvinces({ name: "" }));
  }, []);

  useEffect(() => {
    if (provinces.length > 0) {
      handleProvinceSelected(provinces[0]);
    }
  }, [provinces]);

  useEffect(() => {
    if (districts.length > 0) {
      handleDistrictSelected(districts[0]);
    }
  }, [districts]);

  useEffect(() => {
    if (districtSelected) {
      getWardApi(districtSelected?.code, keyword);
    }
  }, [page]);

  useEffect(() => {
    if (page > 1) {
      setPage(1);
    } else {
      getWardApi(districtSelected?.code, keyword);
    }
  }, [keyword]);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      if (
        isRemoveAction &&
        shouldDecreasePageIndex(page, wardsTotalCount, SIZE_PER_PAGE)
      ) {
        setPage(page - 1);
        return;
      }
      if (keyword) {
        getWardApi(districtSelected!.code, keyword);
      } else {
        getWardApi(districtSelected!.code);
      }
    }
  }, [actionSuccess]);

  const getWardApi = (district_code = "", name = "") => {
    const payload: IGetWards = {
      district_code,
      ward_name: name,
      page: page - 1,
      size: SIZE_PER_PAGE,
    };
    dispatch(getWards(payload));
  };

  const handleProvinceSelected = (option: IProvince) => {
    setProvinceSelected(option);
    dispatch(getDistricts({ province_code: option.code }));
  };
  const handleDistrictSelected = (option: IDistrict) => {
    setDistrictSelected(option);
    if (page > 1) {
      setPage(1);
    } else {
      getWardApi(option.code);
    }
  };

  const handleDelete = (record: IWard) => {
    dispatch(deleteWard({ id: record?._id || "" }));
    setIsRemoveAction(true);
  };
  const renderAction = (record: IWard) => {
    return (
      <div className="flex items-center justify-end gap-1">
        <AlertDialog
          ButtonMenu={
            <IconButton svgName="common/delete" title="Xoá phường/ xã" />
          }
          title="Xóa phường/ xã"
          content="Bạn có chắc chắn muốn xoá phường/ xã này không?"
          onConfirm={() => handleDelete(record)}
        />
        <WardDialog
          editField={record}
          ButtonMenu={<IconButton svgName="common/edit" title="Chỉnh sửa" />}
        />
      </div>
    );
  };

  const columns: IColumns = useMemo(
    () => [
      {
        text: "Tên phường/ xã",
        dataField: "name",
      },
      {
        text: "Kinh độ",
        dataField: "longitude",
      },
      {
        text: "Vĩ độ",
        dataField: "latitude",
      },
      {
        text: "Hành động",
        dataField: "actions",
        formatter: (text: string, record: IWard) => renderAction(record),
      },
    ],
    [],
  );

  const setupBreadcrumb = () => {
    dispatch(
      setBreadcrumb([
        {
          name: "Cấu hình địa điểm",
        },
        {
          name: "Phường/ Xã",
        },
      ]),
    );
  };

  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);
  const handleFetchData = text => {
    setKeyword(text);
  };

  return (
    <div>
      <div className="flex flex-col-reverse items-end justify-between gap-2 mb-4 laptop:items-center laptop:flex-row">
        <div className="grid items-center w-full grid-cols-1 gap-2 phone:grid-cols-3 laptop:w-auto">
          <div className="w-full">
            <WardDialog ButtonMenu={<AddButton>Thêm phường/ xã</AddButton>} />
          </div>
          <div className="flex flex-col justify-end col-span-1 gap-2 phone:col-span-2 phone:flex-row">
            <div className="w-full laptop:w-20">
              <Select
                floatTitle={false}
                className="mr-1"
                options={provinces}
                onSelectOption={handleProvinceSelected}
                value={provinceSelected?.name || ""}
              />
            </div>
            <div className="w-full laptop:w-20">
              <Select
                floatTitle={false}
                options={districts}
                onSelectOption={handleDistrictSelected}
                value={districtSelected?.name || ""}
              />
            </div>
          </div>
        </div>
        <div className="flex-shrink w-26 max-w-full ">
          <SearchBoxTable onFetchData={handleFetchData} />
        </div>
      </div>
      <Table
        data={wards}
        columns={columns}
        page={page}
        onPageChange={handleChangePage}
        sizePerPage={SIZE_PER_PAGE}
        isRemote
        totalSize={wardsTotalCount}
      />
    </div>
  );
};
export default Ward;
