import {
  Wrapper,
  Container,
  TextContent,
  Title,
  Detail,
  Text404,
  Button,
} from "./styles";
import { SVG } from "@designs/SVG";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const NotFound: React.FC = () => {
  const { t } = useTranslation(["notfound"]);
  const router = useRouter();

  return (
    <Wrapper className="wrapper">
      <Container className="container">
        <TextContent>
          <Text404>{t("404")}.</Text404>
          <Title>{t("title")}</Title>
          <Detail>{t("detail")}</Detail>
          <Button onClick={() => router.back()}>{t("go-back")}</Button>
        </TextContent>
        <SVG name="error/404-image" className="block mx-auto laptop:m-0" />
      </Container>
    </Wrapper>
  );
};

export default NotFound;
