import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";

import SearchTable from "components/SearchTable";
import AlertDialog from "components/AlertDialog";

import {
    IProvince,
    IDistrict,
    IWard,
    IRootState,
    IGetWards,
} from "common/formatTypes";
import { usePage } from "common/hooks/usePage";

import { PATH } from "constants/routes";
import {
    shouldDecreasePageIndex,
    getQueryFromLocation,
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
    getWards,
    clearWards,
} from "redux/actions/location";
import { setBreadcrumb } from "redux/actions/_config";

import WardDialog from "./Dialog";

const SIZE_PER_PAGE = 10;

const Ward: React.FC<RouteComponentProps> = ({ location }) => {
    const dispatch = useDispatch();

    const {
        provinces,
        districts,
        wards,
        wardsTotalCount,
        loadingWard = true,
    } = useSelector((state: IRootState) => state.location);
    const { actionSuccess } = useSelector((state: IRootState) => state.common);

    const [provinceSelected, setProvinceSelected] = useState<IProvince | null>(
        null,
    );
    const [districtSelected, setDistrictSelected] = useState<IDistrict | null>(
        null,
    );
    const [isRemoveAction, setIsRemoveAction] = useState(false);
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

    useEffect(() => {
        if (districts.length > 0) {
            handleDistrictSelected(districts[0]);
        }
    }, [districts]);

    useEffect(() => {
        if (districtSelected) {
            getWardApi(districtSelected?.code);
        }
    }, [page, searchKeyword]);

    useEffect(() => {
        if (actionSuccess) {
            dispatch(resetAction());
            setIsRemoveAction(false);
            if (
                isRemoveAction &&
                shouldDecreasePageIndex(page, wardsTotalCount, SIZE_PER_PAGE)
            ) {
                setPage(page - 1);
                return;
            }
            getWardApi(districtSelected!.code);
        }
    }, [actionSuccess]);

    const getWardApi = (districtCode = "") => {
        const payload: IGetWards = {
            districtCode,
            wardName: searchKeyword || undefined,
            page: page - 1,
            size: SIZE_PER_PAGE,
        };
        dispatch(getWards(payload));
    };

    const handleProvinceSelected = (option: IProvince) => {
        setProvinceSelected(option);
        dispatch(getDistricts({ districtName: "", provinceCode: option.code }));
    };
    const handleDistrictSelected = (option: IDistrict) => {
        setDistrictSelected(option);
        getWardApi(option.code);
    };

    const handleSearch = (text = "") => {
        setPage(1);
        setSearchKeyword(text);
    };

    const handleDelete = (record: IDistrict) => {
        dispatch(clearWards({ id: record?._id || "" }));
        setIsRemoveAction(true);
    };
    const renderAction = (record: IWard) => {
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
                <WardDialog
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
                text: t("location.ward"),
                dataField: "name",
            },
            {
                text: t("location.long"),
                dataField: "longitude",
            },
            {
                text: t("location.lat"),
                dataField: "latitude",
            },
            {
                text: t("common.table-action"),
                dataField: "actions",
                formatter: (text: string, record: IWard) =>
                    renderAction(record),
            },
        ],
        [i18n.language],
    );

    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("location.breadcrumb-dashboard"),
                    href: PATH.OVERVIEW,
                },
                {
                    name: t("location.breadcrumb-ward"),
                    href: PATH.LOCATION.WARD,
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
                {t("breadcrumb.location_ward")}
            </h1>
            <div className="w-full flex flex-wrap gap-2 justify-between pb-3">
                <div className="flex-auto flex gap-2 items-center flex-wrap">
                    <div className="flex-none">
                        <SearchTable
                            onFetchData={handleSearch}
                            placeholder={t("location.search-placeholder")}
                            className=""
                        />
                    </div>
                    <div className="flex-none w-25">
                        <Select
                            options={provinces}
                            onSelectOption={handleProvinceSelected}
                            value={provinceSelected?.name || ""}
                        />
                    </div>
                    <div className="flex-none w-25">
                        <Select
                            options={districts}
                            onSelectOption={handleDistrictSelected}
                            value={districtSelected?.name || ""}
                        />
                    </div>
                </div>
                <div className="flex-none">
                    <WardDialog
                        ButtonMenu={
                            <Button
                                primary
                                innerClassName="py-1.5 px-3.5 h-4 text-lg font-medium font-sfpro normal-case h-full"
                                type="submit"
                            >
                                {t("location.add-ward")}
                            </Button>
                        }
                        className="w-30 max-w-full"
                    />
                </div>
            </div>
            <Table
                data={wards}
                columns={columns}
                page={page}
                onPageChange={handleChangePage}
                sizePerPage={SIZE_PER_PAGE}
                isRemote
                loading={loadingWard}
                totalSize={wardsTotalCount}
            />
        </div>
    );
};
export default Ward;
