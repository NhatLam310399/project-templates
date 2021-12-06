import styled from "styled-components";
import tw from "twin.macro";

export const Container = styled.div`
  ${tw``}
`;

export const TextArea = styled.textarea<{ error: boolean }>`
  ${tw`w-full p-1.5 text-14 text-black border border-solid focus:border-primary`}
  ${({ error }) => (error ? tw`border-error` : tw`border-bright-grey`)}
`;

export const Label = styled.p`
  ${tw`font-normal text-16 mb-0.5`}
`;

export const Required = styled.span`
  ${tw`text-16 text-error font-medium ml-0.5`}
`;

export const Error = styled.p`
  ${tw`flex items-center text-14 text-error font-normal mt-1`}
`;
