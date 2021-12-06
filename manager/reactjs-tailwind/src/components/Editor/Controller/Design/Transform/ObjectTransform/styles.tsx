import styled from "styled-components";
import tw from "twin.macro";

export const SizeEditorContainer = styled.div`
  ${tw`grid items-center w-full gap-1.5 `}
  grid-template-columns: 1fr 20px 1fr;
`;

export const FlipButtonsContainer = styled.div`
  ${tw` w-full flex flex-row items-center gap-1.5 `}
`;
