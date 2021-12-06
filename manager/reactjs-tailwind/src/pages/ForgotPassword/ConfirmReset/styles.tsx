import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import Button from "designs/Button";

export const Title = styled.h1`
  ${tw`mb-2 text-5xl font-bold `}
`;

export const Text = styled.p`
  ${tw`w-full mb-1 text-lg font-normal leading-tight `}
`;
export const TextSematic = styled.p`
  ${tw`p-2 mb-1 bg-sematic-3 bg-opacity-20 text-sematic-3 `}
`;

export const Link = styled(Button)`
  ${tw`p-0 mb-1 bg-transparent text-primary-1`}
`;

export const Other = {
  Container: styled.div`
    ${tw`flex flex-row w-full`}
  `,
  Button: styled(Button)`
    ${tw`text-neutral-2  bg-transparent w-1/2 mt-1.5`}
  `,
};
