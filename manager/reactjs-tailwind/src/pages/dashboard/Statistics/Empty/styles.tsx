import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";

export const EmptyStatisticsContainer = styled.div`
  ${tw`flex flex-col items-center justify-center w-full h-auto mt-5`}
`;
export const ImageWrapper = styled.div`
  ${tw`max-w-18 `}
`;
export const Title = styled.p`
  ${tw`text-5xl font-bold text-neutral-1 text-center mt-2.5`}
`;
export const Text = styled.p`
  ${tw`mt-1 font-normal text-center text-xxl text-neutral-2`}
`;
export const Button = styled(_Button)`
  ${tw`mx-auto mt-2`}
`;
