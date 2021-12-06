import { useDispatch, useSelector } from "react-redux";
import Notification from "./Notification";
import { Box, TopBarContainer } from "./styles";
import UserNav from "./UserNav";
import SearchBoxTopBar from "layouts/Dashboard/components/Header/SearchBoxTopBar";
import IconButton from "designs/IconButton";
import HamburgerIcon from "icons/Hamburger";
import { toggleExtendDrawer } from "redux/actions/_config";
import { IRootState } from "typings";

interface ITopBarProps {}

const TopBar: React.FC<ITopBarProps> = () => {
  const dispatch = useDispatch();
  const { isExtendDrawer } = useSelector((state: IRootState) => state._config);

  return (
    <TopBarContainer>
      <IconButton
        onClick={() => dispatch(toggleExtendDrawer())}
        tooltip={isExtendDrawer ? "Close drawer" : "Open drawer"}
      >
        <HamburgerIcon />
      </IconButton>
      <SearchBoxTopBar />
      <Box>
        <Notification />
        <UserNav />
      </Box>
    </TopBarContainer>
  );
};

export default TopBar;
