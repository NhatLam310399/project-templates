import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";
import BaseButton from "designs/BaseButton";
export const DialogContainer = styled.div`
  ${tw`w-full`}
`;
export const Text = styled.div`
  ${tw`w-full mb-2.5 text-lg font-normal break-words text-neutral-2`}
`;
export const Key = styled.span`
  ${tw`w-full text-lg font-medium text-neutral-2`}
`;

export const Content = styled.div`
  ${tw`w-full px-2 pb-2 border-t border-b phone:pt-5 border-neutral-3`}
`;
export const ContainerTitle = styled.div`
  ${tw`flex items-center justify-between w-full p-2`}
`;
export const Close = styled.button`
  ${tw`p-1`}
`;

export const Button = styled(_Button)`
  ${tw`w-14`}
`;
export const Form = styled(_Form)`
  ${tw`grid grid-cols-1 phone:grid-cols-12 gap-2.5`}
`;
export const Option = styled.div`
  ${tw`flex items-center justify-start`}
`;
export const TextOption = styled.p`
  ${tw`ml-1 truncate`}
`;
export const Logo = styled.img`
  ${tw`w-1.5 object-cover`}
`;
