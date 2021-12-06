import styled from "styled-components";
import tw from "twin.macro";
import { SVG as _SVG } from "@designs/SVG";
import { Form as _Form } from "formik";
import _Button from "@designs/Button";

export const OTPFormContainer = styled.div`
  ${tw``}
`;

export const Form = styled(_Form)`
  ${tw``}
`;

export const Back = styled.p`
  ${tw`text-16 inline-flex items-center text-body transform hover:scale-105 duration-100 cursor-pointer mb-0.5`}
`;

export const Title = styled.h1`
  ${tw`text-24 phone:text-26 font-semibold text-black mb-2 phone:mb-4 leading-10 text-center`}
`;

export const Icon = styled(_SVG)`
  ${tw`w-1.5 h-1.5`}
`;

export const PhoneValidate = styled.p`
  ${tw`text-16 text-black font-medium text-center mb-0.5`}
`;

export const Notification = styled.p`
  ${tw`text-14 text-body font-medium text-center mb-2 phone:mb-4`}
`;

export const PhoneNumber = styled.span`
  ${tw`font-bold text-primary`}
`;

export const CountDown = styled.span`
  ${tw`font-bold text-primary`}
`;

export const Resend = styled.span`
  ${tw`font-bold text-primary cursor-pointer`}
`;

export const Button = styled(_Button)`
  ${tw`w-full`}
`;
