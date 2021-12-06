/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";

import {
  ICustomSizeImages,
  IPlace,
  IAction,
  IRootState,
  IGetAllRequest,
} from "common/typings";
import {
  getQueryFromLocation,
  renderLocation,
  shouldDecreasePageIndex,
} from "common/functions";
import { usePage } from "common/hooks/usePage";

import { PATH } from "constants/routes";
import { BUSINESS_TYPES } from "constants/types";

import AlertDialog from "components/AlertDialog";
import SearchBoxTable from "components/SearchboxTable";

import Table, { IColumns } from "designs/Table";
import IconButton from "designs/IconButton";
import Logo from "designs/Logo";

import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";
import {
  deleteRequest,
  getAllRequest,
  acceptRequest,
} from "redux/actions/request";

const SIZE_PER_PAGE = 10;

const RequestsPage: React.FC<RouteComponentProps> = ({ location, history }) => {
  const dispatch = useDispatch();
  const {
    requests: { results = [], totalCount },
  } = useSelector((state: IRootState) => state.request);
  const { actionSuccess, isLoading } = useSelector(
    (state: IRootState) => state.common,
  );

  const [keyword, setKeyword] = useState<string>("");
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page || 1);
  const [action, setAction] = useState<IAction>("");

  useEffect(() => {
    setupBreadcrumb();
  }, []);

  const setupBreadcrumb = () => {
    dispatch(
      setBreadcrumb([
        {
          name: "Quản lý doanh nghiệp",
        },
        {
          name: "Yêu cầu xét duyệt",
        },
      ]),
    );
  };

  useEffect(() => {
    getAllRequestAPI(keyword);
  }, [page]);

  useEffect(() => {
    if (!actionSuccess) return;
    dispatch(resetAction());
    if (
      action === "DELETE" &&
      shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)
    ) {
      setPage(page - 1);
      return;
    }
    if (keyword) {
      getAllRequestAPI(keyword);
    } else {
      getAllRequestAPI();
    }
  }, [actionSuccess]);

  const getAllRequestAPI = (name = "") => {
    setAction("GET");
    const payload: IGetAllRequest = {
      filterRequest: {
        name: name || undefined,
      },
      page: page - 1,
      size: SIZE_PER_PAGE,
    };
    dispatch(getAllRequest(payload));
  };

  const handleSeeDetail = (record: IPlace) => {
    history.push(
      PATH.BUSINESS_MANAGEMENT.REQUEST_DETAIL.replace(":id", record?._id || ""),
    );
  };

  const handleAccept = (record: IPlace) => {
    dispatch(acceptRequest({ id: record._id || null }));
    setAction("UPDATE");
  };
  const handleDelete = (record: IPlace) => {
    dispatch(deleteRequest({ id: record?._id || null }));
    setAction("DELETE");
  };

  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const renderAction = (record: IPlace) => {
    return (
      <div className="flex items-center justify-end gap-x-1">
        <IconButton
          svgName="common/eye"
          title="Xem hồ sơ chi tiết"
          onClick={() => handleSeeDetail(record)}
        />
        <AlertDialog
          ButtonMenu={<IconButton svgName="common/accept" title="Duyệt" />}
          title="Duyệt đơn yêu cầu"
          content={`Bạn có chắc chắn muốn duyệt đơn yêu cầu: ${record.name} không?`}
          onConfirm={() => handleAccept(record)}
        />
        <AlertDialog
          ButtonMenu={
            <IconButton svgName="common/delete" title="Xoá đơn yêu cầu" />
          }
          title="Xoá đơn yêu cầu"
          content={`Bạn có chắc chắn muốn xoá đơn yêu cầu: ${record.name} không?`}
          onConfirm={() => handleDelete(record)}
        />
      </div>
    );
  };
  const columns: IColumns = useMemo(
    () => [
      {
        text: "Logo",
        dataField: "logo",
        headerStyle: () => ({
          width: "12%",
        }),
        formatter: (logo: ICustomSizeImages) => (
          <Logo src={logo?.small || logo?.default || ""} />
        ),
      },
      {
        text: "Tên cơ sở",
        dataField: "name",
      },
      {
        text: "SDT người dùng",
        dataField: "phoneNumber",
        formatter: (phoneNumber: number) => phoneNumber || "",
      },
      {
        text: "Địa chỉ",
        dataField: "location",
        formatter: (_: unknown, record: IPlace) =>
          renderLocation([
            record?.ward?.name,
            record?.district?.name,
            record?.province?.name,
          ]),
      },

      {
        text: "Loại cơ sở",
        dataField: "type",
        formatter: (type: string) =>
          BUSINESS_TYPES.find(item => item.type === type)?.name || "",
      },
      {
        text: "Hành động ",
        dataField: "actions",
        formatter: (cell: null, record: IPlace) => renderAction(record),
      },
    ],
    [],
  );
  return (
    <div className="mt-2">
      <Table
        isRemote
        data={results}
        columns={columns}
        totalSize={totalCount}
        page={page}
        onPageChange={handleChangePage}
        sizePerPage={SIZE_PER_PAGE}
        isEmptyData={!isLoading && totalCount === 0}
      />
    </div>
  );
};
export default withRouter(RequestsPage);
