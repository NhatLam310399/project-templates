import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";
import _Button from "designs/Button";
import _BaseButton from "designs/BaseButton";
export const UpdatesContainer = styled.div`
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
export const ResetDefault = styled.div`
  ${tw`flex justify-end w-full p-1`}
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
