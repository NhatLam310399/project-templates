import { IRecruitment } from "@common/typings";

import {
  Content,
  BenefitWrapper,
  BenefitItem,
  DetailContainer,
  Icon,
  InformationContainer,
  MetaContainer,
  MetaItem,
  Text,
  TagsWrapper,
  TagItem,
  Section,
} from "./styles";
import { useTranslation } from "react-i18next";
import { SVG } from "@designs/SVG";
import { formatDate, renderLocation } from "@common/functions";

interface JobDetailProps {
  recruitment: IRecruitment;
}

const DetailContent: React.FC<JobDetailProps> = ({ recruitment }) => {
  const { t } = useTranslation(["job"]);

  const {
    companyBenefit,
    description,
    requirement,
    location,
    keywords,
    createdAt,
    level,
    career,
  } = recruitment;

  const careerString = renderLocation(career?.map((item) => item?.name));

  return (
    <DetailContainer>
      <Content>
        <InformationContainer>
          <Section.Container>
            <Section.Title>{t("benefits")}</Section.Title>
            <Section.Content>
              <BenefitWrapper>
                {companyBenefit?.map((benefit, index) => (
                  <BenefitItem key={index}>
                    {benefit?.icon && (
                      <Icon
                        src={benefit?.icon?.icon?.small}
                        alt={benefit?.content}
                      />
                    )}
                    <Text>{benefit?.content}</Text>
                  </BenefitItem>
                ))}
              </BenefitWrapper>
            </Section.Content>
          </Section.Container>
          <Section.Container>
            <Section.Title>{t("description")}</Section.Title>
            <Section.Content
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </Section.Container>
          <Section.Container>
            <Section.Title>{t("requirement")}</Section.Title>
            <Section.Content
              dangerouslySetInnerHTML={{ __html: requirement }}
            />
          </Section.Container>
          <Section.Container>
            <Section.Title>{t("location")}</Section.Title>
            <Section.Content>
              {location?.map((item, index) => (
                <div className="mb-1" key={index}>
                  {item?.location}
                </div>
              ))}
            </Section.Content>
          </Section.Container>
          <Section.Container>
            <Section.Title>{t("tags")}</Section.Title>
            <Section.Content>
              <TagsWrapper>
                {keywords?.map((tag, index) => (
                  <TagItem key={index}>{tag?.name}</TagItem>
                ))}
              </TagsWrapper>
            </Section.Content>
          </Section.Container>
        </InformationContainer>
        <MetaContainer>
          <MetaItem.Container>
            <SVG name="job/calendar" width="24" height="24" />
            <MetaItem.Content.Container>
              <MetaItem.Content.Title>{t("date")}</MetaItem.Content.Title>
              <MetaItem.Content.Text>
                {formatDate(createdAt, "vi")}
              </MetaItem.Content.Text>
            </MetaItem.Content.Container>
          </MetaItem.Container>
          <MetaItem.Container>
            <SVG name="job/level" width="24" height="24" />
            <MetaItem.Content.Container>
              <MetaItem.Content.Title>{t("level")}</MetaItem.Content.Title>
              <MetaItem.Content.Text>{level?.name}</MetaItem.Content.Text>
            </MetaItem.Content.Container>
          </MetaItem.Container>
          <MetaItem.Container>
            <SVG name="job/career" width="24" height="24" />
            <MetaItem.Content.Container>
              <MetaItem.Content.Title>{t("career")}</MetaItem.Content.Title>
              <MetaItem.Content.Text>{careerString}</MetaItem.Content.Text>
            </MetaItem.Content.Container>
          </MetaItem.Container>
        </MetaContainer>
      </Content>
    </DetailContainer>
  );
};

export default DetailContent;
