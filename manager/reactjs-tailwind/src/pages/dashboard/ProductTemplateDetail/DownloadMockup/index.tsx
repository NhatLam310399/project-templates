import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  DownloadMockupWrapper,
  DownloadMockupContainer,
  ListMockups,
  MockupCardContainer,
  ImageContainer,
  NameMockup,
  Checkbox,
  Message,
  Link,
  ListDemoSidesGenerated,
  DemoSide,
} from "./styles";
import { productDesignTempMock } from "common/constants/editor/mockData";
import { copyObject } from "common/functions";
import FullScreenDialog from "components/FullScreenDialog";
import ProductTemplateImage from "components/ProductTemplateImage";
import Button from "designs/Button";
import { useResponsive } from "hooks/useResponsive";
import { IColor, IProductDemo, IRootState, ISideType } from "typings";

interface IDownloadMockupProps {
  open: boolean;
  onClose: () => void;
}

interface IProductDemoGenerated extends IProductDemo {
  colorSelected: IColor;
}

type IDemoSide = {
  sideType: ISideType | undefined;
  demos: IProductDemoGenerated[];
};

const DownloadMockup: React.FC<IDownloadMockupProps> = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [demosSelected, setDemosSelected] = useState<IProductDemoGenerated[]>(
    [],
  );
  const [demoSides, setDemoSides] = useState<IDemoSide[]>([]);

  const { sides } = productDesignTempMock;
  const { storeTemplateDesigned } = useSelector(
    (state: IRootState) => state.productTemplate,
  );
  const { colors } = storeTemplateDesigned;
  const tempColor = colors?.[0];

  useEffect(() => {
    if (demosSelected) {
      categoryDemoSides();
    }
  }, [demosSelected]);

  const categoryDemoSides = () => {
    const newDemoSides: IDemoSide[] = [];
    for (const demo of demosSelected) {
      if (!demo) break;

      let demoSideIndex = newDemoSides.findIndex(
        item => item?.sideType?._id === demo.sideType?._id,
      );
      if (demoSideIndex === -1) {
        newDemoSides.push({
          sideType: demo.sideType,
          demos: [],
        });
        demoSideIndex = newDemoSides.length - 1;
      }

      newDemoSides[demoSideIndex].demos.push(demo);
    }
    setDemoSides(newDemoSides);
  };

  const handleGenerateMockups = () => {
    setLoading(true);
    console.log(demosSelected);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <FullScreenDialog open={open} onClose={onClose}>
      <FullScreenDialog.Header title="Choose mockup style" onClose={onClose} />
      <DownloadMockupWrapper>
        <DownloadMockupContainer>
          <ListMockups>
            {productDesignTempMock?.mockups?.map(mockup => {
              const templateImage = storeTemplateDesigned?.sides?.find(
                item => item?.sideType?._id === mockup.designedTemplateSideId,
              );
              const handleToggle = (checked: boolean) => {
                if (checked) {
                  const generatedDemos: IProductDemoGenerated[] = [];
                  for (const demo of mockup.demos) {
                    for (const color of colors) {
                      generatedDemos.push({
                        ...demo,
                        colorSelected: color,
                      });
                    }
                  }
                  const newDemos = [...demosSelected, ...generatedDemos];
                  setDemosSelected(newDemos);
                } else {
                  // remove every demo of this mockup.demo in who demosSelected
                  const newDemos = demosSelected.filter(demo => {
                    const found = mockup.demos.find(
                      mockupDemo => demo._id === mockupDemo._id,
                    );
                    if (found) return false;
                    return true;
                  });
                  setDemosSelected(newDemos);
                }
              };
              return (
                <MockupCard
                  size="lg"
                  key={mockup.name}
                  productDemo={mockup}
                  productTemplateImage={templateImage?.base64TemplateImage}
                  color={tempColor}
                  isChecked={false}
                  onToggle={handleToggle}
                />
              );
            })}
          </ListMockups>
          <Message>
            Some of our amazing mockups are created by{" "}
            <Link to="#">Photific</Link>, so check them out for more instant
            mockups.
          </Message>
          <ListDemoSidesGenerated>
            {demoSides.map(({ sideType, demos }) => {
              return (
                <DemoSide.Container key={sideType?._id}>
                  <DemoSide.Header>
                    <DemoSide.Checkbox initialCheck={true} />
                    {sideType?.name}
                  </DemoSide.Header>
                  <DemoSide.ListDemos>
                    {demos.map(demo => {
                      const templateImage = storeTemplateDesigned?.sides?.find(
                        item =>
                          item?.sideType?._id === demo.designedTemplateSideId,
                      );
                      const handleToggle = (checked: boolean) => {};
                      return (
                        <MockupCard
                          size="sm"
                          key={demo?._id}
                          productDemo={demo}
                          productTemplateImage={
                            templateImage?.base64TemplateImage
                          }
                          color={demo.colorSelected}
                          isChecked={true}
                          onToggle={handleToggle}
                        />
                      );
                    })}
                  </DemoSide.ListDemos>
                </DemoSide.Container>
              );
            })}
          </ListDemoSidesGenerated>
        </DownloadMockupContainer>
      </DownloadMockupWrapper>
      <FullScreenDialog.Footer
        leftSide={
          <Button onClick={handleGenerateMockups} loading={loading}>
            Generate mockups
          </Button>
        }
      />
    </FullScreenDialog>
  );
};

export default DownloadMockup;

const MockupCard: React.FC<{
  size: "lg" | "sm";
  productDemo: Partial<IProductDemo>;
  productTemplateImage: string | undefined | null;
  color: IColor;
  isChecked: boolean;
  onToggle: (isChecked: boolean) => void;
}> = props => {
  const {
    productDemo,
    size,
    color,
    productTemplateImage,
    isChecked,
    onToggle,
  } = props;
  if (!productDemo) return null;

  const screen = useResponsive();

  const colorSchema = productDemo.colorSchemas?.find(
    item => item?.color?.hex === color?.hex,
  );

  const sizeDisplay = screen.downPhone ? "sm" : size;

  return (
    <MockupCardContainer size={size as any}>
      <Checkbox primary initialCheck={isChecked} onChange={onToggle} />
      <ImageContainer>
        <ProductTemplateImage
          upperImage={String(productDemo?.upperImage?.small)}
          heatherImage={colorSchema?.heather?.small}
          backgroundColor={color}
          position={productDemo.clipPath}
          size={sizeDisplay === "lg" ? 150 : 70}
          templateImage={productTemplateImage || ""}
        />
      </ImageContainer>
      <NameMockup className={sizeDisplay === "lg" ? "max-w-15" : "max-w-10"}>
        {productDemo.name}
      </NameMockup>
    </MockupCardContainer>
  );
};
