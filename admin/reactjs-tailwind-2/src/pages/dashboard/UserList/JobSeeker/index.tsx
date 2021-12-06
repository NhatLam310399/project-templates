/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps, useHistory } from "react-router-dom";

import AlertDialog from "components/AlertDialog";
import SearchTable from "components/SearchTable";
import Avatar from "components/Avatar";

import {
    IUser,
    IGetAllUserHasPermissions,
    IDeleteUser,
    ICustomSizeImages,
    IRootState,
} from "common/formatTypes";
import { usePage } from "common/hooks/usePage";
import {
    getQueryFromLocation,
    shouldDecreasePageIndex,
} from "common/functions/";

import Table, { IColumns } from "designs/Table";
import SVG from "designs/SVG";
import Button from "designs/Button";
import Tag from "designs/Tag";
import i18n, { t } from "language";

import { getAllUserHasPermissions, deleteUser } from "redux/actions/listUsers";
import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";

import ExportExcel from "components/ExportExcel";
import { getAllUserHasPermissions as getAllEmployer } from "services/listUsers";
import Dialog from "./components/DialogEditPermission";
import DialogEdit from "./components/Dialog";

const SIZE_PER_PAGE = 10;

const JobSeeker: React.FC<RouteComponentProps> = ({ location }) => {
    const { language } = i18n;
    const history = useHistory();

    const dispatch = useDispatch();

    const {
        users: { results: listUsers, totalCount = 0, loading = true },
    } = useSelector((state: IRootState) => state.listUser);
    const { actionSuccess } = useSelector((state: IRootState) => state.common);
    const [isRemoveAction, setIsRemoveAction] = useState(false);

    const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() => {
        setupBreadcrumb();
    }, []);

    useEffect(() => {
        if (page) {
            getAllUserHasPermissionsAPI();
        }
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
            getAllUserHasPermissionsAPI();
        }
    }, [actionSuccess]);

    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("breadcrumb.job-seeker"),
                },
            ]),
        );
    };
    const getAllUserHasPermissionsAPI = () => {
        const payload: IGetAllUserHasPermissions = {
            filterUser: {
                displayName: searchKeyword || undefined,
            },
            permissions: ["CANDIDATE"],
            page: page - 1,
            size: SIZE_PER_PAGE,
        };

        dispatch(getAllUserHasPermissions(payload));
    };

    const handleSearch = (text = "") => {
        setPage(1);
        setSearchKeyword(text);
    };

    const handleDelete = (record: IUser) => {
        const payload: IDeleteUser = {
            id: record._id || "",
        };
        dispatch(deleteUser(payload));
        setIsRemoveAction(true);
    };

    const handleChangePage = useCallback((nextPage: number) => {
        setPage(nextPage);
    }, []);

    const renderAction = (record: IUser) => {
        return (
            <div className="flex justify-end space-x-1">
                {record?.provider === "phone" && (
                    <Dialog
                        ButtonMenu={
                            <SVG name="common/changePermission" width="20" />
                        }
                        editField={record}
                    />
                )}

                <AlertDialog
                    ButtonMenu={<SVG name="common/delete" width="20" />}
                    title={`${t("userList.title-delete")} ${t(
                        "breadcrumb.job-seeker",
                    ).toLowerCase()}`}
                    content={`${t("userList.content-delete")}?`}
                    note={t("userList.note-delete")}
                    onConfirm={() => handleDelete(record)}
                />
                <DialogEdit
                    ButtonMenu={<SVG name="common/edit" width="20" />}
                    editField={record}
                />
            </div>
        );
    };
    const columns: IColumns = useMemo(
        () => [
            {
                text: t("userList.avatar"),
                dataField: "urlAvt",
                headerStyle: () => ({
                    width: "130px",
                }),
                formatter: (_: string, record: IUser) => (
                    <Avatar
                        isRound
                        src={
                            record?.urlAvt?.small ||
                            record?.urlAvt?.default ||
                            ""
                        }
                    />
                ),
            },
            {
                text: t("userList.code"),
                dataField: "code",
            },
            {
                text: t("userList.full-name"),
                dataField: "displayName",
            },
            {
                text: t("userList.phone-number"),
                dataField: "phoneNumber",
            },
            {
                text: t("userList.email"),
                dataField: "email",
            },

            {
                text: t("userList.status"),
                dataField: "enabled",
                formatter: (enabled: boolean) => {
                    if (enabled)
                        return <Tag active>{t("common.status-enable")} </Tag>;
                    return (
                        <Tag active={false}>{t("common.status-disable")}</Tag>
                    );
                },
            },
            {
                text: t("userList.action"),
                dataField: "actions",
                formatter: (_: string, record: IUser) => renderAction(record),
            },
        ],
        [language],
    );

    return (
        <div>
            <h1 className="mb-2 font-bold leading-none text-xxl font-sfpro">
                {t("breadcrumb.job-seeker")}
            </h1>
            <div className="flex flex-col justify-between gap-2 mb-3 laptop:flex-row">
                <div className="w-full phone:w-25">
                    <SearchTable
                        placeholder={t("userList.search")}
                        onFetchData={handleSearch}
                    />
                </div>
                <div className="flex flex-wrap w-full gap-2 laptop:justify-end">
                    <div className="w-full phone:w-25">
                        <ExportExcel onFetchApi={getAllEmployerAPI} />
                    </div>
                    {/* <div className="w-full phone:w-25">
                        <Dialog
                            ButtonMenu={
                                <Button
                                    primary
                                    innerClassName="py-1.5 h-4.5 text-lg font-medium font-sfpro normal-case h-full"
                                    type="submit"
                                >
                                    {t("userList.add-candidate")}
                                </Button>
                            }
                            className="w-full max-w-full phone:w-25 laptop:w-auto"
                        />
                    </div> */}
                </div>
            </div>
            <Table
                isRemote
                data={listUsers}
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
export default JobSeeker;
const getAllEmployerAPI = async (name = "") => {
    const response: any = await getAllEmployer({
        permissions: ["CANDIDATE"],
    });
    const { getAllUserHasPermissions: result } = response?.data || {};

    return result?.results;
};
