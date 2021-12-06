import styled from "styled-components";
import tw from "twin.macro";

export const ProcessStepContainer = styled.div`
  ${tw`flex justify-between overflow-x-auto overflow-y-hidden w-full max-w-[1440px]`}
`;

export const PointContainer = styled.div`
  ${tw`flex flex-grow flex-shrink-0`}
  &:after {
    content: "";
    ${tw`w-4 mt-2 mx-0 self-start flex flex-grow bg-[#b1b1b1] h-[2px]`}
    ${tw`laptop:w-3 laptop:mx-2 laptop:mt-0 laptop:self-center`}
  }
  &:last-child::after {
    content: " ";
    ${tw`hidden `}
  }
`;
export const PointWrapper = styled.div`
  ${tw`flex items-center gap-1 flex-col`}
  ${tw`laptop:flex-row`}
`;
export const PointStep = styled.div<{ active: boolean }>`
  ${({ active }) => (active ? tw`bg-primary-1 ` : tw` bg-neutral-3`)}

  ${tw`w-4 h-4 font-medium text-xl rounded-full text-primary-3
  justify-center flex items-center`}
`;

export const PointTitle = styled.div`
  ${tw`text-xl font-medium`}
`;
