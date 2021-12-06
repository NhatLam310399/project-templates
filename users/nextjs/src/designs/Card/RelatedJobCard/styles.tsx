import styled from "styled-components";
import tw from "twin.macro";

export const Container = styled.div`
  ${tw`px-1 py-2 transition duration-300 bg-white border rounded border-grey hover:shadow`}
`;
export const Title = styled.h3`
  ${tw`px-1 font-bold leading-none truncate text-16`}
`;
export const Meta = {
  List: styled.div`
    ${tw`flex flex-col items-start gap-1 my-1 phone:flex-row phone:items-center phone:divide-x phone:divide-black phone:my-2`}
  `,
  Item: styled.div`
    ${tw`px-1 font-medium leading-tight text-center laptop:text-13 desktop:text-14`}
  `,
};
export const Benefit = {
  Container: styled.div`
    ${tw`flex flex-wrap items-center px-1 gap-x-1 phone:gap-x-2`}
  `,
  Icon: styled.img`
    ${tw`block w-2.5`}
  `,
  Item: styled.div`
    ${tw`flex items-center mb-1 gap-x-1 phone:mb-0`}
  `,
  Name: styled.span`
    ${tw`block font-normal leading-none text-13`}
  `,
};
