import Image from "designs/Image";
import { ICustomSizeImages } from "typings";
import {
  ProductTemplateCardContainer,
  ImageWrapper,
  TextWrapper,
} from "./styles";

interface IProductTemplateCardProps {
  className?: string;
  onClick?: (category: ICategory) => void;
  category?: ICategory;
}
export interface ICategory {
  _id?: string;
  name?: string;
  image?: ICustomSizeImages;
  hasChildren?: boolean;
}
const ProductTemplateCard: React.FC<IProductTemplateCardProps> = ({
  onClick,
  className = "",
  category = {},
}) => {
  return (
    <ProductTemplateCardContainer
      className={className}
      onClick={() => onClick?.(category)}
    >
      <ImageWrapper>
        <Image
          src={
            category?.image?.base64Image ||
            "https://files.cdn.printful.com/products/233/product_1551967769.jpg"
          }
        />
      </ImageWrapper>
      <TextWrapper>{category?.name}</TextWrapper>
    </ProductTemplateCardContainer>
  );
};

export default ProductTemplateCard;
