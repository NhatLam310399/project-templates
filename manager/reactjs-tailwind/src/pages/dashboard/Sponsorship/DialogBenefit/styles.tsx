import styled from "styled-components";
import tw from "twin.macro";

export const DialogChallengeContainer = styled.div`
  ${tw`p-2 `}
`;

export const Title = styled.p`
  ${tw`mb-5 text-5xl font-bold text-neutral-1`}
`;

export const YourPoint = {
  Wrapper: styled.div`
    ${tw`flex items-center justify-between w-1/2 px-1 py-2 mb-1 bg-neutral-5 gap-14`}
  `,
  Point: styled.p`
    ${tw`text-xl font-medium text-neutral-1`}
  `,
  Score: styled.span`
    ${tw`font-bold pl-0.5 text-primary-1 text-xxl`}
  `,
  Desc: styled.p`
    ${tw`text-lg font-normal text-neutral-2`}
  `,
};

export const Warning = styled.div`
  ${tw`flex items-center gap-1 text-lg font-normal text-neutral-2`}
`;

export const YourBenefit = {
  Wrapper: styled.div`
    ${tw`mt-5`}
  `,
  Title: styled.div`
    ${tw`font-bold text-xxl text-neutral-1`}
  `,
  Box: styled.div`
    ${tw`pt-1 mt-1 bg-neutral-5`}
  `,
  BoxTitle: styled.p`
    ${tw`mb-1 text-xl font-medium text-neutral-1`}
  `,
  BoxDesc: styled.p`
    ${tw`text-lg font-normal text-neutral-2`}
  `,
};

export const KingifyBenefit = {
  Wrapper: styled.div`
    ${tw`mt-5`}
  `,
  Title: styled.div`
    ${tw`font-bold text-xxl text-neutral-1`}
  `,
  Desc: styled.p`
    ${tw`mt-1 text-lg font-normal text-neutral-2`}
  `,
};

export const SlideWrapper = styled.div`
  ${tw`mt-5 overflow-hidden`}
`;

export const ItemPoints = {
  Wrapper: styled.div`
    ${tw`flex-shrink-0 px-2 pt-3 pb-2 border-2 border-solid rounded-sm border-neutral-4 w-25`}
  `,
  Heading: styled.div`
    ${tw`flex items-center justify-between font-medium text-md text-neutral-3`}
  `,
  Point: styled.div`
    ${tw`flex gap-1 `}
  `,
  Content: styled.p`
    ${tw`mt-3 text-lg font-medium text-neutral-1`}
  `,
};

export const SlideContent = styled.div`
  ${tw`flex gap-2 overflow-x-hidden`}
`;
