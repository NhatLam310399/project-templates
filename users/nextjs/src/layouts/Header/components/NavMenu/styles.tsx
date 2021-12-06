import styled from "styled-components";
import tw from "twin.macro";
import _Link from "@designs/Link";

export const NavMenuContainer = styled.div<{ employer: boolean }>`
  ${tw`hidden laptop:flex gap-2 justify-center`}
  ${({ employer }) => (employer ? tw`text-black` : tw`text-black`)}
`;

export const NavLink = styled(_Link)<{ active?: boolean }>`
  ${tw`hover:no-underline transform hover:scale-105 text-16`}
  ${({ active }) => active && tw`font-bold`}
`;

export const Button = styled.button<{ active?: boolean }>`
  ${tw`bg-primary text-white px-2 py-0.5 rounded-md text-14`}
`;
