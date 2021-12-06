import { CampaignsContainer, Title } from "./styles";
import Table from "./Table";
import Collection from "./Collection";
interface ICampaignsProps {}

const Campaigns: React.FC<ICampaignsProps> = props => {
  return (
    <CampaignsContainer>
      <Title>Your Campaigns</Title>
      <Table />
      <Title>Your Collection</Title>
      <Collection />
    </CampaignsContainer>
  );
};

export default Campaigns;
