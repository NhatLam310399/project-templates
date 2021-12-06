import styled from "styled-components";
import tw from "twin.macro";

export const ChallengeContainer = styled.div`
  ${tw`  `}
`;

export const Heading = {
  Container: styled.div`
    ${tw`flex justify-between items-center gap-x-2 gap-1 flex-wrap`}
  `,
  YourPoint: styled.div`
    ${tw`text-lg text-neutral-1`}
  `,
  Point: styled.span`
    ${tw`font-bold text-xxl text-primary-1`}
  `,
  More: styled.p`
    ${tw`text-lg text-primary-1 font-normal cursor-pointer`}
    &:hover {
      ${tw`underline`}
    }
  `,
};

export const Content = styled.div`
  ${tw`pt-3 overflow-hidden`}
`;
