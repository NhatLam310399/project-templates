import { useDispatch } from "react-redux";

import {
  EmptyContainer,
  UploadIcon,
  Upload,
  Text,
  Content,
  ContentImage,
  HighlightText,
  Link,
  Note,
  UploadContainer,
  Circle,
  Line,
  LineCenter,
  LineText,
  ImageWrapper,
} from "./styles";

import GoogleDrive, {
  IFileCustom,
} from "components/uploadFileBySocial/GoogleDrive";
import DropboxUpload from "components/uploadFileBySocial/Dropbox";

import { Title } from "designs/Title";
import { Wrapper } from "designs/PageLayout";
import Button from "designs/Button";
import SVG from "designs/SVG";
import Image from "designs/Image";

import ImageUploadLayout from "layouts/ImageUpload";
import { step } from "redux/actions/fileLibrary";

interface IFileLibraryProps {}

const FileLibrary: React.FC<IFileLibraryProps> = props => {
  const dispatch = useDispatch();

  const handleUploadRawImage = (files: File[]) => {
    if (!files) return;
    const file = files[0];
    dispatch(step(2));
    //add to server
    console.log("file", file);
  };
  const handleToSampleFile = () => {
    dispatch(step(3));
  };
  const handleSelectFile = (files: IFileCustom[]) => {
    console.log("files", files);
  };
  return (
    <Wrapper>
      <Title>File Libraries</Title>
      <EmptyContainer>
        <Content>
          <ContentImage>
            <ImageWrapper>
              <Image name="filesLibrary/upload-files.png" className="block" />
            </ImageWrapper>
            <Text>Drag your file here</Text>
            <UploadContainer>
              <ImageUploadLayout onUpload={handleUploadRawImage}>
                <Button size="lg" icon={<SVG name="fileLibrary/upload" />}>
                  Upload
                </Button>
              </ImageUploadLayout>
              <GoogleDrive onSelectFile={handleSelectFile} />

              <DropboxUpload onSelectFile={handleSelectFile} />
            </UploadContainer>
            <Text>
              Submit files in <HighlightText> PNG </HighlightText>or{" "}
              <HighlightText> JPEG </HighlightText> format{" "}
            </Text>
          </ContentImage>
          <LineCenter>
            <Line />
            <Circle>
              <LineText>Or</LineText>
            </Circle>
            <Line />
          </LineCenter>
          <ContentImage>
            <ImageWrapper>
              <Image name="filesLibrary/sample-files.png" className="block" />
            </ImageWrapper>
            <Text>Use sample file made by our in-house designers</Text>
            <Upload onClick={handleToSampleFile} size="lg">
              To sample file
            </Upload>
          </ContentImage>
        </Content>
        <Note>
          <Text>
            Make sure you have read our <Link>Terms Of Service</Link> and{" "}
            <Link>Acceptable Content Guidelines</Link>
          </Text>
        </Note>
      </EmptyContainer>
    </Wrapper>
  );
};

export default FileLibrary;
