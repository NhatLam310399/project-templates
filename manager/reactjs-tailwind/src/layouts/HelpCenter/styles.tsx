import styled from "styled-components";
import tw from "twin.macro";

export const HelpCenterContainer = styled.div`
  ${tw`relative w-full h-full`}
`;

export const MainContent = styled.main`
  ${tw`relative flex flex-col items-center `}
  min-height: calc(100vh - 80px);
`;
