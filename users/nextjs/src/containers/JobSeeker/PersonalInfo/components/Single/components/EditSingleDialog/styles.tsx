import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";

export const Container = styled.div`
  ${tw`h-full w-max`}
`;

export const DialogButton = styled.p`
  ${tw`block cursor-pointer`}
`;

export const Wrapper = styled.div`
  ${tw`relative w-[90vw] p-2 bg-white phone:p-4 phone:w-65`}
`;

export const Title = styled.h1`
  ${tw`mb-4 font-bold text-black phone:text-26 text-24`}
`;
