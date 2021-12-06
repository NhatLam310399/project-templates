import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import Button from "designs/Button";

export const LoginContainer = styled.div`
  ${tw``}
`;

export const Title = styled.h1`
  ${tw` text-5xl font-bold mb-2 `}
`;

export const Text = styled.p`
  ${tw` text-md font-medium py-1 text-center w-full `}
`;
export const Policy = styled.p`
  ${tw` text-md text-neutral-1 font-normal my-1`}
`;
export const Error = styled.p`
  ${tw` text-xs ml-4 text-sematic-1 font-normal`}
`;
export const PolicyContainer = styled.div`
  ${tw`mb-1`}
`;

export const Form = styled(_Form)`
  ${tw` flex flex-col gap-1.5 `}
`;

export const Other = {
  Container: styled.div`
    ${tw`w-full flex flex-row`}
  `,
  Button: styled(Button)`
    ${tw`text-neutral-2 w-full mt-1.5`}
  `,
};
export const ErrorMessage = styled.div`
  ${tw`text-sematic-1 font-normal text-lg p-1 bg-accent bg-opacity-[0.1] border-l-4 border-sematic-1 rounded-md my-1`}
`;
export const Link = styled.span`
  ${tw`text-primary-1 cursor-default font-medium text-lg`}
`;
