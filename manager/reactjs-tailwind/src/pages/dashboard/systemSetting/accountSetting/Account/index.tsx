import { ReactNode, lazy } from "react";
import { useSelector } from "react-redux";
import { AccountContainer } from "./styles";
import { Title } from "designs/Title";
import { Wrapper } from "designs/PageLayout";
import { IRootState } from "typings";

interface IAccountProps {}

const PersonInfo = lazy(() => import("./PersonInfo"));
const ChangPassword = lazy(() => import("./ChangePassword"));
const ChangeEmail = lazy(() => import("./ChangeEmail"));
type IStep = {
  [key: number]: {
    step: number;
    name: string;
    Component: ReactNode;
  };
};

const steps: IStep = {
  1: {
    step: 1,
    name: "Person Info",
    Component: <PersonInfo />,
  },
  2: {
    step: 2,
    name: "Change Email",
    Component: <ChangeEmail />,
  },
  3: {
    step: 3,
    name: "Change Password",
    Component: <ChangPassword />,
  },
};

const Account: React.FC<IAccountProps> = props => {
  const stepIndex = useSelector(
    (state: IRootState) => state.settingAccount.stepIndex,
  );
  return (
    <Wrapper>
      <AccountContainer>
        <Title>Settings:My Account</Title>
        {steps[stepIndex].Component}
      </AccountContainer>
    </Wrapper>
  );
};

export default Account;
