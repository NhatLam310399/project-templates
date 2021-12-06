import styled from "styled-components";
import tw from "twin.macro";
import { SVG as _SVG } from "@designs/SVG";
import _Link from "@designs/Link";
import _Button from "@designs/Button";
import { Form as _Form } from "formik";

export const RegisterFormContainer = styled.div`
  ${tw``}
`;

export const LoginForm = styled.div`
  ${tw``}
`;

export const Title = styled.h1`
  ${tw`text-24 phone:text-26 font-semibold text-black text-center mb-2 phone:mb-4`}
`;

export const AuthenTication = styled.div`
  ${tw`text-black mb-2 phone:mb-4`}
`;

export const Icon = styled(_SVG)`
  ${tw`w-2 phone:w-2.5 h-2 phone:h-2.5 mr-1`}
`;

export const Form = styled(_Form)`
  ${tw`grid gap-1`}
`;

export const SocialLogin = styled.p`
  ${tw`flex items-center justify-center text-14 phone:text-16 py-1 border border-grey mb-1 select-none cursor-pointer hover:bg-grey hover:bg-opacity-20`}
`;

export const Or = styled.p`
  ${tw`mt-1 mb-2 text-14 font-medium text-center`}
`;

export const Text = styled.div`
  ${tw`text-14 font-medium text-black text-center mb-1`}
`;

export const Navigation = styled(_Link)`
  ${tw`inline-block font-bold text-primary cursor-pointer`}
`;

export const EmployerLogin = styled.a`
  ${tw`inline-block font-bold text-primary cursor-pointer`}
`;

export const Button = styled(_Button)`
  ${tw`w-full`}
`;
