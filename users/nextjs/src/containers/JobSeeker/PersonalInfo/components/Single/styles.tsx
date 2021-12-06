import tw from "twin.macro";
import styled from "styled-components";

export const Container = styled.div`
  ${tw`p-2 mb-2 bg-white phone:p-4 phone:mb-4`}
`;

export const TitleWrapper = styled.div`
  ${tw`flex flex-row items-center mb-4`}
`;

export const Title = styled.h1`
  ${tw`mr-auto font-bold leading-tight text-black phone:text-26 text-24`}
`;

export const ItemWrapper = styled.div`
  ${tw`flex flex-row flex-wrap mb-1 gap-x-2`}
`;

export const Item = styled.div`
  ${tw`flex phone:flex-row flex-col laptop:grid laptop:grid-cols-12 py-1 border-b border-solid border-grey laptop:w-[calc(50% - 20px)] w-full`}
`;

export const Text = styled.p`
  ${tw`mr-1 font-medium text-black break-words laptop:col-span-7 phone:text-16 text-14`}
`;

export const Label = styled(Text)`
  ${tw`font-normal phone:w-20 laptop:w-auto laptop:col-span-5`}
`;
