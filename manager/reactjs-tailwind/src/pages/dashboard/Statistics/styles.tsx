import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";

export const SubTitle = styled.div`
  ${tw`flex items-center gap-1 font-bold text-xxl text-neutral-1`}
`;

export const Description = styled.p`
  ${tw`mt-1 text-lg font-normal text-neutral-1`}
`;
export const Content = styled.div`
  ${tw`grid grid-cols-12`}
`;
export const ItemRender = styled.div<{ active: boolean }>`
  ${tw`p-1 text-lg font-normal text-neutral-1`}
  ${({ active }) => active && tw`bg-neutral-4`}
`;

export const Form = styled(_Form)`
  ${tw`col-span-full phone:col-span-4 phone:max-w-31 mt-2.5`}
`;
export const Statistic = {
  Wrapper: styled.div`
    ${tw`grid mt-2.5 grid-cols-12 col-span-12 gap-2`}
  `,
  Container: styled.div`
    ${tw`col-span-6 px-2 py-3 phone:col-span-3 bg-b-2`}
  `,
  Field: styled.p`
    ${tw`text-lg font-medium text-neutral-1`}
  `,
  Value: styled.p<{ type: "total" | "cancel" | "paid" | "success" }>`
    ${tw`mt-1.5 text-5xl font-bold`}
    ${({ type }) => type === "total" && tw`text-primary-1`}
    ${({ type }) => type === "cancel" && tw`text-sematic-1`}
    ${({ type }) => type === "paid" && tw`text-sematic-2`}
    ${({ type }) => type === "success" && tw`text-sematic-3`}
  `,
};
export const HeadingTable = {
  Container: styled.div`
    ${tw`relative grid mt-2.5 grid-cols-12 col-span-full`}
  `,
  Empty: styled.div`
    ${tw`col-span-1`}
  `,
  Title: styled.p`
    ${tw`z-20 col-span-6 px-2 font-bold border phone:col-span-3 laptop:col-span-2 bg-primary-3 border-neutral-4 text-neutral-1 text-xxl`}
  `,
  Line: styled.div`
    ${tw`absolute left-0 top-1/2 h-[1px] w-full bg-neutral-4`}
  `,
};
