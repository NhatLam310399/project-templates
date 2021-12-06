import Guide from "./Guide";
import ListTemplates from "./ListTemplates";
import { ProductTemplateContainer, SubTitle } from "./styles";
import { Wrapper } from "designs/PageLayout";
import { Title } from "designs/Title";

interface IProductTemplateProps {}

const ProductTemplate: React.FC<IProductTemplateProps> = props => {
  return (
    <Wrapper>
      <ProductTemplateContainer>
        <Title>Product templates</Title>
        <SubTitle>
          A product template is a combo of print files and Printful products.
          Pick a product, add a design, save it, and use it as you like. Edit
          the templates, create collections, showcase your work, or push them to
          your store for selling.
        </SubTitle>
        <Guide />
        <ListTemplates />
      </ProductTemplateContainer>
    </Wrapper>
  );
};

export default ProductTemplate;
