import { useSelector, useDispatch } from "react-redux";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { format } from "date-fns";

import i18n, { t } from "language";

import SearchTable from "components/SearchTable";
import AlertDialog from "components/AlertDialog";

import { usePage } from "common/hooks/usePage";
import { IGetAllTag, IGetById, IRootState, ITag } from "common/formatTypes";
import { shouldDecreasePageIndex } from "common/functions";
import { getQueryFromLocation } from "common/functions/route/getQueryFromLocationl";

import Button from "designs/Button";
import SVG from "designs/SVG";
import Table, { IColumns } from "designs/Table";

import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";
import { deleteTag, getAllTag } from "redux/actions/blog";

import Dialog from "./components/Dialog";

const SIZE_PER_PAGE = 10;
const BlogTags: React.FC<RouteComponentProps> = ({ location }) => {
    const dispatch = useDispatch();
    const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
    const {
        allTag: { results: tagList, totalCount = 0, loading = true },
    } = useSelector((state: IRootState) => state.blog);
    const { actionSuccess } = useSelector((state: IRootState) => state.common);

    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() => {
        setupBreadcrumb();
    }, []);

    useEffect(() => {
        getAllTagApi();
    }, [page, searchKeyword]);

    useEffect(() => {
        if (actionSuccess) {
            dispatch(resetAction());
            if (shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)) {
                setPage(page - 1);
                return;
            }
            setTimeout(() => {
                getAllTagApi();
            }, 50);
        }
    }, [actionSuccess]);

    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("breadcrumb.tags"),
                },
            ]),
        );
    };

    const getAllTagApi = () => {
        const payload: IGetAllTag = {
            filterTag: {
                name: searchKeyword || undefined,
            },
            page: page - 1,
            size: SIZE_PER_PAGE,
        };
        dispatch(getAllTag(payload));
    };

    const handleSearch = (text = "") => {
        setPage(1);
        setSearchKeyword(text);
    };

    const handleDelete = (record: ITag) => {
        const payload: IGetById = {
            id: record._id!,
        };
        dispatch(deleteTag(payload));
    };

    const handleChangePage = useCallback((nextPage: number) => {
        setPage(nextPage);
    }, []);

    const renderAction = (record: ITag) => {
        return (
            <div className="flex justify-end">
                <AlertDialog
                    className="ml-1 "
                    ButtonMenu={<SVG name="common/delete" />}
                    title={t("blog.title-delete-tags")}
                    content={t("blog.content-delete-tags")}
                    onConfirm={() => handleDelete(record)}
                />
                <Dialog
                    ButtonMenu={<SVG name="common/edit" className="ml-1" />}
                    isEdit
                    editField={record}
                />
            </div>
        );
    };

    const columns: IColumns = useMemo(
        () => [
            {
                text: t("blog.title-tags"),
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
                    return (
                        <div>{format(new Date(createdAt), "dd/MM/yyyy")}</div>
                    );
                },
            },
            {
                text: t("blog.actions"),
                dataField: "actions",
                formatter: (_: null, record: ITag) => renderAction(record),
            },
        ],
        [i18n.language],
    );
    return (
        <div className="">
            <h1 className="mb-2 font-bold leading-none text-xxl font-sfpro">
                {t("breadcrumb.tags")}
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
                            {t("blog.title-add-tags")}
                        </Button>
                    }
                    className="w-full max-full phone:w-25"
                />
            </div>
            <Table
                data={tagList}
                columns={columns}
                totalSize={totalCount}
                page={page}
                loading={loading}
                onPageChange={handleChangePage}
                sizePerPage={SIZE_PER_PAGE}
            />
        </div>
    );
};
export default withRouter(BlogTags);
