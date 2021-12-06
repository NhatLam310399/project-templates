import { useDropboxChooser } from "use-dropbox-chooser";
import { UploadIcon, DropboxContainer } from "./styles";
import SVG from "designs/SVG";

const APP_KEY = "u4mlb8ial9t0q6m";

interface IDropboxProps {
  onSelectFile: (files: IFileCustom[]) => void;
  className?: string;
}
export interface IFileCustom {
  fileName: string;
  link: string;
  size: number;
}
const Dropbox: React.FC<IDropboxProps> = ({ onSelectFile, className = "" }) => {
  const { open, isOpen } = useDropboxChooser({
    appKey: APP_KEY,
    chooserOptions: { multiple: true, linkType: "direct" },
  });

  const handleOpen = async () => {
    const files = await open();
    console.log(files);
    console.log("file dropbox", files);
  };
  return (
    <DropboxContainer className={className}>
      <UploadIcon onClick={handleOpen} size="lg" variant="secondary">
        <SVG name="fileLibrary/dropbox" />
      </UploadIcon>
    </DropboxContainer>
  );
};

export default Dropbox;
