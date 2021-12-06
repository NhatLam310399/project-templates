import { useSelector, useDispatch } from "react-redux";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { format } from "date-fns";

import i18n, { t } from "language";

import SearchTable from "components/SearchTable";
import AlertDialog from "components/AlertDialog";

import { usePage } from "common/hooks/usePage";
import {
    IGetById,
    ICategory,
    IRootState,
    IGetAllCategory,
} from "common/formatTypes";
import { getQueryFromLocation } from "common/functions/route/getQueryFromLocationl";
import { shouldDecreasePageIndex } from "common/functions";

import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";
import { deleteCategory, getAllCategory } from "redux/actions/blog";

import SVG from "designs/SVG";
import Table, { IColumns } from "designs/Table";
import Button from "designs/Button";

import Dialog from "./components/Dialog";

const SIZE_PER_PAGE = 10;
const BlogCategory: React.FC<RouteComponentProps> = ({ location }) => {
    const dispatch = useDispatch();
    const [page, setPage] = usePage(getQueryFromLocation(location)?.page);

    const {
        allCategory: { results: categoryList, totalCount = 0, loading = true },
    } = useSelector((state: IRootState) => state.blog);

    const { actionSuccess } = useSelector((state: IRootState) => state.common);

    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() => {
        if (actionSuccess) {
            dispatch(resetAction());
            if (shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)) {
                setPage(page - 1);
                return;
            }
            setTimeout(() => {
                getAllCategoryApi();
            }, 50);
        }
    }, [actionSuccess]);

    useEffect(() => {
        setupBreadcrumb();
    }, []);

    useEffect(() => {
        getAllCategoryApi();
    }, [page, searchKeyword]);

    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("breadcrumb.category"),
                },
            ]),
        );
    };

    const getAllCategoryApi = () => {
        const payload: IGetAllCategory = {
            filterCategory: {
                name: searchKeyword || undefined,
            },
            page: page - 1,
            size: SIZE_PER_PAGE,
        };
        dispatch(getAllCategory(payload));
    };

    const handleSearch = (text = "") => {
        setPage(1);
        setSearchKeyword(text);
    };

    const handleDelete = (record: ICategory) => {
        const payload: IGetById = {
            id: record._id!,
        };
        dispatch(deleteCategory(payload));
    };
    const handleChangePage = useCallback((nextPage: number) => {
        setPage(nextPage);
    }, []);

    const renderAction = (record: ICategory) => {
        return (
            <div className="flex justify-end">
                <AlertDialog
                    className="ml-1 "
                    ButtonMenu={<SVG name="common/delete" />}
                    title={t("blog.title-delete-category")}
                    content={t("blog.content-delete-category")}
                    onConfirm={() => handleDelete(record)}
                />
                <Dialog
                    ButtonMenu={<SVG name="common/edit" className="ml-1" />}
                    isEdit
                    editField={record as any}
                />
            </div>
        );
    };

    const columns: IColumns = useMemo(
        () => [
            {
                text: t("blog.title-category"),
                dataField: "name",
            },
            {
                text: t("blog.description"),
                dataField: "description",
            },
            {
                text: t("blog.create-at"),
                dataField: "createdAt",
                formatter: (createdAt: Date) => {
                    return format(new Date(createdAt), "dd/MM/yyyy");
                },
            },
            {
                text: t("blog.actions"),
                dataField: "actions",
                formatter: (_: null, record: ICategory) => renderAction(record),
            },
        ],
        [i18n.language],
    );
    return (
        <div className="">
            <h1 className="mb-2 font-bold leading-none text-xxl font-sfpro">
                {t("breadcrumb.category")}
            </h1>
            <div className="flex flex-col items-center justify-between w-full max-w-full gap-2 pb-3 phone:flex-row">
                <SearchTable
                    placeholder={t("blog.search")}
                    onFetchData={handleSearch}
                />
                <Dialog
                    ButtonMenu={
                        <Button
                            primary
                            innerClassName="py-1.5 h-4 text-lg font-medium font-sfpro normal-case h-full"
                            type="submit"
                        >
                            {t("blog.title-add-category")}
                        </Button>
                    }
                    className="w-full max-full phone:w-25"
                />
            </div>
            <Table
                data={categoryList}
                columns={columns}
                totalSize={totalCount}
                loading={loading}
                page={page}
                onPageChange={handleChangePage}
                sizePerPage={SIZE_PER_PAGE}
            />
        </div>
    );
};
export default withRouter(BlogCategory);
