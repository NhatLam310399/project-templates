import styled from "styled-components";
import tw from "twin.macro";

export const Wrapper = styled.div`
  ${tw`pb-8 relative`}
`;
export const Title = styled.h2`
  ${tw`text-30 font-bold leading-none `}
`;
export const Banner = styled.img`
  ${tw`w-full h-24 mb-35 phone:mb-7 laptop:mb-15 object-cover`}
`;
export const SectionWrapper = styled.div`
  ${tw`w-full`}
`;
export const CompanyCardWrapper = styled.div`
  ${tw`absolute top-13 left-1/2 transform -translate-x-1/2`}
  transform: translateX(-50%);
`;
export const OpportunityWrapper = styled.div`
  ${tw`mt-4 w-screen py-4 bg-white`}
`;
export const OpportunityContainer = styled.div`
  ${tw`w-full `}
`;
export const ListCard = styled.div`
  ${tw`flex flex-col gap-2 mt-4`}
`;
export const Location = {
  Container: styled.div`
    ${tw`w-full  mx-auto mt-4 p-2 phone:p-4 bg-white flex flex-wrap items-center rounded-lg border border-tertiary flex-col-reverse laptop:flex-row gap-y-2`}
  `,
  Info: styled.div`
    ${tw`w-full laptop:w-7/12 pr-2`}
  `,
  Title: styled.h2`
    ${tw`font-bold text-30 leading-none`}
  `,
  Detail: styled.div`
    ${tw`text-20 font-medium leading-tight mt-4`}
  `,
  DetailItem: styled.p`
    ${tw``}
  `,
  SliderWrapper: styled.div`
    ${tw`w-full laptop:w-5/12`}
  `,
  Img: styled.img`
    ${tw`h-30 object-cover`}
  `,
};
export const AboutUs = {
  Container: styled.div`
    ${tw`bg-white p-2 phone:p-4 mt-4 w-full  mx-auto border border-tertiary`}
  `,
  Description: styled.div`
    ${tw`text-16 font-normal mt-4`}
  `,
};

export const Benefit = {
  Container: styled.div`
    ${tw`w-full  mx-auto mt-4`}
  `,
  Icon: styled.img`
    ${tw`w-5`}
  `,
  Title: styled.h2`
    ${tw`font-bold text-30 text-center`}
  `,
  ListItem: styled.div`
    ${tw`grid grid-cols-12 gap-2 mt-4`}
  `,
  Item: styled.div`
    ${tw`col-span-12 laptop:col-span-4 border border-tertiary py-2 phone:py-4 px-2 flex flex-col items-center bg-white`}
  `,
  TitleItem: styled.h3`
    ${tw`text-20 font-bold leading-none py-2 border-b border-grey text-center `}
  `,
  Detail: styled.div`
    ${tw`text-16 font-normal text-center mt-2`}
  `,
};

export const VideoWrapper = styled.div`
  ${tw`mt-4 w-full  mx-auto`}
`;
export const Video = styled.iframe`
  ${tw`w-full h-20 laptop:h-40`}
`;
