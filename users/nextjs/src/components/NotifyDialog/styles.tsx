import styled from "styled-components";
import tw from "twin.macro";

export const AlertDialogContainer = styled.div`
  ${tw`h-full`}
`;

export const DialogButton = styled.p`
  ${tw`block cursor-pointer`}
`;

export const DialogContainer = styled.div`
  ${tw`relative p-2 phone:p-4 bg-white`}
`;

export const Title = styled.h2`
  ${tw`mb-2 text-24 phone:text-26 font-bold text-black`}
`;

export const Message = styled.p`
  ${tw`mb-2 text-14 phone:text-16 text-black font-normal`}
`;

export const Button = styled.button<{ primary?: boolean }>`
  ${tw`bg-primary px-2 py-1 text-16 font-medium ml-2`}
  ${({ primary }) =>
    primary ? tw`bg-primary text-white` : tw`bg-white text-primary`}
`;
