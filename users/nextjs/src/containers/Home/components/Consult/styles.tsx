import styled from "styled-components";
import tw from "twin.macro";
import ResponsiveImage from "@designs/ResponsiveImage";

export const ConsultContainer = styled.div`
  ${tw`mx-auto my-4 border-grey`}
`;

export const Title = styled.h2`
  ${tw`text-26 phone:text-30 text-black font-bold text-center mb-5`}
`;

export const Container = styled.div`
  ${tw`grid grid-cols-3 gap-2`}
`;

export const Item = {
  Container: styled.div`
    ${tw`col-span-3 laptop:col-span-1 bg-white border 
    phone:transform  duration-100 border-bright-grey py-2 px-2 cursor-pointer 
    hover:scale-105`}
  `,
  Inner: styled.div``,
  ImgWrapper: styled.div`
    ${tw`w-full`}
  `,
  Img: styled(ResponsiveImage)`
    ${tw`w-full h-20 object-cover`}
  `,
  TitleItem: styled.h3`
    display: -webkit-inline-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    ${tw`h-5 font-bold my-1.5 text-16 group-hover:text-secondary overflow-hidden overflow-ellipsis`}
  `,
  Description: styled.p`
    ${tw`text-13`}
  `,
};
