import styled from "styled-components";
import tw from "twin.macro";
import { Form as _Form } from "formik";

export const FormContainer = styled.div`
  ${tw`pt-2`}
`;

export const FormWrapper = styled(_Form)`
  ${tw``}
`;

export const FormHeading = {
  Wrapper: styled.div`
    ${tw``}
  `,
  Title: styled.p`
    ${tw`font-bold text-xxl text-neutral-1 pb-2`}
  `,
  Body: styled.div`
    ${tw`grid grid-cols-1 laptop:grid-cols-2 gap-5`}
  `,
  Content: styled.div`
    ${tw`flex flex-col gap-2`}
  `,
};

export const BillingMethod = {
  Wrapper: styled.div`
    ${tw``}
  `,
  Tilte: styled.p`
    ${tw`font-bold text-xxl text-neutral-1 pb-2`}
  `,
  Box: styled.div`
    ${tw`py-1 px-2 bg-neutral-4 text-neutral-1 font-normal  text-lg`}
  `,
};

export const Chose = {
  Wrapper: styled.div`
    ${tw`flex flex-col gap-2`}
  `,
  Heading: styled.div`
    ${tw`flex gap-2`}
  `,
  Desc: styled.div`
    ${tw`font-normal text-lg text-sematic-3 leading-6 items-center`}
  `,
};

export const Items = {
  Wrapper: styled.div<{ chose: number }>`
    ${tw`p-2 flex justify-between border-2 border-solid  rounded-sm cursor-pointer`}
    ${({ chose }) =>
      chose === 1 ? tw`border-sematic-3` : tw`border-neutral-3`}
  `,
  Content: styled.div`
    ${tw`flex gap-2 font-normal text-neutral-2 text-lg`}
  `,
  Wrappers: styled.div<{ chose: number }>`
    ${tw`p-2 flex justify-between border-2 border-solid  rounded-sm cursor-pointer`}
    ${({ chose }) =>
      chose === 2 ? tw`border-sematic-3` : tw`border-neutral-3`}
  `,
};
