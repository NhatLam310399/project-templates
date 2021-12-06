/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import i18n, { t } from "language";

import {
    IUser,
    IRootState,
    IGetAllRecruitment,
    IRecruitment,
    IDeleteRecruitment,
    IGetCompanies,
    ICompany,
    IGraphQLResponse,
} from "common/formatTypes";
import {
    getQueryFromLocation,
    shouldDecreasePageIndex,
} from "common/functions/";
import { usePage } from "common/hooks/usePage";

import SearchTable from "components/SearchTable";
import ExportExcel from "components/ExportExcel";
import AlertDialog from "components/AlertDialog";

import Table, { IColumns } from "designs/Table";
import SVG from "designs/SVG";
import * as Icons from "designs/Icons";
import AutoComplete from "designs/Autocomplete";

import { deleteJob, getAllJob } from "redux/actions/job";
import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";
import { getCompanies } from "redux/actions/company";

import { getAllJob as getAllJobExport } from "services/job";

const SIZE_PER_PAGE = 10;

const RecruitmentList: React.FC<RouteComponentProps> = ({ location }) => {
    const { language } = i18n;
    const dispatch = useDispatch();

    const {
        allJob: { results: jobs = [], totalCount = 0, loading = true },
    } = useSelector((state: IRootState) => state.job);
    const {
        allCompany: { results: companyList },
    } = useSelector((state: IRootState) => state.company);
    const { actionSuccess } = useSelector((state: IRootState) => state.common);

    const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
    const [companySelected, setCompanySelected] = useState<ICompany>();
    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() => {
        getCompaniesAPI();
        setupBreadcrumb();
    }, []);

    useEffect(() => {
        getAllJobAPI();
    }, [page, searchKeyword, companySelected]);

    useEffect(() => {
        if (actionSuccess) {
            dispatch(resetAction());
            if (shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)) {
                setPage(page - 1);
                return;
            }
            getAllJobAPI();
        }
    }, [actionSuccess]);

    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("breadcrumb.recruitment-list"),
                },
            ]),
        );
    };

    const handleSelectCompany = (company: ICompany) => {
        setPage(1);
        setCompanySelected(company);
    };

    const handleSearch = (text = "") => {
        setPage(1);
        setSearchKeyword(text);
    };

    const getAllJobAPI = () => {
        const payload: IGetAllRecruitment = {
            filterRecruitment: {
                name: searchKeyword,
                userId: companySelected
                    ? companySelected?.user?._id
                    : undefined,
            },
            page: page - 1,
            size: SIZE_PER_PAGE,
        };
        dispatch(getAllJob(payload));
    };

    const getCompaniesAPI = () => {
        dispatch(getCompanies({}));
    };

    const handleDelete = (record: IRecruitment) => {
        const payload: IDeleteRecruitment = {
            id: record._id || "",
        };
        dispatch(deleteJob(payload));
    };

    const handleChangePage = useCallback((nextPage: number) => {
        setPage(nextPage);
    }, []);

    const renderAction = (record: IRecruitment) => {
        return (
            <div className="flex items-center justify-end space-x-1">
                <AlertDialog
                    ButtonMenu={<SVG name="common/delete" width="20" />}
                    title={t("job.delete-job-title")}
                    content={`${t("job.delete-job-content")}`}
                    note={t("job.delete-job")}
                    onConfirm={() => handleDelete(record)}
                />
            </div>
        );
    };
    const columns: IColumns = useMemo(
        () => [
            {
                text: t("job.order"),
                headerStyle: {
                    width: "8%",
                },
                dataField: "index",
                formatter: (cell, row, rowIndex) => <div>{rowIndex}</div>,
            },
            {
                text: t("job.job-name"),
                headerStyle: {
                    width: "21%",
                },
                dataField: "name",
            },
            {
                text: t("job.employer-name"),
                dataField: "user.displayName",
            },
            {
                text: t("job.employer-code"),
                dataField: "user.code",
            },
            {
                text: t("job.view"),
                dataField: "view",
            },
            {
                text: t("userList.action"),
                dataField: "actions",
                formatter: (_: string, record: IRecruitment) =>
                    renderAction(record),
            },
        ],
        [language],
    );

    return (
        <div>
            <h1 className="mb-2 font-bold leading-none text-xxl font-sfpro">
                {t("breadcrumb.recruitment-list")}
            </h1>
            <div className="flex flex-wrap items-center justify-between w-full max-w-full gap-2 mb-3 phone:flex-row">
                <div className="flex flex-wrap items-center flex-auto gap-2">
                    <div className="flex-none">
                        <SearchTable
                            placeholder={t("job.search-by-code")}
                            onFetchData={handleSearch}
                        />
                    </div>
                    <div className="flex-none w-25">
                        <AutoComplete
                            placeholder={t("job.employer-name")}
                            optionSelected={companySelected}
                            options={companyList}
                            onSelectOption={handleSelectCompany}
                            useFloatTitle
                        />
                    </div>
                </div>
                <div className="flex-none w-25">
                    <ExportExcel onFetchApi={getAllRecruitmentAPI} />
                </div>
            </div>
            <Table
                isRemote
                data={jobs}
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
export default RecruitmentList;
const getAllRecruitmentAPI = async (name = "") => {
    const response: IGraphQLResponse = await getAllJobExport({});
    const { getAllRecruitment: result } = response?.data || {};
    return result?.results;
};
