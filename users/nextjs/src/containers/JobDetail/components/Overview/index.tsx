import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";

import {
  IGetUser,
  IRecruitment,
  IRootState,
  ISetAppliedRecruitment,
  ISetSavedRecruitment,
} from "@common/typings";
import { renderLocation } from "@common/functions";
import { getUserCookies } from "@common/utils/auth";
import usePrice from "@common/hooks/usePrice";

import _Link from "@designs/Link";

import { PATH } from "@routes";
import { getUserProfile } from "@redux/actions/user";
import {
  setAppliedRecruitment,
  setSavedRecruitment,
} from "@redux/actions/recruitment";
import { resetAction } from "@redux/actions/common";

import {
  Button,
  ButtonWrapper,
  Container,
  CompanyName,
  Img,
  Link,
  Logo,
  Location,
  MainContent,
  OverviewWrapper,
  Salary,
  SalaryWrapper,
  Title,
  CompanyClick,
  Field,
} from "./styles";
import { setSeenCompany } from "@redux/actions/company";

interface JobOverviewProps {
  recruitment: IRecruitment;
}

const skeletonImage = "/img/skeleton/default-small.jpg";

const Overview: React.FC<JobOverviewProps> = ({ recruitment }) => {
  const { t } = useTranslation(["job"]);
  const dispatch = useDispatch();

  const {
    companyLogo,
    companyName,
    companySlug,
    location,
    name,
    salaryMax,
    company,
    dealSalary,
  } = recruitment;

  const { user } = useSelector((state: IRootState) => state.user);
  const { currentUser } = useSelector((state: IRootState) => state.auth);
  const { actionSuccess } = useSelector((state: IRootState) => state.actions);

  const [isApplied, setIsApplied] = useState<boolean>();
  const [isSaved, setIsSaved] = useState<boolean>();

  const userInfo = currentUser?.userInfo || {};

  const locationArray = location?.map((item) => item.province.name);
  const locationString = renderLocation(locationArray);

  const { renderCompactedPrice } = usePrice();
  let salaryDisplay = renderCompactedPrice(salaryMax);

  useEffect(() => {
    getUserProfileAPI();
  }, []);

  useEffect(() => {
    checkApplied();
    checkSaved();
  }, [user]);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(resetAction());
      getUserProfileAPI();
      checkApplied();
      checkSaved();
    }
  }, [actionSuccess]);
  const handleApply = () => {
    setAppliedRecruitmentAPI(user?._id, recruitment?._id);
  };

  const handleSave = () => {
    setSaveRecruitmentAPI(user?._id, recruitment?._id);
  };

  const setAppliedRecruitmentAPI = (userId: string, recruitmentId: string) => {
    const payload: ISetAppliedRecruitment = {
      userId: userId,
      recruitmentId: recruitmentId,
    };
    dispatch(setAppliedRecruitment(payload));
  };

  const setSaveRecruitmentAPI = (userId: string, recruitmentId: string) => {
    const payload: ISetSavedRecruitment = {
      userId: userId,
      recruitmentId: recruitmentId,
    };
    dispatch(setSavedRecruitment(payload));
  };

  const getUserProfileAPI = () => {
    const payload: IGetUser = {
      id: getUserCookies()?.userInfo?._id,
    };
    dispatch(getUserProfile(payload));
  };

  const checkApplied = () => {
    const listAppliedId = user?.appliedRecruitment?.map(
      (item) => item?.recruitment?._id,
    );
    if (listAppliedId?.includes(recruitment?._id)) {
      setIsApplied(true);
    }
  };

  const checkSaved = () => {
    const listSavedId = user?.savedRecruitment?.map((item) => item?._id);
    if (listSavedId?.includes(recruitment?._id)) {
      setIsSaved(true);
    }
  };
  const handleSetSeenCompany = () => {
    if (isEmpty(userInfo)) return;
    dispatch(
      setSeenCompany({
        companyId: company?._id,
        userId: userInfo?._id,
      }),
    );
  };
  return (
    <OverviewWrapper>
      <Container>
        <Logo>
          <Img
            src={
              companyLogo?.small ||
              companyLogo?.default ||
              companyLogo?.medium ||
              skeletonImage
            }
            alt={name}
            loading="lazy"
          />
        </Logo>
        <MainContent>
          <Title>{name}</Title>
          <CompanyClick onClick={handleSetSeenCompany}>
            <CompanyName
              routeName={PATH.COMPANY_RECRUITMENT}
              params={{ slug: companySlug }}
            >
              {companyName}
            </CompanyName>
          </CompanyClick>

          <Location>
            {t("location")}: {locationString}
          </Location>
          <SalaryWrapper>
            <Field>{t("salary")}: </Field>
            <Salary>
              {isEmpty(userInfo) ? (
                <_Link routeName={PATH.LOGIN}>{t("login-to-see")}</_Link>
              ) : dealSalary ? (
                t("deal-salary")
              ) : (
                `${salaryMax} ${t("unit")}`
              )}
            </Salary>
          </SalaryWrapper>
          <ButtonWrapper>
            {Object.keys(userInfo).length > 0 ? (
              <Button
                onClick={handleApply}
                style={{
                  opacity: isApplied ? 0.5 : 1,
                  pointerEvents: isApplied ? "none" : "initial",
                }}
              >
                {isApplied ? t("applied") : t("apply")}
              </Button>
            ) : (
              <Link routeName={PATH.LOGIN}>{t("apply")}</Link>
            )}
            {Object.keys(userInfo).length > 0 ? (
              <Button
                onClick={handleSave}
                style={{
                  opacity: isSaved ? 0.5 : 1,
                  pointerEvents: isSaved ? "none" : "initial",
                }}
              >
                {isSaved ? t("saved-job") : t("save-job")}
              </Button>
            ) : (
              <Link routeName={PATH.LOGIN}>{t("save-job")}</Link>
            )}
          </ButtonWrapper>
        </MainContent>
      </Container>
    </OverviewWrapper>
  );
};

export default Overview;
