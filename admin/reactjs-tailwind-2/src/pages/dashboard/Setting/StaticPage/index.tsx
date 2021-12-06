/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table, { IColumns } from "designs/Table";
import AlertDialog from "components/AlertDialog";
import { IRootState } from "redux/reducers";
import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";
import { ICustomSizeImages, IPages, ITypes } from "common/formatTypes";
import { getAllPages, removePages } from "redux/actions/generalSetting";
import { t } from "language";

import Button from "designs/Button";
import SVG from "designs/SVG";
import NoImage from "assets/svg/common/img-skeleton.svg";
import Dialog from "./components/Dialog";

const SIZE_PER_PAGE = 10;

const StaticPage: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const dispatch = useDispatch();

    const {
        pages: { results: listPages, totalCount = 0, loading = true },
    } = useSelector((state: IRootState) => state.generalSetting);

    const { actionSuccess } = useSelector((state: IRootState) => state.common);

    useEffect(() => {
        setupBreadcrumb();
    }, []);

    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("breadcrumb.static_page"),
                },
            ]),
        );
    };

    useEffect(() => {
        getAllStaticPageAPI();
    }, [page]);

    useEffect(() => {
        if (actionSuccess) {
            getAllStaticPageAPI();
            dispatch(resetAction());
        }
    }, [actionSuccess]);

    const getAllStaticPageAPI = () => {
        dispatch(
            getAllPages({
                filterPages: {},
            }),
        );
    };

    const handleDelete = (record: IPages) => {
        const payload = {
            id: record._id!,
        };
        dispatch(removePages(payload));
    };
    const handleChangePage = useCallback((nextPage: number) => {
        setPage(nextPage);
    }, []);

    const renderAction = (record: IPages) => {
        return (
            <div className="flex justify-end gap-2">
                <AlertDialog
                    ButtonMenu={<SVG name="common/delete" width="20" />}
                    title={t("staticPage.title-delete")}
                    content={t("staticPage.content-delete")}
                    onConfirm={() => handleDelete(record)}
                />
                <Dialog
                    isEdit
                    editField={record}
                    ButtonMenu={<SVG name="common/edit" width="20" />}
                />
            </div>
        );
    };
    const columns: IColumns = useMemo(
        () => [
            {
                text: t("staticPage.image-title"),
                dataField: "image",
                headerStyle: () => ({
                    width: "20%",
                }),
                formatter: (image: ICustomSizeImages) => (
                    <div className="">
                        <img
                            src={
                                image?.small ||
                                image?.default ||
                                image.medium ||
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
                text: t("staticPage.title"),
                dataField: "name",
                headerStyle: () => ({
                    width: "20%",
                }),
            },
            {
                text: t("staticPage.link"),
                dataField: "url",
            },
            {
                text: t("staticPage.type"),
                dataField: "type",
                formatter: (type: ITypes) => <div>{type?.name}</div>,
            },
            {
                text: t("staticPage.action"),
                dataField: "actions",
                formatter: (cell: null, record: IPages) => renderAction(record),
            },
        ],
        [],
    );

    return (
        <div className="">
            <h1 className="mb-2 font-bold leading-none text-xxl font-sfpro">
                {t("breadcrumb.static_page")}
            </h1>
            <div className="flex flex-col items-center justify-end w-full max-w-full gap-2 pb-3 phone:flex-row">
                <Dialog
                    ButtonMenu={
                        <Button
                            primary
                            innerClassName="py-1.5 h-4 text-lg font-medium font-sfpro normal-case h-full"
                            type="submit"
                        >
                            {t("staticPage.title-add")}
                        </Button>
                    }
                    className="w-full max-w-full phone:w-25"
                />
            </div>
            <Table
                data={listPages}
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
export default StaticPage;
