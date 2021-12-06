import styled from "styled-components";
import tw from "twin.macro";

export const EmptyContainer = styled.div`
  ${tw`pt-2`}
`;

export const Heading = {
  Wrapper: styled.div`
    ${tw`pb-3`}
  `,
  Title: styled.p`
    ${tw`font-bold text-xxl text-neutral-1 pb-1`}
  `,
  Desc: styled.p`
    ${tw`font-normal text-lg text-neutral-1`}
  `,
};

export const ImageContainer = styled.div`
  ${tw`flex justify-center`}
`;

export const Orther = {
  Wrapper: styled.div`
    ${tw`pt-2 flex flex-col items-center`}
  `,
  Desc: styled.p`
    ${tw`font-normal text-lg text-neutral-1 pb-2`}
  `,
};
