import styled from "styled-components";
import tw from "twin.macro";

import { Form as _Form } from "formik";
import _Button from "designs/Button";

export const ChangeEmailContainer = styled.div`
  ${tw`  `}
`;
export const InformationContainer = styled.div`
  ${tw`w-full mx-auto max-w-72 mt-2.5`}
`;
export const SubTitle = styled.h2`
  ${tw`w-full mt-2.5 pb-1 font-bold text-left border-b text-xxl text-neutral-1 border-neutral-3`}
`;
export const Form = styled(_Form)`
  ${tw`flex flex-col gap-y-1`}
`;
export const Button = styled(_Button)`
  ${tw``}
`;
