import styled from "styled-components";
import tw from "twin.macro";

export const SortWrapper = styled.div`
  ${tw`grid items-center w-full grid-cols-12 gap-2`}
`;
export const TotalContainer = styled.div`
  ${tw`col-span-12 font-medium leading-none phone:col-span-5 text-16 phone:text-20`}
`;
export const SortContainer = styled.div`
  ${tw`flex items-center justify-end col-span-12 gap-1 font-medium leading-none phone:col-span-7 text-16`}
`;
export const SortLabel = styled.div`
  ${tw`phone:px-2`}
`;
