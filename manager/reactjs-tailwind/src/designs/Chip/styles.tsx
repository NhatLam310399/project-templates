import styled from "styled-components";
import tw from "twin.macro";
import { ITagVariant } from "./index";

const variants: {
  [key in ITagVariant]: any;
} = {
  info: tw`bg-primary-1 text-neutral-5`,
  success: tw`bg-sematic-3 text-neutral-5`,
};

export const ChipContainer = styled.div<{ variant: ITagVariant }>`
  ${tw` flex items-center justify-center w-max rounded-full text-primary-1 px-1.5 py-[3px]`}
  ${({ variant }) => variants[variant]}
`;
