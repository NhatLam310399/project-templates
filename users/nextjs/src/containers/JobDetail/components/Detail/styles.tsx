import styled from "styled-components";
import tw from "twin.macro";

export const DetailContainer = styled.div`
  ${tw`container mt-4 bg-white border border-grey border-solid`}
`;
export const Content = styled.div`
  ${tw`grid grid-cols-12 gap-2 py-2 phone:p-4 items-start`}
`;
export const InformationContainer = styled.div`
  ${tw`col-span-12 laptop:col-span-8 flex flex-col gap-4`}
`;
export const Section = {
  Container: styled.div`
    ${tw`text-14 font-normal`}
  `,
  Title: styled.h3`
    ${tw`text-16 font-bold uppercase leading-none mb-2`}
  `,
  Content: styled.div``,
};
export const Text = styled.p`
  ${tw`text-14 font-normal leading-none`}
`;
export const BenefitWrapper = styled.div`
  ${tw`flex flex-col gap-2`}
`;
export const BenefitItem = styled.div`
  ${tw`flex items-center gap-x-1`}
`;
export const Icon = styled.img`
  ${tw`block w-2.5`}
`;
export const TagsWrapper = styled.div`
  ${tw`flex flex-wrap gap-2`}
`;
export const TagItem = styled.div`
  ${tw`bg-tertiary text-14 font-normal flex justify-center items-center px-2 h-4`}
`;
export const MetaContainer = styled.div`
  ${tw`col-span-12 laptop:col-span-4 bg-line py-3 px-4 flex flex-col divide-y divide-tertiary border border-primary`}
`;
export const MetaItem = {
  Container: styled.div`
    ${tw`flex gap-x-2 items-start pt-1`}
  `,
  Content: {
    Container: styled.div`
      ${tw``}
    `,
    Title: styled.h4`
      ${tw`text-16 font-medium leading-none text-light`}
    `,
    Text: styled.p`
      ${tw`text-16 font-medium leading-none my-1`}
    `,
  },
};
