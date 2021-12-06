import styled from "styled-components";
import tw from "twin.macro";
import BaseButton from "designs/BaseButton";

export const FileLibrariesContainer = styled.div`
  ${tw`w-full h-17`}
`;

export const FiltersRowContainer = styled.div`
  ${tw`grid items-center gap-2 `}
  grid-template-columns: 1fr 1fr auto auto auto;
`;

export const ThirdStoreButton = styled(BaseButton)`
  ${tw`flex items-center justify-center w-5 h-5 border border-solid rounded-lg border-neutral-3 hover:bg-neutral-5`}
  img {
    ${tw`w-2.5 h-2.5`}
  }
`;
