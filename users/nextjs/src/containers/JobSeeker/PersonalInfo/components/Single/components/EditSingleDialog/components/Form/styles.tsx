import tw from "twin.macro";
import styled from "styled-components";
import { Form as _Form } from "formik";

export const ButtonWrapper = styled.div`
  ${tw`flex flex-row w-full mt-4 phone:gap-x-2 gap-x-1`}
`;

export const Form = styled(_Form)`
  ${tw`grid gap-y-2.4`}
`;
