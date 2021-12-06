import { useState } from "react";
import {
  TableContainer,
  Search,
  Body,
  TableHeading,
  Items,
  Edit,
  Menu,
} from "./styles";
import SearchBox from "components/SearchBoxTable";
import Button from "designs/Button";
import SVG from "designs/SVG";
import Avatar from "designs/Avatar";
import Pagination from "components/Pagination";

interface ITableProps {}

interface IData {
  image: string;
  product: {
    name: string;
    id: string;
  };
  variant: {
    quantity: number;
    desc: string;
  };
}
const Table: React.FC<ITableProps> = props => {
  const [select, setSelect] = useState<boolean>(false);
  const onFetchData = () => {};
  const onHanleSelect = () => {
    setSelect(!select);
  };

  const onChangePage = () => {};
  return (
    <TableContainer>
      <Search.Wrapper>
        <Search.Title>All(16)</Search.Title>
        <div>
          <SearchBox placeholder="Search Product" onFetchData={onFetchData} />
        </div>
      </Search.Wrapper>
      <Body>
        <TableHeading.Wrapper>
          {!select ? (
            <>
              {" "}
              <TableHeading.Title>Product</TableHeading.Title>
              <TableHeading.Title>Variant</TableHeading.Title>{" "}
            </>
          ) : (
            <div className="flex  gap-1 flex-col phone:flex-row phone:items-center">
              <TableHeading.Desc> 1 product selected</TableHeading.Desc>
              <Button
                variant="secondary"
                onClick={() => console.log("on save")}
              >
                Save as templates
              </Button>
              <Button
                variant="secondary"
                onClick={() => console.log("on delete")}
              >
                Delete
              </Button>
            </div>
          )}
          <TableHeading.Link onClick={onHanleSelect}>
            {!select ? "Bulk edit" : "Unselect"}
          </TableHeading.Link>
        </TableHeading.Wrapper>
        <div>
          {listData.map((value, index) => {
            return <Item {...value} key={index} select={select} />;
          })}
        </div>
        <div className="pt-5 flex justify-center">
          <Pagination
            page={1}
            sizePerPage={8}
            totalSize={16}
            onPageChange={onChangePage}
          />
        </div>
      </Body>
    </TableContainer>
  );
};

