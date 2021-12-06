import Footer from "./components/Footer";
import TopBar from "./components/Header";
import { HelpCenterContainer, MainContent } from "./styles";

const AdminLayout: React.FC = props => {
  const { children } = props;

  return (
    <HelpCenterContainer>
      <TopBar />
      <MainContent>
        {children}
        <Footer />
      </MainContent>
    </HelpCenterContainer>
  );
};

export default AdminLayout;
