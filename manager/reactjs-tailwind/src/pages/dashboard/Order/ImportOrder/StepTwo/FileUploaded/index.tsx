import { useDispatch } from "react-redux";
import {
  FileUploadedContainer,
  Title,
  FileBoxWrapper,
  FileBox,
  FileName,
} from "./styles";

import SVG from "designs/SVG";
import useLocalStorage from "hooks/useLocalStorage";
import { defaultStepOrderImport } from "redux/actions/orderImport";

interface IFileUploadedProps {}

const IMPORT_ORDER_FILE_UPLOADED_LS_KEY = "IMPORT_ORDER_FILE_UPLOADED_LS_KEY";

const FileUploaded: React.FC<IFileUploadedProps> = ({}) => {
  const dispatch = useDispatch();
  const [fileUploaded, setFileUploaded] = useLocalStorage<any>(
    IMPORT_ORDER_FILE_UPLOADED_LS_KEY,
    {},
  );
  const handleRemoveFile = () => {
    if (window.confirm("Are you sure ?")) {
      setFileUploaded({});
      dispatch(defaultStepOrderImport());
    }
  };
  return (
    <FileUploadedContainer>
      <Title>File Uploaded :</Title>
      <FileBoxWrapper>
        <FileBox>
          <FileName>{fileUploaded ? fileUploaded.path : null}</FileName>
          <SVG
            name="dialog/close"
            className="cursor-pointer"
            onClick={handleRemoveFile}
          />
        </FileBox>
      </FileBoxWrapper>
    </FileUploadedContainer>
  );
};

export default FileUploaded;
