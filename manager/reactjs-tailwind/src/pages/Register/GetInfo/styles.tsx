import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import Button from "designs/Button";
export const Title = styled.h1`
  ${tw`mb-1.5 text-5xl font-bold `}
`;

export const SubTitle = styled.p`
  ${tw`w-full mb-1.5 text-lg font-normal text-neutral-2`}
`;

export const Form = styled(_Form)`
  ${tw` flex flex-col gap-1.5 `}
`;

export const Back = styled(Button)`
  ${tw`border bg-primary-3 text-primary-1 border-primary-1 `}
`;
