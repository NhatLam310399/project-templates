import { ChangeEvent, useRef, useState } from "react";
import {
  AffiliateLinkContainer,
  Title,
  InputWrapper,
  LabelInput,
  Inputs,
  SubTitle,
  Desc,
  Body,
  LinkWrapper,
  LinInputWrapper,
} from "./styles";
import { Wrapper, Container } from "designs/PageLayout";
import Button from "designs/Button";
import RaidoGroup, { IOptions } from "designs/GroupRadioButton";

import { randomId } from "common/functions";

const listOptionRadio: IOptions[] = [
  {
    _id: randomId(),
    label: "Start an online store without inventory",
  },
  {
    _id: randomId(),
    label: "Make your own shirt",
  },
  {
    _id: randomId(),
    label: "Print-on-demand drop shipping",
  },
  {
    _id: randomId(),
    label: "Design Maker",
  },
  {
    _id: randomId(),
    label: "Productsy",
  },
  {
    _id: randomId(),
    label: "Custom",
  },
];

interface IAffiliateLinkProps {}

const AffiliateLink: React.FC<IAffiliateLinkProps> = props => {
  const refCopyAffiliate = useRef<any>(null);
  const refCopyYourLink = useRef<any>(null);
  const [disbleId, setDisableId] = useState<boolean>(false);
  const [id, setId] = useState<string>(
    "1889126:b7ded88fe0b93fad4a88775a1bd0ec4d",
  );
  const [radio, setRadio] = useState<IOptions>({});

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const onClickEdit = () => {
    setDisableId(!disbleId);
  };

  const onClickCopy = () => {
    refCopyAffiliate.current.select();
    refCopyAffiliate.current.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(refCopyAffiliate.current.value);
  };

  const onClickCopyYourLink = () => {
    refCopyYourLink.current.select();
    refCopyYourLink.current.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(refCopyYourLink.current.value);
  };
  return (
    <Wrapper>
      <Container>
        <AffiliateLinkContainer>
          <Title>Affiliate: Affiliate link</Title>
          <InputWrapper>
            <div className="w-full phone:w-2/3 ">
              <LabelInput>Your affiliate ID</LabelInput>
              <Inputs disabled={disbleId} onChange={onChange} value={id} />
            </div>
            <Button
              variant="secondary"
              onClick={onClickEdit}
              className="w-full phone:w-auto"
            >
              Edit
            </Button>
          </InputWrapper>
          <InputWrapper>
            <div className="phone:w-2/3 w-full">
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
          <SubTitle>Deep linking</SubTitle>
          <Desc>
            Deep linking lets you link to a specific page on our website (e.g.,
            “https://www.printful.com/shipping“), instead of our home page
            (e.g., “https://www.printful.com”).
          </Desc>
          <Body>
            <LabelInput>
              Choose one of our most popular pages for linking or check out our
              <span className="text-primary-1"> Sitemap </span> for more custom
              ideas:
            </LabelInput>
            <LinkWrapper>
              <RaidoGroup
                onChange={options => {
                  setRadio(options);
                }}
                optionSelected={radio}
                options={listOptionRadio}
              />
              <LinInputWrapper>
                <LabelInput>Your generated link</LabelInput>
                <Inputs
                  ref={refCopyYourLink}
                  disabled
                  value="https://www.printful.com/start-your-online-store-without-inventory/a/1889126:b7ded88ddcvz"
                />
                <Button onClick={onClickCopyYourLink}>Copy link</Button>
              </LinInputWrapper>
            </LinkWrapper>
          </Body>
        </AffiliateLinkContainer>
      </Container>
    </Wrapper>
  );
};

export default AffiliateLink;
