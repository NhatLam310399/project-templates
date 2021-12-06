import styled from "styled-components";
import tw from "twin.macro";

export const RaisingContainer = styled.div`
  ${tw`pb-3`}
`;

export const Title = styled.div`
  ${tw`font-bold text-xxl text-neutral-1 pb-2`}
`;

export const ContentWrapper = styled.div`
  ${tw`flex pb-3`}
`;

export const Items = {
  Wrapper: styled.div<{ active?: boolean }>`
    ${tw`py-1 w-24 flex items-center justify-center phone:gap-2 gap-1 border-solid border-2 cursor-pointer`}
    ${({ active }) =>
      active
        ? tw`bg-primary-1 text-primary-3 border-transparent`
        : tw`bg-primary-3 text-primary-1 border-neutral-5`}
  `,
};
