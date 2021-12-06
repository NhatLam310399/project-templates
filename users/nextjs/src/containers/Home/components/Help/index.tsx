import { SVG } from "@designs/SVG";
import { useTranslation } from "next-i18next";
import { HelpContainer, Title, Grid, Item } from "./styles";

const Help: React.FC = () => {
  const { t } = useTranslation(["home"]);
  return (
    <HelpContainer className="container">
      <Title>{t("help.what-we-can-help")}</Title>
      <Grid>
        <Item.Container>
          <SVG name="home/jobseeker" />
          <Item.Title>{t("help.introduction-personal-job.title")}</Item.Title>
          <Item.Description>
            {t("help.introduction-personal-job.content")}
          </Item.Description>
        </Item.Container>
        <Item.Container>
          <SVG name="home/time" />
          <Item.Title>{t("help.quick-register.title")}</Item.Title>
          <Item.Description>
            {t("help.quick-register.content")}
          </Item.Description>
        </Item.Container>
        <Item.Container>
          <SVG name="home/notification" />
          <Item.Title>{t("help.searching-while-moving.title")}</Item.Title>
          <Item.Description>
            {t("help.searching-while-moving.content")}
          </Item.Description>
        </Item.Container>
      </Grid>
    </HelpContainer>
  );
};

export default Help;
