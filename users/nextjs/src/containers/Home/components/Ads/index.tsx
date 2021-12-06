import { AdsContainer, AdImage } from "./styles";

interface IAdsProps {
  code: string;
}

const Ads: React.FC<IAdsProps> = (props) => {
  const { code } = props;
  return (
    <AdsContainer>
      <AdImage className="mb-2" dangerouslySetInnerHTML={{ __html: code }} />
    </AdsContainer>
  );
};

export default Ads;
