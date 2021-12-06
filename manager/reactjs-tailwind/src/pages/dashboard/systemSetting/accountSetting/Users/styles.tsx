import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";
import BaseButton from "designs/BaseButton";
export const UsersContainer = styled.div`
  ${tw`w-full`}
`;

export const ContainerTitle = styled.div`
  ${tw`flex items-center mb-2.5 justify-between gap-x-2`}
`;
export const Button = styled(_Button)`
  ${tw`w-16`}
`;
export const Description = styled.div`
  ${tw`w-full text-lg mb-2.5 font-normal text-neutral-2`}
`;
export const Link = styled(BaseButton)`
  ${tw``}
`;

export const ContainerFilter = styled.div`
  ${tw`w-full grid laptop:grid-cols-12 grid-cols-1 gap-2.5`}
`;
export const Form = styled(_Form)`
  ${tw`col-span-1 phone:col-span-6`}
`;
export const UserWrapper = styled.div`
  ${tw``}
`;
export const DisplayName = styled.p`
  ${tw`uppercase text-lg font-normal text-neutral-1`}
`;
export const Email = styled.p`
  ${tw`text-neutral-2 mt-1`}
`;