const listData: IData[] = [
  {
    image:
      "https://is2-ssl.mzstatic.com/image/thumb/Music114/v4/21/03/2f/21032fd8-9822-d0b9-1d94-1cc5e2ebefe3/cover-BewhY.jpg/400x400cc.jpeg",
    product: {
      name: "Short-Sleeve Unisex T-Shirt",
      id: "#61519820ec11d1",
    },
    variant: {
      quantity: 1,
      desc: "added",
    },
  },
  {
    image:
      "https://is2-ssl.mzstatic.com/image/thumb/Music114/v4/21/03/2f/21032fd8-9822-d0b9-1d94-1cc5e2ebefe3/cover-BewhY.jpg/400x400cc.jpeg",
    product: {
      name: "Short-Sleeve Unisex T-Shirt",
      id: "#61519820ec11d1",
    },
    variant: {
      quantity: 1,
      desc: "added",
    },
  },
  {
    image:
      "https://is2-ssl.mzstatic.com/image/thumb/Music114/v4/21/03/2f/21032fd8-9822-d0b9-1d94-1cc5e2ebefe3/cover-BewhY.jpg/400x400cc.jpeg",
    product: {
      name: "Short-Sleeve Unisex T-Shirt",
      id: "#61519820ec11d1",
    },
    variant: {
      quantity: 1,
      desc: "added",
    },
  },
  {
    image:
      "https://is2-ssl.mzstatic.com/image/thumb/Music114/v4/21/03/2f/21032fd8-9822-d0b9-1d94-1cc5e2ebefe3/cover-BewhY.jpg/400x400cc.jpeg",
    product: {
      name: "Short-Sleeve Unisex T-Shirt",
      id: "#61519820ec11d1",
    },
    variant: {
      quantity: 1,
      desc: "added",
    },
  },
  {
    image:
      "https://is2-ssl.mzstatic.com/image/thumb/Music114/v4/21/03/2f/21032fd8-9822-d0b9-1d94-1cc5e2ebefe3/cover-BewhY.jpg/400x400cc.jpeg",
    product: {
      name: "Short-Sleeve Unisex T-Shirt",
      id: "#61519820ec11d1",
    },
    variant: {
      quantity: 1,
      desc: "added",
    },
  },
  {
    image:
      "https://is2-ssl.mzstatic.com/image/thumb/Music114/v4/21/03/2f/21032fd8-9822-d0b9-1d94-1cc5e2ebefe3/cover-BewhY.jpg/400x400cc.jpeg",
    product: {
      name: "Short-Sleeve Unisex T-Shirt",
      id: "#61519820ec11d1",
    },
    variant: {
      quantity: 1,
      desc: "added",
    },
  },
  {
    image:
      "https://is2-ssl.mzstatic.com/image/thumb/Music114/v4/21/03/2f/21032fd8-9822-d0b9-1d94-1cc5e2ebefe3/cover-BewhY.jpg/400x400cc.jpeg",
    product: {
      name: "Short-Sleeve Unisex T-Shirt",
      id: "#61519820ec11d1",
    },
    variant: {
      quantity: 1,
      desc: "added",
    },
  },
  {
    image:
      "https://is2-ssl.mzstatic.com/image/thumb/Music114/v4/21/03/2f/21032fd8-9822-d0b9-1d94-1cc5e2ebefe3/cover-BewhY.jpg/400x400cc.jpeg",
    product: {
      name: "Short-Sleeve Unisex T-Shirt",
      id: "#61519820ec11d1",
    },
    variant: {
      quantity: 1,
      desc: "added",
    },
  },
];
export default Table;

interface IItem extends IData {
  select: boolean;
  onDuplicate?: () => void;
  onSave?: () => void;
  onIgnore?: () => void;
  onDelete?: () => void;
}
export const Item: React.FC<IItem> = ({ select, ...rest }) => {
  const [dropDown, setDropDown] = useState<boolean>(false);

  const onHandleDropDown = () => {
    setDropDown(!dropDown);
  };

  const onDuplicate = () => {
    console.log("duplicate");
  };
  const onSave = () => {
    console.log("on save");
  };
  const onIgnore = () => {
    console.log("on ignore");
  };
  const onDelete = () => {
    console.log("on delete");
  };
  return (
    <Items.Wrapper>
      <Items.Content>
        <Avatar src={rest.image} />
        <Items.TextWrpper>
          <Items.Title>{rest.product.name}</Items.Title>
          <Items.Desc>{rest.product.id}</Items.Desc>
        </Items.TextWrpper>
      </Items.Content>
      <Items.TextWrpper>
        <Items.Title>
          <span className="text-primary-1">{rest.variant.quantity}</span>
        </Items.Title>
        <Items.Desc>{rest.variant.desc}</Items.Desc>
      </Items.TextWrpper>
      <Items.Content>
        {select ? null : (
          <>
            {" "}
            <Button>Edit</Button>
            <Edit.Wrapper onClick={onHandleDropDown}>
              <SVG name="store/edit" height={4} width={4} />
              {dropDown ? (
                <Menu.Wrapper>
                  <Menu.Item onClick={onDuplicate}>Duplicate</Menu.Item>
                  <Menu.Item onClick={onSave}>Save as templates</Menu.Item>
                  <Menu.Item onClick={onIgnore}>Ignore</Menu.Item>
                  <Menu.Item onClick={onDelete}>Delete</Menu.Item>
                </Menu.Wrapper>
              ) : null}
            </Edit.Wrapper>
          </>
        )}
      </Items.Content>
    </Items.Wrapper>
  );
};
