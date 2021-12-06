import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";
import _BaseButton from "designs/BaseButton";

export const OrderAndProductContainer = styled.div`
  ${tw`w-full`}
  .custom-table-sort__container {
    th {
      ${tw`bg-primary-3 text-neutral-1`}
      &:first-child {
        ${tw`pl-0 font-bold text-xxl`}
      }
    }
  }
`;
export const Form = styled(_Form)`
  ${tw`col-span-1 row-start-2 row-end-3 phone:row-auto max-w-[450px] phone:col-span-6`}
  .group {
    ${tw`pl-0 `}
  }
  .placeholder {
    ${tw`pl-1.5`}
  }
`;
export const ResetDefault = styled.div`
  ${tw`row-start-1 row-end-2 phone:row-auto  phone:col-span-6 col-span-1 flex gap-2.5 justify-end items-center w-full p-1`}
`;
export const TopContainer = styled.div`
  ${tw`grid grid-cols-1 my-2 phone:gap-2 phone:grid-cols-12`}
`;
export const Text = styled(_BaseButton)`
  ${tw`font-medium text-md text-primary-1`}
`;
export const Container = styled.div`
  ${tw`flex items-center gap-1 cursor-pointer`}
`;
export const Name = styled.p`
  ${tw`text-lg`}
`;

export const Icon = styled.div`
  ${tw`w-2.5 pl-1 min-w-max h-2.5 flex items-center justify-center`}
`;

export const ChildrenName = styled.p`
  ${tw`mt-1 text-sm`}
  &:first-child {
    ${tw`mt-0`}
  }
`;
export const ChildrenContainer = styled.div`
  ${tw`flex flex-col gap-1`}
`;
export const Option = styled.div`
  ${tw`flex items-center gap-1`}
`;
export const Logo = styled.div`
  ${tw`px-1 py-[16px] bg-neutral-4`}
`;
export const Img = styled.img`
  ${tw`object-cover w-full`}
`;
