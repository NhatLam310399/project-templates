import { FolderContainer, FolderWrapper, Icon, Text } from "./styles";
import SVG from "designs/SVG";

interface IFolderProps {
  className?: string;
  onClick?: () => void;
}
export type IAction = "Edit" | "Move to" | "Delete";
const CreateFolder: React.FC<IFolderProps> = props => {
  const { className, onClick } = props;

  return (
    <FolderContainer onClick={onClick} className={className}>
      <FolderWrapper>
        <Icon>
          <SVG name="common/add-circle" width="25px" height="25px" />
        </Icon>
        <Text>Create new folder</Text>
      </FolderWrapper>
    </FolderContainer>
  );
};

export default CreateFolder;
