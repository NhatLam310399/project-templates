import { lazy } from "react";
import styled from "styled-components";
import tw, { TwStyle } from "twin.macro";
import type { IButtonVariant, IButtonSize } from "./index";
import _Spinner from "icons/Spinner";
import BaseButton from "designs/BaseButton";

export const Spinner = styled(_Spinner)`
  ${tw``}
`;

const sizes: {
  [key in IButtonSize]: TwStyle;
} = {
  sm: tw`px-1 py-0.5 text-md font-medium`,
  md: tw`px-2.5 py-[8px] text-lg font-medium`,
  lg: tw`px-2.5 py-[12px] text-xl font-medium`,
};

const variants: {
  [key in IButtonVariant]: TwStyle;
} = {
  primary: tw`bg-primary-1 text-primary-3`,
  secondary: tw`bg-transparent text-primary-1 border border-solid border-primary-1`,
  third: tw`bg-neutral-3 text-primary-3`,
  link: tw`bg-transparent text-primary-1`,
  "black-secondary": tw`bg-transparent text-neutral-1 border border-solid border-neutral-1`,
};

const disableVariants: {
  [key in IButtonVariant]: TwStyle;
} = {
  primary: tw`bg-neutral-4 text-primary-3`,
  secondary: tw`bg-transparent text-neutral-3 border border-solid border-neutral-4`,
  third: tw`bg-neutral-5 text-primary-3`,
  link: tw`bg-transparent text-neutral-3`,
  "black-secondary": tw`bg-transparent text-neutral-3 border border-solid border-neutral-4`,
};

export const ButtonContainer = styled(BaseButton)<{
  size: IButtonSize;
  variant: IButtonVariant;
  loading: boolean;
}>`
  ${tw`flex flex-row gap-1 items-center justify-center  select-none rounded-md `}
  ${({ size }) => sizes[size]}
  ${({ variant, disabled }) =>
    !disabled ? variants[variant] : disableVariants[variant]}
  ${({ disabled, loading }) => (disabled || loading) && tw`pointer-events-none`}
  ${({ loading }) => loading && tw`bg-opacity-60 cursor-wait`}
`;
