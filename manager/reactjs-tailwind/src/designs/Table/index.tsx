/**
 * @note read the document in /src/docs/designs/Table.md.
 * You should read it in gitlab.
 */

import React, { memo } from "react";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { ITableProps } from "./interfaces";
import Pagination from "components/Pagination";
export type IColumns = ColumnDescription<any, any>[];

const TableCustom: React.FC<ITableProps> = ({
  className = "",
  data,
  usePagination = false,
  columns,
  headerElement,
  sizePerPage = 10,
  onPageChange,
  page = 1,
  isRemote = false,
  totalSize = 0,
  onClickRow,
  onTableChange,
}) => {
  const handleChangePage = (page: number) => {
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
    onClick: (e: any, row: any, rowIndex: number) => {
      onClickRow && onClickRow(row, rowIndex);
    },
  };

  const totalPage = Math.ceil(totalSize / sizePerPage);

  return (
    <div className={`custom-table__container ${className}`}>
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
              wrapperClasses="table-responsive col-span-12 overflow-auto lg:overflow-visible"
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
            {usePagination && totalSize > sizePerPage && (
              <div className="flex justify-center py-1 mt-2 pagination-wrap">
                <Pagination
                  page={page}
                  totalSize={totalSize}
                  onPageChange={handleChangePage}
                  sizePerPage={sizePerPage}
                />
              </div>
            )}
          </>
        )}
      </ToolkitProvider>
    </div>
  );
};

export default memo(TableCustom);
