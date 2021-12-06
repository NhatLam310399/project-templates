import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

import { IRecruitment } from "@common/typings";
import { renderLocation } from "@common/functions";
import Link from "@designs/Link";
import { PATH } from "@routes/index";
import {
  CardContainer,
  Content,
  LeftCard,
  RightCard,
  Text,
  TimeApply,
  TimeTitle,
  Title,
} from "./style";
interface ICardJobApplied {
  recruitment: IRecruitment;
  date: Date;
}
const CardJobApplied: React.FC<ICardJobApplied> = (props) => {
  const { recruitment, date } = props;
  const { t } = useTranslation(["common"]);

  const { level, location, createdAt, name, slug } = recruitment;
  const locationArray = location?.map((item) => item.province?.name);
  const locationString = renderLocation(locationArray);
  return (
    <CardContainer>
      <LeftCard>
        <Link routeName={PATH.JOB_DETAIL} params={{ slug }}>
          <Title>{name}</Title>
        </Link>
        <Content>
          <Text>{level?.name}</Text>
          <Text>{locationString}</Text>
          <Text>{dayjs(createdAt).format("DD/MM/YYYY")}</Text>
        </Content>
      </LeftCard>
      <RightCard>
        <TimeTitle>{t("applied")}</TimeTitle>
        <TimeApply>{dayjs(date).format("DD/MM/YYYY")}</TimeApply>
      </RightCard>
    </CardContainer>
  );
};

export default CardJobApplied;
