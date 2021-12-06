import styled from "styled-components";
import tw from "twin.macro";

export const StoreContainer = styled.div`
  ${tw`py-3`}
`;

export const Heading = {
  Wrapper: styled.div`
    ${tw`pb-2`}
  `,
  Title: styled.p`
    ${tw`font-bold text-neutral-1 text-xxl pb-1`}
  `,
  Desc: styled.p`
    ${tw`font-normal text-lg text-neutral-1`}
  `,
};

export const Orther = {
  Wrapper: styled.div`
    ${tw``}
  `,
  CollapseContainerIcon: styled.div`
    ${tw`flex gap-2 items-center cursor-pointer`}
  `,
  Icon: styled.div<{ active: boolean }>`
    ${tw`transform transition-all delay-200 ease-linear`}/* ${({ active }) =>
      active ? tw`` : tw` bg-neutral-3`} */
  `,
  IconText: styled.p`
    ${tw`font-medium text-lg text-neutral-1`}
  `,
};
