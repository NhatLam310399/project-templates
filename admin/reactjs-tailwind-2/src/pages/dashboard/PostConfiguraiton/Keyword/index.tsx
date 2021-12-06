/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { format } from "date-fns";

import AlertDialog from "components/AlertDialog";
import SearchTable from "components/SearchTable";

import {
    IRootState,
    IGetAllTag,
    IDeleteTag,
    IKeyword,
    IGetAllKeyword,
    IDeleteKeyword,
} from "common/formatTypes";
import {
    getQueryFromLocation,
    shouldDecreasePageIndex,
} from "common/functions/";
import { usePage } from "common/hooks/usePage";

import SVG from "designs/SVG";
import Button from "designs/Button";
import Table, { IColumns } from "designs/Table";
import Tag from "designs/Tag";

import i18n, { t } from "language";

import { resetAction } from "redux/actions/common";
import { deleteKeyword, getAllKeyword } from "redux/actions/newsConfig";
import { setBreadcrumb } from "redux/actions/_config";

import Dialog from "./components/Dialog";

const SIZE_PER_PAGE = 10;

const Keyword: React.FC<RouteComponentProps> = ({ location }) => {
    const { language } = i18n;

    const {
        allKeyword: { results = [], totalCount = 0, loading = true },
    } = useSelector((state: IRootState) => state.newsConfig);

    const dispatch = useDispatch();

    const { actionSuccess } = useSelector((state: IRootState) => state.common);
    const [isRemoveAction, setIsRemoveAction] = useState(false);

    const [searchKeyword, setSearchKeyword] = useState("");
    const [page, setPage] = usePage(getQueryFromLocation(location)?.page);

    useEffect(() => {
        setupBreadcrumb();
    }, []);

    useEffect(() => {
        getAllKeywordAPI();
    }, [page, searchKeyword]);

    useEffect(() => {
        if (actionSuccess) {
            dispatch(resetAction());
            setIsRemoveAction(false);
            if (
                isRemoveAction &&
                shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)
            ) {
                setPage(page - 1);
                return;
            }
            getAllKeywordAPI();
        }
    }, [actionSuccess]);

    const getAllKeywordAPI = () => {
        const payload: IGetAllKeyword = {
            filterKeyword: {
                name: searchKeyword || undefined,
            },
            page: page - 1,
            size: SIZE_PER_PAGE,
        };
        dispatch(getAllKeyword(payload));
    };

    const handleSearch = (text = "") => {
        setPage(1);
        setSearchKeyword(text);
    };

    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("breadcrumb.job-tags"),
                },
            ]),
        );
    };

    const handleDelete = (record: IKeyword) => {
        const payload: IDeleteKeyword = {
            id: record?._id || "",
        };
        dispatch(deleteKeyword(payload));
        setIsRemoveAction(true);
    };

    const handleChangePage = useCallback((nextPage: number) => {
        setPage(nextPage);
    }, []);

    const renderAction = (record: IKeyword) => {
        return (
            <div className="flex justify-end space-x-1">
                <AlertDialog
                    ButtonMenu={<SVG name="common/delete" width="20" />}
                    title={t("job.delete-tag-title")}
                    content={`${t("job.delete-tag-content")}?`}
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
                text: t("job.keyword-name"),
                dataField: "name",
                headerStyle: () => ({
                    width: "20%",
                }),
            },
            {
                text: t("job.description"),
                dataField: "description",
            },
            {
                text: t("job.job-create-date"),
                dataField: "createdAt",
                formatter: (createdAt: Date) => {
                    return (
                        <div>{format(new Date(createdAt), "dd/MM/yyyy")}</div>
                    );
                },
            },
            {
                text: t("job.status.self"),
                dataField: "isHot",
                formatter: (isHot: boolean) => {
                    if (isHot) return <Tag active>{t("job.status.hot")} </Tag>;
                    return <Tag active={false}>{t("job.status.not-hot")}</Tag>;
                },
            },
            {
                text: t("common.table-action"),
                dataField: "actions",
                formatter: (_: string, record: IKeyword) =>
                    renderAction(record),
            },
        ],
        [language, page],
    );
    return (
        <div>
            <h1 className="mb-2 font-bold leading-none text-xxl font-sfpro">
                {t("breadcrumb.job-tags")}
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
                            {t("job.add-btn-tag")}
                        </Button>
                    }
                    className="w-full max-full phone:w-25"
                />
            </div>
            <Table
                isRemote
                data={results}
                columns={columns}
                totalSize={totalCount}
                sizePerPage={SIZE_PER_PAGE}
                loading={loading}
                page={page}
                onPageChange={handleChangePage}
            />
        </div>
    );
};
export default Keyword;
