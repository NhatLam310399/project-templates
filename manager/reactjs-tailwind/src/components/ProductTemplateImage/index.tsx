import {
  HeatherBackground,
  ProductTemplateImageContainer,
  TemplateImage,
  UpperBackgroundImage,
} from "./styles";
import { IColor, IRectCanvas } from "typings";

// URL or base64 string
interface IProductTemplateImageProps {
  className?: string;
  heatherImage?: string | undefined;
  upperImage: string | undefined;
  templateImage: string | undefined;
  backgroundColor: IColor;
  size: number;
  position: IRectCanvas | undefined;
}

const ProductTemplateImage: React.FC<IProductTemplateImageProps> = props => {
  const {
    className = "",
    heatherImage,
    size,
    upperImage,
    templateImage,
    backgroundColor,
    position: { x = 0, y = 0, w = 0, h = 0 } = {},
  } = props;

  const tempBGImage = `url(${templateImage}) ${x * size}px ${y * size}px / ${
    w * size
  }px ${h * size}px no-repeat transparent`;

  const color = backgroundColor?.hex?.split("/")[0];

  const sizeStyle = { width: `${size}px`, height: `${size}px` };

  return (
    <ProductTemplateImageContainer className={className} style={sizeStyle}>
      <HeatherBackground
        style={{
          backgroundImage: `url(${heatherImage})`,
          backgroundColor: color || "white",
          ...sizeStyle,
        }}
      />
      <TemplateImage style={{ background: tempBGImage, ...sizeStyle }} />
      <UpperBackgroundImage
        style={{ backgroundImage: `url(${upperImage})`, ...sizeStyle }}
      />
    </ProductTemplateImageContainer>
  );
};

export default ProductTemplateImage;
