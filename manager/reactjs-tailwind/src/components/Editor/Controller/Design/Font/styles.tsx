import styled from "styled-components";
import tw from "twin.macro";

export const FontContainer = styled.div`
  ${tw`w-full mt-2`}
`;

export const ListFonts = styled.div`
  ${tw`border overflow-y-auto max-h-[200px] flex flex-col border-solid rounded-lg border-neutral-3 `}
`;

export const FontItem = styled.button`
  ${tw` px-1 py-0.5 hover:bg-neutral-5`}
  &.active {
    ${tw`bg-neutral-4 `}
  }
`;
