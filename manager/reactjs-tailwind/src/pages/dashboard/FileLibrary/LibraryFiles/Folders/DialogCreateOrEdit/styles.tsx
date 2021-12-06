import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";
import _BaseButton from "designs/BaseButton";
export const FoldersContainer = styled.div`
  ${tw`w-full mt-2.5`}
`;
export const TopDialog = styled.div`
  ${tw`flex items-center justify-between px-3 py-2`}
`;
export const Title = styled.h3`
  ${tw`font-bold text-xxl text-neutral-1`}
`;
export const Close = styled(_BaseButton)`
  ${tw`w-3.5 h-3.5`}
`;
export const Form = styled(_Form)`
  ${tw`border-t border-neutral-4`}
`;
export const Button = styled(_Button)`
  ${tw`w-11`}
`;
export const IconFolderList = styled.div`
  ${tw`w-full flex items-center flex-wrap justify-start gap-0.5`}
`;
export const ButtonIcon = styled.button<{ active: boolean }>`
  ${tw`w-4 h-4 p-1 duration-300 border rounded-lg hover:bg-neutral-4 border-neutral-4`}
  ${({ active }) => (active ? tw`border-neutral-1` : tw`border-neutral-4`)}
`;
export const Icon = styled.img`
  ${tw`object-cover w-full `}
`;
export const Label = styled.label`
  ${tw`text-lg font-medium text-neutral-1`}
`;
export const AvatarWrapper = styled.div`
  ${tw`flex flex-col gap-0.5 px-3 pb-4 mt-1`}
`;
export const WrapperInput = styled.div`
  ${tw`w-full px-3 mt-1`}
`;

export const ButtonWrapper = styled.div`
  ${tw`flex w-full gap-2 p-3 border-t border-neutral-4`}
`;
