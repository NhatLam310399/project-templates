/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table, { IColumns } from "designs/Table";
import SVG from "designs/SVG";
import i18n, { t } from "language";
import AlertDialog from "components/AlertDialog";
import { IRootState } from "redux/reducers";
import {
    IAds,
    ICustomSizeImages,
    IGetAdsAll,
    ITypes,
} from "common/formatTypes";
import { setBreadcrumb } from "redux/actions/_config";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { usePage } from "common/hooks/usePage";
import { getQueryFromLocation } from "common/functions/route/getQueryFromLocationl";
import { getAdsAll, removeAds } from "redux/actions/ads";
import { resetAction } from "redux/actions/common";
import { shouldDecreasePageIndex } from "common/functions";
import Button from "designs/Button";
import NoImage from "assets/svg/common/img-skeleton.svg";
import Dialog from "./components/Dialog";

const SIZE_PER_PAGE = 10;
const AdsByCode: React.FC<RouteComponentProps> = ({ location }) => {
    const dispatch = useDispatch();
    const [page, setPage] = usePage(getQueryFromLocation(location)?.page);
    const [isRemoveAction, setIsRemoveAction] = useState<boolean>(false);
    const { allAds = [], loading = true } = useSelector(
        (state: IRootState) => state.ads,
    );
    const { actionSuccess } = useSelector((state: IRootState) => state.common);

    const [listAds, setListAds] = useState<IAds[]>([]);

    useEffect(() => {
        setupBreadcrumb();
    }, [page]);
    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("breadcrumb.ads_by_image"),
                },
            ]),
        );
    };

    useEffect(() => {
        getAllAdsAPI();
    }, []);

    useEffect(() => {
        renderAds();
    }, [allAds]);

    useEffect(() => {
        if (actionSuccess) {
            if (
                isRemoveAction &&
                shouldDecreasePageIndex(page, allAds.length, SIZE_PER_PAGE)
            ) {
                setPage(page - 1);
            }
            dispatch(resetAction());
            setIsRemoveAction(false);
            getAllAdsAPI();
        }
    }, [actionSuccess]);

    const renderAds = () => {
        const draftArray = [];
        for (const ads of allAds) {
            if (ads.displayLocation?.code === "ADS_BY_IMAGE") {
                draftArray.push(ads);
            }
        }
        setListAds(draftArray);
    };

    const getAllAdsAPI = () => {
        const payload: IGetAdsAll = {
            filterAds: {},
        };
        dispatch(getAdsAll(payload));
    };

    const handleDelete = (record: IAds) => {
        dispatch(
            removeAds({
                id: record._id!,
            }),
        );
        setIsRemoveAction(true);
    };
    const handleChangePage = useCallback((nextPage: number) => {
        setPage(nextPage);
    }, []);

    const renderAction = (record: IAds) => {
        return (
            <div className="flex justify-end">
                <AlertDialog
                    className="ml-1 "
                    ButtonMenu={<SVG name="common/delete" />}
                    title={t("configAds.title-delete-img")}
                    content={t("configAds.content-delete")}
                    onConfirm={() => handleDelete(record)}
                />
                <Dialog
                    ButtonMenu={<SVG name="common/edit" className="ml-1" />}
                    isEdit
                    editField={record}
                />
            </div>
        );
    };

    const columns: IColumns = useMemo(
        () => [
            {
                text: t("configAds.img_title"),
                dataField: "urlImage",
                headerStyle: () => ({
                    width: "20%",
                }),
                formatter: (urlImage: ICustomSizeImages) => (
                    <div className="">
                        <img
                            src={
                                urlImage?.small ||
                                urlImage?.default ||
                                urlImage.medium ||
                                NoImage
                            }
                            className="object-cover w-12 h-7"
                            alt="thumbnail"
                        />
                        {/* this is the trick for width img in mobile */}
                        <div className="w-20 laptop:w-0" />
                    </div>
                ),
            },
            {
                text: t("configAds.type_name"),
                dataField: "name",
            },
            {
                text: t("configAds.ads_position"),
                dataField: "displayLocation",
                formatter: (displayLocation: ITypes) => (
                    <div>{displayLocation?.name}</div>
                ),
            },
            {
                text: t("configAds.ads_link"),
                dataField: "link",
            },
            {
                text: t("configAds.action"),
                dataField: "actions",
                formatter: (cell: null, record: IAds) => renderAction(record),
            },
        ],
        [i18n.language],
    );
    return (
        <div className="">
            <h1 className="mb-2 font-bold leading-none text-xxl font-sfpro">
                {t("breadcrumb.ads_by_image")}
            </h1>
            <div className="flex flex-col items-center justify-end w-full max-w-full gap-2 pb-3 phone:flex-row">
                <Dialog
                    ButtonMenu={
                        <Button
                            primary
                            innerClassName="py-1.5 h-4 text-lg font-medium font-sfpro normal-case h-full"
                            type="submit"
                        >
                            {t("configAds.title-add")}
                        </Button>
                    }
                    className="w-full max-w-full phone:w-25"
                />
            </div>
            <Table
                data={listAds}
                columns={columns}
                totalSize={allAds.length}
                page={page}
                loading={loading}
                onPageChange={handleChangePage}
                sizePerPage={SIZE_PER_PAGE}
            />
        </div>
    );
};
export default withRouter(AdsByCode);
