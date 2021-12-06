import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";

import {
    IDistrict,
    IRootState,
    IGetDistricts,
    IProvince,
} from "common/formatTypes";
import { usePage } from "common/hooks/usePage";

import AlertDialog from "components/AlertDialog";
import SearchTable from "components/SearchTable";
import {
    getQueryFromLocation,
    shouldDecreasePageIndex,
} from "common/functions";

import SVG from "designs/SVG";
import Button from "designs/Button";
import Table, { IColumns } from "designs/Table";
import Select from "designs/Select";

import i18n, { t } from "language";

import { resetAction } from "redux/actions/common";
import {
    getProvinces,
    getDistricts,
    clearDistricts,
} from "redux/actions/location";
import { setBreadcrumb } from "redux/actions/_config";

import Dialog from "./components/Dialog";

const SIZE_PER_PAGE = 10;

const District: React.FC<RouteComponentProps> = ({ location }) => {
    const {
        provinces,
        districts,
        districtsTotalCount,
        loadingDistrict = true,
    } = useSelector((state: IRootState) => state.location);
    const { actionSuccess } = useSelector((state: IRootState) => state.common);
    const [provinceSelected, setProvinceSelected] = useState<IProvince | null>(
        null,
    );
    const [isRemoveAction, setIsRemoveAction] = useState(false);
    const dispatch = useDispatch();

    const [searchKeyword, setSearchKeyword] = useState("");
    const [page, setPage] = usePage(getQueryFromLocation(location)?.page);

    useEffect(() => {
        dispatch(getProvinces({ name: "" }));
        setupBreadcrumb();
    }, []);

    useEffect(() => {
        if (provinces.length > 0) {
            handleProvinceSelected(provinces[0]);
        }
    }, [provinces]);

    const getDistrictApi = (provinceCode: string | undefined) => {
        const payload: IGetDistricts = {
            provinceCode,
            districtName: searchKeyword || undefined,
            page: page - 1,
            size: SIZE_PER_PAGE,
        };

        dispatch(getDistricts(payload));
    };

    useEffect(() => {
        if (provinceSelected) {
            getDistrictApi(provinceSelected?.code);
        }
    }, [page, searchKeyword]);

    useEffect(() => {
        if (actionSuccess) {
            dispatch(resetAction());
            setIsRemoveAction(false);
            if (
                isRemoveAction &&
                shouldDecreasePageIndex(
                    page,
                    districtsTotalCount,
                    SIZE_PER_PAGE,
                )
            ) {
                setPage(page - 1);
                return;
            }
            getDistrictApi(provinceSelected!.code);
        }
    }, [actionSuccess]);

    const handleSearch = (text = "") => {
        setPage(1);
        setSearchKeyword(text);
    };

    const handleProvinceSelected = (option: IProvince) => {
        setProvinceSelected(option);
        setPage(1);
        getDistrictApi(option.code);
    };
    const handleDelete = (record: IDistrict) => {
        dispatch(clearDistricts({ id: record?._id || "" }));
        setIsRemoveAction(true);
    };
    const renderAction = (record: IDistrict) => {
        return (
            <div className="flex items-center justify-end space-x-1">
                <AlertDialog
                    ButtonMenu={<SVG name="common/delete" width="20" />}
                    title={`${t("userList.title-delete")} ${t(
                        "breadcrumb.job-seeker",
                    ).toLowerCase()}`}
                    content={`${t("userList.content-delete")}?`}
                    note={t("userList.note-delete")}
                    onConfirm={() => handleDelete(record)}
                />
                <Dialog
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
                text: t("location.district"),
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
                formatter: (text: string, record: IDistrict) =>
                    renderAction(record),
            },
        ],
        [i18n.language],
    );

    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("location.breadcrumb-district"),
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
                {t("breadcrumb.location_district")}
            </h1>
            <div className="flex flex-wrap items-center w-full justify-between gap-2 mb-3">
                <div className="flex flex-col w-full gap-2 phone:flex-row laptop:w-auto">
                    <SearchTable
                        placeholder={t("blog.search")}
                        onFetchData={handleSearch}
                    />
                    <div className="w-full laptop:w-25">
                        <Select
                            options={provinces}
                            onSelectOption={handleProvinceSelected}
                            value={provinceSelected?.name || ""}
                        />
                    </div>
                </div>
                <Dialog
                    ButtonMenu={
                        <Button
                            primary
                            innerClassName="py-1.5 px-3.5 h-4 text-lg font-medium font-sfpro normal-case h-full"
                            type="submit"
                        >
                            {t("location.add-district")}
                        </Button>
                    }
                    className="w-full max-full laptop:w-25"
                />
            </div>
            <Table
                data={districts}
                columns={columns}
                page={page}
                onPageChange={handleChangePage}
                sizePerPage={SIZE_PER_PAGE}
                isRemote
                loading={loadingDistrict}
                totalSize={districtsTotalCount}
            />
        </div>
    );
};
export default District;
