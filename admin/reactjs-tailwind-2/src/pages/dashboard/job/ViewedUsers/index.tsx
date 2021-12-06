/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import i18n, { t } from "language";

import {
    IUser,
    IRootState,
    IGetAllRecruitment,
    IRecruitment,
    IDeleteRecruitment,
    ICompany,
    IGetRecruitmentViewedUser,
    ICustomSizeImages,
    IUserStatus,
    IGetUserByRecruitment,
    IViewStatus,
    IGraphQLResponse,
} from "common/formatTypes";
import {
    getQueryFromLocation,
    shouldDecreasePageIndex,
} from "common/functions/";
import { usePage } from "common/hooks/usePage";

import Avatar from "components/Avatar";
import ExportExcel from "components/ExportExcel";
import AlertDialog from "components/AlertDialog";

import Table, { IColumns } from "designs/Table";
import SVG from "designs/SVG";
import Tag from "designs/Tag";
import AutoComplete from "designs/Autocomplete";

import { deleteJob, getAllJob } from "redux/actions/job";
import { getUsersStatusViewedByRecruitment } from "redux/actions/listUsers";
import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";
import { getCompanies } from "redux/actions/company";

import { getUsersStatusViewedByRecruitment as getUsersService } from "services/listUsers";

const SIZE_PER_PAGE = 10;

