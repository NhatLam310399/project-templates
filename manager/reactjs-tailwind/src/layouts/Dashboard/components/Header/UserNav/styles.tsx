import { Link } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import BaseButton from "designs/BaseButton";

export const UserNavContainer = styled.div`
  ${tw``}
`;

export const MenuButton = styled(BaseButton)`
  ${tw` flex flex-row items-center gap-0.5 hover:text-neutral-1 `}
`;

export const Name = styled.p`
  ${tw` hidden phone:block  `}
`;

export const DropdownItem = styled(Link)<{ active: boolean }>`
  ${tw` w-full p-1  whitespace-nowrap`}
  ${({ active }) => active && tw`bg-neutral-4`}
`;
