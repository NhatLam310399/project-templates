/**
 * @note read the document in /src/docs/designs/Table.md.
 * You should read it in gitlab.
 */

import React, { memo } from "react";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import Pagination from "@material-ui/lab/Pagination";
import paginationFactory from "react-bootstrap-table2-paginator";
import EmptyData from "components/EmptyData";
import { ITableProps, IColumns } from "./interfaces";

export type { IColumns };

const Table: React.FC<ITableProps> = ({
  className = "",
  data,
  columns,
  headerElement,
  totalSize = 0,
  sizePerPage = 10,
  page = 1,
  isEmptyData = false,
  isRemote = false,
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
    <EmptyData />
  ) : (
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
          </>
        )}
      </ToolkitProvider>
      {totalPage > 1 ? (
        <div className="pagination-wrap py-1 flex justify-end">
          <Pagination
            page={page}
            count={totalPage}
            onChange={handleChangePage}
          />
        </div>
      ) : null}
    </div>
  );
};

export default memo(Table);
