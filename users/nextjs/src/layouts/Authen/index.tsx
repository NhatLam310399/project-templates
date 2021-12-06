import { AuthenContainer, Background } from "./styles";

interface IAuthenProps {}

const Authen: React.FC<IAuthenProps> = (props) => {
  const { children } = props;
  return (
    <AuthenContainer className="container">
      <Background width={510} height={510} name="login/background" />
      {children}
    </AuthenContainer>
  );
};

export default Authen;
