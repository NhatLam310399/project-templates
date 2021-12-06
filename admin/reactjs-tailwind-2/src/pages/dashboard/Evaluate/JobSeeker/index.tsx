/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";

import { IRating, IGetAllRating, IRootState, IUser } from "common/formatTypes";
import {
    getQueryFromLocation,
    shouldDecreasePageIndex,
} from "common/functions/";
import { usePage } from "common/hooks/usePage";

import { PATH } from "constants/routes";

import SearchTable from "components/SearchTable";
import TagRating from "components/TagRating";

import Button from "designs/Button";
import SVG from "designs/SVG";
import Table, { IColumns } from "designs/Table";

import i18n, { t } from "language";

import { getAllRating } from "redux/actions/rating";
import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";

import Dialog from "./components/Dialog";

const SIZE_PER_PAGE = 10;

const RatingCandidate: React.FC<RouteComponentProps> = ({ location }) => {
    const {
        allRating: { results: listRating, totalCount = 0, loading = true },
    } = useSelector((state: IRootState) => state.rating);

    const { actionSuccess } = useSelector((state: IRootState) => state.common);
    const dispatch = useDispatch();

    const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() => {
        setupBreadcrumb();
    }, []);

    useEffect(() => {
        getAllRatingAPI();
    }, [page, searchKeyword]);

    useEffect(() => {
        if (actionSuccess) {
            dispatch(resetAction());
            getAllRatingAPI();
        }
    }, [actionSuccess]);

    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("breadcrumb.review_job_seeker"),
                },
            ]),
        );
    };
    const getAllRatingAPI = () => {
        const payload: IGetAllRating = {
            filterRating: {
                userName: searchKeyword || undefined,
                userPermission: "CANDIDATE",
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
                    className="col-start-4 col-end-7 laptop:col-start-11 laptop:col-end-13"
                    ButtonMenu={<SVG name="common/edit" width="20" />}
                    editField={record}
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
                text: t("evaluate.name-job-seeker"),
                dataField: "user",
                headerStyle: {
                    width: "22%",
                },
                formatter: (user: IUser) => <div>{user?.displayName}</div>,
            },

            {
                text: t("evaluate.rating"),
                dataField: "rate",
                formatter: (rate: string) => <TagRating>{rate}</TagRating>,
            },
            {
                text: t("evaluate.points"),
                dataField: "user",
                formatter: (user: IUser) => <div>{user?.point}</div>,
            },
            {
                text: t("evaluate.code-job-seeker"),
                dataField: "user",
                formatter: (user: IUser) => <div>{user?.code}</div>,
            },
            {
                text: t("evaluate.action"),
                dataField: "actions",
                formatter: (_: string, record: IRating) => renderAction(record),
            },
        ],
        [i18n.language],
    );

    return (
        <div>
            <h1 className="mb-2 font-bold leading-none text-xxl font-sfpro">
                {t("breadcrumb.review_job_seeker")}
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
                            {t("evaluate.title-btn-add-job-seeker")}
                        </Button>
                    }
                    className="w-full max-full phone:w-25"
                />
            </div>
            <Table
                isRemote
                data={listRating}
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
export default RatingCandidate;
