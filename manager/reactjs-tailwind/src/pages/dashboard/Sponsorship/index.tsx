import { useState } from "react";
import { SponsorshipContainer, Heading, Body, Table, Others } from "./styles";
import DialogBenefit from "./DialogBenefit";
import { Wrapper, Container } from "designs/PageLayout";
import Button from "designs/Button";
import SVG from "designs/SVG";
interface ISponsorshipProps {}

const Sponsorship: React.FC<ISponsorshipProps> = props => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const onHandleBenefit = () => {
    setOpenDialog(true);
  };
  return (
    <Wrapper>
      <Container>
        <SponsorshipContainer>
          <Heading.Wrapper>
            <Heading.Title>Referral Program</Heading.Title>
            <Heading.Desc>It's a win-win: Save $5, get $5</Heading.Desc>
            <Heading.Detail>
              The ones ordering from your referral link gets $5 each on their
              first puchases, you also get $5 rewarded in Kingify points! You
              can redeem the points for Kingify perks.
            </Heading.Detail>
          </Heading.Wrapper>
          <Body>
            <Table.Wrapper>
              <div>
                <Table.Heading>
                  <div>
                    <Table.Title>
                      Points for all Printful challenges:{" "}
                      <span className="text-primary-1">0</span>
                    </Table.Title>
                    <Table.Desc>
                      Referral points: <span className="text-primary-1">0</span>
                    </Table.Desc>
                  </div>
                  <Button onClick={onHandleBenefit}>See the benifit</Button>
                </Table.Heading>
                <Table.ItemWrapper>
                  <Table.LeftContent>
                    {" "}
                    <p>Clicks on the link:</p>
                    <SVG name="sponsorship/warning" />
                  </Table.LeftContent>
                  <Table.RightCotent>0</Table.RightCotent>
                </Table.ItemWrapper>
                <Table.ItemWrapper>
                  <Table.LeftContent>
                    {" "}
                    <p>Discount codes allocated:</p>
                    <SVG name="sponsorship/warning" />
                  </Table.LeftContent>
                  <Table.RightCotent>
                    <span className="text-primary-1">0</span> of 200
                  </Table.RightCotent>
                </Table.ItemWrapper>
                <Table.ItemWrapper>
                  <Table.LeftContent>
                    {" "}
                    <p>Successful referrals:</p>
                    <SVG name="sponsorship/warning" />
                  </Table.LeftContent>
                  <Table.RightCotent>0</Table.RightCotent>
                </Table.ItemWrapper>
              </div>
            </Table.Wrapper>
          </Body>
          <Others.Wrapper>
            <Others.Title>Recommend Printful to a friend</Others.Title>
            <Others.Desc>
              Choose how you want to share your unique referral code or link,
              and customize the invitation texts
            </Others.Desc>
            <Others.ItemWrapper>
              <Others.Item>
                <SVG name="sponsorship/facebook" />
              </Others.Item>
              <Others.Item>
                <SVG name="sponsorship/twitter" />
              </Others.Item>
              <Others.Item>
                <SVG name="sponsorship/linkedin" />
              </Others.Item>
              <Others.Item>
                <SVG name="sponsorship/call" />
              </Others.Item>
              <Others.Item>
                <SVG name="sponsorship/email" />
              </Others.Item>
            </Others.ItemWrapper>
            <Others.Detail>Your unique link</Others.Detail>
            <Others.Form>
              <Others.Input placeholder="Enter your name" />
              <Button>To copy</Button>
            </Others.Form>
            <Others.Link>+ Add more email</Others.Link>
          </Others.Wrapper>
        </SponsorshipContainer>
        <DialogBenefit
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          // valueClick={undefined}
        />
      </Container>
    </Wrapper>
  );
};

export default Sponsorship;
