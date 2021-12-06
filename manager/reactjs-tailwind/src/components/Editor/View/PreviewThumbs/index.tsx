import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  PreviewThumbsContainer,
  PreviewCardContainer,
  NameColor,
} from "./styles";
import ProductTemplateImage from "components/ProductTemplateImage";
import { useCurrentCanvas } from "hooks/useCurrentCanvas";
import { IRootState } from "typings";
import { useCanvasEvent } from "hooks/useCanvasEvent";

interface IPreviewThumbsProps {}

const PreviewThumbs: React.FC<IPreviewThumbsProps> = props => {
  const [designedTemplateBase64, setDesignedTemplateBase64] = useState("");
  const { listColors } = useSelector((state: IRootState) => state.editor);
  const { activeSideIndex } = useSelector(
    (state: IRootState) => state.editorController,
  );
  const { productSchema } = useSelector(
    (state: IRootState) => state.productTemplate,
  );
  const currentSide = productSchema?.sides?.[activeSideIndex];
  const canvas = useCurrentCanvas();

  const updatePreviewImage = () => {
    if (!canvas) return;
    const preview = canvas.exportBase64PNG(80);
    setDesignedTemplateBase64(preview);
  };

  useEffect(() => {
    updatePreviewImage();
  }, [activeSideIndex]);

  useCanvasEvent("mouse:up", () => {
    updatePreviewImage();
  });

  if (listColors.length < 2) return null;

  return (
    <PreviewThumbsContainer>
      {listColors.map(color => {
        const heather = currentSide?.colorSchemas?.find(
          item => item?.color?.hex === color.hex,
        )?.heather?.small;

        return (
          <PreviewCardContainer key={color.hex}>
            <ProductTemplateImage
              backgroundColor={color}
              upperImage={currentSide?.upperImage?.small}
              heatherImage={heather}
              templateImage={designedTemplateBase64}
              size={80}
              position={currentSide?.clipPath}
            />
            <NameColor>{color.name}</NameColor>
          </PreviewCardContainer>
        );
      })}
    </PreviewThumbsContainer>
  );
};

export default PreviewThumbs;
