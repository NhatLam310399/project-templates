import styled from "styled-components";
import tw from "twin.macro";

export const StoreContainer = styled.div`
  ${tw`pb-2`}
`;
export const Title = styled.p`
  ${tw`font-bold text-5xl text-neutral-1 `}
`;

export const Body = styled.div`
  ${tw`pt-2`}
`;
export const Items = {
  Wrapper: styled.div`
    ${tw`px-2 py-3 flex flex-col gap-2 border-2 border-solid border-neutral-4 rounded-lg hover:shadow-lg mb-2`}
    ${tw`phone:justify-between phone:items-center phone:flex-row`}
  `,
  Content: styled.div`
    ${tw`flex items-center gap-2`}
  `,
  ContentButton: styled.div`
    ${tw`flex items-center gap-2 flex-col`}
    ${tw`phone:flex-row`}
  `,
  Title: styled.p`
    ${tw`font-medium text-lg text-neutral-1`}
  `,
  Status: styled.div<{ status: number }>`
    ${tw`py-[2px] px-[4px] text-primary-3 rounded-sm text-md`}
    ${({ status }) => (status === 0 ? tw`bg-primary-1` : null)}
    ${({ status }) => (status === 1 ? tw`bg-sematic-3` : null)}
    ${({ status }) => (status === 2 ? tw`bg-sematic-1` : null)}
  `,
};
