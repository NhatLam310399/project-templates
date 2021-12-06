import { useTranslation } from "next-i18next";

import { Wrapper, Container } from "./styles";
const BottomFooter: React.FC = () => {
  const { t } = useTranslation(["common"]);
  return (
    <Wrapper>
      <Container className="container">{t("bottom-footer")}</Container>
    </Wrapper>
  );
};

export default BottomFooter;
