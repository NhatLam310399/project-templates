/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import {
  ICustomSizeImages,
  IBasicDocumentType,
  IGetAllBasicDocument,
  IUpdateBasicDocument,
} from "common/typings";
import {
  shouldDecreasePageIndex,
  getQueryFromLocation,
} from "common/functions";
import { usePage } from "common/hooks/usePage";

import AlertDialog from "components/AlertDialog";
import { AddButton } from "components/Dialog/components/AddButton";

import Avatar from "designs/Avatar";
import { SkeletonLogo } from "designs/Logo";
import IconButton from "designs/IconButton";
import Table, { IColumns } from "designs/Table";

import { setBreadcrumb } from "redux/actions/_config";
import { resetAction } from "redux/actions/common";
import {
  getAllBasicDocument,
  updateBasicDocument,
} from "redux/actions/document";
import { IRootState } from "redux/reducers";

import Dialog from "./Dialog";

const SIZE_PER_PAGE = 10;

const HotKaraokesPages: React.FC<RouteComponentProps> = ({ location }) => {
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page || 1);
  const [isRemoveAction, setIsRemoveAction] = useState<boolean>(false);

  const dispatch = useDispatch();
  const {
    allBasicDocument: { results: allDBasicDocument = [], totalCount = 0 },
  } = useSelector((state: IRootState) => state.document);
  const { actionSuccess } = useSelector((state: IRootState) => state.common);

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
          name: "Tài liệu nổi bật",
        },
      ]),
    );
  };

  useEffect(() => {
    getAllBasicDocumentAPI();
  }, [location]);

  useEffect(() => {
    if (!actionSuccess) return;
    dispatch(resetAction());
    setIsRemoveAction(false);
    if (
      isRemoveAction &&
      shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)
    ) {
      setPage(page - 1);
      // Because of when you setPage, location will be changed
      // so useEffect has Api caller in top will be call
      return;
    }
    getAllBasicDocumentAPI();
  }, [actionSuccess]);

  const getAllBasicDocumentAPI = () => {
    const payload: IGetAllBasicDocument = {
      filterBasicDocument: {
        highlight: true,
      },
      page: page - 1,
      size: SIZE_PER_PAGE,
    };
    dispatch(getAllBasicDocument(payload));
  };

  const handleDelete = (record: IBasicDocumentType) => {
    const payload: IUpdateBasicDocument = {
      id: record?._id || "",
      basicDocumentUpdateInput: {
        highlight: false,
      },
    };
    dispatch(updateBasicDocument(payload));
    setIsRemoveAction(true);
  };

  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const renderAction = (record: IBasicDocumentType) => {
    return (
      <div className="flex items-center justify-end gap-1">
        <AlertDialog
          ButtonMenu={
            <IconButton
              svgName="common/delete"
              title="Xoá khỏi danh sách nổi bật"
            />
          }
          title="Xoá tài liệu nổi bật"
          content="Bạn có chắc chắn muốn xoá tài liệu nổi bật này không?"
          onConfirm={() => handleDelete(record)}
        />
      </div>
    );
  };

  const columns: IColumns = useMemo(
    () => [
      {
        text: "Hình ảnh",
        dataField: "image",
        headerStyle: () => ({
          width: "15%",
        }),
        formatter: (image: ICustomSizeImages[]) => {
          return (
            <img
              src={image?.[0]?.small || image?.[0]?.default || SkeletonLogo}
              alt="Hình phòng"
              className="block object-cover w-6 h-3 rounded"
            />
          );
        },
      },
      {
        text: "Tên tài liệu",
        dataField: "name",
      },

      {
        text: "Giá",
        dataField: "street",
        formatter: (_, record: IBasicDocumentType) =>
          `${record?.price?.toLocaleString("vi-VN")}đ`,
      },

      {
        text: "Hành động ",
        dataField: "actions",
        formatter: (cell: null, record: IBasicDocumentType) =>
          renderAction(record),
      },
    ],
    [],
  );

  return (
    <div>
      <div className="grid grid-cols-1 mb-3 laptop:grid-cols-12 phone:grid-cols-6">
        <div className="col-span-2">
          <Dialog ButtonMenu={<AddButton>Thêm tài liệu</AddButton>} />
        </div>
      </div>
      <Table
        isEmptyData={totalCount === 0}
        isRemote
        data={allDBasicDocument}
        columns={columns}
        totalSize={totalCount}
        page={page}
        onPageChange={handleChangePage}
        sizePerPage={SIZE_PER_PAGE}
      />
    </div>
  );
};
export default withRouter(HotKaraokesPages);
