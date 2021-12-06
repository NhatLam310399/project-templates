/**
 * @note read the document in /src/docs/designs/Table.md.
 * You should read it in gitlab.
 */

import React, { memo } from "react";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import Pagination from "@material-ui/lab/Pagination";
import paginationFactory from "react-bootstrap-table2-paginator";
import SVG from "designs/SVG";
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
    loading = true,
    onClickRow,
    onTableChange,
}) => {
    const handleChangePage = (
        e: React.ChangeEvent<unknown>,
        nextPage: number,
    ) => {
        onPageChange && onPageChange(nextPage);
    };

    const handleTableChange = (
        type: string,
        { page, sizePerPage }: Record<any, any>,
    ) => {
        const newPage = page - 1;

        onTableChange && onTableChange(newPage);
    };

    // const handleEmptyData = () => {
    //     return (
    //         <div className="empty-data">
    //             <SVG name="common/empty-data" />
    //         </div>
    //     );
    // };

    const rowEvents = {
        onClick: (rowIndex: number) => {
            onClickRow && onClickRow(rowIndex);
        },
    };

    const totalPage = Math.ceil(totalSize / sizePerPage);

    return !loading && data?.length === 0 ? (
        <div className="flex items-center justify-center w-full h-full mt-10 empty-data">
            <SVG name="common/empty-data" />
        </div>
    ) : (
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
                                wrapperClasses="table-responsive col-span-12 overflow-auto lg:overflow-visible font-sfpro"
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
                            {totalSize !== 0 && (
                                <div className="flex justify-end mt-3 pagination-wrap">
                                    <Pagination
                                        page={page}
                                        count={totalPage}
                                        onChange={handleChangePage}
                                    />
                                </div>
                            )}
                        </>
                    );
                }}
            </ToolkitProvider>
        </div>
    );
};

export default memo(TableCustom);
