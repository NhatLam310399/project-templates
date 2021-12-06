import Controller from "./Controller";
import { EditorContainer } from "./styles";
import View from "./View";

interface IEditorProps {}

const Editor: React.FC<IEditorProps> = props => {
  return (
    <EditorContainer>
      <Controller />
      <View />
    </EditorContainer>
  );
};

export default Editor;
