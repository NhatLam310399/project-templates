import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";

import SearchTable from "components/SearchTable";

import { usePage } from "common/hooks/usePage";
import { IRootState, IProvince, IGetProvince } from "common/formatTypes";
import {
    getQueryFromLocation,
    shouldDecreasePageIndex,
} from "common/functions";

import SVG from "designs/SVG";
import Table, { IColumns } from "designs/Table";

import { getProvinces, getSuggestionProvinces } from "redux/actions/location";
import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";

import i18n, { t } from "language";

import ProvinceDialog from "./Dialog";

const SIZE_PER_PAGE = 10;

const Province: React.FC<RouteComponentProps> = ({ location }) => {
    const {
        provinces,
        provincesTotalCount,
        loadingProvince = true,
    } = useSelector((state: IRootState) => state.location);

    const { actionSuccess } = useSelector((state: IRootState) => state.common);

    const dispatch = useDispatch();

    const [searchKeyword, setSearchKeyword] = useState("");
    const [page, setPage] = usePage(getQueryFromLocation(location)?.page);

    const getProvincesApi = () => {
        const payload: IGetProvince = {
            name: searchKeyword,
            page: page - 1,
            size: SIZE_PER_PAGE,
        };
        dispatch(getProvinces(payload));
    };

    const getSuggestionProvinceApi = () => {
        const payload: IGetProvince = {};
        dispatch(getSuggestionProvinces(payload));
    };

    useEffect(() => {
        getSuggestionProvinceApi();
        setupBreadcrumb();
    }, []);

    useEffect(() => {
        getProvincesApi();
    }, [page, searchKeyword]);

    useEffect(() => {
        if (actionSuccess) {
            dispatch(resetAction());
            if (
                shouldDecreasePageIndex(
                    page,
                    provincesTotalCount,
                    SIZE_PER_PAGE,
                )
            ) {
                setPage(page - 1);
                return;
            }
            getProvincesApi();
        }
    }, [actionSuccess]);

    const handleSearch = (text = "") => {
        setPage(1);
        setSearchKeyword(text);
    };

    const renderAction = (record: IProvince) => {
        return (
            <div className="flex items-center justify-end space-x-1">
                <ProvinceDialog
                    editField={record}
                    ButtonMenu={
                        <SVG
                            name="common/edit"
                            className="block leading-none"
                        />
                    }
                />
            </div>
        );
    };

    const columns: IColumns = useMemo(
        () => [
            {
                text: t("location.province"),
                headerStyle: {
                    width: "32%",
                },
                dataField: "name",
            },
            {
                text: t("location.long"),
                headerStyle: {
                    width: "26%",
                },
                dataField: "longitude",
            },
            {
                text: t("location.lat"),
                headerStyle: {
                    width: "30%",
                },
                dataField: "latitude",
            },
            {
                text: t("common.table-action"),
                dataField: "actions",
                formatter: (text: string, record: IProvince) =>
                    renderAction(record),
            },
        ],
        [i18n.language],
    );

    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("location.breadcrumb-province"),
                },
            ]),
        );
    };

    const handleChangePage = useCallback((nextPage: number) => {
        setPage(nextPage);
    }, []);

    return (
        <div>
            <h1 className="mb-2 font-bold leading-none text-xxl font-sfpro">
                {t("breadcrumb.location_province")}
            </h1>
            <div className="flex justify-between w-full max-w-full pb-3 laptop:w-25">
                <SearchTable
                    placeholder={t("blog.search")}
                    onFetchData={handleSearch}
                />
            </div>
            <Table
                data={provinces}
                columns={columns}
                page={page}
                onPageChange={handleChangePage}
                sizePerPage={SIZE_PER_PAGE}
                isRemote
                loading={loadingProvince}
                totalSize={provincesTotalCount}
            />
        </div>
    );
};
export default Province;
