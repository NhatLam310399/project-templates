import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";

export const FormAddressContainer = styled.div`
  ${tw`w-full mx-auto max-w-72`}
`;

export const Button = styled(_Button)`
  ${tw`w-11`}
`;
export const Form = styled(_Form)`
  ${tw` gap-y-2.5 flex flex-col`}
`;

export const WrapperCheckbox = styled.p`
  ${tw`flex flex-col mb-1 gap-x-1 phone:flex-row`}
`;
export const Title = styled.p`
  ${tw`font-medium text-neutral-1 text-lg mb-1.5`}
`;
export const Label = styled.p`
  ${tw`pl-3.5 font-normal text-neutral-2 phone:pl-0 text-md`}
`;
export const GroupCheckbox = styled.div`
  ${tw`mb-2.5`}
`;
export const ContainerButton = styled.div`
  ${tw`flex gap-x-2.5`}
`;
export const HighLightText = styled.span<{ primary: boolean }>`
  ${({ primary }) => (primary ? tw`text-primary-1` : tw`font-medium`)}
`;
export const Text = styled.p`
  ${tw`text-lg text-justify phone:text-left text-neutral-1`}
`;
