import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";
import _BaseButton from "designs/BaseButton";

export const TopDialog = styled.div`
  ${tw`flex items-center p-1 w-30`}
`;
export const Title = styled.h3`
  ${tw`w-full font-medium border-b border-neutral-4 text-xxl text-neutral-1`}
`;
export const Close = styled(_BaseButton)`
  ${tw`w-3.5 h-3.5`}
`;
export const Back = styled(_BaseButton)`
  ${tw`w-2.5 h-2.5`}
`;
export const FolderWrapper = styled.div`
  ${tw`border-b bg-primary-3 border-neutral-4`}
`;
export const FileWrapper = styled.div`
  ${tw`bg-neutral-5`}
`;
export const Item = styled.button`
  ${tw`flex items-center w-full gap-1 px-2 py-1`}
`;
export const Icon = styled.div`
  ${tw`w-2.5 h-2.5`}
`;
export const Button = styled(_Button)`
  ${tw`w-auto px-2`}
`;

export const ButtonWrapper = styled.div`
  ${tw`flex justify-start w-full p-1 border-t border-neutral-4`}
`;
export const Empty = styled.div`
  ${tw`w-full text-lg font-normal text-center text-neutral-1`}
`;
