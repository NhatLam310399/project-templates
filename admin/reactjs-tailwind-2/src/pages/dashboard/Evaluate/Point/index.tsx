/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { IGetAllRating, IRootState, IRating, IUser } from "common/formatTypes";
import {
    getQueryFromLocation,
    shouldDecreasePageIndex,
} from "common/functions/";
import { usePage } from "common/hooks/usePage";

import SearchTable from "components/SearchTable";
import TagRating from "components/TagRating";

import SVG from "designs/SVG";
import Button from "designs/Button";
import Table, { IColumns } from "designs/Table";

import i18n, { t } from "language";

import { getAllRating } from "redux/actions/rating";
import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";

import Dialog from "./components/Dialog";

const SIZE_PER_PAGE = 10;

const Point: React.FC<RouteComponentProps> = ({ location }) => {
    const { language } = i18n;
    const {
        allRating: {
            results: allRating = [],
            totalCount = 0,
            loading = true,
        } = {},
    } = useSelector((state: IRootState) => state.rating);

    const dispatch = useDispatch();

    const { actionSuccess } = useSelector((state: IRootState) => state.common);

    const [searchKeyword, setSearchKeyword] = useState("");
    const [page, setPage] = usePage(getQueryFromLocation(location)?.page);

    useEffect(() => {
        setupBreadcrumb();
    }, []);

    useEffect(() => {
        getAllRatingAPI();
    }, [page, searchKeyword]);

    useEffect(() => {
        if (actionSuccess) {
            dispatch(resetAction());

            if (shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)) {
                setPage(page - 1);
                return;
            }
            getAllRatingAPI();
        }
    }, [actionSuccess]);

    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("breadcrumb.points"),
                },
            ]),
        );
    };
    const getAllRatingAPI = () => {
        const payload: IGetAllRating = {
            filterRating: {
                userName: searchKeyword || undefined,
                userPermission: "EMPLOYER",
            },
            page: page - 1,
            size: SIZE_PER_PAGE,
        };
        dispatch(getAllRating(payload));
    };

    const handleSearch = (text = "") => {
        setPage(1);
        setSearchKeyword(text);
    };

    const handleChangePage = useCallback((nextPage: number) => {
        setPage(nextPage);
    }, []);

    const renderAction = (record: IRating) => {
        return (
            <div className="flex justify-end space-x-1">
                <Dialog
                    ButtonMenu={<SVG name="common/edit" width="20" />}
                    editField={record}
                    isEdit
                />
            </div>
        );
    };
    const columns: IColumns = useMemo(
        () => [
            {
                text: t("evaluate.order"),
                dataField: "index",
                headerStyle: {
                    width: "12%",
                },
                formatter: (cell, row, rowIndex) => <div>{rowIndex}</div>,
            },
            {
                text: t("evaluate.name-employer"),
                dataField: "user",
                headerStyle: {
                    width: "22%",
                },
                formatter: (user: IUser) => <div>{user?.displayName}</div>,
            },
            {
                text: t("evaluate.rating"),
                dataField: "rate",
                formatter: (text: string, record: IRating) => (
                    <TagRating>{record.rate}</TagRating>
                ),
            },
            {
                text: t("evaluate.points"),
                dataField: "user",
                formatter: (user: IUser) => <div>{user?.point}</div>,
            },
            {
                text: t("evaluate.employer-code"),
                dataField: "user",
                formatter: (user: IUser) => <div>{user?.code}</div>,
            },
            {
                text: t("common.table-action"),
                dataField: "actions",
                formatter: (_: string, record: IRating) => renderAction(record),
            },
        ],
        [language, page],
    );

    return (
        <div>
            <h1 className="mb-2 font-bold leading-none text-xxl font-sfpro">
                {t("breadcrumb.points")}
            </h1>
            <div className="flex flex-col items-center justify-between w-full max-w-full gap-2 pb-3 phone:flex-row">
                <SearchTable
                    placeholder={t("evaluate.search")}
                    onFetchData={handleSearch}
                />
                <Dialog
                    ButtonMenu={
                        <Button
                            primary
                            innerClassName="py-1.5 h-4 text-lg font-medium font-sfpro normal-case h-full"
                            type="submit"
                        >
                            {t("evaluate.title-add-points")}
                        </Button>
                    }
                    className="w-full max-full phone:w-25"
                />
            </div>
            <Table
                isRemote
                data={allRating}
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
export default Point;
