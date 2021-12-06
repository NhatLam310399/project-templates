import styled, { css } from "styled-components";
import tw from "twin.macro";
import BaseButton from "designs/BaseButton";

export const ColorSelectorContainer = styled.div`
  ${tw`flex flex-row flex-wrap gap-0.5 `}
`;

export const ColorBlock = styled(BaseButton)`
  ${tw`w-2.5 relative overflow-hidden h-2.5 rounded-md flex justify-center items-center`}
  border:  1px solid rgba(0,0,0,.3)
`;

export const SubColorBlock = styled.div`
  ${tw`absolute top-0 right-0 w-1/2 h-full z-[0] `}
`;
