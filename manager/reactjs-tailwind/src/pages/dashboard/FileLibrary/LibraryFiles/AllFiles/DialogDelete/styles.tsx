import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";
import _BaseButton from "designs/BaseButton";

export const TopDialog = styled.div`
  ${tw`flex items-center justify-between px-3 py-2`}
`;
export const Title = styled.h3`
  ${tw`font-bold text-xxl text-neutral-1`}
`;
export const Close = styled(_BaseButton)`
  ${tw`w-3.5 h-3.5`}
`;
export const ContentWrapper = styled.div`
  ${tw`px-3 py-1 border-t border-neutral-4`}
`;
export const Button = styled(_Button)`
  ${tw`w-auto `}
`;
export const Text = styled.p`
  ${tw`text-lg font-normal text-neutral-2`}
`;
export const Label = styled.label`
  ${tw`font-normal text-md text-neutral-2`}
`;
export const CheckboxWrapper = styled.div`
  ${tw`flex items-start w-full mt-2`}
`;

export const ButtonWrapper = styled.div`
  ${tw`flex justify-end w-full gap-2 px-3 py-2 border-t border-neutral-4`}
`;
