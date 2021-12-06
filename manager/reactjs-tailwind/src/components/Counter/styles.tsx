import styled from "styled-components";
import tw from "twin.macro";

export const CounterContainer = styled.div`
  ${tw` w-full h-4 grid min-w-[100px] `}
  grid-template-columns: 40px 1fr 40px;
`;

export const NumberInput = styled.input`
  ${tw`w-full h-full text-lg font-medium text-center border-t border-b border-solid outline-none focus:outline-none focus:ring-0 border-neutral-4`}
`;

export const Button = styled.button`
  ${tw`flex items-center justify-center w-full border border-solid bg-neutral-5 hover:bg-neutral-4 border-neutral-4`}
`;
