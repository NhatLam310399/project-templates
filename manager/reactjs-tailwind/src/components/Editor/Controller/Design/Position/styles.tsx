import styled from "styled-components";
import tw from "twin.macro";
import BaseButton from "designs/BaseButton";

export const PositionContainer = styled.div`
  ${tw`w-full `}
`;

export const Label = styled.h3`
  ${tw`pt-2 pb-1 text-lg font-medium `}
`;

export const ListButtons = styled.ul`
  ${tw`flex flex-row items-center gap-2 `}
`;

export const Button = styled(BaseButton)`
  ${tw`p-1 border border-solid rounded-md border-neutral-3 hover:bg-neutral-5 bg-primary-3`}
`;
