import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";

export const UsaAndCanadaContainer = styled.div`
  ${tw`w-full`}
`;

export const Button = styled(_Button)`
  ${tw`w-9`}
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
export const Container = styled.div`
  ${tw`p-2 mb-2.5 bg-neutral-5`}
`;
export const HighLightText = styled.span<{ primary: boolean }>`
  ${({ primary }) => (primary ? tw`text-primary-1` : tw`font-medium`)}
`;
export const Text = styled.p`
  ${tw`text-lg text-justify phone:text-left text-neutral-1`}
`;
