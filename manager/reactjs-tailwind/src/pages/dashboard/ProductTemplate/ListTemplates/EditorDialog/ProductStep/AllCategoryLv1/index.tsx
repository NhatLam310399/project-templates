import { useDispatch, useSelector } from "react-redux";
import { setCategoryLevel1Selected } from "redux/actions/category";
import { ICategoryLevel1, IRootState } from "typings";
import { AllCategoryLv1Container, Card, ListItems } from "./styles";

interface IAllCategoryLv1Props {}

const AllCategoryLv1: React.FC<IAllCategoryLv1Props> = () => {
  const dispatch = useDispatch();
  const {
    categoriesLv1: { results = [] },
  } = useSelector((state: IRootState) => state.category);

  return (
    <AllCategoryLv1Container>
      <ListItems>
        {results.map((category, i) => {
          return (
            <ProductLevel1Card
              categoryLv1={{
                ...category,
                image: {
                  // * Fake image, remove this when Data has image
                  medium: images[i],
                },
              }}
              onClick={() => {
                dispatch(setCategoryLevel1Selected(category));
              }}
            />
          );
        })}
      </ListItems>
    </AllCategoryLv1Container>
  );
};

export default AllCategoryLv1;

const ProductLevel1Card: React.FC<{
  categoryLv1: ICategoryLevel1;
  onClick: () => void;
}> = ({ categoryLv1, onClick }) => {
  const { name, image } = categoryLv1;

  return (
    <Card.Container onClick={() => onClick()}>
      <Card.ImageContainer>
        <Card.Image src={image?.medium} alt={`${name} card`} />
      </Card.ImageContainer>
      <Card.Text>{name}</Card.Text>
    </Card.Container>
  );
};

const images = [
  "https://files.cdn.printful.com/o/upload/catalog_category/fb/fbf0cf796a5603666e85713ece1708a1_t?v=1637072559",
  "https://files.cdn.printful.com/o/upload/catalog_category/04/04140d7cd1565012645092fc8f1d8632_t?v=1637072559",
  "https://files.cdn.printful.com/o/upload/catalog_category/96/96e91feb26f0b28ba821534bb0d5478b_t?v=1637072559",
  "https://files.cdn.printful.com/o/upload/catalog_category/0c/0c38c3b13be79b5f8e1f2f1dccf62115_t?v=1637072559",
  "https://files.cdn.printful.com/o/upload/catalog_category/b1/b1e86be07423274b27b55561ddc6eee9_t?v=1637072559",
  "https://files.cdn.printful.com/o/upload/catalog_category/77/7776d01e716d80e3ffbdebbf3db6b198_t?v=1637072559",
  "https://files.cdn.printful.com/o/upload/catalog_category/9e/9ed797fbbdac07a98f6fdfa06a9f6c8f_t?v=1637072559",
  "https://files.cdn.printful.com/o/upload/catalog_category/0d/0d1c7f7afcc42147f88ee607bcaf9ff6_t?v=1637072559",
];
