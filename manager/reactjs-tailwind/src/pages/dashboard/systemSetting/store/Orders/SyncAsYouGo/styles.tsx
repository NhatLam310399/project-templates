import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";

export const SyncAsYouGoContainer = styled.div`
  ${tw`w-full mt-5`}
`;

export const Button = styled(_Button)`
  ${tw`w-9`}
`;

export const WrapperCheckbox = styled.div`
  ${tw`mb-2.5`}
`;
export const HighLightText = styled.span<{ primary: boolean }>`
  ${({ primary }) => (primary ? tw`text-primary-1` : tw`text-neutral-1`)}
`;
export const Description = styled.p`
  ${tw`pl-3.5 text-justify phone:text-left text-neutral-2 text-md`}
`;
