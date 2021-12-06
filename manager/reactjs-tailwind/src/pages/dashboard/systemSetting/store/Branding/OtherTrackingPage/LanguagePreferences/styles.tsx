import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";

export const LanguagePreferencesContainer = styled.div`
  ${tw`w-full mt-2 mb-5 phone:my-5`}
`;
export const Label = styled.p`
  ${tw`mb-1 text-lg font-medium text-neutral-1`}
`;
export const Text = styled.p`
  ${tw`mb-1 text-lg font-normal text-neutral-2`}
`;
export const LabelRadioButton = styled.p`
  ${tw`mb-2.5 font-normal text-md text-neutral-2`}
`;
export const Characters = styled.p`
  ${tw`w-full font-normal text-right text-md text-neutral-3`}
`;
export const AddButton = styled.div`
  ${tw`flex items-center text-lg font-normal cursor-default gap-x-1 text-primary-1`}
`;
export const WrapperInputAdd = styled.div``;
