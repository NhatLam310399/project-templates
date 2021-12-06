import { Fragment } from "react";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { IRootState } from "@redux/reducers";
import Footer from "../Footer";
import Header from "@layouts/Header";
export * from "./helper";
import { MainContainer, MainContent } from "./styles";

interface IMainProps {
  isEmployer?: boolean;
  type?: "job" | "company";
  noBackground?: boolean;
}

const Main: React.FC<IMainProps> = (props) => {
  const { children, type, noBackground = false } = props;
  const { contentWebsite = {} } = useSelector(
    (state: IRootState) => state.contentWebsite,
  );
  const { customCodeFooter = "" } = contentWebsite;
  const parsedCustomCodeFooter = parse(customCodeFooter);
  return (
    <Fragment>
      <MainContainer noBackground={noBackground}>
        <Header type={type} />
        <MainContent>{children}</MainContent>
        <Footer />
      </MainContainer>
      {parsedCustomCodeFooter}
    </Fragment>
  );
};

export default Main;
