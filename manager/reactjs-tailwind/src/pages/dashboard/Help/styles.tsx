import styled from "styled-components";
import tw from "twin.macro";

export const Wrapper = styled.div`
  ${tw`px-2 pt-3 laptop:px-6 `}
`;
export const HelpContainer = styled.div`
  ${tw``}
`;
export const SubTitle = styled.div`
  ${tw`text-xxl font-bold mt-1`}
`;
export const HelpBoxContainer = styled.div`
  ${tw`grid grid-cols-2 gap-2 my-5`}
`;
export const HelpBoxStyle = {
  Container: styled.div<{ isFullSize?: boolean }>`
    ${tw`p-3 bg-primary-3 flex flex-col items-center gap-y-1.5`}
    ${({ isFullSize }) =>
      isFullSize ? tw`col-span-2` : tw`col-span-2 phone:col-span-1`}
  `,
  Title: styled.h3`
    ${tw`text-xxl font-bold text-center`}
  `,
  Content: styled.p<{ isFullSize?: boolean }>`
    ${tw`font-medium text-center`}
    ${({ isFullSize }) => (isFullSize ? tw`text-lg` : tw`text-md`)}
  `,
  Method: styled.div`
    ${tw``}
  `,
};
export const Email = styled.div`
  ${tw`text-primary-1 text-xl font-medium`}
`;
export const SocialContainer = styled.div`
  ${tw`mb-15`}
`;
export const Caption = styled.h4`
  ${tw`text-lg text-neutral-2 mt-[8px]`}
`;
export const SocialList = styled.div`
  ${tw`grid grid-cols-3 gap-2 mt-2.5`}
`;
export const SocialItem = {
  Container: styled.div`
    ${tw`col-span-3 phone:col-span-1 bg-primary-3 cursor-pointer hover:shadow-md`}
  `,
  Image: styled.img`
    ${tw`block mx-auto`}
  `,
  Name: styled.h3`
    ${tw`text-xxl font-bold mt-1 capitalize px-2`}
  `,
  TextWrapper: styled.div`
    ${tw`flex flex-col gap-y-1 pt-2 pb-1 px-2`}
  `,
  TextContainer: styled.div`
    ${tw`flex gap-x-0.5 items-start`}
  `,
  Text: styled.p`
    ${tw`-mt-0.5`}
  `,
};
