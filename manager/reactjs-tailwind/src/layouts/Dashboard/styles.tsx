import styled from "styled-components";
import tw from "twin.macro";
import { drawerWidth } from "common/constants/drawer";

export const DashboardContainer = styled.div`
  ${tw`relative w-full h-full`}
`;

export const Viewpoint = styled.div<{ isExtendDrawer: boolean }>`
  ${tw`z-0 h-screen overflow-auto transition-all duration-300 `}
  @media screen and (min-width: 600px) {
    & {
      padding-left: ${({ isExtendDrawer }) =>
        isExtendDrawer ? drawerWidth : "0"};
    }
  }
`;

export const MainContent = styled.main`
  ${tw`relative flex flex-col items-center `}
  min-height: calc(100vh - 80px);
`;
