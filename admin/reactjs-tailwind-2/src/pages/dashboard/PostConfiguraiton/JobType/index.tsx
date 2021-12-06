/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import i18n, { t } from "language";

import AlertDialog from "components/AlertDialog";
import SearchTable from "components/SearchTable";

import {
    IRootState,
    IJobType,
    IGetAllJobType,
    IDeleteJobType,
} from "common/formatTypes";
import { usePage } from "common/hooks/usePage";
import {
    getQueryFromLocation,
    shouldDecreasePageIndex,
} from "common/functions/";

import SVG from "designs/SVG";
import Button from "designs/Button";
import Table, { IColumns } from "designs/Table";

import { getAllJobType, deleteJobType } from "redux/actions/newsConfig";
import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";

import Dialog from "./components/Dialog";

const SIZE_PER_PAGE = 10;

const JobType: React.FC<RouteComponentProps> = ({ location }) => {
    const { language } = i18n;

    const {
        allJobType: {
            results: allJobType = [],
            totalCount = 0,
            loading = true,
        } = {},
    } = useSelector((state: IRootState) => state.newsConfig);

    const dispatch = useDispatch();

    const { actionSuccess } = useSelector((state: IRootState) => state.common);

    const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() => {
        setupBreadcrumb();
    }, []);

    useEffect(() => {
        getAllJobTypeAPI();
    }, [page, searchKeyword]);

    useEffect(() => {
        if (actionSuccess) {
            dispatch(resetAction());

            if (shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)) {
                setPage(page - 1);
                return;
            }
            getAllJobTypeAPI();
        }
    }, [actionSuccess]);

    const getAllJobTypeAPI = () => {
        const payload: IGetAllJobType = {
            filterJobType: {
                name: searchKeyword || undefined,
            },
            page: page - 1,
            size: SIZE_PER_PAGE,
        };
        dispatch(getAllJobType(payload));
    };

    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("breadcrumb.job-type"),
                },
            ]),
        );
    };

    const handleSearch = (text = "") => {
        setPage(1);
        setSearchKeyword(text);
    };

    const handleDelete = (record: IJobType) => {
        const payload: IDeleteJobType = {
            id: record?._id || "",
        };
        dispatch(deleteJobType(payload));
    };

    const handleChangePage = useCallback((nextPage: number) => {
        setPage(nextPage);
    }, []);

    const renderAction = (record: IJobType) => {
        return (
            <div className="flex justify-end space-x-1">
                <AlertDialog
                    ButtonMenu={<SVG name="common/delete" width="20" />}
                    title={t("job.delete-job-type")}
                    content={`${t("job.delete-job-type-content")}?`}
                    onConfirm={() => handleDelete(record)}
                />
                <Dialog
                    ButtonMenu={<SVG name="common/edit" width="20" />}
                    editField={record}
                />
            </div>
        );
    };

    const columns: IColumns = useMemo(
        () => [
            {
                text: t("job.job-type-name"),
                dataField: "name",
            },
            {
                text: t("job.description"),
                dataField: "description",
            },
            {
                text: t("common.table-action"),
                dataField: "actions",
                formatter: (_: string, record: IJobType) =>
                    renderAction(record),
            },
        ],
        [language, page],
    );

    return (
        <div>
            <h1 className="mb-2 font-bold leading-none text-xxl font-sfpro">
                {t("breadcrumb.job-type")}
            </h1>
            <div className="flex flex-col items-center justify-between w-full max-w-full gap-2 pb-3 phone:flex-row">
                <SearchTable
                    placeholder={t("job.search")}
                    onFetchData={handleSearch}
                />
                <Dialog
                    ButtonMenu={
                        <Button
                            primary
                            innerClassName="py-1.5 h-4 text-lg font-medium font-sfpro normal-case h-full"
                            type="submit"
                        >
                            {t("job.add-job-type")}
                        </Button>
                    }
                    className="w-full max-full phone:w-25"
                />
            </div>
            <Table
                isRemote
                data={allJobType}
                columns={columns}
                totalSize={totalCount}
                sizePerPage={SIZE_PER_PAGE}
                page={page}
                loading={loading}
                onPageChange={handleChangePage}
            />
        </div>
    );
};
export default JobType;
