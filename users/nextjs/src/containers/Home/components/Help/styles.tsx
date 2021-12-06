import styled from "styled-components";
import tw from "twin.macro";

export const HelpContainer = styled.div`
  ${tw`mx-auto my-4`}
`;

export const Title = styled.h2`
  ${tw`mb-5 font-bold text-center text-black text-26 phone:text-30`}
`;

export const Grid = styled.div`
  ${tw`grid grid-cols-12 gap-2`}
`;

export const Item = {
  Container: styled.div`
    ${tw`col-span-12 px-3 py-4 duration-100 bg-white border phone:transform hover:scale-105 laptop:col-span-4 border-bright-grey`}
  `,
  Title: styled.h3`
    ${tw`my-1 font-bold laptop:h-6 text-16 phone:text-20`}
  `,
  Description: styled.p`
    ${tw`text-14 phone:text-16 `}
  `,
};
