import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";

export const ProductAlternativesContainer = styled.div`
  ${tw`w-full mt-5`}
`;

export const Button = styled(_Button)`
  ${tw`w-9`}
`;

export const Description = styled.p`
  ${tw`font-normal pl-3.5  text-justify phone:text-left text-neutral-2 text-md`}
`;

export const WrapperCheckbox = styled.div`
  ${tw`mb-2.5`}
`;
