import { useState } from "react";
import { useSelector } from "react-redux";
import {
  ProductTemplateDetailContainer,
  GridContainer,
  Content,
  ImageContainer,
  PropertyLayoutContainer,
  LinkButton,
  PrintFilesList,
  ButtonsContainer,
} from "./styles";
import DownloadMockup from "./DownloadMockup";
import { productDesignTempMock } from "common/constants/editor/mockData";
import { PATH } from "common/constants/routes";
import FormControlLabel from "common/styles/FormControlLabel";
import Breadcrumb from "components/Breadcrumb";
import ListColors from "components/ListColors";
import PrintFile from "components/PrintFile";
import ProductTemplateImage from "components/ProductTemplateImage";
import Button from "designs/Button";
import { Wrapper } from "designs/PageLayout";
import { Title } from "designs/Title";
import { IRootState } from "typings";

interface IProductTemplateDetailProps {}

const nameTemplate = "Men's T-shirt";

type IFullScreenTab = "ADD_TO_STORE" | "MAKE_AN_ORDER" | "DOWNLOAD_MOCKUP";

const ProductTemplateDetail: React.FC<IProductTemplateDetailProps> = props => {
  const [currentFullScreenTab, setCurrentFullScreenTab] =
    useState<IFullScreenTab | null>(null);
  const [productDemo] = useState(productDesignTempMock?.mockups?.[0]);
  const { storeTemplateDesigned } = useSelector(
    (state: IRootState) => state.productTemplate,
  );
  const { sides, colors } = storeTemplateDesigned;

  const previewSide = sides?.[0];
  const currentColor = colors?.[colors.length - 1];
  const colorSchema = productDemo?.colorSchemas.find(
    item => item?.color?.hex === currentColor?.hex,
  );
  const sizes = ["XS", "S", "L"];

  const closeFullScreen = () => {
    setCurrentFullScreenTab(null);
  };

  return (
    <>
      <Wrapper>
        <ProductTemplateDetailContainer>
          <Breadcrumb
            items={[
              {
                name: "Product templates",
                link: PATH.PRODUCT_TEMPLATE,
              },
              {
                name: nameTemplate,
              },
            ]}
          />
          <Title>{nameTemplate}</Title>
          <GridContainer>
            <ImageContainer>
              <ProductTemplateImage
                size={300}
                backgroundColor={currentColor}
                heatherImage={colorSchema?.heather?.small}
                upperImage={productDemo?.upperImage?.small || ""}
                templateImage={String(previewSide?.base64TemplateImage)}
                position={productDemo?.clipPath}
              />
            </ImageContainer>
            <Content>
              <PropertyLayout title="Product">
                {productDemo?.name}
                <LinkButton>See product info</LinkButton>
              </PropertyLayout>
              <PropertyLayout title="Price">
                Starting from $28.83
              </PropertyLayout>
              <PropertyLayout title="Colors">
                <ListColors colors={colors} getColor={item => item?.hex} />
              </PropertyLayout>
              <PropertyLayout title="Print files">
                <PrintFilesList>
                  {sides.map(side => {
                    if (!side) return null;
                    return (
                      <PrintFile
                        key={side.sideType?.name}
                        name={side?.sideType?.name}
                        imageSrc={side?.base64TemplateImage || ""}
                      />
                    );
                  })}
                </PrintFilesList>
              </PropertyLayout>
              <PropertyLayout title="Sizes">{sizes.join(", ")}</PropertyLayout>
              <ButtonsContainer>
                <Button
                  variant="primary"
                  onClick={() => setCurrentFullScreenTab("ADD_TO_STORE")}
                >
                  Add to store
                </Button>
                <Button
                  variant="third"
                  onClick={() => setCurrentFullScreenTab("MAKE_AN_ORDER")}
                >
                  Make an order
                </Button>
                <Button
                  variant="third"
                  onClick={() => setCurrentFullScreenTab("DOWNLOAD_MOCKUP")}
                >
                  Download Mockup
                </Button>
              </ButtonsContainer>
            </Content>
          </GridContainer>
        </ProductTemplateDetailContainer>
      </Wrapper>
      <DownloadMockup
        open={currentFullScreenTab === "DOWNLOAD_MOCKUP"}
        onClose={closeFullScreen}
      />
    </>
  );
};

export default ProductTemplateDetail;

const PropertyLayout: React.FC<{ title: string }> = ({ children, title }) => {
  return (
    <PropertyLayoutContainer>
      <FormControlLabel isError={false} required={false}>
        {title}
      </FormControlLabel>
      {children}
    </PropertyLayoutContainer>
  );
};
