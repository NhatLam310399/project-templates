import {
  DescStepContainer,
  ImageStep,
  Desc,
  TitleDesc,
  WrapperStepDesc,
  StepDescContent,
  Detail,
  DescDownload,
  WrapperDownloadIcon,
  IconContent,
  IconTitle,
} from "./styles";

import SVG from "designs/SVG";
import ImageStepOne from "assets/images/order/Order_Import_Step_1.png";
interface IDescStepProps {}

const DescStep: React.FC<IDescStepProps> = props => {
  return (
    <DescStepContainer>
      <ImageStep src={ImageStepOne} />
      <Desc>
        <TitleDesc>
          Prepare your data file and import your orders using the following
          steps :
        </TitleDesc>
        <WrapperStepDesc>
          <StepDescContent>
            <SVG name="order/tick" />
            <Detail>
              Use our template or assign header names to data fields
            </Detail>
          </StepDescContent>
          <StepDescContent>
            <SVG name="order/tick" />
            <Detail>Upload your data file</Detail>
          </StepDescContent>
          <StepDescContent>
            <SVG name="order/tick" />
            <Detail>
              Matching data to make sure the header names in your import file
              correspond to those such as product details, shipping details in
              the tool
            </Detail>
          </StepDescContent>
          <StepDescContent>
            <SVG name="order/tick" />
            <Detail>Import your purchase orders</Detail>
          </StepDescContent>
          <StepDescContent>
            <SVG name="order/tick" />
            <Detail>Confirm and pay for your orders with Kingify Wallet</Detail>
          </StepDescContent>
        </WrapperStepDesc>
        <DescDownload>
          <Detail>
            Download our data import template with all the mandatory and
            optional fields
          </Detail>
          <WrapperDownloadIcon>
            <IconContent>
              <SVG name="order/download" />
              <IconTitle>CSV</IconTitle>
            </IconContent>
            <IconContent>
              <SVG name="order/download" />
              <IconTitle>XLS</IconTitle>
            </IconContent>
          </WrapperDownloadIcon>
          <p className="mt-1">
            Read more on{" "}
            <span className="text-primary-1">
              {" "}
              how to configure your own files
            </span>
          </p>
        </DescDownload>
      </Desc>
    </DescStepContainer>
  );
};

export default DescStep;
