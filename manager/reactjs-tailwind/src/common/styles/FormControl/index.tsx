import styled, { css } from "styled-components";
import tw from "twin.macro";

export const formControlCommon = (
  isError: boolean | undefined,
  disabled: boolean | undefined,
) =>
  css`
    ${tw`
      w-full 
      rounded-sm
      border
      border-solid
      border-neutral-4
      bg-primary-3
      px-1.5
      h-5
      focus-within:border-neutral-1
      text-md
      font-medium
      text-neutral-1
      placeholder-neutral-3
    `}
    ${!isError
      ? tw`border-neutral-3 focus:border-neutral-1 group-focus:border-neutral-1`
      : tw`border-sematic-1 focus:border-sematic-1 group-focus:border-sematic-1 `}
    ${disabled && tw`pointer-events-none opacity-60`}
  `;
