import { IProductSchema } from "typings";
import { renderPriceTypeDollar } from "common/functions";
import { ProductBasicContainer, Image, Title, Price, Seller } from "./styles";

interface IProductBasicProps {
  product: IProductSchema;
  onClick?: (product: IProductSchema) => void;
}

const ProductBasic: React.FC<IProductBasicProps> = ({ product, onClick }) => {
  const { image, name, price } = product;
  return (
    <ProductBasicContainer onClick={() => onClick?.(product)}>
      <Seller>Best Seller</Seller>
      <Image src={image?.default} />
      <Title>{name}</Title>
      {price && <Price>Starting from {renderPriceTypeDollar(price)}</Price>}
    </ProductBasicContainer>
  );
};

export default ProductBasic;
