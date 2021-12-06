import { useTranslation } from "react-i18next";

import AvatarUploader from "./components/AvatarUploader";
import { SVG } from "@designs/SVG";
import {
  AvatarWrapper,
  Container,
  Content,
  Item,
  Score,
  Text,
  Title,
} from "./styles";

interface IOverviewProps {
  avatarURL: string;
  memberType: string;
  averageScore: number | string;
  accumulatedScore: number | string;
  userId?: string;
}

const Overview: React.FC<IOverviewProps> = (props) => {
  const {
    avatarURL,
    memberType,
    averageScore,
    accumulatedScore,
    userId,
  } = props;
  const { t } = useTranslation(["job-management"]);

  return (
    <Container>
      <AvatarWrapper>
        <AvatarUploader userId={userId} avatarURL={avatarURL} />
      </AvatarWrapper>

      <Content>
        <Item>
          <SVG name="job-management/medal-icon" className="w-3 phone:w-4" />
          <Title>{memberType}</Title>
        </Item>

        <Item>
          <SVG name="job-management/star-icon" className="w-3 phone:w-4" />
          <Text>
            {t("personal-info.average-score")}: <Score>{averageScore}</Score>
          </Text>
        </Item>

        <Item>
          <SVG name="job-management/point-icon" className="w-3 phone:w-4" />
          <Text>
            {t("personal-info.accumulated-points")} :{" "}
            <Score>{accumulatedScore}</Score>
          </Text>
        </Item>
      </Content>
    </Container>
  );
};

export default Overview;
