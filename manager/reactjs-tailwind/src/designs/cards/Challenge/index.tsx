import { IChallenge } from "typings";
import Image from "designs/Image";
import {
  ItemContainer,
  Heading,
  Content,
  Other,
  Point,
  NumberPoint,
} from "./styles";
import SVG from "designs/SVG";

interface IChallengeCardProps {
  challenge: IChallenge | null;
  doneChallenge: boolean;
  onClick?: (challenge: IChallenge) => void;
}

const ChallengeCard: React.FC<IChallengeCardProps> = ({
  challenge,
  doneChallenge = false,
  onClick,
}) => {
  const handleClick = () => {
    challenge && onClick && onClick(challenge);
  };
  return (
    <ItemContainer onClick={() => handleClick}>
      <Heading>
        <Point isDone={doneChallenge!}>
          <SVG
            name={`dashboard/${doneChallenge ? "diamond" : "disablediamond"}`}
            width="13px"
            height="12px"
          />
          <NumberPoint isDone={doneChallenge!}>{challenge?.point}</NumberPoint>
        </Point>
        {!doneChallenge ? (
          <SVG name="dashboard/block" className="w-2 h-2" />
        ) : null}
      </Heading>
      <Content>
        <Image
          src={challenge?.icon?.default || ""}
          width="36px"
          height="36px"
        />
        <Other.Container>
          <Other.Title>{challenge?.name}</Other.Title>
          <Other.Desc>{challenge?.content}</Other.Desc>
        </Other.Container>
      </Content>
    </ItemContainer>
  );
};

export default ChallengeCard;
