import { useHistory } from "react-router";
import { CollectionContainer, Title, Desc } from "./styles";
import SVG from "designs/SVG";
import Button from "designs/Button";
import { PATH } from "common/constants/routes";

interface ICollectionProps {}

const Collection: React.FC<ICollectionProps> = props => {
  const history = useHistory();
  const onClickStartCampaign = () => {
    history.push(PATH.FUNDRAISING_CAMPAIGN);
  };
  return (
    <CollectionContainer>
      <SVG name="fundraising/shirt" width={50} height={50} />
      <div className="flex flex-col gap-1 justify-center items-center">
        <Title>Hold on</Title>
        <Desc>You are one campaign away from starting a collection</Desc>
        <Button onClick={onClickStartCampaign}>Start Campaign</Button>
      </div>
    </CollectionContainer>
  );
};

export default Collection;
