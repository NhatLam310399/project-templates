/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { IAds, ICustomSizeImages } from "common/typings";
import { shouldDecreasePageIndex } from "common/functions";
import { getQueryFromLocation } from "common/functions/route/getQueryFromLocation";
import { usePage } from "common/hooks/usePage";

import { BANNER } from "constants/image";

import AlertDialog from "components/AlertDialog";
import { AddButton } from "components/Dialog/components/AddButton";

import Table, { IColumns } from "designs/Table";
import SVG from "designs/SVG";

import { setBreadcrumb } from "redux/actions/_config";
import { getAdsAll, removeAds } from "redux/actions/ads";
import { resetAction } from "redux/actions/common";
import { IRootState } from "redux/reducers";

import Dialog from "./Dialog";

const SIZE_PER_PAGE = 10;

const AdsByImage: React.FC<RouteComponentProps> = ({ location }) => {
  const dispatch = useDispatch();
  const { allAds = [] } = useSelector((state: IRootState) => state.ads);
  const { actionSuccess } = useSelector((state: IRootState) => state.common);

  const [page, setPage] = usePage(getQueryFromLocation(location)?.page || 1);
  const [isRemoveAction, setIsRemoveAction] = useState<boolean>(false);

  useEffect(() => {
    setupBreadcrumb();
  }, []);

  const setupBreadcrumb = () => {
    dispatch(
      setBreadcrumb([
        {
          name: "Cài đặt hệ thống",
        },
        {
          name: "Quảng cáo theo ảnh",
        },
      ]),
    );
  };

  useEffect(() => {
    getAllAdsAPI();
  }, []);

  useEffect(() => {
    if (actionSuccess) {
      if (
        isRemoveAction &&
        shouldDecreasePageIndex(page, allAds?.length, SIZE_PER_PAGE)
      ) {
        setPage(page - 1);
      }
      dispatch(resetAction());
      setIsRemoveAction(false);
      getAllAdsAPI();
    }
  }, [actionSuccess]);

  const getAllAdsAPI = () => {
    dispatch(
      getAdsAll({
        filterAds: {},
      }),
    );
  };

  const handleDelete = (record: IAds) => {
    dispatch(
      removeAds({
        id: record._id || null,
      }),
    );
    setIsRemoveAction(true);
  };
  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const renderAction = (record: IAds) => {
    return (
      <div className="flex justify-end gap-x-1">
        <Dialog
          isEdit
          editField={record}
          ButtonMenu={<SVG name="common/edit" />}
        />
        <AlertDialog
          ButtonMenu={<SVG name="common/delete" />}
          title="Xóa quảng cáo"
          content={`Bạn có chắc chắn muốn xoá quảng cáo ${record.name} không?`}
          onConfirm={() => handleDelete(record)}
        />
      </div>
    );
  };
  const columns: IColumns = useMemo(
    () => [
      {
        text: "Hình ảnh",
        dataField: "urlImage",
        headerStyle: () => ({
          width: "18%",
        }),
        formatter: (urlImage: ICustomSizeImages) => (
          <img
            src={urlImage?.small || urlImage?.default || BANNER}
            alt="Hình ảnh"
            className="block object-cover w-full h-10 rounded-md"
          />
        ),
      },
      {
        text: "Tên loại quảng cáo",
        dataField: "name",
        headerStyle: () => ({
          width: "25%",
        }),
      },
      {
        text: "Vị trí quảng cáo",
        dataField: "displayLocation.name",
        headerStyle: () => ({
          width: "20%",
        }),
      },
      {
        text: "Đường dẫn",
        dataField: "link",
        headerStyle: () => ({
          width: "20%",
        }),
      },
      {
        text: "Hành động ",
        dataField: "actions",
        headerStyle: () => ({
          width: "20%",
        }),
        formatter: (cell: null, record: IAds) => renderAction(record),
      },
    ],
    [],
  );

  return (
    <div>
      <div className="grid grid-cols-1 mb-3 laptop:grid-cols-12 phone:grid-cols-6">
        <div className="col-span-2">
          <Dialog ButtonMenu={<AddButton>Thêm quảng cáo</AddButton>} />
        </div>
      </div>
      <Table
        isEmptyData={allAds?.length === 0}
        data={allAds}
        columns={columns}
        totalSize={allAds?.length}
        page={page}
        onPageChange={handleChangePage}
        sizePerPage={SIZE_PER_PAGE}
      />
    </div>
  );
};
export default withRouter(AdsByImage);
