import styled from "styled-components";
import tw from "twin.macro";

export const Wrapper = styled.div`
  ${tw`pb-5`}
`;
export const Container = styled.div`
  ${tw`w-full mx-auto px-1.5 laptop:px-0`}
`;
export const ResultCount = styled.div`
  ${tw`my-4 font-medium leading-none text-20`}
`;
export const CountNumber = styled.span`
  ${tw`font-bold text-secondary`}
`;
export const ListCardContainer = styled.div`
  ${tw`grid grid-cols-12 gap-2`}
`;
export const CardWrapper = styled.div`
  ${tw`col-span-12 laptop:col-span-6`}
`;
