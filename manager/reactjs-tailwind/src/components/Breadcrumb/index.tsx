import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { RightArrowIcon } from "./icons";
import { Item, BreadcrumbContainer, ListItems } from "./styles";

interface IBreadcrumbProps {
  className?: string;
  items: {
    name: string | undefined;
    link?: string;
    onClick?: () => void;
  }[];
}

const Breadcrumb: React.FC<IBreadcrumbProps> = ({ items, className }) => {
  const listItems = items.filter(item => item.name);

  return (
    <BreadcrumbContainer className={className}>
      <div>
        <ListItems>
          {listItems.map((item, index) => (
            <Fragment key={String(index)}>
              <Item
                onClick={() => item?.onClick?.()}
                isLast={index == listItems.length - 1}
              >
                <Link to={item?.link || "#"}>{item.name}</Link>
              </Item>
              {index !== listItems.length - 1 && <RightArrowIcon />}
            </Fragment>
          ))}
        </ListItems>
      </div>
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
