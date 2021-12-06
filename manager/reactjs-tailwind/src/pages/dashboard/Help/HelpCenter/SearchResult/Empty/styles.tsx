import styled from "styled-components";
import tw from "twin.macro";

export const EmptyContainer = styled.div`
  ${tw`flex justify-center flex-col items-center `}
`;

export const Title = styled.p`
  ${tw`py-5 font-bold text-b-3 text-6xl border-b-2 border-solid border-neutral-4 `}
`;

export const Desc = styled.p`
  ${tw`pt-1 pb-2 font-normal text-neutral-1 text-lg `}
`;

export const Link = styled.span`
  ${tw`pt-1 font-normal text-sematic-3 text-lg cursor-pointer hover:text-neutral-1 hover:underline`}
`;
