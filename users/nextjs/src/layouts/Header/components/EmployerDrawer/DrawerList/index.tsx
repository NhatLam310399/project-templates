import { useState } from "react";

import { randomId } from "@common/functions";

import {
  DrawerListContainer,
  DrawerListItem,
  Icon,
  Title,
  Link,
} from "./styles";

interface IDrawerListProps {
  iconName?: string;
  title?: string;
  items?: ItemType[];
}

type ItemType = {
  name: string;
  link: string;
};

const DrawerList: React.FC<IDrawerListProps> = (props) => {
  const { iconName, title, items } = props;
  const [id, _] = useState(randomId());
  return (
    <DrawerListContainer>
      <Title>
        <Icon name={iconName} width={24} height={24} />
        {title}
      </Title>
      {items
        ? items.map((value, index) => {
            return (
              <DrawerListItem key={`drawer-list-${id}-${index}`}>
                <Link routeName={value.link}>{value.name}</Link>
              </DrawerListItem>
            );
          })
        : null}
    </DrawerListContainer>
  );
};

export default DrawerList;
