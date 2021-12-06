import { SupportContainer, Content } from "./styles";
import SVG from "designs/SVG";
import Button from "designs/Button";
interface ISupportProps {}

const Support: React.FC<ISupportProps> = props => {
  return (
    <SupportContainer>
      <Content.Wrapper>
        <SVG name="fundraising/light" width={44} height={44} />
        <Content.Box>
          <Content.Title>Increase your support</Content.Title>
          <Content.Desc>
            Learn how to create a successful campaign and raise awareness.
          </Content.Desc>
        </Content.Box>
      </Content.Wrapper>
      <Button>Access Free Tips</Button>
    </SupportContainer>
  );
};

export default Support;
