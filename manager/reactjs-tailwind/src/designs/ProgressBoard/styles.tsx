import styled from "styled-components";
import tw from "twin.macro";

export const ProgressBoardContainer = styled.div`
  ${tw``}
`;

export const StatusText = styled.h5`
  ${tw` text-lg font-medium mb-0.5 `}
`;

export const ProgressBar = {
  Container: styled.ul`
    ${tw` flex flex-row gap-0.5 mb-2.5  `}
  `,
  Item: styled.li<{ isCompleted: boolean }>`
    ${tw` h-0.5 w-full max-w-5 `}
    ${({ isCompleted }) => (isCompleted ? tw`bg-sematic-3` : tw`bg-neutral-3`)}
  `,
};

export const ListTasks = styled.div`
  ${tw` flex flex-col gap-1 w-full `}
`;

export const Task = {
  Container: styled.div<{ isCompleted: boolean }>`
    ${tw`flex flex-row items-center gap-1`}
    ${({ isCompleted }) =>
      isCompleted ? tw`text-sematic-3` : tw`text-neutral-2`}
  `,
  Content: styled.div`
    ${tw``}
  `,
  Title: styled.p<{ isCompleted: boolean }>`
    ${tw`text-lg font-normal`}
    ${({ isCompleted }) =>
      isCompleted ? tw`text-neutral-3` : tw`text-neutral-1`}
  `,

  Message: styled.p`
    ${tw`text-md`}
  `,
};
