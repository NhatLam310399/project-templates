import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import dayjs from "dayjs";

import EditFileName from "./EditFileName";
import {
  Close,
  Title,
  TopDialog,
  Button,
  ButtonWrapper,
  ContentWrapper,
  Image as ImageSlide,
  ImagePreview,
  ThumbsWrapper,
  Thumbs,
  Arrow,
  DetailFileWrapper,
  Download,
  SizeAndTime,
} from "./styles";
import Dialog from "components/Dialog";

import SVG from "designs/SVG";
import { IFile, IFolder } from "typings";

interface IDialogDeleteFileProps {
  listFiles: IFile[];
  open: boolean;
  file: IFile | null;
  onClose: () => void;
}

const DialogDeleteFile: React.FC<IDialogDeleteFileProps> = props => {
  const { file, open, onClose, listFiles } = props;
  const [previewFiles, setPreviewFiles] = useState<IFile[]>([]);
  const [currentPreviewFile, setCurrentPreviewFile] = useState<IFile | null>(
    file,
  );
  const [display, setDisplay] = useState(false);
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    if (open) {
      setDisplay(open);
      setCurrentPreviewFile(file);
      handleArrangeList();
    }
  }, [open]);

  const handleClose = () => {
    setDisplay(false);
    setAgree(false);
    onClose && onClose();
  };
  const handleDelete = () => {
    console.log(file);
    handleClose();
  };
  const handleArrangeList = () => {
    const indexOfFile = listFiles?.findIndex(fileIndex => fileIndex === file);
    const getStartFileToFileCurrent = listFiles?.slice(0, indexOfFile);
    const getFileCurrentToEnd = listFiles?.slice(indexOfFile);
    const newFilesPreview = getFileCurrentToEnd.concat(
      getStartFileToFileCurrent,
    );
    setPreviewFiles(newFilesPreview);
  };
  const renderThumbs = () => {
    return previewFiles?.map(file => (
      <ThumbsWrapper>
        <Thumbs src={file?.image?.default || ""} />
      </ThumbsWrapper>
    ));
  };
  const renderNext = (
    clickHandler: () => void,
    hasNext: boolean,
    labelPrev: string,
  ) => {
    return (
      hasNext && (
        <Arrow
          className="transform right-1 -translate-y-2/4"
          onClick={clickHandler}
        >
          <SVG
            className="duration-300 transform rotate-180 hover:bg-neutral-5 arrow-next-pre"
            name="common/arrow-left"
          />
        </Arrow>
      )
    );
  };
  const renderPre = (
    clickHandler: () => void,
    hasPre: boolean,
    labelPrev: string,
  ) => {
    return (
      hasPre && (
        <Arrow
          className="transform left-1 -translate-y-2/4"
          onClick={clickHandler}
        >
          <SVG className="arrow-next-pre" name="common/arrow-left" />
        </Arrow>
      )
    );
  };
  const handleChangeSlide = (indexSlide: number) => {
    previewFiles?.map((file, index: number) => {
      if (index === indexSlide) {
        setCurrentPreviewFile(file);
      }
    });
  };
  const formatTime = dayjs(currentPreviewFile?.createAt).format(
    "MMM DD, h:mm a",
  );
  return (
    <Dialog open={display} size="lg" onClose={handleClose}>
      <TopDialog>
        <Title>Preview</Title>
        <Close onClick={handleClose}>
          <SVG name="common/close" />
        </Close>
      </TopDialog>
      <ContentWrapper>
        <Carousel
          useKeyboardArrows
          onChange={handleChangeSlide}
          showIndicators={false}
          showStatus={false}
          swipeable
          showArrows
          showThumbs
          emulateTouch
          renderThumbs={renderThumbs}
          renderArrowNext={renderNext}
          renderArrowPrev={renderPre}
        >
          {previewFiles?.map(file => (
            <ImagePreview key={file?.fileId}>
              <ImageSlide src={file?.image?.default || ""} alt={file?.name} />
            </ImagePreview>
          ))}
        </Carousel>
      </ContentWrapper>
      <DetailFileWrapper>
        <EditFileName file={currentPreviewFile} />
        <SizeAndTime>{currentPreviewFile?.size}</SizeAndTime>
        <SizeAndTime>{formatTime}</SizeAndTime>
      </DetailFileWrapper>
      <ButtonWrapper>
        <Button type="button" size="md" variant="primary">
          <Download href={currentPreviewFile?.url} download>
            Download file
          </Download>
        </Button>
      </ButtonWrapper>
    </Dialog>
  );
};
export default DialogDeleteFile;
