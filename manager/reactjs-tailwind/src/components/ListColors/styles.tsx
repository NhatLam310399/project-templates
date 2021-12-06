import styled, { css } from "styled-components";
import tw from "twin.macro";
import BaseButton from "designs/BaseButton";
import { ISize } from ".";

export const ColorSelectorContainer = styled.div`
  ${tw`flex flex-row flex-wrap gap-0.5 `}
`;

export const ColorBlock = styled(BaseButton)<{ size: ISize }>`
  ${tw`relative flex items-center justify-center overflow-hidden`}
  ${({ size }) =>
    size === "md"
      ? tw`w-2.5 h-2.5 rounded-md`
      : css`
          width: 12px;
          height: 12px;
          border-radius: 2px;
        `}
  border:  1px solid rgba(0,0,0,.3);
`;

export const SubColorBlock = styled.div`
  ${tw`absolute top-0 right-0 w-1/2 h-full z-[0] `}
`;
