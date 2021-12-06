import { useSelector } from "react-redux";
import Drawer from "./components/Drawer";
import Footer from "./components/Footer";
import TopBar from "./components/Header";
import { DashboardContainer, Viewpoint, MainContent } from "./styles";
import { IRootState } from "typings";

const AdminLayout: React.FC = props => {
  const { children } = props;
  const { isExtendDrawer } = useSelector((state: IRootState) => state._config);

  return (
    <DashboardContainer>
      <Drawer />
      <Viewpoint isExtendDrawer={isExtendDrawer}>
        <TopBar />
        <MainContent>
          {children}
          <Footer />
        </MainContent>
      </Viewpoint>
    </DashboardContainer>
  );
};

export default AdminLayout;
