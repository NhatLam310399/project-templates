import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";

export const CreateFolderContainer = styled.div`
  ${tw`w-full duration-300 bg-primary-3`}
`;
export const Form = styled(_Form)`
  ${tw`w-full p-1`}
`;
export const Button = styled(_Button)`
  ${tw`w-11`}
`;

export const ButtonWrapper = styled.div`
  ${tw`flex justify-start w-full gap-1 py-1 `}
`;

export const InputWrapper = styled.div`
  ${tw`flex items-center gap-1`}
`;
