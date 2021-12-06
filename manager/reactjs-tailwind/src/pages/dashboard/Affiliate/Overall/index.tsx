import { useRef } from "react";
import {
  OverallContainer,
  Title,
  Box,
  Text,
  Grid,
  Other,
  Inputs,
  LabelInput,
  InputWrapper,
  Icon,
  Desc,
} from "./styles";
import Chart from "./Chart";
import { Wrapper, Container } from "designs/PageLayout";

import Button from "designs/Button";
import SVG from "designs/SVG";

interface IOverallProps {}

const Overall: React.FC<IOverallProps> = props => {
  const refCopyAffiliate = useRef<any>(null);

  const onClickCopy = () => {
    refCopyAffiliate.current.select();
    refCopyAffiliate.current.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(refCopyAffiliate.current.value);
  };
  return (
    <Wrapper>
      <Container>
        <OverallContainer>
          <Title>Affiliate : Overall</Title>
          <Box>
            <SVG name="affiliate/book" height={98} width={98} />
            <Text.Wrapper>
              <Text.Title>Fill out our quick survey</Text.Title>
              <Text.SubTitle>
                Help us improve our affiliate program by answering these
                questions
              </Text.SubTitle>
            </Text.Wrapper>
          </Box>
          <Grid.Wrapper>
            <Grid.Row>
              <Grid.Col>
                <Text.SubTitle>Affiliate clicks</Text.SubTitle>
                <Text.Title>8</Text.Title>
              </Grid.Col>
              <Grid.Col>
                <Text.SubTitle>Affiliate clicks</Text.SubTitle>
                <Text.Title>8</Text.Title>
              </Grid.Col>
              <Grid.Col>
                <Text.SubTitle>Affiliate clicks</Text.SubTitle>
                <Text.Title>8</Text.Title>
              </Grid.Col>
              <Grid.Col>
                <Text.SubTitle>Affiliate clicks</Text.SubTitle>
                <Text.Title>8</Text.Title>
              </Grid.Col>
              <Grid.Col>
                <Text.SubTitle>Affiliate clicks</Text.SubTitle>
                <Text.Title>8</Text.Title>
              </Grid.Col>
              <Grid.Col>
                <Text.SubTitle>Affiliate clicks</Text.SubTitle>
                <Text.Title>8</Text.Title>
              </Grid.Col>
            </Grid.Row>
          </Grid.Wrapper>
          <Chart />
          <Other.Wrapper>
            <Other.Title>Affiliate link</Other.Title>
            <Other.Body>
              <InputWrapper>
                <div className="">
                  <LabelInput>
                    Here is your default affiliate link. Send it to potential
                    customers.
                  </LabelInput>
                  <Inputs
                    disabled={true}
                    value="https://www.printful.com/a/1889126:b7ded88fe0b93fad4a88775a1bd0ec4d"
                    ref={refCopyAffiliate}
                  />
                </div>
                <Button onClick={onClickCopy} className="w-full phone:w-auto">
                  Copy Link
                </Button>
              </InputWrapper>
              <Icon.Wrapper>
                <LabelInput>Share on social media</LabelInput>
                <Icon.IconWrapper>
                  <SVG name="affiliate/facebook" height={36} width={36} />
                  <SVG name="affiliate/twitter" height={36} width={36} />
                  <SVG name="affiliate/linkedin" height={36} width={36} />
                </Icon.IconWrapper>
              </Icon.Wrapper>
            </Other.Body>
            <Desc>
              To customize link, go to{" "}
              <span className="text-primary-1">Settings</span>
            </Desc>
          </Other.Wrapper>
        </OverallContainer>
      </Container>
    </Wrapper>
  );
};

export default Overall;
