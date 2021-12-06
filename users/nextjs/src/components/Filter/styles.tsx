import styled from "styled-components";
import tw from "twin.macro";

export const BoxOptionsContainer = styled.div`
  ${tw`grid w-full gap-2 mx-auto my-4 phone:grid-cols-2 laptop:grid-cols-4`}
`;
export const ListBoxMenu = styled.span`
  ${tw`flex items-center justify-between w-full h-5 px-2 font-normal leading-none bg-white border text-16 border-grey`}
`;
export const ListBoxItem = styled.span`
  ${tw`font-normal leading-none text-black cursor-pointer text-16`}
`;
