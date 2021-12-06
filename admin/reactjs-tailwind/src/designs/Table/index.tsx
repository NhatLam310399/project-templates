/**
 * @note read the document in /src/docs/designs/Table.md.
 * You should read it in gitlab.
 */

import React, { memo } from "react";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import Pagination from "@material-ui/lab/Pagination";
import paginationFactory from "react-bootstrap-table2-paginator";

import NotFoundImage from "assets/svg/table/empty-image.svg";

import { ITableProps } from "./interfaces";

export type IColumns = ColumnDescription<any, any>[];

const TableCustom: React.FC<ITableProps> = ({
  className = "",
  data,
  columns,
  headerElement,
  sizePerPage = 10,
  page = 1,
  isRemote = false,
  totalSize = 0,
  isEmptyData = false,
  onPageChange,
  onClickRow,
  onTableChange,
}) => {
  const handleChangePage = (e: React.ChangeEvent<unknown>, page: number) => {
    onPageChange && onPageChange(page);
  };

  const handleTableChange = (
    type: string,
    { page, sizePerPage }: Record<any, any>,
  ) => {
    const newPage = page - 1;

    onTableChange && onTableChange(newPage);
  };

  const handleEmptyData = () => {
    return <div className="empty-data">{}</div>;
  };

  const rowEvents = {
    onClick: (rowIndex: number) => {
      onClickRow && onClickRow(rowIndex);
    },
  };

  const totalPage = Math.ceil(totalSize / sizePerPage);

  return isEmptyData ? (
    <NotFoundAlert />
  ) : (
    <div
      className={`custom-table__container relative overflow-x-auto ${className}`}
    >
      <div>
        <ToolkitProvider
          bootstrap4
          keyField="id"
          data={data}
          columns={columns}
          search
        >
          {(props: any) => (
            <>
              <div>{headerElement}</div>
              <BootstrapTable
                {...props.baseProps}
                bordered={false}
                wrapperClasses="table-responsive"
                noDataIndication={handleEmptyData}
                rowEvents={rowEvents}
                pagination={paginationFactory({
                  hideSizePerPage: true,
                  sizePerPage,
                  page,
                  totalSize,
                  custom: true,
                })}
                remote={
                  isRemote && {
                    pagination: true,
                    filter: false,
                    sort: false,
                  }
                }
                onTableChange={handleTableChange}
              />
            </>
          )}
        </ToolkitProvider>
        {totalPage > 1 && (
          <div className="flex justify-end py-1 mt-3 pagination-wrap ">
            <Pagination
              page={page}
              count={totalPage}
              onChange={handleChangePage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(TableCustom);

const NotFoundAlert: React.FC = () => (
  <div className="flex items-center justify-center w-full pointer-events-none ">
    <img
      className="block object-cover max-w-full max-h-full m-auto"
      src={NotFoundImage}
      alt="No data"
    />
  </div>
);
