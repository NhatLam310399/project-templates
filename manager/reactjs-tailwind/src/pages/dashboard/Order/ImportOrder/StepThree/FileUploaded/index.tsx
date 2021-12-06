import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  FileUploadedContainer,
  Heading,
  ValidatFile,
  ValidateDetected,
  Progress,
  ValidateErorr,
  ValidateSuccess,
  Content,
  ColLeft,
  ColRight,
  Collapses,
  Orther,
} from "./styles";

import Collapse from "components/Collapse";
import SVG from "designs/SVG";
import Button from "designs/Button";
import { defaultStepOrderImport } from "redux/actions/orderImport";

interface IFileUploadedProps {
  errors: boolean;
  fileUploaded: any;
}

const FileUploaded: React.FC<IFileUploadedProps> = ({
  errors,
  fileUploaded,
}) => {
  const dispatch = useDispatch();
  const [collapse, setCollapse] = useState<boolean>(false);

  const onHanleCollapse = () => {
    setCollapse(!collapse);
  };
  const onUploadFile = () => {
    dispatch(defaultStepOrderImport());
  };
  return (
    <FileUploadedContainer>
      <Heading.Wrapper>
        <Heading.Title>
          File uploaded : <Heading.Decs>{fileUploaded.path}</Heading.Decs>
        </Heading.Title>
      </Heading.Wrapper>
      <ValidatFile>
        <ValidateDetected.Title>
          1 row detected –{" "}
          <ValidateDetected.Desc>0 ready</ValidateDetected.Desc> for import
        </ValidateDetected.Title>
        <Progress errors={errors} />
        {errors ? (
          <ValidateErorr.wrapper>
            <Content onClick={onHanleCollapse}>
              <ColLeft.Container>
                <SVG
                  name="order/bottom"
                  className={
                    collapse
                      ? "transform rotate-180 transition-all delay-75 ease-linear"
                      : "transform rotate-0 transition-all delay-75 ease-linear"
                  }
                />
                <ColLeft.Title>Import issues</ColLeft.Title>
              </ColLeft.Container>
              <ColRight.Container>
                <ColRight.IssueNumber>1</ColRight.IssueNumber>
                <ColRight.Desc>
                  Orders with issues won't be imported. If you want to import
                  all the orders, resolve the issues in your spreadsheet and
                  re-upload the file.
                </ColRight.Desc>
              </ColRight.Container>
            </Content>
            <Collapse show={collapse} estimateHeight={50} smooth={true}>
              <Collapses.Container>
                <SVG name="order/closered" />
                <Collapses.Desc>Product not found. See row [2].</Collapses.Desc>
              </Collapses.Container>
            </Collapse>
          </ValidateErorr.wrapper>
        ) : (
          <ValidateSuccess>
            All of your orders have been saved and are ready for confirmation!
          </ValidateSuccess>
        )}
      </ValidatFile>
      <Orther.Container>
        <Button size="lg" onClick={onUploadFile}>
          Upload file
        </Button>
        <Orther.Desc>How to configure your file?</Orther.Desc>
      </Orther.Container>
    </FileUploadedContainer>
  );
};

export default FileUploaded;
