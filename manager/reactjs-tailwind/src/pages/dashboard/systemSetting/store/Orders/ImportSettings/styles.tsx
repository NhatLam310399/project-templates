import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";

export const SellingPreferencesContainer = styled.div`
  ${tw`w-full mt-5`}
`;
export const Form = styled(_Form)`
  ${tw`mt-2.5`}
`;
export const Button = styled(_Button)`
  ${tw`mt-1 w-9`}
`;
export const Title = styled.h4`
  ${tw`mb-1 text-lg font-medium text-neutral-1`}
`;
export const Text = styled.h4`
  ${tw`mb-1 text-lg font-normal text-justify phone:text-left text-neutral-2`}
`;
export const Container = styled.div`
  ${tw`p-2 mb-2.5 bg-sematic-1 bg-opacity-[0.15]`}
`;
export const HighLightText = styled.span`
  ${tw`text-neutral-1`}
`;
export const Description = styled.p`
  ${tw`leading-loose text-justify phone:text-left text-neutral-2 text-md`}
`;
