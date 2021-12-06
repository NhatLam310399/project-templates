import Account from "./Account";
import OrderAndProduct from "./OrderAndProduct";
import Updates from "./Updates";
import { NotificationContainer } from "./styles";
import { Wrapper } from "designs/PageLayout";
import { Title } from "designs/Title";
import Tabs from "designs/Tabs";

interface INotificationProps {}

const Notification: React.FC<INotificationProps> = props => {
  return (
    <Wrapper>
      <Title>Settings: Notifications</Title>
      <NotificationContainer>
        <Tabs
          titles={["Account", "Order & Product", "Updates"]}
          content={[<Account />, <OrderAndProduct />, <Updates />]}
          size="lg"
        />
      </NotificationContainer>
    </Wrapper>
  );
};

export default Notification;
