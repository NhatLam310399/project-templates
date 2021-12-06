import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryLevel2Selected,
  setTagMenuSelected,
} from "redux/actions/category";
import { IRootState, ITagMenu } from "typings";
import { AllCategoryLv2And3Container, Card, ListItems } from "./styles";
import { fakeImage } from "./fake";
import SVG from "designs/SVG";

interface IAllCategoryLv1Props {}

type ICategoryCard = {
  _id: string | undefined;
  type: "TAG" | "CATEGORY_LV_2";
  imageUrl: string | undefined;
  isLong: boolean | undefined;
  name: string | undefined;
};

const AllCategoryLv2: React.FC<IAllCategoryLv1Props> = props => {
  const dispatch = useDispatch();
  const {
    categoriesLv2: { results: allCategoryLv2 = [] },
    tags: { results: allTags = [] },
    selected: { level1 },
  } = useSelector((state: IRootState) => state.category);
  const [allCards, setAllCards] = useState<ICategoryCard[]>([]);

  useEffect(() => {
    const newCards: ICategoryCard[] = [];
    const listTags = allTags.filter(
      item => item.categoryLevel1?._id === level1?._id,
    );

    console.log(listTags);

    let i = 0;
    for (let tag of listTags) {
      newCards.push({
        _id: tag._id,
        type: "TAG",
        imageUrl: tag.image?.medium,
        isLong: tag.isLongImage,
        name: tag.name,
      });
      if (i < fakeImage.length - 1) {
        newCards[newCards.length - 1].imageUrl = fakeImage[i].url;
        newCards[newCards.length - 1].isLong = fakeImage[i].isLongImage;
      }
      i++;

      const listCategoryLv2OfTag = allCategoryLv2.filter(
        item => item.tagMenu?._id === tag._id,
      );
      for (let cate2 of listCategoryLv2OfTag) {
        newCards.push({
          _id: cate2._id,
          type: "CATEGORY_LV_2",
          imageUrl: cate2.image?.medium,
          isLong: false,
          name: cate2.name,
        });
        if (i < fakeImage.length - 1) {
          newCards[newCards.length - 1].imageUrl = fakeImage[i].url;
          newCards[newCards.length - 1].isLong = fakeImage[i].isLongImage;
        }
        i++;
      }
    }

    setAllCards(newCards);
  }, [allTags, allCategoryLv2]);

  const handleSelectCard = (card: ICategoryCard) => {
    if (card.type === "TAG")
      dispatch(
        setTagMenuSelected(allTags.find(tag => tag._id === card._id) || null),
      );
    if (card.type === "CATEGORY_LV_2") {
      dispatch(
        setCategoryLevel2Selected(
          allCategoryLv2.find(cate => cate._id === card._id) || null,
        ),
      );
    }
  };

  return (
    <AllCategoryLv2And3Container>
      <ListItems>
        {allCards.map((card, i) => (
          <CategoryCard data={card} onClick={() => handleSelectCard(card)} />
        ))}
        {allCards.length === 0 && <EmptyProduct />}
      </ListItems>
    </AllCategoryLv2And3Container>
  );
};

const CategoryCard: React.FC<{
  data: ICategoryCard;
  onClick: () => void;
}> = ({ data, onClick }) => {
  const { name, imageUrl, isLong } = data;

  return (
    <Card.Container isLong={isLong} onClick={() => onClick()}>
      <Card.ImageContainer isLong={isLong}>
        <Card.Image src={imageUrl} alt={`${name} card`} />
      </Card.ImageContainer>
      <Card.Text>{name}</Card.Text>
    </Card.Container>
  );
};

export default AllCategoryLv2;

const EmptyProduct: React.FC = () => {
  return (
    <SVG
      className="absolute transform -translate-x-1/2 pointer-events-none select-none left-1/2"
      name="product-template/empty-product"
      width="500px"
      height="500px"
    />
  );
};
