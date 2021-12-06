/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import i18n, { t } from "language";

import AlertDialog from "components/AlertDialog";
import SearchTable from "components/SearchTable";
import Avatar from "components/Avatar";

import { usePage } from "common/hooks/usePage";
import {
    IRootState,
    IBenefit,
    IGetAllBenefit,
    IDeleteBenefit,
    ICustomSizeImages,
} from "common/formatTypes";
import {
    getQueryFromLocation,
    shouldDecreasePageIndex,
} from "common/functions/";

import SVG from "designs/SVG";
import Table, { IColumns } from "designs/Table";
import Button from "designs/Button";

import { getAllBenefit, deleteBenefit } from "redux/actions/newsConfig";
import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";

import Dialog from "./components/Dialog";

const SIZE_PER_PAGE = 10;

const Benefit: React.FC<RouteComponentProps> = ({ location }) => {
    const { language } = i18n;

    const {
        allBenefit: {
            results: allBenefit = [],
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
        getAllBenefitAPI();
    }, [page, searchKeyword]);

    useEffect(() => {
        if (actionSuccess) {
            dispatch(resetAction());

            if (shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)) {
                setPage(page - 1);
                return;
            }
            getAllBenefitAPI();
        }
    }, [actionSuccess]);

    const getAllBenefitAPI = () => {
        const payload: IGetAllBenefit = {
            filterBenefit: {
                name: searchKeyword || undefined,
            },
            page: page - 1,
            size: SIZE_PER_PAGE,
        };
        dispatch(getAllBenefit(payload));
    };

    const handleSearch = (text = "") => {
        setPage(1);
        setSearchKeyword(text);
    };

    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("breadcrumb.benefit"),
                },
            ]),
        );
    };

    const handleDelete = (record: IBenefit) => {
        const payload: IDeleteBenefit = {
            id: record?._id || "",
        };
        dispatch(deleteBenefit(payload));
    };

    const handleChangePage = useCallback((nextPage: number) => {
        setPage(nextPage);
    }, []);

    const renderAction = (record: IBenefit) => {
        return (
            <div className="flex justify-end space-x-1">
                <AlertDialog
                    ButtonMenu={<SVG name="common/delete" width="20" />}
                    title={t("job.delete-benefit")}
                    content={`${t("job.delete-benefit-content")}?`}
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
                text: t("job.icon"),
                dataField: "icon",
                headerStyle: () => ({
                    width: "15%",
                }),
                formatter: (icon: ICustomSizeImages) => (
                    <Avatar src={icon?.small || icon?.default} />
                ),
            },
            {
                text: t("job.benefit-name"),
                dataField: "name",
            },
            {
                text: t("job.description"),
                dataField: "description",
            },
            {
                text: t("common.table-action"),
                dataField: "actions",
                formatter: (_: string, record: IBenefit) =>
                    renderAction(record),
            },
        ],
        [language, page],
    );

    return (
        <div>
            <h1 className="mb-2 font-bold leading-none text-xxl font-sfpro">
                {t("breadcrumb.benefit")}
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
                            {t("job.add-benefit")}
                        </Button>
                    }
                    className="w-full max-full phone:w-25"
                />
            </div>
            <Table
                isRemote
                data={allBenefit}
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
export default Benefit;
