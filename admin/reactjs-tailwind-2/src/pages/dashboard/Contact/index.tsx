/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import i18n, { t } from "language";

import Table, { IColumns } from "designs/Table";
import AlertDialog from "components/AlertDialog";

import { IRootState, IContact, IDeleteContact } from "common/formatTypes";
import { getAllContact, deleteContact } from "redux/actions/contact";
import { resetAction } from "redux/actions/common";
import { setBreadcrumb } from "redux/actions/_config";
import {
    getQueryFromLocation,
    shouldDecreasePageIndex,
} from "common/functions/";
import SVG from "designs/SVG";
import Button from "designs/Button";
import { usePage } from "common/hooks/usePage";
import { PATH } from "constants/routes";
import Dialog from "./components/Dialog";
import SearchTable from "components/SearchTable";

const SIZE_PER_PAGE = 10;

const Contact: React.FC<RouteComponentProps> = ({ location }) => {
    const { language } = i18n;

    const {
        allContact: {
            results: allContact = [],
            totalCount = 0,
            loading = true,
        } = {},
    } = useSelector((state: IRootState) => state.contact);

    const dispatch = useDispatch();

    const { actionSuccess } = useSelector((state: IRootState) => state.common);

    const [page, setPage] = usePage(getQueryFromLocation(location)?.page);

    useEffect(() => {
        getAllContactAPI();
        setupBreadcrumb();
    }, []);

    useEffect(() => {
        getAllContactAPI();
    }, [page]);

    useEffect(() => {
        if (actionSuccess) {
            dispatch(resetAction());

            if (shouldDecreasePageIndex(page, totalCount, SIZE_PER_PAGE)) {
                setPage(page - 1);
                return;
            }
            getAllContactAPI();
        }
    }, [actionSuccess]);

    const getAllContactAPI = () => {
        dispatch(getAllContact());
    };

    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("breadcrumb.contact"),
                },
            ]),
        );
    };

    const handleDelete = (record: IContact) => {
        const payload: IDeleteContact = {
            id: record?._id || "",
        };
        dispatch(deleteContact(payload));
    };

    const handleChangePage = useCallback((nextPage: number) => {
        setPage(nextPage);
    }, []);

    const renderAction = (record: IContact) => {
        return (
            <div className="flex items-center justify-end space-x-1">
                <AlertDialog
                    ButtonMenu={<SVG name="common/delete" width="20" />}
                    title={t("contact.delete-title")}
                    content={`${t("contact.delete-content")}`}
                    onConfirm={() => handleDelete(record)}
                />
                <Dialog
                    ButtonMenu={<SVG name="common/eye" width="20" />}
                    editField={record}
                />
            </div>
        );
    };

    const columns: IColumns = useMemo(
        () => [
            {
                text: t("contact.full-name"),
                dataField: "name",
                headerStyle: {
                    width: "22%",
                },
            },
            {
                text: t("contact.email"),
                dataField: "email",
                headerStyle: {
                    width: "30%",
                },
            },
            {
                text: t("contact.title"),
                dataField: "title",
                headerStyle: {
                    width: "35.8%",
                },
            },
            {
                text: t("common.table-action"),
                dataField: "actions",
                formatter: (_: string, record: IContact) =>
                    renderAction(record),
            },
        ],
        [language, page],
    );

    return (
        <div>
            <h1 className="mb-12 font-bold leading-none text-xxl font-sfpro">
                {t("breadcrumb.contact")}
            </h1>
            <Table
                isRemote
                data={allContact}
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
export default Contact;
