import { useSelector } from "react-redux";
import { useState } from "react";
import { ViewStoreContainer, Heading, Body, Notification } from "./styles";
import Table from "./Table";
import { IRootState } from "typings";
import { Wrapper, Container } from "designs/PageLayout";
import SVG from "designs/SVG";
import Button from "designs/Button";
interface IViewStoreProps {}

const ViewStore: React.FC<IViewStoreProps> = props => {
  const store = useSelector((state: IRootState) => state.store.dataStep);
  const [notification, setNotification] = useState<any>({
    status: false,
    success: false,
    message: "",
  });

  const onAddProduct = () => {
    setNotification({
      status: true,
      success: false,
      message: "Product templates created!",
    });
    setTimeout(() => {
      setNotification({
        status: false,
        success: false,
        message: "",
      });
    }, 3000);
  };
  return (
    <Wrapper>
      <Container>
        <ViewStoreContainer>
          <div className="flex justify-center">
            <Notification
              status={notification.status}
              success={notification.success}
            >
              {notification.message}
            </Notification>
          </div>
          <Heading.Wrapper>
            <Heading.Content>
              <Heading.Detail>
                Store <span className="text-neutral-1">/{store.name}</span>
              </Heading.Detail>
              <Heading.Name>{store.name}</Heading.Name>
            </Heading.Content>
            <Heading.Content>
              <div className="flex gap-1 text-primary-1 cursor-pointer">
                <SVG name="store/settingcolor" />
                Settings
              </div>
              <Button onClick={onAddProduct}>
                <div className="flex items-center gap-1">
                  <SVG name="store/addwhite" />
                  Add product
                </div>
              </Button>
            </Heading.Content>
          </Heading.Wrapper>
          <Body>
            <Table />
          </Body>
        </ViewStoreContainer>
      </Container>
    </Wrapper>
  );
};

export default ViewStore;
