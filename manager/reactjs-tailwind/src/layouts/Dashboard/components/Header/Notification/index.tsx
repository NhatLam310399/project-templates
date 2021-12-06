import { useState } from "react";
import {
  BellIcon,
  NotificationContainer,
  Items,
  Author,
  NotificationList,
  NumberNotification,
} from "./styles";
import IconButton from "designs/IconButton";
import SVG from "designs/SVG";

interface INotificationItem {
  title: string;
  desc: string;
  time: string;
  name: string;
  team: string;
}
interface INotificationProps {}

const Notification: React.FC<INotificationProps> = props => {
  const [openNotification, setOpenNotification] = useState<boolean>(false);

  const onHandleClick = () => {
    setOpenNotification(prevState => !prevState);
  };

  const onClose = () => {
    setOpenNotification(false);
  };

  return (
    <NotificationContainer>
      <IconButton tooltip="Notification" onClick={onHandleClick}>
        <BellIcon />
        {/* <NumberNotification>1</NumberNotification> */}
      </IconButton>
      {openNotification ? (
        <NotificationList.Wrapper isOpen={openNotification}>
          {window.innerWidth < 768 ? (
            <NotificationList.Heading>
              <div className="flex items-center gap-1">
                <BellIcon />
                <p className="text-lg font-bold text-neutral-1">Notification</p>
              </div>
              <SVG name="dialog/close" onClick={onClose} />
            </NotificationList.Heading>
          ) : null}

          <NotificationList.Body>
            {listNotificaitons.length > 0
              ? listNotificaitons.map((value, index) => {
                  return (
                    <Item
                      name={value.name}
                      title={value.title}
                      desc={value.desc}
                      team={value.team}
                      time={value.time}
                    />
                  );
                })
              : null}
          </NotificationList.Body>
          <NotificationList.Orther>
            See all notification
          </NotificationList.Orther>
        </NotificationList.Wrapper>
      ) : null}
    </NotificationContainer>
  );
};

const listNotificaitons: INotificationItem[] = [
  {
    title: "Promo",
    desc: "Price change for elect product and shipping for you...",
    name: "Elizabete",
    team: "Marketing team",
    time: "Today, 05:43 AM",
  },
  {
    title: "Promo",
    desc: "Price change for elect product and shipping for you...",
    name: "Elizabete",
    team: "Marketing team",
    time: "Today, 05:43 AM",
  },
  {
    title: "Promo",
    desc: "Price change for elect product and shipping for you...",
    name: "Elizabete",
    team: "Marketing team",
    time: "Today, 05:43 AM",
  },
  {
    title: "Promo",
    desc: "Price change for elect product and shipping for you...",
    name: "Elizabete",
    team: "Marketing team",
    time: "Today, 05:43 AM",
  },
  {
    title: "Promo",
    desc: "Price change for elect product and shipping for you...",
    name: "Elizabete",
    team: "Marketing team",
    time: "Today, 05:43 AM",
  },
  {
    title: "Promo",
    desc: "Price change for elect product and shipping for you...",
    name: "Elizabete",
    team: "Marketing team",
    time: "Today, 05:43 AM",
  },
];
export default Notification;

const Item: React.FC<INotificationItem> = ({
  title,
  desc,
  time,
  name,
  team,
}) => {
  return (
    <Items.Wrapper>
      <Items.Title>{title}</Items.Title>
      <Items.Desc>{desc}</Items.Desc>
      <Items.DetailWrapper>
        <Author.Wrapper>
          <Author.Name>{name}</Author.Name>
          <p>{team}</p>
        </Author.Wrapper>
        <p>{time}</p>
      </Items.DetailWrapper>
    </Items.Wrapper>
  );
};
