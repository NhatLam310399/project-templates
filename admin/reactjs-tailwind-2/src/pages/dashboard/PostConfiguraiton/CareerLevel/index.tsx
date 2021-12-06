/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import i18n, { t } from "language";

import AlertDialog from "components/AlertDialog";

import {
    IRootState,
    ICategoryLv2,
    IJobLevel,
    IDeleteJobLevel,
} from "common/formatTypes";
import { usePage } from "common/hooks/usePage";
import { getQueryFromLocation } from "common/functions/";

import SVG from "designs/SVG";
import Button from "designs/Button";
import Table, { IColumns } from "designs/Table";

import { deleteJobLevel, getAllJobLevel } from "redux/actions/newsConfig";
import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";

import Dialog from "./components/Dialog";

const SIZE_PER_PAGE = 10;

const CareerLevel: React.FC<RouteComponentProps> = ({ location }) => {
    const { language } = i18n;

    const {
        allJobLevel: {
            results: allPosition = [],
            totalCount = 0,
            loading = true,
        } = {},
    } = useSelector((state: IRootState) => state.newsConfig);

    const dispatch = useDispatch();

    const { actionSuccess } = useSelector((state: IRootState) => state.common);

    const [page, setPage] = usePage(getQueryFromLocation(location)?.page);

    useEffect(() => {
        getAllJobLevelAPI();
        setupBreadcrumb();
    }, []);

    useEffect(() => {
        getAllJobLevelAPI();
    }, [page]);

    useEffect(() => {
        if (actionSuccess) {
            dispatch(resetAction());

            getAllJobLevelAPI();
        }
    }, [actionSuccess]);

    const getAllJobLevelAPI = (text = "") => {
        dispatch(getAllJobLevel());
    };

    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("breadcrumb.career-level"),
                },
            ]),
        );
    };

    const handleDelete = (record: IJobLevel) => {
        const payload: IDeleteJobLevel = {
            id: record?._id || "",
        };
        dispatch(deleteJobLevel(payload));
    };

    const handleChangePage = useCallback((nextPage: number) => {
        setPage(nextPage);
    }, []);

    const renderAction = (record: ICategoryLv2) => {
        return (
            <div className="flex justify-end space-x-1">
                <AlertDialog
                    ButtonMenu={<SVG name="common/delete" width="20" />}
                    title={t("job.delete-career-level")}
                    content={`${t("job.delete-career-level-content")}?`}
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
                text: t("job.position"),
                dataField: "name",
            },
            {
                text: t("job.description"),
                dataField: "description",
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
                {t("breadcrumb.career-level")}
            </h1>
            <div className="flex items-center justify-end w-full max-w-full gap-2 pb-3">
                <Dialog
                    ButtonMenu={
                        <Button
                            primary
                            innerClassName="py-1.5 h-4 text-lg font-medium font-sfpro normal-case h-full"
                            type="submit"
                        >
                            {t("job.add-btn-career-level")}
                        </Button>
                    }
                    className="w-full max-full phone:w-25"
                />
            </div>
            <Table
                data={allPosition}
                columns={columns}
                totalSize={0}
                sizePerPage={SIZE_PER_PAGE}
                page={page}
                loading={loading}
                onPageChange={handleChangePage}
            />
        </div>
    );
};
export default CareerLevel;
