/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import i18n, { t } from "language";

import AlertDialog from "components/AlertDialog";
import SearchTable from "components/SearchTable";

import {
    IGetCategoryLv2,
    ICustomSizeImages,
    IRootState,
    ICategoryLevel1,
    ICategoryLv2,
    IDeleteCategoryLv2ById,
} from "common/formatTypes";
import {
    getQueryFromLocation,
    shouldDecreasePageIndex,
} from "common/functions/";
import { usePage } from "common/hooks/usePage";

import Table, { IColumns } from "designs/Table";
import SVG from "designs/SVG";
import Button from "designs/Button";

import {
    deleteCategoryLevel2,
    getAllCategoryLevel2,
} from "redux/actions/newsConfig";
import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";

import Dialog from "./components/Dialog";

const SIZE_PER_PAGE = 10;

const CategoryLv2: React.FC<RouteComponentProps> = ({ location }) => {
    const { language } = i18n;
    const {
        categoryLv2: {
            results: categoryLv2 = [],
            totalCount = 0,
            loading = true,
        } = {},
    } = useSelector((state: IRootState) => state.newsConfig);

    const dispatch = useDispatch();

    const { actionSuccess } = useSelector((state: IRootState) => state.common);

    const [searchKeyword, setSearchKeyword] = useState("");
    const [page, setPage] = usePage(getQueryFromLocation(location)?.page);

    useEffect(() => {
        setupBreadcrumb();
    }, []);

    useEffect(() => {
        getAllCategoryLevel2API();
    }, [page, searchKeyword]);

    useEffect(() => {
        if (actionSuccess) {
            dispatch(resetAction());

            if (shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)) {
                setPage(page - 1);
                return;
            }
            getAllCategoryLevel2API();
        }
    }, [actionSuccess]);

    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("breadcrumb.category-level-2"),
                },
            ]),
        );
    };
    const getAllCategoryLevel2API = () => {
        const payload: IGetCategoryLv2 = {
            filterCategoryLevel2: {
                name: searchKeyword || undefined,
            },
            page: page - 1,
            size: SIZE_PER_PAGE,
        };
        dispatch(getAllCategoryLevel2(payload));
    };

    const handleSearch = (text = "") => {
        setPage(1);
        setSearchKeyword(text);
    };

    const handleDelete = (record: ICategoryLv2) => {
        const payload: IDeleteCategoryLv2ById = {
            id: record?._id || "",
        };
        dispatch(deleteCategoryLevel2(payload));
    };

    const handleChangePage = useCallback((nextPage: number) => {
        setPage(nextPage);
    }, []);

    const renderAction = (record: ICategoryLv2) => {
        return (
            <div className="flex justify-end space-x-1">
                <AlertDialog
                    ButtonMenu={<SVG name="common/delete" width="20" />}
                    title={t("job.delete-category-2")}
                    content={`${t("job.delete-category-2-content")}?`}
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
                text: t("job.category-name"),
                dataField: "name",
            },
            {
                text: t("job.category-1-name"),
                dataField: "categoryLevel1",
                formatter: (categoryLv1: ICategoryLevel1) => (
                    <span>{categoryLv1?.name}</span>
                ),
            },
            {
                text: t("job.description"),
                dataField: "description",
                headerStyle: () => ({
                    minWidth: "200px",
                }),
            },
            {
                text: t("common.table-action"),
                dataField: "actions",
                formatter: (_: string, record: ICategoryLv2) =>
                    renderAction(record),
            },
        ],
        [language, page],
    );

    return (
        <div>
            <h1 className="mb-2 font-bold leading-none text-xxl font-sfpro">
                {t("breadcrumb.category-level-2")}
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
                            {t("job.add-btn-category-2")}
                        </Button>
                    }
                    className="w-full max-full phone:w-25"
                />
            </div>
            <Table
                isRemote
                data={categoryLv2}
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
export default CategoryLv2;
