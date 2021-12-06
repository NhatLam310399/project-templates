import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fabric } from "fabric";
import { TopBarContainer, TabItem, ListTabs } from "./styles";
import {
  IProductSide,
  IRectCanvas,
  IRootState,
  IStoreTemplateDesigned,
} from "typings";
import {
  resetAll,
  setClipPath,
  setHeatherBackground,
  setListColors,
  setUpperBackground,
} from "redux/actions/editor";
import {
  setIsContinueStepPreview,
  setStoreTemplateDesigned,
} from "redux/actions/productTemplate";
import { setActiveSideIndex } from "redux/actions/editorController";

interface ITopBarProps {}

const TopBar: React.FC<ITopBarProps> = props => {
  const dispatch = useDispatch();
  const { productSchema, isContinueStepPreview, storeTemplateDesigned } =
    useSelector((state: IRootState) => state.productTemplate);
  const { canvas, listColors, clipPath } = useSelector(
    (state: IRootState) => state.editor,
  );
  const { activeSideIndex } = useSelector(
    (state: IRootState) => state.editorController,
  );
  const sides = productSchema?.sides || [];
  const [activeSide, setActiveSide] = useState<IProductSide>(sides[0]);

  const currentColor = listColors?.[listColors.length - 1];

  useEffect(() => {
    if (!canvas || !activeSide) return;

    const { upperImage, clipPath } = activeSide;

    if (clipPath) setupClipPathToCanvas(clipPath);
    if (upperImage?.base64Image)
      setupUpperBackgroundImage(upperImage.base64Image);

    const initData = storeTemplateDesigned?.sides?.[activeSideIndex];
    if (initData) {
      canvas.importObjects(initData?.objects);
    }
  }, [canvas, activeSide]);

  useEffect(() => {
    if (productSchema && !storeTemplateDesigned?.isEdited) {
      dispatch(
        setStoreTemplateDesigned({
          productDesignSchemaId: productSchema._id,
          sides: new Array(productSchema?.sides?.length).fill(null),
        }),
      );
    }
  }, [productSchema]);

  useEffect(() => {
    if (currentColor) {
      const colorSchema = activeSide?.colorSchemas?.find(cs => {
        return cs?.color?.hex === currentColor.hex;
      });
      console.log("SET HEATHER --", colorSchema);
      setupHeatherForCanvas(colorSchema?.heather?.base64Image || null);
    }
  }, [currentColor?.hex, activeSide, canvas]);

  /**
   * @description Init background
   */
  useEffect(() => {
    if (!canvas || !sides || !productSchema?.colors) return;
    dispatch(setListColors([productSchema?.colors[0]]));
  }, [canvas, sides]);

  useEffect(() => {
    if (isContinueStepPreview) {
      console.log("SAVE DATA BEFORE NEXT STEP");
      storeData();

      dispatch(setIsContinueStepPreview(false));
    }
  }, [isContinueStepPreview]);

  const setupClipPathToCanvas = (clipPath: IRectCanvas) => {
    dispatch(setClipPath(clipPath));
  };

  const setupHeatherForCanvas = (heatherImageSrc: string | null) => {
    dispatch(setHeatherBackground(heatherImageSrc));
  };

  const setupUpperBackgroundImage = (imageSrc: string) => {
    fabric.Image.fromURL(
      imageSrc,
      img => {
        img.set({
          top: 0,
          left: 0,
          originX: "left",
          originY: "top",
          typeObject: "BACKGROUND",
        });
        const size = canvas?.getWidth() || 800;
        img.scaleToWidth(size);
        img.scaleToHeight(size);
        dispatch(setUpperBackground(img));
      },
      { crossOrigin: "anonymous" },
    );
  };

  const storeData = (isBind = false) => {
    if (canvas && clipPath) {
      const image = canvas.exportBase64PNG(600);
      if (storeTemplateDesigned?.sides) {
        const newStore: IStoreTemplateDesigned = {
          isEdited: true,
          productDesignSchemaId: productSchema?._id || "",
          colors: listColors,
          sides: [...storeTemplateDesigned.sides],
        };
        newStore.sides[activeSideIndex] = {
          sideType: activeSide.sideType,
          objects: canvas.exportMainObjects(),
          base64TemplateImage: image,
        };
        dispatch(setStoreTemplateDesigned(newStore));
      }
    }
  };

  const handleChangeSide = (newSide: IProductSide, index: number) => {
    storeData();
    dispatch(resetAll());
    setActiveSide({ ...newSide });
    dispatch(setActiveSideIndex(index));
  };

  return (
    <TopBarContainer>
      <ListTabs>
        {sides?.map((side, index) => (
          <TabItem
            onClick={() => handleChangeSide(side, index)}
            key={side?._id}
            className={activeSide._id === side._id ? "active" : ""}
          >
            {side.sideType.name}
          </TabItem>
        ))}
      </ListTabs>
    </TopBarContainer>
  );
};

export default TopBar;
