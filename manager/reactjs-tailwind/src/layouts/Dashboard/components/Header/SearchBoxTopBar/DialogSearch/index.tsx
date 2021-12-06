import { ChangeEvent, useEffect, useState } from "react";
import {
  DialogSearchContainer,
  Overlay,
  HeadingSearch,
  Body,
  LeftSide,
  RightSide,
  Items,
  Notfound,
} from "./styles";

import SearchIcon from "icons/Search";
import SVG from "designs/SVG";

interface IItem {
  image: string;
  price: number;
  title: string;
}
interface IDialogSearchProps {
  inputText: string;
  setInputText: (state: string) => void;
  loading: boolean;
  setLoading: (state: boolean) => void;
}

const DialogSearch: React.FC<IDialogSearchProps> = ({
  inputText,
  setInputText,
  loading,
  setLoading,
}) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    if (inputText && inputText.length > 0) {
      setOpenDialog(true);
    } else {
      setOpenDialog(false);
    }
  }, [inputText]);

  const onClose = () => {
    setOpenDialog(false);
    setInputText("");
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <>
      <Overlay open={openDialog} onClick={onClose} />
      <DialogSearchContainer open={openDialog}>
        <HeadingSearch.Wrapper>
          <HeadingSearch.SearchBox>
            <SearchIcon />
            <HeadingSearch.Input
              value={inputText}
              placeholder="Search Kingify"
              onChange={onChange}
            />
          </HeadingSearch.SearchBox>
          <div className="cursor-pointer" onClick={onClose}>
            <SVG name="dialog/close" />
          </div>
        </HeadingSearch.Wrapper>
        <Body>
          {loading ? (
            <div className="absolute left-1/2 mt-20 transform -translate-x-1/2">
              <img
                className="w-5 h-5"
                src="https://www.wpfaster.org/wp-content/uploads/2013/06/loading-gif.gif"
              />
            </div>
          ) : (
            <>
              <LeftSide.Wrapper>
                <LeftSide.Title>I'm looking for...</LeftSide.Title>
                <LeftSide.Content>
                  {LookingFor.length > 0
                    ? LookingFor.map((value, index) => {
                        return (
                          <LeftSide.Item key={index}>{value}</LeftSide.Item>
                        );
                      })
                    : null}
                </LeftSide.Content>
              </LeftSide.Wrapper>
              <RightSide.Wrapper>
                {LookingFor.length === 0 ? (
                  <Notfound.Wrapper>
                    <SVG name="dashboard/search" />
                    <Notfound.Title>No results found!</Notfound.Title>
                    <Notfound.Desc>
                      Try another keyword or check out products that might
                      interest you below...
                    </Notfound.Desc>
                  </Notfound.Wrapper>
                ) : null}

                <RightSide.Content>
                  {ListItems.length > 0
                    ? ListItems.map((value, index) => {
                        return (
                          <Item
                            key={index}
                            price={value.price}
                            image={value.image}
                            title={value.title}
                          />
                        );
                      })
                    : null}
                </RightSide.Content>
              </RightSide.Wrapper>
            </>
          )}
        </Body>
      </DialogSearchContainer>
    </>
  );
};

const LookingFor: string[] = [
  "Crewneck Sweatshirts",
  "Crewneck Sweatshirts",
  "Tall Sweatshirts",
  "Heavyweight Sweatshirts",
  "Lightweight Sweatshirts",
  "Performance Sweatshirts",
  "Quarter Zip Pullover Sweatshirts",
  "Premium Sweatshirts",
  "Women's Sweatshirts",
  "Men's Sweatshirts",
  "Kids Sweatshirts",
  "Sweatpants & Joggers",
  "Eco-friendly Face Mask",
  "Eco-friendly Face Mask",
  "New Sweatshirts",
];

const ListItems: IItem[] = [
  {
    image:
      "https://images.genius.com/95bf59f77e01791377bc5dd80db89dc9.1000x1000x1.jpg",
    price: 12.95,
    title:
      "Unisex Staple T-Shirt | Bella + Canvas 3001 (Heather Prism Ice Blue / M)",
  },
  {
    image:
      "https://images.genius.com/95bf59f77e01791377bc5dd80db89dc9.1000x1000x1.jpg",
    price: 12.95,
    title:
      "Unisex Staple T-Shirt | Bella + Canvas 3001 (Heather Prism Ice Blue / M)",
  },
  {
    image:
      "https://images.genius.com/95bf59f77e01791377bc5dd80db89dc9.1000x1000x1.jpg",
    price: 12.95,
    title:
      "Unisex Staple T-Shirt | Bella + Canvas 3001 (Heather Prism Ice Blue / M)",
  },
  {
    image:
      "https://images.genius.com/95bf59f77e01791377bc5dd80db89dc9.1000x1000x1.jpg",
    price: 12.95,
    title:
      "Unisex Staple T-Shirt | Bella + Canvas 3001 (Heather Prism Ice Blue / M)",
  },
  {
    image:
      "https://images.genius.com/95bf59f77e01791377bc5dd80db89dc9.1000x1000x1.jpg",
    price: 12.95,
    title:
      "Unisex Staple T-Shirt | Bella + Canvas 3001 (Heather Prism Ice Blue / M)",
  },
  {
    image:
      "https://images.genius.com/95bf59f77e01791377bc5dd80db89dc9.1000x1000x1.jpg",
    price: 12.95,
    title:
      "Unisex Staple T-Shirt | Bella + Canvas 3001 (Heather Prism Ice Blue / M)",
  },
  {
    image:
      "https://images.genius.com/95bf59f77e01791377bc5dd80db89dc9.1000x1000x1.jpg",
    price: 12.95,
    title:
      "Unisex Staple T-Shirt | Bella + Canvas 3001 (Heather Prism Ice Blue / M)",
  },
];
export default DialogSearch;

const Item: React.FC<IItem> = ({ image, title, price }) => {
  return (
    <Items.Wrapper>
      <Items.Image src={image} />
      <Items.Content>
        <Items.Title>{title}</Items.Title>
        <Items.Price>Starting from ${price}</Items.Price>
      </Items.Content>
    </Items.Wrapper>
  );
};
