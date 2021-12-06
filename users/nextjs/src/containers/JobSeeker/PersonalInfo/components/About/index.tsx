import { useTranslation } from "next-i18next";

import { SVG } from "@designs/SVG";
import AddAboutDialog from "./components/AddAboutDialog";
import { Container, Title, Text, TitleWrapper } from "./styles";

interface IAboutProps {
  content: string;
  recordId: string;
  userId: string;
}

const About: React.FC<IAboutProps> = (props) => {
  const { content, recordId, userId } = props;
  const { t } = useTranslation(["job-management"]);

  return (
    <Container>
      <TitleWrapper>
        <Title>{t("personal-info.about.describe")}</Title>
        <AddAboutDialog
          ButtonMenu={<SVG name="job-management/edit" />}
          content={content || ""}
          userId={userId}
          recordId={recordId}
        />
      </TitleWrapper>

      <Text>{content}</Text>
    </Container>
  );
};

export default About;
