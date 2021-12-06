import styled from "styled-components";
import tw from "twin.macro";

export const TransformSliderContainer = styled.div`
  ${tw`flex flex-row items-center w-full gap-1 `}
`;

export const NumberInput = styled.input`
  ${tw` w-1/3 border border-solid border-neutral-2 rounded-md  h-4.5 text-lg font-medium text-neutral-1 text-center`}
`;
