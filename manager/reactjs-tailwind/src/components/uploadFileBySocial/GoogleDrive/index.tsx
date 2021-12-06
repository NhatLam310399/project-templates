import { useEffect } from "react";
import useDrivePicker from "react-google-drive-picker";
import { GoogleLogin } from "react-google-login";
import { UploadIcon, GoogleDriveContainer } from "./styles";
import SVG from "designs/SVG";

const GOOGLE_CLIENT_ID =
  "664891187531-a1j0lf2kerqht7b91q5pnkv3rt03l6qg.apps.googleusercontent.com";
const API_KEY = "AIzaSyCpEq0MzjNceBuXw0Wxo0c4Xvx7yanim0g";
const scope = "https://www.googleapis.com/auth/drive.readonly";

interface IGoogleDriveProps {
  onSelectFile: (files: IFileCustom[]) => void;
  className?: string;
}
export interface IFileCustom {
  fileName: string;
  link: string;
  size: number;
}
const GoogleDrive: React.FC<IGoogleDriveProps> = ({
  onSelectFile,
  className = "",
}) => {
  const [openPicker, data, authResponse] = useDrivePicker();

  const handleOpenPicker = (accessToken: string) => {
    openPicker({
      clientId: GOOGLE_CLIENT_ID,
      developerKey: API_KEY,
      viewId: "DOCS_IMAGES",
      token: accessToken,
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      customScopes: [scope],
    });
  };

  useEffect(() => {
    if (data) {
      if (data.docs?.length > 0) {
        const files: IFileCustom[] = [];
        data.docs.map(fileSelected => {
          const file: IFileCustom = {
            fileName: fileSelected.name,
            link: fileSelected.url,
            size: fileSelected.sizeBytes,
          };
          files.push(file);
        });
        onSelectFile && onSelectFile(files);
      }
    }
  }, [data, authResponse]);

  const responseGoogle = (response: any) => {
    const accessToken = response?.accessToken;
    handleOpenPicker(accessToken);
  };
  return (
    <GoogleDriveContainer className={className}>
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        render={props => (
          <UploadIcon onClick={props.onClick} size="lg" variant="secondary">
            <SVG name="fileLibrary/driver" />
          </UploadIcon>
        )}
        cookiePolicy={"single_host_origin"}
      />
    </GoogleDriveContainer>
  );
};

export default GoogleDrive;
