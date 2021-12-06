import ChallengeCard from "designs/cards/Challenge";
import { IChallenge, IRootState } from "typings";
import Section from "../components/Section";
import ShortCuts from "../components/Shortcuts";
import Videos from "../components/Videos";
import Challenge from "../components/ChallengeLayout";

import Slide from "components/Slide";
import YourStep from "./YourStep";
import { Content, RightSideContainer, LeftSideContainer } from "./styles";
import { useSelector } from "react-redux";

interface IStepProcessProps {}

const StepProcess: React.FC<IStepProcessProps> = props => {
  const {
    allChallengeType: { results = [] },
  } = useSelector((state: IRootState) => state.challenge);
  return (
    <>
      <Content>
        <LeftSideContainer>
          <Section
            title="Your next steps"
            subTitle="Set up your business, earn rewards, and start making money with Kingify!"
          >
            <YourStep />
          </Section>
        </LeftSideContainer>
        <RightSideContainer>
          <Section title="Your go-to shortcuts">
            <ShortCuts />
          </Section>
          <Section title="Kingify Challenge">
            <Challenge>
              <Slide numberStep={results?.length} gap={220}>
                {results?.map(item => (
                  <ChallengeCard
                    challenge={item?.challenge!}
                    doneChallenge={item?.doneChallenge!}
                  />
                ))}
              </Slide>
            </Challenge>
          </Section>
          <Section title="Videos">
            <Videos />
          </Section>
        </RightSideContainer>
      </Content>
    </>
  );
};

export default StepProcess;
