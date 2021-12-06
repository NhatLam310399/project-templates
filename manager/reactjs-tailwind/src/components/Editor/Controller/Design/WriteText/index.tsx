import { useDispatch, useSelector } from "react-redux";
import { fabric } from "fabric";
import { useEffect } from "react";
import { AddTextContainer, TextArea } from "./styles";
import { useDebounced } from "hooks/useDebounced";
import { BackToMenu } from "layouts/Editor/TabComponents";
import { addText } from "redux/actions/editor";
import { IRootState } from "typings";
import { useCurrentCanvas } from "hooks/useCurrentCanvas";
import { store } from "index";

interface IAddTextProps {}

const AddText: React.FC<IAddTextProps> = props => {
  return (
    <AddTextContainer>
      <BackToMenu />
      <TextInput />
    </AddTextContainer>
  );
};

export default AddText;

const TextInput: React.FC<{}> = props => {
  const { currentActiveObjectId } = useSelector(
    (state: IRootState) => state.editor,
  );
  const canvas = useCurrentCanvas();
  // const
  const dispatch = useDispatch();

  const { inputText, setInputText } = useDebounced(text => {
    // Because this callback just renders once, so we cannot use useSelector to take state
    // Access directly from store is better
    const { textStyleConfig } = store.getState().editorController;

    if (!canvas) return console.error(new Error("CANVAS isn't found!"));

    // If we are selecting a textbox, just change it instead of create a new one
    const activeObj = canvas.getActiveObject();
    if (activeObj?.typeObject === "TEXT") {
      (activeObj as any).text = text;
      canvas.renderAll();
      return;
    }

    const newText = new fabric.Textbox(text, {
      fill: textStyleConfig.fill.hex,
      fontSize: textStyleConfig.fontSize,
      fontFamily: textStyleConfig.fontFamily.name,
      fontWeight: textStyleConfig.fontWeight,
      fontStyle: textStyleConfig.fontStyle,
      linethrough: false,
      textAlign: textStyleConfig.textAlign,
    });

    dispatch(addText(newText));
  });

  useEffect(() => {
    if (!canvas) return;
    if (currentActiveObjectId) {
      const activeObj = canvas.getActiveObject();
      if (activeObj?.typeObject === "TEXT") {
        setInputText((activeObj as any).text);
      }
    } else {
      setInputText("");
    }
  }, [currentActiveObjectId]);

  return (
    <TextArea
      value={inputText}
      autoFocus
      onChange={e => setInputText(e.target.value)}
    />
  );
};
