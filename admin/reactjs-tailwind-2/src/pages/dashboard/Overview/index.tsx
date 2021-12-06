import SVG from "designs/SVG";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumb } from "redux/actions/_config";
import { t } from "language";
import { IRootState } from "common/formatTypes";
import { getOverview } from "redux/actions/overview";
import Card from "./components/Card";
const Overview: React.FC = () => {
    const dispatch = useDispatch();
    const { overviews = {} } = useSelector(
        (state: IRootState) => state.overview,
    );
    const {
        totalCandidate = 0,
        totalEmployer = 0,
        totalEvaluate = 0,
        totalRecruitment = 0,
        totalRecruitmentAvailable = 0,
        totalRecruitmentExpired = 0,
    } = overviews || {};
    const listOverView = [
        {
            title: t("overview.total-employer"),
            total: totalEmployer,
        },
        {
            title: t("overview.total-candidate"),
            total: totalCandidate,
        },
        {
            title: t("overview.total-recruitment"),
            total: totalRecruitment,
        },
        {
            title: t("overview.total-recruitment-available"),
            total: totalRecruitmentAvailable,
        },
        {
            title: t("overview.total-recruitment-expired"),
            total: totalRecruitmentExpired,
        },
        {
            title: t("overview.total-evaluated"),
            total: totalEvaluate,
        },
    ];
    useEffect(() => {
        setupBreadcrumb();
        dispatch(getOverview());
    }, []);
    const setupBreadcrumb = () => {
        dispatch(
            setBreadcrumb([
                {
                    name: t("breadcrumb.overview"),
                },
            ]),
        );
    };

    return (
        <>
            <h1 className="mb-2 font-bold leading-none text-xxl ">
                {t("overview.title")}
            </h1>
            <div className="grid gap-2 grid-col-1 phone :grid-cols-2 desktop:grid-cols-3">
                {listOverView.map(overview => (
                    <Card
                        key={overview.title}
                        title={overview.title}
                        totalCount={overview.total}
                    />
                ))}
            </div>
        </>
    );
};

export default Overview;
