import styled, { css } from "styled-components";
import tw from "twin.macro";

export const Container = styled.div`
  ${tw`relative `}
`;

export const Label = styled.p`
  ${tw`font-normal text-14 phone:text-16 mb-0.5`}
`;

export const Required = styled.span`
  ${tw`text-16 font-medium text-error ml-0.5`}
`;

export const Icon = styled.div`
  transform: translateY(-50%);
  ${tw`absolute z-10 leading-none left-2 top-1/2 `}
`;

export const Input = styled.input<{
  error?: boolean;
  icon?: boolean;
  disabled?: boolean;
}>(
  ({ error, icon, disabled }) => css`
    ${tw`h-5 w-full p-1.5 rounded-none text-14 leading-none text-black border border-solid border-bright-grey focus:border-primary placeholder-body placeholder-opacity-80`}
    ${error && tw`border-error`}
    ${icon && tw`pl-5`}
    ${disabled && tw`bg-grey`}
  `,
);

export const Error = styled.p`
  ${tw`flex items-center mt-1 font-normal text-14 text-error`}
`;
