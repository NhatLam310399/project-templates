import { useTranslation } from "react-i18next";

import { IEvaluate } from "@common/typings";

import Card from "./components/card";
import { Container, ListCard, Title } from "./styled";

interface IRequestEvaluatedProps {
  listEvaluate: IEvaluate[];
}

const RequestEvaluated: React.FC<IRequestEvaluatedProps> = ({
  listEvaluate,
}) => {
  const { t } = useTranslation(["job-management"]);

  return (
    <Container>
      <Title>
        {listEvaluate?.length > 0
          ? t("request-evaluated")
          : t("nothing-request-evaluted")}
      </Title>

      {listEvaluate?.length > 0 && (
        <>
          <ListCard>
            {listEvaluate?.map((item, key) => (
              <Card data={item} key={key} />
            ))}
          </ListCard>
        </>
      )}
    </Container>
  );
};
export default RequestEvaluated;
