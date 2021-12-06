import { YourCampaignsContainer, Title, Desc } from "./styles";

import Form from "./Form";
import Raising from "./Raising";
import Choose from "./Choose";
import ProcessStep from "components/ProcessStep";
import { Wrapper, Container } from "designs/PageLayout";
interface IYourCampaignsProps {}

const YourCampaigns: React.FC<IYourCampaignsProps> = props => {
  return (
    <Wrapper>
      <Container>
        <YourCampaignsContainer>
          <ProcessStep
            currentStep={3}
            listSteps={["Desgin", "Story", "Setting"]}
          />
          <Title>Tell Your Story</Title>
          <Desc>
            Give your community a reason to fund your passion or cause.
          </Desc>
        </YourCampaignsContainer>
        <Form />
        <Raising />
        <Choose />
      </Container>
    </Wrapper>
  );
};

export default YourCampaigns;
