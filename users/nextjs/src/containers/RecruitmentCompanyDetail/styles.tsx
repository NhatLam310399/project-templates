import styled from "styled-components";
import tw from "twin.macro";

export const Wrapper = styled.div`
  ${tw`pb-8`}
`;
export const Title = styled.h2`
  ${tw`font-bold leading-none text-30 `}
`;
export const Banner = styled.img`
  ${tw`object-cover w-full h-24 mb-35 phone:mb-7 laptop:mb-15`}
`;
export const SectionWrapper = styled.div`
  ${tw`w-full`}
`;
export const CompanyCardWrapper = styled.div`
  ${tw`absolute transform -translate-x-1/2 top-13 left-1/2`}
  transform: translateX(-50%);
`;
export const OpportunityWrapper = styled.div`
  ${tw`w-screen py-4 mt-4 bg-white`}
`;
export const OpportunityContainer = styled.div`
  ${tw`w-full `}
`;
export const ListCard = styled.div`
  ${tw`flex flex-col gap-2 mt-4`}
`;
export const Location = {
  Container: styled.div`
    ${tw`my-4`}
  `,

  Title: styled.h2`
    ${tw`w-full mb-4 font-bold leading-none text-center text-30`}
  `,

  SliderWrapper: styled.div`
    ${tw`flex flex-col items-center justify-center w-full gap-2 phone:flex-row`}
  `,
  ImgContainer: styled.div`
    ${tw`max-w-[100%] phone:max-w-[50%] laptop:max-w-[30%]`}
  `,
  Img: styled.img`
    ${tw`object-cover h-24`}
  `,
};
export const AboutUs = {
  Container: styled.div`
    ${tw`w-full p-2 mx-auto mt-4 bg-white border phone:p-4 border-tertiary`}
  `,
  Description: styled.div`
    ${tw`mt-4 font-normal text-16`}
  `,
};

export const Benefit = {
  Container: styled.div`
    ${tw`w-full mx-auto mt-4`}
  `,
  Icon: styled.img`
    ${tw`w-5`}
  `,
  Title: styled.h2`
    ${tw`font-bold text-center text-30`}
  `,
  ListItem: styled.div`
    ${tw`grid grid-cols-12 gap-2 mt-4`}
  `,
  Item: styled.div`
    ${tw`flex flex-col items-center col-span-12 px-2 py-2 bg-white border laptop:col-span-4 border-tertiary phone:py-4`}
  `,
  TitleItem: styled.h3`
    ${tw`py-2 font-bold leading-none text-center border-b text-20 border-grey `}
  `,
  Detail: styled.div`
    ${tw`mt-2 font-normal text-center text-16`}
  `,
};

export const VideoWrapper = styled.div`
  ${tw`w-full mx-auto mt-6`}
`;
export const Video = styled.iframe`
  ${tw`w-full h-20 laptop:h-40`}
`;
