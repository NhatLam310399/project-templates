import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";

export const AboutStoreContainer = styled.div`
  ${tw`w-full mt-7`}
`;
export const Form = styled(_Form)`
  ${tw`col-span-1 max-w-45 phone:col-span-6`}
`;
export const Button = styled(_Button)`
  ${tw`mt-1 w-9`}
`;
