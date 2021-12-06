import styled from "styled-components";
import tw from "twin.macro";

export const SideMenuContainer = styled.div`
  ${tw`w-2/6 pr-4 pb-5`}
`;

export const Title = styled.p<{ active: boolean }>`
  ${tw`font-medium text-lg  text-neutral-1 cursor-pointer hover:underline pb-2`}
  ${({ active }) => (active ? tw`text-neutral-1` : tw`text-neutral-3`)}
`;

export const Orther = styled.p`
  ${tw`font-normal text-lg text-sematic-2  cursor-pointer hover:underline`}
`;
