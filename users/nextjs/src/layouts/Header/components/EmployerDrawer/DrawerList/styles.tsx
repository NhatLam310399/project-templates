import styled from "styled-components";
import tw from "twin.macro";
import { SVG } from "@designs/SVG";
import _Link from "@designs/Link";

export const DrawerListContainer = styled.ul`
  ${tw`border-t border-grey p-2`}
`;

export const DrawerListItem = styled.li`
  ${tw``}
`;

export const Icon = styled(SVG)`
  ${tw`mr-1 w-2.5 h-2.5`}
`;

export const Title = styled.p`
  ${tw`flex items-center text-16 font-medium`}
`;

export const Link = styled(_Link)`
  ${tw`inline-block mt-1 pl-3.5 font-normal text-body transform hover:scale-105 duration-75`}
`;
