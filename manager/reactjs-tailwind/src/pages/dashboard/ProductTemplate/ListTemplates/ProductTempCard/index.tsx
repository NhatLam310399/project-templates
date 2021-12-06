import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ProductTempCardContainer,
  ImageContainer,
  Content,
  Title,
  Text,
} from "./styles";
import { productDesignTempMock } from "common/constants/editor/mockData";
import { PATH } from "common/constants/routes";
import ProductTemplateImage from "components/ProductTemplateImage";
import { IRootState } from "typings";

interface IProductTempCardProps {}

const ProductTempCard: React.FC<IProductTempCardProps> = props => {
  const [productDemo] = useState(productDesignTempMock?.mockups?.[0]);
  const { storeTemplateDesigned } = useSelector(
    (state: IRootState) => state.productTemplate,
  );
  const { sides, colors } = storeTemplateDesigned;

  if (!storeTemplateDesigned?.productDesignSchemaId) return null;

  const previewSide = sides?.[0];
  const currentColor = colors?.[colors.length - 1];
  const colorSchema = productDemo?.colorSchemas.find(
    item => item?.color?.hex === currentColor?.hex,
  );
  return (
    <Link to={PATH.PRODUCT_TEMPLATE_DETAIL.replace(":id", "2234235")}>
      <ProductTempCardContainer>
        <ImageContainer>
          <ProductTemplateImage
            size={220}
            backgroundColor={currentColor}
            heatherImage={colorSchema?.heather?.small}
            upperImage={productDemo?.upperImage.small || ""}
            templateImage={String(previewSide?.base64TemplateImage)}
            position={productDemo?.clipPath}
          />
        </ImageContainer>
        <Content>
          <Title>{productDemo?.name}</Title>
          <Text>Technique: Printing (DTG) </Text>
          <Text>Size: L</Text>
          <Text>Print files: Front, Back</Text>
        </Content>
      </ProductTempCardContainer>
    </Link>
  );
};

export default ProductTempCard;
