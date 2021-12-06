import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { isEmpty } from "lodash";

import {
  ICompany,
  IEmployerSeenRecord,
  IGetBestRecruitment,
  IGetRecordByUserId,
  IGraphQLResponse,
  IRootState,
} from "@common/typings";
import RelatedJob from "@components/RelatedJob";

import Table, { IColumns } from "@designs/Table";
import { SVG } from "@designs/SVG";

import { Container, EmptyJob, Detail, Text, Title, WrapTable } from "./style";
import { getBestRecruitment } from "@redux/actions/recruitment";
import { getRecordByUserId } from "@redux/actions/record";
import { getAllCompany } from "@redux/actions/company";
import { useRedirect } from "@common/hooks/useRedirect";
import { PATH } from "@routes";

const SIZE_PER_PAGE = 5;

const EmployerViewProfile: React.FC<{}> = () => {
  const redirect = useRedirect();
  const { record } = useSelector((state: IRootState) => state.record);
  const {
    bestRecruitment: { results: bestRecruitment },
  } = useSelector((state: IRootState) => state.recruitment);
  const {
    allCompany: { results = [], loading = true },
  } = useSelector((state: IRootState) => state.company);

  const employerSeenRecord = record?.employerSeenRecord || [];
  const { currentUser } = useSelector((state: IRootState) => state.auth);
  const { t } = useTranslation(["job-management"]);
  const dispatch = useDispatch();
  const query = useRouter().query;
  const { page: _page = 1 } = query;
  const [companyId, setCompanyId] = useState<string>();

  const page = Number(_page);

  useEffect(() => {
    getBestRecruitmentAPI();
  }, []);

  useEffect(() => {
    if (!isEmpty(currentUser)) {
      getAllCompanyAPI();
      getRecordByUserIdAPI();
    }
  }, [currentUser]);

  useEffect(() => {
    if (companyId) {
      let slug = "";
      results?.map((company) => {
        if (company?._id === companyId) {
          slug = company?.slug;
        }
      });
      if (slug) {
        redirect(PATH.COMPANY_DETAIL, { slug });
      }
    }
  }, [companyId]);

  const getAllCompanyAPI = () => {
    dispatch(getAllCompany({}));
  };
  const getRecordByUserIdAPI = () => {
    const payload: IGetRecordByUserId = {
      userId: currentUser?.userInfo?._id,
    };

    dispatch(getRecordByUserId(payload));
  };
  const getBestRecruitmentAPI = () => {
    const payload: IGetBestRecruitment = {
      size: 6,
    };
    dispatch(getBestRecruitment(payload));
  };

  const renderDetail = (record: IEmployerSeenRecord) => {
    return (
      <Detail onClick={() => setCompanyId(record?.employer?.company?._id)}>
        {t("view-detail")}
      </Detail>
    );
  };
  const handleChangePage = (newPage: number) => {
    redirect(PATH.JOB_MANAGEMENT_EMPLOYER_VIEW_PROFILE, undefined, {
      page: newPage,
    });
  };
  const Column: IColumns = useMemo(
    () => [
      {
        text: "STT",
        formatter: (_: string, record, index) => index,
      },
      {
        text: t("name-of-employer"),
        dataField: "employer.displayName",
      },
      {
        text: t("day-seen"),
        dataField: "daySeen",
        formatter: (_: string, record: IEmployerSeenRecord) =>
          dayjs(record.date).format("DD-MM-YYYY"),
      },
      {
        text: t("time-seen"),
        dataField: "views",
      },
      {
        text: t("infomation-of-employer"),
        formatter: (_: string, record: IEmployerSeenRecord) =>
          renderDetail(record),
      },
    ],
    [page],
  );
  return (
    <Container>
      <WrapTable>
        <Title>{t("employer-view-profile")}</Title>
        {employerSeenRecord.length > 0 ? (
          <Table
            columns={Column}
            data={employerSeenRecord}
            page={page}
            totalSize={employerSeenRecord?.length}
            sizePerPage={SIZE_PER_PAGE}
            className="mb-2"
            onPageChange={handleChangePage}
          />
        ) : (
          <EmptyJob>
            <SVG
              name="job-management/manager-image"
              width={148}
              height={148}
            ></SVG>
            <Text>{t("notification-empty-seen")}</Text>
          </EmptyJob>
        )}
      </WrapTable>
      <RelatedJob bestRecruitment={bestRecruitment} title={t("favorite-job")} />
    </Container>
  );
};

export default EmployerViewProfile;
