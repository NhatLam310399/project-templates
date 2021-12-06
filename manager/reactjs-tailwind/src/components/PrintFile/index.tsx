import { PrintFileContainer, Name, PreviewImage, Image } from "./styles";
import TransparentBG from "assets/images/editor/transparent-pattern.png";

interface IPrintFileProps {
  name: string | undefined;
  imageSrc: string | undefined;
}

const PrintFile: React.FC<IPrintFileProps> = ({ name, imageSrc }) => {
  return (
    <PrintFileContainer>
      <Name>{name}</Name>
      <PreviewImage
        style={{
          backgroundImage: `url(${TransparentBG})`,
        }}
      >
        <Image src={String(imageSrc)} alt={name} width="140px" height="auto" />
      </PreviewImage>
    </PrintFileContainer>
  );
};

export default PrintFile;
