import styled from "styled-components";
import tw from "twin.macro";
import { SVG as _SVG } from "@designs/SVG";
import _Link from "@designs/Link";

export const UserInfoContainer = styled.div`
  ${tw`py-2`}
`;

export const Container = styled.div<{ extend: boolean }>`
  ${tw`px-2 flex justify-between mb-2 cursor-pointer duration-200`}
  ${({ extend }) => (extend ? tw`mb-2` : tw`mb-0`)}
`;

export const Icon = styled(_SVG)`
  ${tw`w-2.5 h-2.5`}
`;

export const UserInfoWrapper = styled.div`
  ${tw`flex items-center`}
`;

export const Avatar = styled.img`
  ${tw`w-3.5 h-3.5 rounded-full mr-1`}
`;

export const UserName = styled.p`
  ${tw`overflow-hidden overflow-ellipsis text-primary font-medium`}
`;

export const Dropdown = styled.ul<{ extend: boolean }>`
  ${tw`grid gap-2 pl-6.5 duration-200 overflow-hidden`}
  ${({ extend }) => (extend ? tw`h-20` : tw`h-0 `)}
`;

export const DropdownItem = styled.li`
  ${tw``}
`;

export const Link = styled(_Link)`
  ${tw``}
`;
