import styled from "styled-components";
import tw from "twin.macro";
import { drawerWidth } from "common/constants/drawer";

export const DrawerContainer = styled.div`
  ${tw`h-screen z-40 bg-primary-3 transition-transform duration-300 px-2.5 border border-solid border-neutral-4 fixed left-0 top-0  `}
  width: ${drawerWidth};
  &.open {
    transform: none;
  }
  &.close {
    transform: translateX(-${drawerWidth});
  }
`;
