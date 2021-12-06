import { useEffect, useState } from "react";
import {
  ProductCardContainer,
  Text,
  Name,
  CheckboxWrapper,
  DetailWrapper,
  ImageWrapper,
  Overlay,
  Preview,
  Action,
  ModalSetting,
  Setting,
  Dot,
  Download,
} from "./styles";
import Image from "designs/Image";
import Checkbox from "designs/Checkbox";
import { IFile } from "typings";

interface IProductCardProps {
  file: IFile;
  isFileSample?: boolean;
  isChecked?: boolean;
  className?: string;
  onChecked?: (file: IFile | null, isChecked: boolean) => void;
  onClickSetting?: (file: IFile, typeAction: IAction) => void;
}
export type IAction = "Move to" | "Delete" | "Preview";
const ProductCard: React.FC<IProductCardProps> = ({
  onChecked,
  onClickSetting,
  isChecked = false,
  isFileSample = false,
  file,
  className = "",
}) => {
  const { type, size, resolution, name, fileId, _id, image } = file || {};
  const [checked, setChecked] = useState(false);
  const [activeSetting, setActiveSetting] = useState(false);
  useEffect(() => {
    setChecked(isChecked);
    if (isChecked) {
      onChecked && onChecked(file, isChecked);
    }
  }, [isChecked]);

  const handleClick = (checked: boolean) => {
    if (checked) {
      onChecked && onChecked(file, checked);
    } else {
      onChecked && onChecked(null, checked);
    }
    setChecked(checked);
  };

  const handleLeave = () => {
    setActiveSetting(false);
  };
  const handleClickAction = (typeAction: IAction, file: IFile) => {
    onClickSetting && onClickSetting(file, typeAction);
  };
  return (
    <ProductCardContainer className={className ? className : "w-24"}>
      <ImageWrapper>
        <Image src={image?.medium || image?.default || ""} />
        {!isFileSample && (
          <CheckboxWrapper>
            <Checkbox primary onChange={handleClick} initialCheck={checked} />
          </CheckboxWrapper>
        )}
      </ImageWrapper>
      <DetailWrapper>
        <Name>{name}</Name>
        {type && <Text>Type: {type}</Text>}
        {size && <Text>Size: {size}</Text>}
        {resolution && <Text>Resolution: {resolution}</Text>}
        {fileId && <Text>FileID: {fileId}</Text>}
      </DetailWrapper>
      <Overlay onMouseLeave={handleLeave} className="product-overlay">
        <Preview onClick={() => handleClickAction("Preview", file)}>
          Preview
        </Preview>
        <Setting onClick={() => setActiveSetting(true)}>
          <Dot />
          <Dot />
          <Dot />
        </Setting>
        <ModalSetting active={activeSetting}>
          <Action onClick={() => handleClickAction("Preview", file)}>
            Preview
          </Action>
          <Download href={file?.url} download>
            Download
          </Download>
          {!isFileSample && (
            <>
              <Action onClick={() => handleClickAction("Move to", file)}>
                Move to
              </Action>
              <Action onClick={() => handleClickAction("Delete", file)}>
                Delete
              </Action>
            </>
          )}
        </ModalSetting>
      </Overlay>
    </ProductCardContainer>
  );
};

export default ProductCard;
