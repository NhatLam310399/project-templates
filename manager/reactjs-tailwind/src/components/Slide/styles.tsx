import styled from "styled-components";
import tw from "twin.macro";

export const SlideContainer = styled.div`
  ${tw`flex justify-between gap-1 transition-all duration-300 ease-linear`}
`;

export const Footer = {
  Wrapper: styled.div`
    ${tw`flex justify-center items-center gap-2 pt-3`};
  `,
  Content: styled.div`
    ${tw`flex justify-between gap-1`}
  `,
};

export const Dot = styled.div<{ active: boolean }>`
  ${tw`w-1 h-1 rounded-full border-[1px] border-solid border-neutral-2 cursor-pointer `}
  ${({ active }) => (active ? tw`bg-neutral-2` : tw` bg-primary-3`)}
`;
