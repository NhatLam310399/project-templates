/* eslint-disable react/destructuring-assignment */
import { useSelector, useDispatch } from "react-redux";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import SearchTable from "components/SearchTable";
import AlertDialog from "components/AlertDialog";

import {
    ICareerCounseling,
    ICustomSizeImages,
    IRootState,
    IGetCareerCounseling,
    IGetById,
    ITag,
    IGetAllCategory,
    IGetAllTag,
} from "common/formatTypes";
import { usePage } from "common/hooks/usePage";
import { getQueryFromLocation } from "common/functions/route/getQueryFromLocationl";
import { shouldDecreasePageIndex } from "common/functions";

import Button from "designs/Button";
import Tag from "designs/Tag";
import SVG from "designs/SVG";
import Table, { IColumns } from "designs/Table";

import {
    deleteCareerCounseling,
    getAllCareerCounseling,
    getAllTag,
    getAllCategory,
} from "redux/actions/blog";
import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";

import i18n, { t } from "language";

import NoImage from "assets/svg/common/img-skeleton.svg";

import Dialog from "./components/Dialog";

const SIZE_PER_PAGE = 10;
const BlogPost: React.FC<RouteComponentProps> = ({ location }) => {
    const dispatch = useDispatch();
    const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
    const {
        allCareerCounseling: {
            results: careerCounselingList,
            totalCount = 0,
            loading = true,
        },
    } = useSelector((state: IRootState) => state.blog);
    const { actionSuccess } = useSelector((state: IRootState) => state.common);
    const [isRemoveAction, setIsRemoveAction] = useState<boolean>(false);

    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() => {
        setupBreadcrumb();
        // Call api for dialog
        getAllCategoryApi();
        getAllTagApi();
    }, []);

    useEffect(() => {
        getAllCareerCounselingApi();
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
            setTimeout(() => {
                getAllCareerCounselingApi();
            }, 50);
        }
    }, [actionSuccess]);

    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("breadcrumb.post"),
                },
            ]),
        );
    };

    const getAllCareerCounselingApi = () => {
        const payload: IGetCareerCounseling = {
            filterCareerCounseling: {
                name: searchKeyword || undefined,
            },
            page: page - 1,
            size: SIZE_PER_PAGE,
        };
        dispatch(getAllCareerCounseling(payload));
    };

    const getAllCategoryApi = (text = "") => {
        const payload: IGetAllCategory = {
            filterCategory: {
                name: text,
            },
            page: 0,
            size: 99,
        };
        dispatch(getAllCategory(payload));
    };

    const getAllTagApi = (text = "") => {
        const payload: IGetAllTag = {
            filterTag: {
                name: text,
            },
            page: 0,
            size: 99,
        };
        dispatch(getAllTag(payload));
    };

    const handleSearch = (text = "") => {
        setPage(1);
        setSearchKeyword(text);
    };

    const handleDelete = (record: ICareerCounseling) => {
        const payload: IGetById = {
            id: record._id!,
        };
        dispatch(deleteCareerCounseling(payload));
        setIsRemoveAction(true);
    };

    const handleChangePage = useCallback((nextPage: number) => {
        setPage(nextPage);
    }, []);

    const renderAction = (record: ICareerCounseling) => {
        return (
            <div className="flex justify-end">
                <AlertDialog
                    className="ml-1 "
                    ButtonMenu={<SVG name="common/delete" />}
                    title={t("blog.title-delete-post")}
                    content={t("blog.content-delete-post")}
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
                text: t("blog.image"),
                dataField: "urlImage",
                headerStyle: () => ({
                    width: "17.9%",
                }),
                formatter: (urlImage: ICustomSizeImages) => (
                    <div className="">
                        <img
                            src={
                                urlImage?.small ||
                                urlImage?.default ||
                                urlImage?.medium ||
                                NoImage
                            }
                            className="object-cover w-12 h-7"
                            alt="thumbnail"
                        />
                        {/* this is the trick for width img in mobile */}
                        <div className="w-20 laptop:w-0" />
                    </div>
                ),
            },
            {
                text: t("blog.title"),
                dataField: "name",
                headerStyle: {
                    width: "22.64%",
                },
            },
            {
                text: t("blog.category"),
                dataField: "category.name",
                headerStyle: {
                    width: "17%",
                },
            },
            {
                text: t("blog.tags"),
                dataField: "tags",
                headerStyle: {
                    width: "17%",
                },
                formatter: (tags: ITag[]) => {
                    const str = tags.map(item => item.name).join(", ");
                    return <p>{str}</p>;
                },
            },
            {
                text: t("blog.status"),
                dataField: "enabled",
                headerStyle: {
                    width: "14.15%",
                },
                formatter: (text: string, record: ICareerCounseling) => {
                    if (record.enabled) {
                        return <Tag active>{t("blog.active")}</Tag>;
                    }
                    return <Tag>{t("blog.pause")}</Tag>;
                },
            },
            {
                text: t("blog.actions"),
                dataField: "actions",
                formatter: (_: null, record: ICareerCounseling) =>
                    renderAction(record),
            },
        ],
        [i18n.language],
    );
    return (
        <div className="">
            <h1 className="mb-2 font-bold leading-none text-xxl font-sfpro">
                {t("breadcrumb.post")}
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
                            {t("blog.title-add-post")}
                        </Button>
                    }
                    className="w-full max-full phone:w-25"
                />
            </div>
            <Table
                data={careerCounselingList}
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
export default withRouter(BlogPost);
