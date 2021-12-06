import { ICompany } from "@common/typings";
import SlickSlider from "@designs/SlickSlider";
import CompanyItem from "@designs/Card/CompanyItem";

import { CardContainer, CardLayoutContainer, Title } from "./styles";

interface ICardLayoutProps {
  title: string;
  data?: ICompany[];
}

const CardLayout: React.FC<ICardLayoutProps> = (props) => {
  const { title, data } = props;

  return (
    <CardLayoutContainer length={data?.length}>
      {data?.length > 0 && <Title>{title}</Title>}
      <SlickSlider className="slider-layout">
        {data?.map((item, index) => (
          <CardContainer key={`card-item-${index}`}>
            <CompanyItem company={item} />
          </CardContainer>
        ))}
      </SlickSlider>
    </CardLayoutContainer>
  );
};

export default CardLayout;
