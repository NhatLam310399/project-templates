import i18n, { t } from "language";

import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import SearchTable from "components/SearchTable";
import AlertDialog from "components/AlertDialog";

import { usePage } from "common/hooks/usePage";
import { shouldDecreasePageIndex, textWithLimitWords } from "common/functions";

import { listPermission } from "constants/users/permissions";
import {
    IGetAllNotifySetting,
    IGetById,
    IRootState,
    INotifySetting,
} from "common/formatTypes";
import { getQueryFromLocation } from "common/functions/route/getQueryFromLocationl";

import SVG from "designs/SVG";
import Table, { IColumns } from "designs/Table";
import Button from "designs/Button";

import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";
import {
    deleteNotifySetting,
    getAllNotifySetting,
} from "redux/actions/otherSetting";

import Dialog from "./components/Dialog";

const SIZE_PER_PAGE = 10;
const NotifySettings: React.FC<RouteComponentProps> = ({ location }) => {
    const dispatch = useDispatch();
    const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
    const {
        allNotifySetting: {
            results: notifySettingList = [],
            totalCount = 0,
            loading = true,
        },
    } = useSelector((state: IRootState) => state.otherSetting);
    const { actionSuccess } = useSelector((state: IRootState) => state.common);

    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() => {
        setupBreadcrumb();
    }, []);

    useEffect(() => {
        getAllNotifySettingApi();
    }, [page, searchKeyword]);

    useEffect(() => {
        if (actionSuccess) {
            dispatch(resetAction());
            if (shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)) {
                setPage(page - 1);
                return;
            }
            setTimeout(() => {
                getAllNotifySettingApi();
            }, 50);
        }
    }, [actionSuccess]);

    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("breadcrumb.notification-setting"),
                },
            ]),
        );
    };

    const getAllNotifySettingApi = () => {
        const payload: IGetAllNotifySetting = {
            filterNotifySetting: {
                name: searchKeyword || undefined,
            },
            page: page - 1,
            size: SIZE_PER_PAGE,
        };
        dispatch(getAllNotifySetting(payload));
    };

    const handleSearch = (text = "") => {
        setPage(1);
        setSearchKeyword(text);
    };

    const handleDelete = (record: INotifySetting) => {
        const payload: IGetById = {
            id: record._id!,
        };
        dispatch(deleteNotifySetting(payload));
    };

    const handleChangePage = useCallback((nextPage: number) => {
        setPage(nextPage);
    }, []);

    const renderAction = (record: INotifySetting) => {
        return (
            <div className="flex justify-end">
                <AlertDialog
                    className="ml-1 "
                    ButtonMenu={<SVG name="common/delete" />}
                    title={t("otherSetting.notification.delete-title")}
                    content={t("otherSetting.notification.delete-content")}
                    onConfirm={() => handleDelete(record)}
                />
                {/* <Dialog
                    ButtonMenu={<SVG name="common/edit" className="ml-1" />}
                    isEdit
                    editField={record}
                /> */}
            </div>
        );
    };
    const columns: IColumns = useMemo(
        () => [
            {
                text: t("otherSetting.notification.name"),
                dataField: "name",
                headerStyle: () => ({
                    width: "25%",
                }),
            },
            {
                text: t("otherSetting.notification.description"),
                dataField: "description",
                headerStyle: () => ({
                    width: "40%",
                }),
                formatter: (description: string) =>
                    textWithLimitWords(description, 20),
            },
            {
                text: t("otherSetting.notification.permission"),
                dataField: "permission",
                formatter: (permission: string) => {
                    if (permission === listPermission[0]?.type) {
                        return listPermission[0]?.name || "";
                    }
                    return listPermission[1]?.name || "";
                },
            },
            {
                text: t("otherSetting.notification.create-at"),
                dataField: "createdAt",
                formatter: (createdAt: Date) => {
                    return (
                        <div>{format(new Date(createdAt), "dd/MM/yyyy")}</div>
                    );
                },
            },
            {
                text: t("otherSetting.notification.actions"),
                dataField: "actions",
                formatter: (_: null, record: INotifySetting) =>
                    renderAction(record),
            },
        ],
        [i18n.language],
    );
    return (
        <div className="">
            <h1 className="mb-2 font-bold leading-none text-xxl font-sfpro">
                {t("breadcrumb.notification-setting")}
            </h1>
            <div className="flex flex-col items-center justify-between w-full max-w-full gap-2 pb-3 phone:flex-row">
                <SearchTable
                    placeholder={t("otherSetting.notification.search")}
                    onFetchData={handleSearch}
                />
                <Dialog
                    ButtonMenu={
                        <Button
                            primary
                            innerClassName="py-1.5 h-4 text-lg font-medium font-sfpro normal-case h-full"
                            type="submit"
                        >
                            {t("otherSetting.notification.add-title")}
                        </Button>
                    }
                    className="w-full max-full phone:w-25"
                />
            </div>
            <Table
                data={notifySettingList}
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
export default withRouter(NotifySettings);
