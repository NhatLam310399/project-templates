import { useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import {
  PreviewProductContainer,
  PreviewProductWrapper,
  ImageSection,
  Content,
  PropertyLayoutContainer,
  PrintFilesList,
} from "./styles";
import Input from "designs/Input";
import FormControlLabel from "common/styles/FormControlLabel";
import ProductTemplateImage from "components/ProductTemplateImage";
import { IRootState } from "typings";
import { productDesignTempMock } from "common/constants/editor/mockData";
import ListColors from "components/ListColors";
import PrintFile from "components/PrintFile";

interface IPreviewProductProps {}

type IFormValues = {
  title: string;
};

const validationSchema = yup
  .object()
  .shape<{ [key in keyof IFormValues]: any }>({
    title: yup.string().required("This field is required!"),
  });

const PreviewProduct: React.FC<IPreviewProductProps> = props => {
  const [initValue] = useState<IFormValues>({
    title: productDesignTempMock.name || "",
  });
  const [productDemo] = useState(productDesignTempMock?.mockups?.[0]);

  const { storeTemplateDesigned } = useSelector(
    (state: IRootState) => state.productTemplate,
  );

  const { productDesignSchemaId, sides, colors } = storeTemplateDesigned;
  const previewSide = sides?.[0];
  const currentColor = colors[colors.length - 1];
  const colorSchema = productDemo?.colorSchemas.find(
    item => item.color.hex === currentColor.hex,
  );

  return (
    <PreviewProductWrapper>
      <PreviewProductContainer>
        <ImageSection>
          <ProductTemplateImage
            size={340}
            backgroundColor={currentColor}
            heatherImage={colorSchema?.heather?.small}
            upperImage={productDemo?.upperImage.small || ""}
            templateImage={String(previewSide?.base64TemplateImage)}
            position={productDemo?.clipPath}
          />
        </ImageSection>
        <Content>
          <Formik
            validationSchema={validationSchema}
            initialValues={initValue}
            onSubmit={() => {}}
          >
            <Form>
              <Input label="Product template title" name="title" />
              <PropertyLayout title="Product">
                {productDesignTempMock.name}
              </PropertyLayout>
              <PropertyLayout title="Product colors">
                <ListColors colors={colors} getColor={item => item?.hex} />
              </PropertyLayout>
              <PropertyLayout title="Technique">Printing (DTG)</PropertyLayout>
              <PropertyLayout title="Print files">
                <PrintFilesList>
                  {sides.map(side => {
                    if (!side) return null;
                    return (
                      <PrintFile
                        key={side?.sideType?._id}
                        name={side?.sideType?.name}
                        imageSrc={side?.base64TemplateImage || ""}
                      />
                    );
                  })}
                </PrintFilesList>
              </PropertyLayout>
            </Form>
          </Formik>
        </Content>
      </PreviewProductContainer>
    </PreviewProductWrapper>
  );
};

export default PreviewProduct;

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
