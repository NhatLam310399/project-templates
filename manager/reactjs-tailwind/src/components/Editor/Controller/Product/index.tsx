import { useDispatch, useSelector } from "react-redux";
import {
  ProductContainer,
  Title,
  DetailLink,
  ColorSelectorTitle,
} from "./styles";
import ColorSelector from "components/ColorSelector";
import LinkIcon from "icons/Link";
import { setListColors } from "redux/actions/editor";
import { IColor, IRootState } from "typings";

interface IProductProps {}

const Product: React.FC<IProductProps> = props => {
  const dispatch = useDispatch();
  const { listColors } = useSelector((state: IRootState) => state.editor);
  const { productSchema } = useSelector(
    (state: IRootState) => state.productTemplate,
  );

  const handleChangeColors = (colors: IColor[]) => {
    dispatch(setListColors(colors));
  };

  return (
    <ProductContainer>
      <Title>Unisex Staple T-Shirt | Bella + Canvas 3001</Title>
      <DetailLink href="#">
        Product info, pricing & guideline <LinkIcon />
      </DetailLink>
      <ColorSelectorTitle>Choose colors</ColorSelectorTitle>
      <ColorSelector
        listColorSelected={listColors}
        colors={productSchema?.colors || []}
        getColor={option => option?.hex || ""}
        onChange={handleChangeColors}
        isMultiSelect
      />
    </ProductContainer>
  );
};

export default Product;
