import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";

export const FulfillmentCentersContainer = styled.div`
  ${tw`w-full mt-7`}
`;

export const Button = styled(_Button)`
  ${tw`mt-1 w-9`}
`;
export const Text = styled.h4`
  ${tw`mb-1 text-lg font-normal text-justify phone:text-left text-neutral-2`}
`;
export const Container = styled.div`
  ${tw`p-2 bg-neutral-5 mb-2.5 flex items-start gap-1.5`}
`;
export const Icon = styled.div`
  ${tw`w-3 h-full `}
`;
