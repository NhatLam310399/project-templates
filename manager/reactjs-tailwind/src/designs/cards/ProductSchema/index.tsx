import ListColors from "components/ListColors";
import StarsRating from "components/StarsRating";
import { IProductSchema } from "typings";
import {
  ProductTemplateCardContainer as ProductCardContainer,
  ImageWrapper,
  Image,
  Name,
  ColorWrapper,
  Description,
  DetailWrapper,
  Price,
  RatingWrapper,
  Size,
  TotalReview,
} from "./styles";

interface IProductSchemaCardProps {
  className?: string;
  onClick?: () => void;
  productSchema?: IProductSchema;
}

const ProductSchemaCard: React.FC<IProductSchemaCardProps> = ({
  onClick,
  className = "",
  productSchema,
}) => {
  if (!productSchema) return null;

  const {
    name,
    image,
    sizes,
    colors,
    price,
    rate,
    fromCountries,
    reviewCount,
  } = productSchema;

  const sizeRange: string =
    sizes.length > 1
      ? `${sizes[0].name} - ${sizes[sizes.length - 1].name}`
      : sizes[0].name;

  return (
    <ProductCardContainer className={className} onClick={() => onClick?.()}>
      <ImageWrapper>
        <Image src={image?.medium} />
      </ImageWrapper>
      <DetailWrapper>
        <Name>{name}</Name>
        <RatingWrapper>
          <StarsRating count={rate} />
          <TotalReview>{`${reviewCount} reviews`}</TotalReview>
        </RatingWrapper>
        <Price>{`Starting from $${Number(price.toFixed(2))}`}</Price>
        <ListColors
          size="sm"
          colors={colors || []}
          getColor={item => item?.hex}
        />
        <Size>{sizeRange}</Size>
        <Description>{`Fullfilled in ${fromCountries.length} countries worldwide`}</Description>
      </DetailWrapper>
    </ProductCardContainer>
  );
};

export default ProductSchemaCard;
