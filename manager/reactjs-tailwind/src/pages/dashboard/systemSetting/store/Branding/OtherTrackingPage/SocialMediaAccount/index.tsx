import { SocialMediaContainer } from "./styles";
import Input from "designs/Input";

const SocialMedia: React.FC = () => {
  return (
    <SocialMediaContainer>
      <Input
        name="instagram"
        label="Instagram"
        className="mb-2.5"
        placeholder="Enter your link"
      />
      <Input
        name="facebook"
        label="Facebook"
        className="mb-2.5"
        placeholder="Enter your link"
      />
      <Input
        name="twitter"
        label="Twitter"
        className="mb-2.5"
        placeholder="Enter your link"
      />
      <Input
        name="youtube"
        label="Youtube"
        className="mb-2.5"
        placeholder="Enter your link"
      />
      <Input
        name="tiktok"
        label="Tiktok"
        className="mb-2.5"
        placeholder="Enter your link"
      />
      <Input
        name="snapchat"
        label="Snapchat"
        className="mb-2.5"
        placeholder="Enter your link"
      />
    </SocialMediaContainer>
  );
};
export default SocialMedia;
