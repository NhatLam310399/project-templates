import { useState } from "react";
import { useSelector } from "react-redux";

import { IRootState, IChallengeType, IChallenge } from "typings";
import ChallengeCard from "designs/cards/Challenge";
import ChallengesCommon from "../../../components/ChallengeLayout";
import Slide from "components/Slide";
import { ChallengeContainer, Content, Wrapper } from "./styles";

interface IChallengeProps {}

const Challenge: React.FC<IChallengeProps> = props => {
  const {
    allChallengeType: { results = [] },
  } = useSelector((state: IRootState) => state.challenge);

  const renderElement = (temp: IChallengeType[]) => {
    const result: JSX.Element[] = [];
    const length = Math.ceil(temp.length / 4);

    for (let i = 0; i < length; i++) {
      const resultTemp = [];
      for (let j = 0; j < 4; j++) {
        if (temp[4 * i + j]) {
          const value = temp[4 * i + j];
          resultTemp.push(
            <div>
              <ChallengeCard
                challenge={value?.challenge!}
                doneChallenge={value?.doneChallenge!}
              />
            </div>,
          );
        }
      }
      result.push(<Content>{resultTemp}</Content>);
    }

    return result;
  };
  const size = Math.ceil(results?.length / (window.innerWidth >= 1024 ? 2 : 4));
  return (
    <ChallengeContainer>
      <ChallengesCommon>
        <Slide numberStep={size - 1} gap={220}>
          <Wrapper>{renderElement(results)}</Wrapper>
        </Slide>
      </ChallengesCommon>
    </ChallengeContainer>
  );
};

export default Challenge;
