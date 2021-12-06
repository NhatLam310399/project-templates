import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { isEmpty } from "lodash";
import {
  ICompany,
  IGetRecruitmentByCompany,
  IRootState,
} from "@common/typings";
import { extractVideoID } from "@common/functions/filterString";

import {
  AboutUs,
  Banner,
  Benefit,
  CompanyCardWrapper,
  Location,
  SectionWrapper,
  Title,
  VideoWrapper,
  Wrapper,
  Video,
} from "./styles";
import CompanyCard from "@designs/Card/CompanyCard";
import ErrorBoundary from "@components/ErrorBoundary";
import SliderImage from "./components/SliderImage";

export interface RecruitmentCompanyDetailProps {}

const skeletonImage = "/img/skeleton/banner-default.jpg";

const RecruitmentCompanyDetail: React.FC<RecruitmentCompanyDetailProps> = () => {
  const { t } = useTranslation(["company"]);
  const [company, setCompany] = useState<ICompany>({});
  const {
    allRecruitment: { results = [], loading = true },
  } = useSelector((state: IRootState) => state.recruitment);
  const {
    companyName,
    companyVideo,
    companyImages,
    companyBenefit,
    companyDescription,
    companyLocation,
  } = results?.[0] || {};

  const idVideo = extractVideoID(companyVideo);

  useEffect(() => {
    if (!loading && results?.length > 0) {
      const {
        companySlug = "",
        companyLogo = {},
        companySize = "",
        companyName = "",
      } = results?.[0] || {};
      const recruitmentCompany: ICompany = {
        name: companyName,
        slug: companySlug,
        size: companySize,
        logo: companyLogo,
      };
      setCompany(recruitmentCompany);
    }
  }, [results]);
  return (
    <Wrapper>
      <ErrorBoundary>
        <Banner
          src={companyImages?.[0]?.default || skeletonImage}
          alt={companyName}
        />
      </ErrorBoundary>
      <ErrorBoundary>
        <CompanyCardWrapper className="container">
          <CompanyCard
            company={company!}
            request={false}
            companyLocation={companyLocation}
          />
        </CompanyCardWrapper>
      </ErrorBoundary>
      {companyDescription && (
        <ErrorBoundary>
          <SectionWrapper className="container">
            <AboutUs.Container>
              <Title>{t("about-us")}</Title>
              <AboutUs.Description
                dangerouslySetInnerHTML={{ __html: companyDescription }}
              />
            </AboutUs.Container>
          </SectionWrapper>
        </ErrorBoundary>
      )}
      <ErrorBoundary>
        <SectionWrapper className="container">
          {companyBenefit?.length > 0 && (
            <Benefit.Container>
              <Benefit.Title>{t("benefits")}</Benefit.Title>
              <Benefit.ListItem>
                {companyBenefit?.map((benefit, index) => (
                  <Benefit.Item key={index}>
                    <Benefit.Icon
                      src={
                        benefit?.icon?.icon?.default ||
                        benefit?.icon?.icon?.medium ||
                        benefit?.icon?.icon?.small
                      }
                      alt={benefit?.icon?.name}
                    />
                    <Benefit.TitleItem>{benefit?.icon?.name}</Benefit.TitleItem>
                    <Benefit.Detail>
                      {benefit?.icon?.description}
                    </Benefit.Detail>
                  </Benefit.Item>
                ))}
              </Benefit.ListItem>
            </Benefit.Container>
          )}
        </SectionWrapper>
      </ErrorBoundary>
      {companyImages?.length > 0 && (
        <ErrorBoundary>
          <SectionWrapper className="container">
            <Location.Container>
              <Location.Title>{t("images")}</Location.Title>
              <Location.SliderWrapper>
                {companyImages?.map((image, index) => (
                  <Location.ImgContainer>
                    <Location.Img
                      key={index}
                      src={image?.default || image?.medium || image?.small}
                      alt={companyName}
                    />
                  </Location.ImgContainer>
                ))}
              </Location.SliderWrapper>
            </Location.Container>
          </SectionWrapper>
        </ErrorBoundary>
      )}
      {companyVideo && (
        <ErrorBoundary>
          <SectionWrapper className="container">
            <VideoWrapper>
              <Video
                className="video"
                src={`https://www.youtube.com/embed/${idVideo}`}
              />
            </VideoWrapper>
          </SectionWrapper>
        </ErrorBoundary>
      )}
    </Wrapper>
  );
};

export default RecruitmentCompanyDetail;
