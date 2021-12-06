import { useTranslation } from "react-i18next";

import { getBetweenDay, renderLocation } from "@common/functions";
import usePrice from "@common/hooks/usePrice";

import { IRecruitment } from "@common/typings";

import { Benefit, Container, Meta, Title } from "./styles";

interface IRelatedJobProps {
  job: IRecruitment;
}

const today = new Date();

const RelatedJob: React.FC<IRelatedJobProps> = ({ job }) => {
  const { t } = useTranslation("job");
  const { companyBenefit, updatedAt, salaryMax, location, dealSalary } = job;
  const updateDay = getBetweenDay(new Date(updatedAt), today);

  const locationArray = location?.map((item) => item.province?.name);
  const locationString = renderLocation(locationArray);

  const { renderCompactedPrice } = usePrice();
  let salaryDisplay = renderCompactedPrice(salaryMax);

  return (
    <Container>
      <Title>{job?.name}</Title>
      <Meta.List>
        <Meta.Item>
          {dealSalary ? t("deal-salary") : `${salaryMax} ${t("unit")}`}
        </Meta.Item>
        <Meta.Item>{locationString}</Meta.Item>
        <Meta.Item>
          {updateDay == 0
            ? t("today")
            : t("previous").replace("$update", String(updateDay))}
        </Meta.Item>
      </Meta.List>
      <Benefit.Container>
        {companyBenefit?.map((benefit, index) => (
          <Benefit.Item key={index}>
            {benefit?.icon && (
              <Benefit.Icon
                src={benefit?.icon?.icon?.small}
                alt={benefit?.content}
              />
            )}
            <Benefit.Name>{benefit?.icon?.name}</Benefit.Name>
          </Benefit.Item>
        ))}
      </Benefit.Container>
    </Container>
  );
};

export default RelatedJob;
