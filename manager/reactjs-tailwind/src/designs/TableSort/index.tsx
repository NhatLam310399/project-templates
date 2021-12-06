/**
 * @note read the document in /src/docs/designs/Table.md.
 * You should read it in gitlab.
 */
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import React, { memo } from "react";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
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

  const onChangeSort = () => {};
  return (
    <div className={`custom-table-sort__container ${className}`}>
      <ToolkitProvider bootstrap4 keyField="_id" data={data} columns={columns}>
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
              // remote={
              //   isRemote && {
              //     pagination: true,
              //     sort: true,
              //   }
              // }
              onTableChange={handleTableChange}
            />
          </>
        )}
      </ToolkitProvider>
    </div>
  );
};

export default memo(TableCustom);
