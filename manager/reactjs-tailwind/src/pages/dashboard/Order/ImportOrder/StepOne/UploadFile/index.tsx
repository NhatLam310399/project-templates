import { useDispatch } from "react-redux";
import {
  UploadFileContainer,
  WrapperUpload,
  Content,
  Title,
  Description,
} from "./styles";
import ImageUpload from "layouts/ImageUpload";
import SVG from "designs/SVG";

import useLocalStorage from "hooks/useLocalStorage";
import { nextStepOrderImport } from "redux/actions/orderImport";

interface IUploadFileProps {}

const IMPORT_ORDER_FILE_UPLOADED_LS_KEY = "IMPORT_ORDER_FILE_UPLOADED_LS_KEY";

const UploadFile: React.FC<IUploadFileProps> = props => {
  const dispatch = useDispatch();
  const [fileUploaded, setFileUploaded] = useLocalStorage<any>(
    IMPORT_ORDER_FILE_UPLOADED_LS_KEY,
    {},
  );

  const onUpload = (files: File[]) => {
    setFileUploaded(files[0]);
    dispatch(nextStepOrderImport());
  };
  return (
    <UploadFileContainer>
      <ImageUpload onUpload={onUpload}>
        <WrapperUpload>
          <SVG name="order/add" />
          <Content>
            <Title>Add your data file</Title>
            <Description>
              Drag your CSV or XLS file here or click to upload
            </Description>
          </Content>
        </WrapperUpload>
      </ImageUpload>
    </UploadFileContainer>
  );
};

export default UploadFile;
