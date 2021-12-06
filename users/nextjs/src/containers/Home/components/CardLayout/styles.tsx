import styled from "styled-components";
import tw from "twin.macro";
import _Link from "@designs/Link";

export const CardLayoutContainer = styled.div`
  ${tw`my-4`}
  .slick-slide {
    ${tw`grid gap-2`}
    & > div {
      ${tw`flex gap-2`}
    }
  }
`;

export const Title = styled.h2`
  ${tw`text-26 font-bold text-black text-center phone:text-30 mb-4`}
`;

export const Card = {
  Container: styled.div`
    ${tw``}
  `,
  ContainerLogo: styled.div`
    ${tw`flex h-full items-center`}
  `,

  Logo: styled.div`
    ${tw`phone:h-11 phone:w-11 h-8 w-8  p-1 border border-grey `}
  `,
  Img: styled.img`
    ${tw`w-full object-cover `}
  `,
  Text: styled.div`
    ${tw`flex flex-col justify-center`}
  `,
  Name: styled.p`
    ${tw`font-bold break-words`}
  `,
  Company: styled.p`
    ${tw`my-1 leading-none`}
  `,
  Province: styled.p`
    ${tw`truncate w-[200px] phone:w-auto`}
  `,
};
export const LinkWrapper = styled.div`
  ${tw``}
`;
export const Link = styled(_Link)`
  ${tw`text-14 p-1.5 phone:px-4 phone:py-3 min-h-[150px] phone:min-h-0 bg-white hover:shadow duration-100 flex  border border-grey phone:text-16 font-normal items-center gap-2 laptop:leading-8  `}
`;
