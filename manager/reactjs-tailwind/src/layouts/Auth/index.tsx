import { LeftSide, LoginLayoutContainer, RightSide, Content } from "./styles";
import Image from "designs/Image";

interface IAuthLayoutProps {}

const AuthLayout: React.FC<IAuthLayoutProps> = ({ children }) => {
  return (
    <LoginLayoutContainer>
      <LeftSide.Container>
        <LeftSide.Logo
          name="logo/logo-color.png"
          className="h-35"
          height="35px"
          width="auto"
        />
        <LeftSide.ImageWrapper>
          <Image name="login/image.png" />
        </LeftSide.ImageWrapper>
      </LeftSide.Container>
      <RightSide>
        <Content>{children}</Content>
      </RightSide>
    </LoginLayoutContainer>
  );
};

export default AuthLayout;
