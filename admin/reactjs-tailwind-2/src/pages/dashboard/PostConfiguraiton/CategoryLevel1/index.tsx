/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";

import {
    ICategoryLevel1,
    IGetAllCategoryLevel1,
    IDeleteCategoryLevel1,
    IRootState,
} from "common/formatTypes";
import {
    getQueryFromLocation,
    shouldDecreasePageIndex,
} from "common/functions/";
import { usePage } from "common/hooks/usePage";

import SearchTable from "components/SearchTable";
import AlertDialog from "components/AlertDialog";

import { PATH } from "constants/routes";

import {
    getAllCategoryLevel1,
    deleteCategoryLevel1,
} from "redux/actions/newsConfig";
import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";

import i18n, { t } from "language";

import Button from "designs/Button";
import Table, { IColumns } from "designs/Table";
import { DeleteButton, EditButton } from "designs/actionButtons";

import Dialog from "./components/Dialog";

const SIZE_PER_PAGE = 10;

const CategoryLevel1: React.FC<RouteComponentProps> = ({ location }) => {
    const {
        allCategoryLevel1: {
            results: listCategoryLevel1,
            totalCount = 0,
            loading = true,
        },
    } = useSelector((state: IRootState) => state.newsConfig);

    const { actionSuccess } = useSelector((state: IRootState) => state.common);

    const dispatch = useDispatch();

    const [searchKeyword, setSearchKeyword] = useState("");
    const [page, setPage] = usePage(getQueryFromLocation(location)?.page);

    useEffect(() => {
        setupBreadcrumb();
    }, []);

    useEffect(() => {
        getAllCategoryLevel1API();
    }, [page, searchKeyword]);

    useEffect(() => {
        if (actionSuccess) {
            dispatch(resetAction());
            if (shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)) {
                setPage(page - 1);
                return;
            }
            getAllCategoryLevel1API();
        }
    }, [actionSuccess]);

    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("breadcrumb.category-level-1"),
                },
            ]),
        );
    };
    const getAllCategoryLevel1API = () => {
        const payload: IGetAllCategoryLevel1 = {
            filterCategoryLevel1: {
                name: searchKeyword || undefined,
            },
            page: page - 1,
            size: SIZE_PER_PAGE,
        };
        dispatch(getAllCategoryLevel1(payload));
    };

    const handleSearch = (text = "") => {
        setPage(1);
        setSearchKeyword(text);
    };

    const handleDelete = (record: ICategoryLevel1) => {
        const payload: IDeleteCategoryLevel1 = {
            id: record._id || "",
        };
        dispatch(deleteCategoryLevel1(payload));
    };

    const handleChangePage = useCallback((nextPage: number) => {
        setPage(nextPage);
    }, []);

    const renderAction = (record: ICategoryLevel1) => {
        return (
            <div className="flex justify-end space-x-1">
                <AlertDialog
                    ButtonMenu={<DeleteButton />}
                    title={t("job.delete-category-1")}
                    content={`${t("job.delete-category-1-content")} ?`}
                    onConfirm={() => handleDelete(record)}
                />
                <Dialog
                    className="col-start-4 col-end-7 laptop:col-start-11 laptop:col-end-13"
                    ButtonMenu={<EditButton />}
                    editField={record}
                />
            </div>
        );
    };

    const columns: IColumns = useMemo(
        () => [
            {
                text: t("job.category-name"),
                dataField: "name",
            },
            {
                text: t("job.description"),
                dataField: "description",
            },
            {
                text: t("job.action"),
                dataField: "actions",
                formatter: (_: string, record: ICategoryLevel1) =>
                    renderAction(record),
            },
        ],
        [i18n.language],
    );

    return (
        <div>
            <h1 className="mb-2 font-bold leading-none text-xxl font-sfpro">
                {t("breadcrumb.category-level-1")}
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
                            {t("job.add-btn-category-1")}
                        </Button>
                    }
                    className="w-full max-full phone:w-25"
                />
            </div>
            <Table
                isRemote
                data={listCategoryLevel1}
                columns={columns}
                page={page}
                loading={loading}
                onPageChange={handleChangePage}
                sizePerPage={SIZE_PER_PAGE}
                totalSize={totalCount}
            />
        </div>
    );
};
export default CategoryLevel1;
