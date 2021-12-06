import React from "react";
import { useTranslation } from "next-i18next";
import { SVG } from "@designs/SVG";
import {
  MaintainContainer,
  BoxContent,
  BoxImage,
  Container,
  Text,
  Title,
} from "./styles";

const Maintain: React.FC = () => {
  const { t } = useTranslation(["maintain"]);
  return (
    <MaintainContainer>
      <Container className="container">
        <BoxContent>
          <Title>{t("title")}</Title>
          <Text>{t("content")}</Text>
        </BoxContent>
        <BoxImage>
          <SVG
            name="error/maintenance"
            width="100%"
            height="100%"
            className="w-full h-full"
          />
        </BoxImage>
      </Container>
    </MaintainContainer>
  );
};
export default Maintain;
