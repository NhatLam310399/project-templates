import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuList from "./MenuList";
import { DrawerContainer } from "./styles";
import Overlay from "components/Overlay";
import { useEventListener } from "hooks/useEventListener";
import { setExtendDrawer } from "redux/actions/_config";
import { IRootState } from "typings";

interface ILeftSidebar {
  className?: string;
}

const AUTO_CLOSE_POINT = 900;

const Drawer: React.FC<ILeftSidebar> = props => {
  const dispatch = useDispatch();
  const { isExtendDrawer } = useSelector((state: IRootState) => state._config);
  const [isMobile, setIsMobile] = useState(false);

  useEventListener(
    "resize",
    () => {
      const isMobile = window.innerWidth < AUTO_CLOSE_POINT;
      setIsMobile(isMobile);

      if (isMobile && isExtendDrawer) {
        dispatch(setExtendDrawer(false));
      }
      if (!isMobile && !isExtendDrawer) [dispatch(setExtendDrawer(true))];
    },
    {
      runInFirstRender: true,
    },
  );

  return (
    <>
      <DrawerContainer className={isExtendDrawer ? "open" : "close"}>
        <MenuList />
      </DrawerContainer>
      <Overlay
        isOpen={isExtendDrawer && isMobile}
        onClick={() => dispatch(setExtendDrawer(false))}
      />
    </>
  );
};

export default Drawer;
