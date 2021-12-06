import { Wrapper, Item } from "./styles";
import { useSelector } from "react-redux";
import { IRootState } from "@redux/reducers";
import { useRouter } from "next/router";

const regex = /\employer\//g;
const TopFooter: React.FC = () => {
  const {
    contentWebsite: { footerUserInfo = [], footerEmployerInfo = [] } = {},
  } = useSelector((state: IRootState) => state.contentWebsite);
  const currentPath = useRouter().pathname;
  const isEmployer = regex.test(currentPath);
  const data = isEmployer ? footerEmployerInfo : footerUserInfo;
  return (
    <Wrapper>
      {data.map((htmlString: string, index) => {
        return (
          <Item key={index} dangerouslySetInnerHTML={{ __html: htmlString }} />
        );
      })}
    </Wrapper>
  );
};

export default TopFooter;
