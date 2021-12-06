/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";

import { IGetTypesByCode, IRootState, ITypes } from "common/typings";
import { usePage } from "common/hooks/usePage";
import {
  getQueryFromLocation,
  shouldDecreasePageIndex,
  textWithLimitWords,
} from "common/functions";

import AlertDialog from "components/AlertDialog";
import SearchBoxTable from "components/SearchboxTable";

import { DOCUMENT_TYPE_CODE } from "constants/types";

import Button from "designs/Button";
import Table, { IColumns } from "designs/Table";
import IconButton from "designs/IconButton";

import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";
import { getTypesByCode, removeTypes } from "redux/actions/types";

import TypesDialog from "./Dialog";

const SIZE_PER_PAGE = 10;

const DocTypes: React.FC<RouteComponentProps> = ({ location }) => {
  const {
    listTypes: { results = [], totalCount = 0, loading = true },
  } = useSelector((state: IRootState) => state.types);
  const { actionSuccess } = useSelector((state: IRootState) => state.common);
  const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    getAllTypeDocs(keyword);
  }, [page]);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      if (shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)) {
        setPage(page - 1);
        return;
      }
      getAllTypeDocs(keyword);
    }
  }, [actionSuccess]);

  const getAllTypeDocs = (name: string) => {
    const payload: IGetTypesByCode = {
      code: DOCUMENT_TYPE_CODE,
      page: page - 1,
      size: SIZE_PER_PAGE,
      name,
    };
    dispatch(getTypesByCode(payload));
  };
  const handleFetchData = (text: string) => {
    setKeyword(text);
    if (page > 1) {
      setPage(1);
    } else {
      getAllTypeDocs(text);
    }
  };
  const handleDelete = (record: ITypes) => {
    dispatch(removeTypes({ id: record._id! }));
  };

  const renderAction = (record: ITypes) => {
    return (
      <div className="flex items-center justify-end gap-1">
        <TypesDialog
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
          title="Xóa loại tài liệu"
          content={`Bạn có chắc chắn muốn xóa loại tài liệu ${record.name} không?`}
          onConfirm={() => handleDelete(record)}
        />
      </div>
    );
  };
  const columns: IColumns = useMemo(
    () => [
      {
        text: "Tên loại tài liệu",
        dataField: "name",
      },
      {
        text: "Mô tả",
        dataField: "value",
        formatter: (value: string) => textWithLimitWords(value, 100, "..."),
      },

      {
        text: "Hành động",
        dataField: "actions",
        formatter: (text: string, record: ITypes) => renderAction(record),
      },
    ],
    [],
  );

  const setupBreadcrumb = () => {
    dispatch(
      setBreadcrumb([
        {
          name: "Tài liệu ngành",
        },
        {
          name: "Loại tài liệu ",
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
      <div className="flex flex-row items-center justify-between mb-3 space-x-1">
        <TypesDialog
          ButtonMenu={
            <Button
              primary
              className="max-w-full"
              innerClassName="h-5.5 p-2 normal-case"
            >
              Thêm loại tài liệu
            </Button>
          }
        />

        <div className="max-w-full w-26">
          <SearchBoxTable onFetchData={handleFetchData} />
        </div>
      </div>
      <Table
        data={results}
        columns={columns}
        page={page}
        onPageChange={handleChangePage}
        isEmptyData={!loading && totalCount === 0}
        totalSize={totalCount}
        sizePerPage={SIZE_PER_PAGE}
        isRemote
      />
    </div>
  );
};
export default DocTypes;
