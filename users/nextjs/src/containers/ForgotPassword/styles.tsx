import styled from "styled-components";
import tw from "twin.macro";
import _Button from "@designs/Button";
import { Form as _Form } from "formik";
import { SVG as _SVG } from "@designs/SVG";
import _Link from "@designs/Link";

export const ForgotPasswordContainer = styled.div`
  ${tw`flex flex-col justify-center`}
`;

export const Title = styled.h1`
  ${tw`text-24 phone:text-26 font-semibold text-black text-center mb-2 phone:mb-4`}
`;

export const Form = styled(_Form)`
  ${tw`grid gap-1`}
`;

export const Button = styled(_Button)`
  ${tw`w-full`}
`;

export const Notification = styled.p`
  ${tw`text-14 flex items-center justify-center gap-1 text-black font-medium text-center mt-2 phone:mt-4`}
`;

export const Register = styled(_Link)`
  ${tw`text-14 text-primary font-bold`}
`;

export const CaptchaWrapper = styled.div`
  ${tw``}
`;
