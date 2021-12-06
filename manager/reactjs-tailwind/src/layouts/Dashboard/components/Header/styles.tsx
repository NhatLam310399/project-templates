import styled from "styled-components";
import tw from "twin.macro";

export const TopBarContainer = styled.header`
  ${tw`grid items-center h-8 px-2 border-b border-solid text-neutral-2 border-neutral-4`}
  grid-template-columns: auto 1fr auto;
`;

export const Box = styled.div`
  ${tw` flex flex-row items-center gap-1 phone:gap-2.5 `}
`;
