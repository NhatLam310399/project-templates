import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";

import { IRootState, IProvince, IGetProvince } from "common/typings";
import {
  getQueryFromLocation,
  shouldDecreasePageIndex,
} from "common/functions";
import { usePage } from "common/hooks/usePage";

import SearchBoxTable from "components/SearchboxTable";

import IconButton from "designs/IconButton";
import Table, { IColumns } from "designs/Table";

import { getProvinces } from "redux/actions/location";
import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";

import ProvinceDialog from "./Dialog";

const SIZE_PER_PAGE = 10;

const Province: React.FC<RouteComponentProps> = ({ location }) => {
  const { provinces, provincesTotalCount } = useSelector(
    (state: IRootState) => state.location,
  );
  const { actionSuccess } = useSelector((state: IRootState) => state.common);

  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");

  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);

  useEffect(() => {
    setupBreadcrumb();
    getProvincesApi();
  }, []);

  useEffect(() => {
    getProvincesApi(keyword);
  }, [page]);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      if (shouldDecreasePageIndex(page, provincesTotalCount, SIZE_PER_PAGE)) {
        setPage(page - 1);
        return;
      }
      if (keyword) {
        getProvincesApi(keyword);
      } else {
        getProvincesApi();
      }
    }
  }, [actionSuccess]);

  const renderAction = (record: IProvince) => {
    return (
      <div className="flex items-center justify-end gap-1">
        <ProvinceDialog
          editField={record}
          ButtonMenu={<IconButton svgName="common/edit" title="Chỉnh sửa" />}
        />
      </div>
    );
  };
  const getProvincesApi = (name = "") => {
    const payload: IGetProvince = {
      name,
      page: page - 1,
      size: SIZE_PER_PAGE,
    };
    dispatch(getProvinces(payload));
  };
  const columns: IColumns = useMemo(
    () => [
      {
        text: "Tên tỉnh/ thành phố",
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
        formatter: (text: string, record: IProvince) => renderAction(record),
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
          name: "Tỉnh/ Thành phố",
        },
      ]),
    );
  };

  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const handleFetchData = text => {
    setKeyword(text);
    if (page > 1) {
      setPage(1);
    } else {
      getProvincesApi(text);
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-end mb-3">
        <div className="max-w-full w-26">
          <SearchBoxTable onFetchData={handleFetchData} />
        </div>
      </div>
      <Table
        data={provinces}
        columns={columns}
        page={page}
        onPageChange={handleChangePage}
        sizePerPage={SIZE_PER_PAGE}
        isRemote
        totalSize={provincesTotalCount}
      />
    </div>
  );
};
export default Province;
