import styled from "styled-components";
import tw from "twin.macro";

export const ListWrapper = styled.ul``;

export const ItemContainer = styled.li`
  ${tw`
      mb-2 laptop:mb-4
  `}
`;
export const ItemTitle = styled.h4`
  ${tw`
      text-primary
      text-16 phone:text-20 
      laptop:text-30
      font-bold
  `}
`;
export const ItemContent = styled.p`
  ${tw`
    text-black
    text-14 phone:text-16
    font-medium
  `}
`;
