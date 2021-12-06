import tw from "twin.macro";
import styled from "styled-components";

export const Container = styled.div`
  ${tw`p-2 mb-2 bg-white phone:p-4 phone:mb-4`}
`;

export const Title = styled.h1`
  ${tw`mb-1 font-bold leading-tight text-black phone:text-26 text-24`}
`;

export const ItemWrapper = styled.div`
  ${tw`flex flex-row items-start justify-center mr-auto border-b border-solid border-line gap-x-1`}
`;

export const IconWrapper = styled.div`
  ${tw`flex items-center justify-center py-4`}
`;
