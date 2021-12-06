import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";

export const PackingSlipContainer = styled.div`
  ${tw`w-full mt-7`}
`;

export const Form = styled(_Form)`
  ${tw``}
`;
export const Button = styled(_Button)`
  ${tw`mt-1 w-9`}
`;
export const Text = styled.p`
  ${tw`mb-1 text-lg font-normal text-justify phone:text-left text-neutral-2`}
`;
export const Container = styled.div`
  ${tw`p-2 bg-neutral-5 mb-2.5 flex items-start gap-1.5`}
`;
export const Icon = styled.div`
  ${tw`w-3 h-full `}
`;
export const ButtonUploadImage = styled(_Button)`
  ${tw`my-1 w-24`}
`;
export const ContainerUploadImage = styled.div`
  ${tw`mb-2.5`}
`;
export const Label = styled.p`
  ${tw`text-lg font-medium text-neutral-1 mb-1`}
`;
export const RequireTextArea = styled.p`
  ${tw`text-lg w-full text-right font-medium text-neutral-3`}
`;
