import styled from "styled-components";
import tw from "twin.macro";

export const MainContainer = styled.div<{ noBackground: boolean }>`
  ${tw`overflow-hidden phone:overflow-visible`}
  ${({ noBackground }) => (noBackground ? tw`bg-white` : tw`bg-background`)}
`;

export const MainContent = styled.main`
  ${tw`pt-6`}
`;
