import { INotification } from "@common/typings";
import { PATH } from "@routes";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import dayjs from "dayjs";
import {
  ItemV2Container,
  Title,
  Content,
  Action,
  ExpandButton,
  DateTime,
  Company,
} from "./styles";

interface INotificationProps {
  notification: INotification;
}

const Notify: React.FC<INotificationProps> = (props) => {
  const { notification } = props;
  const { company, description, createdAt, name } = notification || {};
  const [open, setOpen] = useState(false);
  const { t } = useTranslation(["common"]);
  return (
    <ItemV2Container>
      <Company>{company?.name}</Company>
      <Title>{name}</Title>
      <Content isOpen={open}>{description}</Content>

      <Action className={open && "mt-3"}>
        {description?.length > 150 && (
          <ExpandButton onClick={() => setOpen(!open)}>
            {open ? t("header.collapse") : t("header.extend")}
          </ExpandButton>
        )}
        <DateTime>{dayjs(createdAt?.toString()).format("DD/MM/YYYY")}</DateTime>
      </Action>
    </ItemV2Container>
  );
};

export default Notify;
