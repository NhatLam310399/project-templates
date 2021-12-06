import {
  FolderContainer,
  Icon,
  FolderWrapper,
  IconWrapper,
  InfoFolder,
  Setting,
  Name,
  Total,
  Dots,
  Action,
  ModalSetting,
} from "./styles";
import { IFolder } from "typings";
import { useClickOutSide } from "hooks/useClickOutside";
import SVG from "designs/SVG";

interface IFolderProps {
  folder: IFolder;
  className?: string;
  setting?: boolean;
  sample?: boolean;
  onClickSetting?: (folder: IFolder, typeAction: IAction) => void;
}
export type IAction = "Edit" | "Move to" | "Delete" | "Open";
const Folder: React.FC<IFolderProps> = props => {
  const { className, folder, setting = true, sample, onClickSetting } = props;

  const { elementRef, isVisible, setElementVisible } = useClickOutSide(false);

  const handleOpenSetting = () => {
    setElementVisible(!isVisible);
  };
  const handleAction = (action: IAction, folder: IFolder) => {
    setElementVisible(false);
    onClickSetting && onClickSetting(folder, action);
  };
  return (
    <FolderContainer className={className}>
      <FolderWrapper>
        <IconWrapper onClick={() => handleAction("Open", folder)}>
          {sample ? (
            <SVG name="fileLibrary/sample-folder" />
          ) : (
            <Icon src={folder?.icon} />
          )}
        </IconWrapper>
        <InfoFolder onClick={() => handleAction("Open", folder)}>
          <Name>{folder?.name}</Name>
          <Total>
            {folder?.children?.length || 0} folders,{" "}
            {folder?.files?.length || 0} files
          </Total>
        </InfoFolder>
        {setting && (
          <Setting ref={elementRef} onClick={handleOpenSetting}>
            <Dots />
            <Dots />
            <Dots />
          </Setting>
        )}
      </FolderWrapper>
      <ModalSetting active={isVisible}>
        <Action onClick={() => handleAction("Edit", folder)}>Edit</Action>
        <Action onClick={() => handleAction("Move to", folder)}>Move to</Action>
        <Action onClick={() => handleAction("Delete", folder)}>Delete</Action>
      </ModalSetting>
    </FolderContainer>
  );
};

export default Folder;
