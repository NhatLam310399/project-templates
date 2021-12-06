import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListFonts, FontItem, FontContainer } from "./styles";
import { fontFamilies, IFontFamily } from "common/constants/editor/font";
import { loadFonts } from "common/functions";
import { setTextStyleConfig } from "redux/actions/editorController";
import { IRootState } from "typings";
import { useCurrentCanvas } from "hooks/useCurrentCanvas";
import TextSelectorLayout from "layouts/Editor/TextSelector";
import { useActiveObject } from "hooks/useActiveObject";
import { BackToMenu } from "layouts/Editor/TabComponents";

interface IFontSelectProps {}

const ACTIVE_FONT_FAMILY_CLASS = "active-font-family-editor";

const Font: React.FC<IFontSelectProps> = props => {
  const canvas = useCurrentCanvas();
  const dispatch = useDispatch();
  const { fontFamily } = useSelector(
    (state: IRootState) => state.editorController.textStyleConfig,
  );
  const { currentActiveObjectId } = useSelector(
    (state: IRootState) => state.editor,
  );
  const activeObject = useActiveObject();

  useEffect(() => {
    loadFonts(fontFamily.name, fontFamily.url, () => {
      if (currentActiveObjectId) {
        if (!canvas) return;
        const activeObj = canvas.getActiveObject();
        if (activeObj.typeObject === "TEXT") {
          (activeObj as any).fontFamily = fontFamily.name;
          canvas.renderAll();
        }
      }
    });
  }, [fontFamily]);

  useEffect(() => {
    if (activeObject && activeObject.typeObject === "TEXT") {
      const nameFontSelected = (activeObject as any).fontFamily;
      const fontSelected = fontFamilies.find(
        font => font.name === nameFontSelected,
      );
      dispatch(setTextStyleConfig({ fontFamily: fontSelected }));
    }
  }, [activeObject]);

  const handleSelectFontFamily = (font: IFontFamily) => {
    dispatch(setTextStyleConfig({ fontFamily: font }));
  };

  return (
    <FontContainer>
      <BackToMenu />
      <TextSelectorLayout label="Font family">
        <ListFonts>
          {fontFamilies.map(font => (
            <FontItem
              onClick={() => handleSelectFontFamily(font)}
              key={font.name}
              className={
                fontFamily.name === font.name
                  ? ACTIVE_FONT_FAMILY_CLASS + " active"
                  : ""
              }
            >
              {font.name}
            </FontItem>
          ))}
        </ListFonts>
      </TextSelectorLayout>
    </FontContainer>
  );
};

export default Font;
