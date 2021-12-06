import styled from "styled-components";
import tw from "twin.macro";

export const ContentContainer = styled.div`
  ${tw`w-2/3`}
`;

export const Title = styled.h1`
  ${tw`font-bold text-xxl text-neutral-1`}
`;

export const Body = styled.div`
  ${tw`p-4 mt-2 bg-neutral-5 rounded-md text-neutral-1 font-normal text-lg`}
`;