const ViewedList: React.FC<RouteComponentProps> = ({ location }) => {
    const { language } = i18n;
    const dispatch = useDispatch();

    const {
        allJob: { results: recruitmentList },
    } = useSelector((state: IRootState) => state.job);
    const {
        usersByRecruitment: {
            results: { user: userList = [], status = [] },
            loading = true,
            totalCount = 0,
        },
    } = useSelector((state: IRootState) => state.listUser);
    const {
        allCompany: { results: companyList },
    } = useSelector((state: IRootState) => state.company);

    const { actionSuccess } = useSelector((state: IRootState) => state.common);

    const [companySelected, setCompanySelected] = useState<ICompany>();
    const [recruitmentSelected, setRecruitmentSelected] =
        useState<IRecruitment>();
    const [users, setUsers] = useState<IUserStatus[]>([]);
    const [page, setPage] = usePage(getQueryFromLocation(location)?.page);

    useEffect(() => {
        getCompaniesAPI();
        setupBreadcrumb();
    }, []);

    useEffect(() => {
        if (recruitmentSelected?._id) {
            getRecruitmentUserStatusViewedApi(recruitmentSelected?._id);
        }
    }, [page, recruitmentSelected]);

    useEffect(() => {
        if (companyList.length) {
            setCompanySelected(companyList[0]);
            getAllJobAPI(companyList[0]?.user?._id);
        }
    }, [companyList]);

    useEffect(() => {
        if (recruitmentList?.length > 0) {
            setRecruitmentSelected(recruitmentList[0]);
            recruitmentList?.[0]?._id &&
                getRecruitmentUserStatusViewedApi(recruitmentList?.[0]?._id);
        } else {
            setRecruitmentSelected(undefined);
            setUsers([]);
        }
    }, [recruitmentList]);

    useEffect(() => {
        if (actionSuccess) {
            dispatch(resetAction());
            if (shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)) {
                setPage(page - 1);
                return;
            }
            recruitmentSelected?._id &&
                getRecruitmentUserStatusViewedApi(recruitmentSelected?._id);
        }
    }, [actionSuccess]);
    useEffect(() => {
        if (!loading && userList?.length > 0) {
            assignUsers();
        } else {
            setUsers([]);
        }
    }, [userList]);

    const assignUsers = () => {
        const newUsers: IUserStatus[] = [];
        userList?.map((user, indexUser) => {
            status?.map((value, indexStatus) => {
                if (indexUser === indexStatus) {
                    const newUser = { ...user, status: value };
                    newUsers.push(newUser);
                }
            });
        });
        setUsers(newUsers);
    };
    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("breadcrumb.viewed-list"),
                },
            ]),
        );
    };

    const getCompaniesAPI = () => {
        dispatch(getCompanies({}));
    };

    const getRecruitmentUserStatusViewedApi = (recruitmentId: string) => {
        const payload: IGetUserByRecruitment = {
            idRecruitment: recruitmentId,
            page: page - 1,
            size: SIZE_PER_PAGE,
        };
        dispatch(getUsersStatusViewedByRecruitment(payload));
    };

    const getAllJobAPI = (userId = "") => {
        const payload: IGetAllRecruitment = {
            filterRecruitment: {
                userId,
            },
        };
        dispatch(getAllJob(payload));
    };

    const handleSelectCompany = (company: ICompany) => {
        setPage(1);
        setCompanySelected(company);
        setRecruitmentSelected(undefined);
        getAllJobAPI(company?.user?._id);
    };

    const handleSelectRecruitment = (recruitment: IRecruitment) => {
        setPage(1);
        setRecruitmentSelected(recruitment);
    };

    const handleDelete = (record: IUser) => {
        const payload: IDeleteRecruitment = {
            id: record._id || "",
        };
        dispatch(deleteJob(payload));
    };

    const handleChangePage = useCallback((nextPage: number) => {
        setPage(nextPage);
    }, []);

    const renderAction = (record: IUser) => {
        return (
            <div className="flex items-center justify-end space-x-1">
                <AlertDialog
                    ButtonMenu={<SVG name="common/delete" width="20" />}
                    title={t("job.delete-job-title")}
                    content={`${t("job.delete-job-content")}`}
                    note={t("job.delete-job")}
                    onConfirm={() => handleDelete(record)}
                />
            </div>
        );
    };
    const renderStatus = (status: IViewStatus) => {
        switch (status) {
            case "applied":
                return <Tag active>{t("job.applied")} </Tag>;
                break;
            case "approved":
                return <Tag active>{t("job.approved")} </Tag>;
                break;
            default:
                return <Tag active>{t("job.viewed")} </Tag>;
                break;
        }
    };
    const columns: IColumns = useMemo(
        () => [
            {
                text: "Avatar",
                dataField: "urlAvt",
                formatter: (urlAvt: ICustomSizeImages) => (
                    <Avatar src={urlAvt?.small || urlAvt?.default} isRound />
                ),
            },
            {
                text: t("job.candidate"),
                dataField: "displayName",
            },
            {
                text: t("common.email"),
                dataField: "email",
            },
            {
                text: t("common.phone-number"),
                dataField: "phoneNumber",
            },
            {
                text: t("common.status"),
                dataField: "status",
                formatter: (status: IViewStatus) => renderStatus(status),
            },
            {
                text: t("userList.action"),
                dataField: "actions",
                formatter: (_: string, record: IUser) => renderAction(record),
            },
        ],
        [language],
    );
    const exportData = async (name: string) => {
        if (!recruitmentSelected) return;
        const result = await getAllRecruitmentServiceAPI(
            recruitmentSelected?._id!,
        );
        const { user: users = [], status = [] } = result || {};
        if (users?.length === 0 && status?.length === 0) {
            return;
        }
        users.map((user: IUser, indexUser: number) => {
            status.map((value: string, indexStatus: number) => {
                if (indexUser === indexStatus) {
                    return Object.assign(user, { status: value });
                }
            });
        });
        return users;
    };
    return (
        <div>
            <h1 className="mb-2 font-bold leading-none text-xxl font-sfpro">
                {t("breadcrumb.viewed-list")}
            </h1>
            <div className="flex flex-wrap items-center justify-between w-full max-w-full gap-2 mb-3 phone:flex-row">
                <div className="flex flex-wrap items-center flex-auto gap-2">
                    <div className="flex-none w-25">
                        <AutoComplete
                            placeholder={t("job.employer-name")}
                            optionSelected={companySelected}
                            options={companyList}
                            onSelectOption={handleSelectCompany}
                            useFloatTitle
                            disableClearable
                        />
                    </div>
                    <div className="flex-none w-25">
                        <AutoComplete
                            placeholder={t("job.job-name")}
                            optionSelected={recruitmentSelected}
                            options={recruitmentList}
                            onSelectOption={handleSelectRecruitment}
                            useFloatTitle
                            disableClearable
                        />
                    </div>
                </div>
                <div className="flex-none w-25">
                    <ExportExcel onFetchApi={exportData} />
                </div>
            </div>
            <Table
                isRemote
                data={users}
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
export default ViewedList;

const getAllRecruitmentServiceAPI = async (id: string) => {
    const response: IGraphQLResponse = await getUsersService({
        idRecruitment: id,
    });
    const { getUserStatusViewByRecruitment: result } = response?.data || {};
    return result?.results;
};
