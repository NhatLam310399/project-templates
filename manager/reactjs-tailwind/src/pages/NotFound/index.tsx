import React from "react";
import {
  NotFoundContainer,
  Title,
  SubTitle,
  NotFoundWrapper,
  Header,
  Content,
  ImageWrapper,
  Footer,
} from "./styles";
import Button from "designs/Button";
import Image from "designs/Image";
import { PATH } from "common/constants/routes";

const NotFound: React.FC = () => {
  return (
    <NotFoundWrapper className="wrapper">
      <Header className="container">
        <Image name="logo/logo-color.png" className="w-auto h-3.5" />
      </Header>
      <NotFoundContainer className="container">
        <Content>
          <Title>
            Oops!
            <br />
            This is awkward.
          </Title>
          <SubTitle>
            See, the page you are looking for doesn’t actually exist.
          </SubTitle>
          <Button to={PATH.DASHBOARD} className="w-full phone:w-auto" size="lg">
            Take me home
          </Button>
        </Content>
        <ImageWrapper>
          <Image name="not-found/404.jpg" className="max-h-70" />
        </ImageWrapper>
      </NotFoundContainer>
      <Footer className="container">
        Copyright © 2020-2021 Kingify JSC.,. All rights reserved.
      </Footer>
    </NotFoundWrapper>
  );
};

export default NotFound;
