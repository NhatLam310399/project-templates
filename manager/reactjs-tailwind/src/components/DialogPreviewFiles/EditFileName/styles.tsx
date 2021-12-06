import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";
import _BaseButton from "designs/BaseButton";

export const EditFileNameContainer = styled.div`
  ${tw``}
`;
export const FileName = styled.form`
  ${tw`flex items-center gap-1`}
`;
export const InputName = styled.input<{ edit: boolean }>`
  ${tw` font-bold max-w-20 border-b border-neutral-4 outline-none disabled:bg-primary-3 text-xxl text-neutral-1 focus:ring-0 focus:outline-none`}
`;
export const EditIcon = styled(_BaseButton)`
  ${tw`hover:bg-neutral-4 p-1 duration-300 rounded-md`}
`;
