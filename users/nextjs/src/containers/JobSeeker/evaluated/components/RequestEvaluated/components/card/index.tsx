import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { renderCareer } from "@common/functions";
import { IEvaluate, IAnswer } from "@common/typings";
import EvaluateDialog from "./components/Dialog";

import {
  Container,
  Content,
  ContentWrapper,
  Title,
  ImageWrapper,
  Image,
  ButtonWrapper,
  TextButton,
  TextWrap,
  TextContent,
} from "./style";

interface ICardProps {
  data: IEvaluate;
}

const skeletonImage = "/img/skeleton/default-small.jpg";

const Card: React.FC<ICardProps> = ({ data }) => {
  const { t } = useTranslation(["job-management"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [listAnswer, setListAnswer] = useState<IAnswer[]>([]);

  const {
    evaluator: { company },
    avgPoint,
  } = data;

  const locationArray = company?.province?.map((item) => item?.name);
  const locationString = renderCareer(locationArray);
  const careerArray = company?.career?.map((item) => item?.name);
  const careerString = renderCareer(careerArray);

  useEffect(() => {
    createListAnswer();
  }, []);

  const createListAnswer = () => {
    let newArray = [];
    for (const item in data) {
      if (item.includes("answer")) {
        newArray.push({
          answer: data[item],
        });
      }
    }
    setListAnswer(newArray);
  };

  const onOpenDialog = () => {
    setIsOpen(true);
  };

  return (
    <Container>
      <ContentWrapper>
        <ImageWrapper>
          <Image
            src={
              company?.logo?.small ||
              company?.logo?.default ||
              company?.logo?.medium ||
              skeletonImage
            }
            alt={company?.name}
          />
        </ImageWrapper>
        <Content>
          <Title className="paragraph-with-1-line">{company?.name}</Title>
          <TextWrap>
            <TextContent className="paragraph-with-2-line">
              {locationString}
            </TextContent>
          </TextWrap>
          <TextWrap>
            <TextContent className="paragraph-with-2-line">
              {careerString}
            </TextContent>
          </TextWrap>
        </Content>
      </ContentWrapper>
      <ButtonWrapper>
        <TextButton onClick={onOpenDialog}>
          {t("feedback-infomation")}
        </TextButton>
        <EvaluateDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          listAnswer={listAnswer}
          avgPoint={avgPoint}
        />
      </ButtonWrapper>
    </Container>
  );
};

export default Card;
