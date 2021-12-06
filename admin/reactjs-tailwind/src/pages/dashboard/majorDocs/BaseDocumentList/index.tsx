/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RouteComponentProps } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import {
  IRootState,
  IGetAllBasicDocument,
  IBasicDocumentType,
} from "common/typings";
import { usePage } from "common/hooks/usePage";
import {
  getQueryFromLocation,
  renderMoneyValue,
  shouldDecreasePageIndex,
  textWithLimitWords,
} from "common/functions";
import { PATH } from "constants/routes";
import { AVATAR } from "constants/image";

import AlertDialog from "components/AlertDialog";
import { AddButton } from "components/Dialog/components/AddButton";
import SearchBoxTable from "components/SearchboxTable";

import IconButton from "designs/IconButton";
import Table, { IColumns } from "designs/Table";

import { setBreadcrumb } from "redux/actions/_config";
import { resetAction } from "redux/actions/common";
import {
  deleteBasicDocument,
  getAllBasicDocument,
} from "redux/actions/document";

import DocumentListDialog from "./Dialog";

const SIZE_PER_PAGE = 10;

const BasicDocumentList: React.FC<RouteComponentProps> = ({ location }) => {
  const {
    allBasicDocument: { results, totalCount },
  } = useSelector((state: IRootState) => state.document);
  const { actionSuccess } = useSelector((state: IRootState) => state.common);
  const dispatch = useDispatch();

  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
  const [keyword, setKeyword] = useState<string>("");

  const getAllBasicDocumentApi = (name = "") => {
    const payload: IGetAllBasicDocument = {
      filterBasicDocument: {
        name,
      },
      page: page - 1,
      size: SIZE_PER_PAGE,
    };
    dispatch(getAllBasicDocument(payload));
  };

  useEffect(() => {
    getAllBasicDocumentApi();
  }, []);

  useEffect(() => {
    getAllBasicDocumentApi(keyword);
  }, [page]);

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

  const handleChangePage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const handleFetchData = text => {
    setKeyword(text);
    if (page > 1) {
      setPage(1);
    } else {
      getAllBasicDocumentApi(text);
    }
  };

  const handleDelete = (record: IBasicDocumentType) => {
    dispatch(deleteBasicDocument({ id: record._id! }));
  };

  const renderAction = (record: IBasicDocumentType) => {
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
        dataField: "image",
        formatter: (_: string, document: IBasicDocumentType) => {
          return (
            <img
              src={
                document?.images?.small || document?.images?.default || AVATAR
              }
              alt="Hình tài liệu"
              className="block object-cover w-10 h-4 rounded whitespace-nowrap"
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
        dataField: "type.name",
      },
      {
        text: "Mô tả",
        dataField: "introduce",
        formatter: (introduce: string) =>
          textWithLimitWords(introduce, 20, "..."),
      },
      {
        text: "Giá",
        dataField: "price",
        formatter: (price: number) => `${renderMoneyValue(price)} vnd`,
      },
      {
        text: "Hành động",
        dataField: "actions",
        formatter: (_: null, record: IBasicDocumentType) =>
          renderAction(record),
      },
    ],
    [],
  );

  const setupBreadcrumb = () => {
    dispatch(
      setBreadcrumb([
        {
          name: "Tài liệu ngành",
          href: PATH.OVERVIEW,
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

  const sortList = [...results];
  sortList.reverse();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-1 mb-3">
        <DocumentListDialog ButtonMenu={<AddButton>Thêm tài liệu</AddButton>} />
        <div className="max-w-full w-26">
          <SearchBoxTable onFetchData={handleFetchData} />
        </div>
      </div>
      <Table
        isEmptyData={totalCount === 0}
        data={sortList}
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
export default BasicDocumentList;
