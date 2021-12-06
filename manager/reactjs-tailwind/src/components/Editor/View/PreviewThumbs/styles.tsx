import styled from "styled-components";
import tw from "twin.macro";
import BaseButton from "designs/BaseButton";

export const PreviewThumbsContainer = styled.div`
  ${tw`flex flex-row flex-wrap items-center justify-center w-full mt-2 `}
`;

export const PreviewCardContainer = styled(BaseButton)`
  ${tw`flex flex-col items-center p-1 hover:shadow-as-border w-min`}
`;
export const NameColor = styled.p`
  ${tw`mt-1 text-sm text-center w-fit`}
`;
