import { FileContainer, FileName, ImageWrapper, File } from "./styles";
import { IFile } from "typings";
import Image from "designs/Image";

interface IFileProps {
  file: IFile;
  className?: string;
  onClick?: (file: IFile) => void;
}

const FileCards: React.FC<IFileProps> = props => {
  const { className, file, onClick } = props;
  const handleClick = (file: IFile) => {
    onClick && onClick(file);
  };
  return (
    <FileContainer onClick={() => handleClick(file)} className={className}>
      <File>
        <ImageWrapper>
          <Image name={file?.image?.default || ""} />
          {/* when connect api replace name={file?.url}{" "}
          to src={file?.url} */}
        </ImageWrapper>
        <FileName>{file?.name}</FileName>
      </File>
    </FileContainer>
  );
};

export default FileCards;
