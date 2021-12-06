import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import Button from "designs/Button";

export const ResetPasswordContainer = styled.div`
  ${tw``}
`;
export const Title = styled.h1`
  ${tw` text-5xl font-bold mb-2 `}
`;

export const Text = styled.p`
  ${tw` text-lg text-neutral-2 font-normal py-1  w-full `}
`;

export const Form = styled(_Form)`
  ${tw` flex flex-col gap-1.5 `}
`;
