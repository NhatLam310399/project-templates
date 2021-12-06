import { RecentlyUsedFilesContainer, Title, FileList } from "./styles";
import File from "designs/cards/File";
import { IFile } from "typings";

interface IRecentlyUsedFilesProps {}

const RecentlyUsedFiles: React.FC<IRecentlyUsedFilesProps> = props => {
  return (
    <RecentlyUsedFilesContainer>
      <Title>Recently used files</Title>
      <FileList>
        {listFile.map(file => (
          <File
            className="col-span-12 phone:col-span-6 laptop:col-span-3"
            file={file}
          />
        ))}
      </FileList>
    </RecentlyUsedFilesContainer>
  );
};

export default RecentlyUsedFiles;
const listFile: IFile[] = [
  {
    name: "cotton_candy.jpg",
    image: {
      default: "filesLibrary/image-demo.jpg",
    },
  },
  {
    name: "tie_dye.jpg",
    image: {
      default: "filesLibrary/image-demo.jpg",
    },
  },
];
