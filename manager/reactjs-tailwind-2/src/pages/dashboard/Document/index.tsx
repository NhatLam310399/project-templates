/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RouteComponentProps } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import {
  ICustomSizeImages,
  IRootState,
  IGetAllDocument,
  IDocumentType,
} from "common/typings";
import { usePage } from "common/hooks/usePage";
import {
  getQueryFromLocation,
  renderMoneyValue,
  shouldDecreasePageIndex,
} from "common/functions";
import { PATH } from "constants/routes";

import AlertDialog from "components/AlertDialog";
import { AddButton } from "components/Dialog/components/AddButton";

import { SkeletonAvatar } from "designs/Avatar";
import IconButton from "designs/IconButton";
import Table, { IColumns } from "designs/Table";

import { setBreadCrumb } from "redux/actions/_config";
import { resetAction } from "redux/actions/common";
import { deleteDocument, getAllDocument } from "redux/actions/document";

import DocumentListDialog from "./Dialog";

const SIZE_PER_PAGE = 10;

const DocumentList: React.FC<RouteComponentProps> = ({ location }) => {
  const {
    allDocument: { results, totalCount },
  } = useSelector((state: IRootState) => state.document);
  const { place } = useSelector((state: IRootState) => state.place);

  const { actionSuccess, isLoading } = useSelector(
    (state: IRootState) => state.common,
  );
  const dispatch = useDispatch();

  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);

  const getAllBasicDocumentApi = (name = "") => {
    const payload: IGetAllDocument = {
      filterDocument: {
        idCompany: place?._id,
      },
      page: page - 1,
      size: SIZE_PER_PAGE,
    };
    dispatch(getAllDocument(payload));
  };

  useEffect(() => {
    if (place) {
      getAllBasicDocumentApi();
    }
  }, [place, page]);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      if (shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)) {
        setPage(page - 1);
        return;
      }
      getAllBasicDocumentApi();
    }
  }, [actionSuccess]);

  const handleDelete = (record: IDocumentType) => {
    dispatch(deleteDocument({ id: record._id! }));
  };

  const renderAction = (record: IDocumentType) => {
    return (
      <div className="flex items-center justify-end gap-1">
        <DocumentListDialog
          editField={record}
          ButtonMenu={
            <IconButton
              title="Chỉnh sửa"
              svgName="common/edit"
              className="block leading-none"
            />
          }
        />
        <AlertDialog
          className="block leading-none"
          ButtonMenu={<IconButton title="Xoá" svgName="common/delete" />}
          title="Xóa tài liệu"
          content={`Bạn có chắc chắn muốn xóa tài liệu ${record.name} không?`}
          onConfirm={() => handleDelete(record)}
        />
      </div>
    );
  };
  const columns: IColumns = useMemo(
    () => [
      {
        text: "Hình ảnh",
        dataField: "images",
        formatter: (images: ICustomSizeImages[]) => {
          return (
            <img
              src={images?.[0]?.small || images?.[0]?.default || SkeletonAvatar}
              alt="Hình tài liệu"
              className="block object-cover w-3 h-3 rounded whitespace-nowrap"
            />
          );
        },
      },
      {
        text: "Tên tài liệu",
        dataField: "name",
      },
      {
        text: "Loại tài liệu",
        dataField: "type",
        formatter: (text: string, record: IDocumentType) => (
          <div>
            {record.type === "RELATED"
              ? "Tài liệu liên quan"
              : "Tài liệu thiết kế"}
          </div>
        ),
      },
      {
        text: "Hành động",
        dataField: "actions",
        formatter: (_: null, record: IDocumentType) => renderAction(record),
      },
    ],
    [],
  );

  const setupBreadcrumb = () => {
    dispatch(
      setBreadCrumb([
        {
          name: "Bảng điều khiển",
        },
        {
          name: "Danh sách tài liệu",
        },
      ]),
    );
  };

  useEffect(() => {
    setupBreadcrumb();
  }, []);

  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-end gap-1 mb-3">
        <DocumentListDialog ButtonMenu={<AddButton>Thêm tài liệu</AddButton>} />
      </div>
      <Table
        isEmptyData={!isLoading && totalCount === 0}
        data={results}
        columns={columns}
        page={page}
        onPageChange={handleChangePage}
        totalSize={totalCount}
        sizePerPage={SIZE_PER_PAGE}
        isRemote
      />
    </div>
  );
};
export default DocumentList;
