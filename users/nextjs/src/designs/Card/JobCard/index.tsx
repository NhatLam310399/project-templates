import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { PATH } from "@routes";

import { getBetweenDay, renderLocation } from "@common/functions";
import usePrice from "@common/hooks/usePrice";
import { IRecruitment } from "@common/typings";
import useAuth from "@common/hooks/useAuth";
import { setSeenRecruitment } from "@redux/actions/recruitment";

import Benefit from "@designs/Benefit";
import {
  BenefitContainer,
  CompanyName,
  Content,
  Img,
  LinkWrapper,
  Link,
  Location,
  Logo,
  JobCardContainer,
  JobCardWrapper,
  SalaryWrapper,
  Title,
  UpdateTime,
} from "./styles";

interface IJobCardProps {
  job: IRecruitment;
}

const skeletonImage = "/img/skeleton/default-small.jpg";
const today = new Date();

const JobCard: React.FC<IJobCardProps> = ({ job }) => {
  const { t } = useTranslation(["job"]);
  const dispatch = useDispatch();
  const {
    _id,
    name,
    companyBenefit,
    companySlug,
    companyLogo,
    companyName,
    location,
    updatedAt,
    expiredDate,
    salaryMin,
    salaryMax,
    slug,
    company,
    dealSalary,
  } = job;

  const { accountInfo } = useAuth();
  const userInfo = accountInfo?.userInfo || {};

  const locationArray = location?.map((item) => item.province?.name);
  const locationString = renderLocation(locationArray);
  const updateDay = getBetweenDay(new Date(updatedAt), today);
  const expiredDay = getBetweenDay(today, new Date(expiredDate));

  const { renderCompactedPrice } = usePrice();
  let salaryMinDisplay = renderCompactedPrice(salaryMin);
  let salaryMaxDisplay = renderCompactedPrice(salaryMax);

  const handleClickJob = () => {
    if (isEmpty(userInfo)) return;
    dispatch(
      setSeenRecruitment({
        userId: userInfo?._id,
        recruitmentId: _id,
      }),
    );
  };

  return (
    <JobCardWrapper>
      <JobCardContainer>
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

        <Content>
          <LinkWrapper onClick={handleClickJob}>
            <Link
              className="paragraph-with-2-line"
              routeName={PATH.JOB_DETAIL}
              params={{ slug: slug }}
            >
              <Title title={name} className="paragraph-with-1-line">
                {name}
              </Title>
            </Link>
          </LinkWrapper>
          <Link
            className="paragraph-with-1-line"
            routeName={PATH.COMPANY_RECRUITMENT}
            params={{ slug: companySlug }}
          >
            <CompanyName>{companyName}</CompanyName>
          </Link>
          <Location>{locationString}</Location>
          <UpdateTime>
            {updateDay == 0
              ? t("updated-today")
              : t("updated-has-number").replace("$update", String(updateDay))}
            -
            {expiredDay <= 0
              ? t("expired")
              : t("expired-has-number").replace("$date", String(expiredDay))}
          </UpdateTime>
          <BenefitContainer>
            {companyBenefit?.map((item) => (
              <Benefit
                urlImg={
                  item?.icon?.icon?.small ||
                  item?.icon?.icon?.medium ||
                  item?.icon?.icon?.default
                }
                text={item?.icon?.name}
              />
            ))}
          </BenefitContainer>
          <SalaryWrapper>
            {Object.keys(userInfo).length > 0 ? (
              <div>
                {dealSalary
                  ? t("deal-salary")
                  : `${salaryMin} ${t("unit")} - ${salaryMax} ${t("unit")}`}
              </div>
            ) : (
              <Link routeName={PATH.LOGIN} isSecondary>
                {t("login-to-see")}
              </Link>
            )}
          </SalaryWrapper>
        </Content>
      </JobCardContainer>
    </JobCardWrapper>
  );
};

export default JobCard;
