import { useTranslation } from "next-i18next";
import { PATH } from "@routes";
import ResponsiveImage from "@designs/ResponsiveImage";
import {
  ComingSoonContainer,
  Content,
  Title,
  Text,
  NavigationWrapper,
  Link,
} from "./styles";

const ComingSoon: React.FC = () => {
  const { t } = useTranslation(["maintain"]);

  return (
    <ComingSoonContainer>
      <ResponsiveImage
        alt="Comming Soon Page"
        width="100vw"
        height="100vh"
        largeSrc="/img/comming-soon/comming-soon.jpg"
        smallSrc="/img/comming-soon/comming-soon.jpg"
        className="w-screen h-screen object-cover"
      />
      <Content>
        <Title>{t("coming")}</Title>
        <Text>{t("coming-soon")}</Text>
      </Content>
    </ComingSoonContainer>
  );
};

export default ComingSoon;
