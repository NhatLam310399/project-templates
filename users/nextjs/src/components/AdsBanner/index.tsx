import Link from "next/link";
import { Wrapper, Img } from "./styles";

interface IAdsBanner {
  urlImg?: string;
  name?: string;
  link?: string;
}

const AdsBanner: React.FC<IAdsBanner> = (props) => {
  const { urlImg, link = "", name } = props;
  return (
    <Wrapper>
      <Link href={link}>
        <a>
          <Img src={urlImg} alt={name} />
        </a>
      </Link>
    </Wrapper>
  );
};

export default AdsBanner;
