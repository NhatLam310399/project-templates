import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { IGetRecruitmentByCompany, IRootState } from "@common/typings";
import { extractVideoID } from "@common/functions/filterString";

import { getRecruitmentByCompany } from "@redux/actions/recruitment";

import {
  AboutUs,
  Banner,
  Benefit,
  CompanyCardWrapper,
  ListCard,
  Location,
  OpportunityContainer,
  OpportunityWrapper,
  SectionWrapper,
  Title,
  VideoWrapper,
  Wrapper,
  Video,
} from "./styles";
import CompanyCard from "@designs/Card/CompanyCard";
import Opportunity from "@designs/Card/OpportunityCard";
import ErrorBoundary from "@components/ErrorBoundary";
import SliderImage from "./components/SliderImage";

export interface CompanyDetailProps {}

const skeletonImage = "/img/skeleton/banner-default.jpg";

const CompanyDetail: React.FC<CompanyDetailProps> = () => {
  const { t } = useTranslation(["company"]);
  const dispatch = useDispatch();
  const { companyDetail = {} } = useSelector(
    (state: IRootState) => state.company,
  );
  const {
    allRecruitment: { results: allRecruitment },
  } = useSelector((state: IRootState) => state.recruitment);
  const { images = [], name, _id, location, description, benefits, videos } =
    companyDetail || {};
  const idVideo = extractVideoID(videos);

  useEffect(() => {
    if (Object.keys(companyDetail).length > 0 && _id) {
      getRecruitmentAPI(_id);
    }
  }, [companyDetail]);

  const getRecruitmentAPI = (id: string) => {
    const payload: IGetRecruitmentByCompany = {
      companyId: id,
    };
    dispatch(getRecruitmentByCompany(payload));
  };
  return (
    <Wrapper>
      <ErrorBoundary>
        <Banner src={images[0]?.default || skeletonImage} alt={name} />
      </ErrorBoundary>
      <ErrorBoundary>
        <CompanyCardWrapper className="container">
          <CompanyCard company={companyDetail} />
        </CompanyCardWrapper>
      </ErrorBoundary>
      <ErrorBoundary>
        <SectionWrapper>
          {allRecruitment?.length > 0 && (
            <OpportunityWrapper>
              <OpportunityContainer className="container">
                <Title>{t("opportunity")}</Title>
                <ListCard>
                  {allRecruitment?.map((recruitment, index) => (
                    <Opportunity key={index} recruitment={recruitment} />
                  ))}
                </ListCard>
              </OpportunityContainer>
            </OpportunityWrapper>
          )}
        </SectionWrapper>
      </ErrorBoundary>
      {location && (
        <ErrorBoundary>
          <SectionWrapper className="container">
            <Location.Container>
              <Location.Info>
                <Title>{t("address")}</Title>
                <Location.Detail>
                  <Location.DetailItem>{location}</Location.DetailItem>
                </Location.Detail>
              </Location.Info>
              <Location.SliderWrapper>
                <SliderImage>
                  {images?.map((image, index) => (
                    <Location.Img
                      key={index}
                      src={image?.default || image?.medium || image?.small}
                      alt={name}
                    />
                  ))}
                </SliderImage>
              </Location.SliderWrapper>
            </Location.Container>
          </SectionWrapper>
        </ErrorBoundary>
      )}
      {description && (
        <ErrorBoundary>
          <SectionWrapper className="container">
            <AboutUs.Container>
              <Title>{t("about-us")}</Title>
              <AboutUs.Description
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </AboutUs.Container>
          </SectionWrapper>
        </ErrorBoundary>
      )}
      <ErrorBoundary>
        <SectionWrapper className="container">
          {benefits?.length > 0 && (
            <Benefit.Container>
              <Benefit.Title>{t("benefits")}</Benefit.Title>
              <Benefit.ListItem>
                {benefits?.map((benefit, index) => (
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
      {videos && (
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

export default CompanyDetail;
