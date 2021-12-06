/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, RouteComponentProps, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { PATH } from "constants/routes";

import ExportExcel from "components/ExportExcel";
import SearchTable from "components/SearchTable";
import AlertDialog from "components/AlertDialog";

import {
    IUser,
    IGetAllUserHasPermissions,
    IDeleteUser,
    IRootState,
    ICompany,
} from "common/formatTypes";
import {
    getQueryFromLocation,
    shouldDecreasePageIndex,
} from "common/functions/";
import { usePage } from "common/hooks/usePage";

import Button from "designs/ButtonNormal";
import SVG from "designs/SVG";
import Table, { IColumns } from "designs/Table";
import Tag from "designs/Tag";

import i18n, { t } from "language";

import { getAllUserHasPermissions, deleteUser } from "redux/actions/listUsers";
import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";

import { getAllUserHasPermissions as getAllEmployer } from "services/listUsers";

const SIZE_PER_PAGE = 10;

const Employer: React.FC<RouteComponentProps> = ({ location }) => {
    const { language } = i18n;

    const dispatch = useDispatch();
    const {
        users: { results: listUsers = [], totalCount = 0, loading = true },
    } = useSelector((state: IRootState) => state.listUser);

    const { actionSuccess } = useSelector((state: IRootState) => state.common);

    const [searchKeyword, setSearchKeyword] = useState("");
    const [page, setPage] = usePage(getQueryFromLocation(location)?.page);

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
            if (shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)) {
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
                    name: t("breadcrumb.list_employer"),
                },
            ]),
        );
    };

    const getAllUserHasPermissionsAPI = () => {
        const payload: IGetAllUserHasPermissions = {
            filterUser: {
                displayName: searchKeyword || undefined,
            },
            permissions: ["EMPLOYER"],
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
    };

    const handleChangePage = useCallback((nextPage: number) => {
        setPage(nextPage);
    }, []);

    const renderAction = (record: IUser) => {
        return (
            <div className="flex justify-end space-x-1">
                <AlertDialog
                    ButtonMenu={<SVG name="common/delete" width="20" />}
                    title={t("manageEmployer.delete-title")}
                    content={`${t("manageEmployer.delete-content")} ?`}
                    onConfirm={() => handleDelete(record)}
                />
                <Link
                    to={{
                        pathname: `${PATH.MANAGE_EMPLOYER.ADD.ACCOUNT}`,
                        state: record,
                    }}
                >
                    <SVG name="common/edit" />
                </Link>
            </div>
        );
    };

    const getAllEmployerAPI = async (name = "") => {
        const response: any = await getAllEmployer({
            permissions: ["EMPLOYER"],
        });
        const { getAllUserHasPermissions: result } = response?.data || {};

        return result?.results;
    };
    const columns: IColumns = useMemo(
        () => [
            {
                text: t("manageEmployer.owner-name"),
                headerStyle: () => ({
                    width: "20%",
                }),
                dataField: "displayName",
            },
            {
                text: t("manageEmployer.company-name"),
                dataField: "company",
                headerStyle: () => ({
                    width: "20%",
                }),
                formatter: (company: ICompany) => <div>{company?.name}</div>,
            },
            {
                text: t("manageEmployer.phone-number"),
                dataField: "phoneNumber",
                headerStyle: () => ({
                    width: "20%",
                }),
            },
            {
                text: t("manageEmployer.email"),
                dataField: "email",
                headerStyle: () => ({
                    width: "20%",
                }),
            },
            {
                text: t("common.status"),
                dataField: "highlight",
                formatter: (_: string, user: IUser) => (
                    <Tag active={user?.company?.highlight}>
                        {user?.company?.highlight
                            ? t("manageEmployer.company.highlight")
                            : t("manageEmployer.company.not-highlight")}
                    </Tag>
                ),
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
                {t("breadcrumb.list_employer")}
            </h1>
            <div className="flex flex-col justify-between gap-2 mb-3 laptop:flex-row">
                <div className="w-full phone:w-25">
                    <SearchTable
                        placeholder={t("manageEmployer.search")}
                        onFetchData={handleSearch}
                    />
                </div>
                <div className="flex laptop:justify-end flex-wrap w-full gap-2">
                    <div className="w-full phone:w-25">
                        <ExportExcel onFetchApi={getAllEmployerAPI} />
                    </div>
                    <div className="w-full phone:w-25">
                        <Button
                            className="w-full h-4.5 bg-primary"
                            to={PATH.MANAGE_EMPLOYER.ADD.ACCOUNT}
                            primary
                        >
                            {t("manageEmployer.add-employer")}
                        </Button>
                    </div>
                </div>
            </div>
            <Table
                isRemote
                data={listUsers}
                columns={columns}
                totalSize={totalCount}
                sizePerPage={SIZE_PER_PAGE}
                loading={loading}
                page={page}
                onPageChange={handleChangePage}
            />
        </div>
    );
};
export default Employer;
