import styled from "styled-components";
import tw from "twin.macro";

export const CollectionContainer = styled.div`
  ${tw`py-2 rounded-md border-2 border-solid  border-neutral-4 flex flex-col items-center justify-center gap-2`}
`;

export const Title = styled.p`
  ${tw`font-medium text-xl text-neutral-1 text-center`}
`;

export const Desc = styled.p`
  ${tw`font-normal text-sm text-neutral-1 text-center`}
`;
