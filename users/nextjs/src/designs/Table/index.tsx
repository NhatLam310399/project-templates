/**
 * @note read the document in /src/docs/designs/Table.md.
 * You should read it in gitlab.
 */

import React, { memo } from "react";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Pagination from "@components/Pagination";
import { ITableProps } from "./interfaces";

export type IColumns = ColumnDescription<any, any>[];

const TableCustom: React.FC<ITableProps> = ({
  className = "",
  data,
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
  const handleChangePage = (nextPage: number) => {
    onPageChange && onPageChange(nextPage + 1);
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

  return (
    <>
      <div className={`custom-table__container ${className}`}>
        <ToolkitProvider
          bootstrap4
          keyField="id"
          data={data}
          columns={columns}
          search
        >
          {(props: any) => {
            return (
              <>
                <div>{headerElement}</div>
                <BootstrapTable
                  {...props.baseProps}
                  bordered={false}
                  wrapperClasses="table-responsive col-span-12 overflow-auto lg:overflow-visible"
                  noDataIndication={handleEmptyData}
                  rowEvents={rowEvents}
                  remote={
                    isRemote && {
                      pagination: true,
                      filter: false,
                      sort: false,
                    }
                  }
                  pagination={paginationFactory({
                    hideSizePerPage: true,
                    custom: true,
                    totalSize,
                    sizePerPage,
                    page,
                  })}
                  onTableChange={handleTableChange}
                />
              </>
            );
          }}
        </ToolkitProvider>
      </div>
      <Pagination
        page={page - 1}
        totalSize={totalSize}
        sizePerPage={sizePerPage}
        onPageChange={handleChangePage}
      />
    </>
  );
};

export default memo(TableCustom);
