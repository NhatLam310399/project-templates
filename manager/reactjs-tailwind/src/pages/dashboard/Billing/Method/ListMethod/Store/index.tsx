import { useRef, useState } from "react";
import { StoreContainer, Heading, Orther } from "./styles";
import TableStore from "./TableStore";
import ChangeMethod from "./ChangeMethod";
import Collapse from "components/Collapse";
import SVG from "designs/SVG";

interface IStoreProps {}

const Store: React.FC<IStoreProps> = props => {
  const [collapse, setCollapse] = useState<boolean>(false);
  const onHanleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <StoreContainer>
      <Heading.Wrapper>
        <Heading.Title>Store billing methods</Heading.Title>
        <Heading.Desc>
          Set up a unique billing method for each store. Unless otherwise
          indicated, we will use your account's primary billing method.
        </Heading.Desc>
      </Heading.Wrapper>
      <TableStore />
      {/* <Orther.Wrapper>
        <Orther.CollapseContainerIcon onClick={onHanleCollapse}>
          <Orther.Icon
            active={collapse}
            style={{
              transform: !collapse ? "rotate(-180deg)" : "rotate(0)",
            }}
          >
            <SVG name="billing/arrowtop" />
          </Orther.Icon>
          <Orther.IconText>Billing method changes</Orther.IconText>
        </Orther.CollapseContainerIcon>
        <Collapse
          show={collapse}    //Billing method empty
          estimateHeight={500}
          smooth={true}
          className="pt-2"
        >
          <ChangeMethod />
        </Collapse>
      </Orther.Wrapper> */}
    </StoreContainer>
  );
};

export default Store;
