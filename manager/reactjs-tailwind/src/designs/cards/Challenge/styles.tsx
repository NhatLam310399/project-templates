import styled from "styled-components";
import tw from "twin.macro";

export const ItemContainer = styled.div`
  ${tw`flex-shrink-0 px-1 pb-2 border-2 border-solid border-neutral-4 w-21 h-21`}
  &:hover {
    ${tw`shadow-lg`}
  }
`;

export const Heading = styled.div`
  ${tw`flex items-center justify-between pt-2`}
`;

export const Point = styled.div<{ isDone: boolean }>`
  ${tw`px-0.5 py-[2px] border-[1px] border-solid flex gap-0.5 items-center rounded-sm w-auto`}

  ${({ isDone }) =>
    isDone
      ? tw`border-primary-1 text-primary-1 `
      : tw` border-neutral-3 text-neutral-3`}
`;
export const NumberPoint = styled.p<{ isDone: boolean }>`
  ${({ isDone }) =>
    isDone
      ? tw`border-primary-1 text-primary-1 `
      : tw` border-neutral-3 text-neutral-3`}
`;

export const Content = styled.div`
  ${tw`flex flex-col items-center gap-2 pt-2`}
`;

export const Other = {
  Container: styled.div`
    ${tw`flex flex-col items-center gap-1 `}
  `,
  Title: styled.p`
    ${tw`text-lg font-medium text-neutral-1`}
  `,
  Desc: styled.p`
    ${tw`font-normal leading-6 text-center text-md text-neutral-2`}
  `,
};
