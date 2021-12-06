import styled from "styled-components";
import tw from "twin.macro";

export const ItemContainer = styled.div`
  ${tw`border-2 border-solid border-neutral-4 px-1 pb-2 flex-shrink-0 w-21 h-21`}
  &:hover {
    ${tw`shadow-lg`}
  }
`;

export const Heading = styled.div`
  ${tw`flex justify-between pt-2 items-center`}
`;
export const YourPoint = styled.div`
  ${tw``}
`;
export const Point = styled.div<{ isDone: boolean }>`
  ${tw`px-[5px] py-[2px] border-[1px] border-solid flex gap-0.5 items-center rounded-sm w-6`}

  ${({ isDone }) =>
    isDone
      ? tw`border-primary-1 text-primary-1 `
      : tw` border-neutral-3 text-neutral-3`}
`;

export const Content = styled.div`
  ${tw`pt-2 flex flex-col items-center gap-2`}
`;

export const Other = {
  Container: styled.div`
    ${tw`flex flex-col items-center gap-1 `}
  `,
  Title: styled.p`
    ${tw`font-medium text-lg text-neutral-1`}
  `,
  Desc: styled.p`
    ${tw`font-normal text-md leading-6 text-neutral-2 text-center`}
  `,
};
