import styled from "styled-components";
import tw from "twin.macro";

export const DetailContainer = styled.div`
  ${tw`  `}
`;

export const Body = styled.div`
  ${tw`pt-4 grid phone:grid-cols-2 gap-2 grid-cols-1 `}
`;
export const Heading = styled.div`
  ${tw`pt-6 pb-4 border-neutral-4 border-b-2 border-solid`}
`;
export const Title = styled.p`
  ${tw`font-bold text-5xl text-neutral-1 `}
`;

export const Desc = styled.p`
  ${tw`font-normal text-lg text-neutral-1 pt-2`}
`;

export const ItemsWrapper = styled.div`
  ${tw`grid grid-cols-2 gap-4`}
`;
