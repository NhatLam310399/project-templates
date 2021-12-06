import styled from "styled-components";
import tw from "twin.macro";

export const CardContainer = styled.div`
  ${tw`grid grid-cols-12 items-center p-1.5 laptop:p-4 border border-grey gap-2 laptop:gap-3`}
`;
export const LeftCard = styled.div`
  ${tw`grid col-span-12 laptop:col-span-10 `}
`;
export const Title = styled.h4`
  ${tw`mb-2 leading-none text-black duration-300 text-16 laptop:text-20 hover:text-primary`}
`;
export const Content = styled.div`
  ${tw`flex flex-col phone:flex-row gap-y-0.5`}
`;
export const Text = styled.p`
  ${tw`relative mr-4 break-words text-13 laptop:text-16`}
  &:not(:last-child) {
    &:after {
      content: "";
      ${tw`absolute hidden phone:block w-[1px] bg-black h-full -right-2 top-0`};
    }
  }
`;
export const TimeApply = styled.div`
  ${tw`font-normal text-left text-13 laptop:text-16 laptop:text-right`}
`;
export const TimeTitle = styled.div`
  ${tw`mb-0 font-medium leading-none text-left  phone:mb-1 text-16 laptop:text-20 laptop:text-right`}
`;
export const RightCard = styled.div`
  ${tw`flex items-center justify-between col-span-12 phone:block laptop:col-span-2`}
`;
