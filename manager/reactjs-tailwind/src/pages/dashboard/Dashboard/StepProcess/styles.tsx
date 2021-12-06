import styled from "styled-components";
import tw from "twin.macro";

export const Content = styled.article`
  ${tw`grid w-full grid-cols-1 gap-2 mt-2 phone:grid-cols-2`}
`;

export const RightSideContainer = styled.div`
  ${tw`flex flex-col w-full gap-2 `}
`;

export const LeftSideContainer = styled.div`
  ${tw`flex flex-col w-full gap-2 `}
`;
