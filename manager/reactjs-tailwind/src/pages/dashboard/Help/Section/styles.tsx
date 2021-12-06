import styled from "styled-components";
import tw from "twin.macro";

export const SectionContainer = styled.div`
  ${tw`pb-5`}
`;
export const Body = styled.div`
  ${tw`pt-4 flex  flex-wrap`}
`;
export const Heading = styled.div`
  ${tw`pt-6 pb-4 border-neutral-4 border-b-2 border-solid`}
`;
export const Title = styled.p`
  ${tw`font-bold text-5xl text-neutral-1 `}
`;

export const Desc = styled.div`
  ${tw`font-normal text-xl text-neutral-1 cursor-pointer  pr-2 pt-2 hover:underline phone:w-1/2 w-full`}
`;
