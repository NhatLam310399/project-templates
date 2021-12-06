import styled from "styled-components";
import tw from "twin.macro";

export const OverallContainer = styled.div`
  ${tw`pb-5`}
`;

export const Title = styled.p`
  ${tw`font-bold text-5xl text-neutral-1 pb-5`}
`;

export const Box = styled.div`
  ${tw`p-4 bg-neutral-5 mb-4 flex gap-2 rounded-md items-center phone:flex-row flex-col`}
`;

export const Text = {
  Wrapper: styled.div`
    ${tw`flex flex-col gap-1`}
  `,
  Title: styled.p`
    ${tw`font-bold text-xxl text-neutral-1`}
  `,
  SubTitle: styled.p`
    ${tw`font-normal text-xl text-neutral-1`}
  `,
};

export const Grid = {
  Wrapper: styled.div`
    ${tw`pb-4`}
  `,
  Row: styled.div`
    ${tw`flex flex-wrap`}
  `,
  Col: styled.div`
    ${tw` py-4 desktop:w-1/3 phone:w-1/2 w-full flex flex-col items-center justify-between bg-neutral-5 border-2 border-solid border-neutral-4`}
  `,
};

export const Other = {
  Wrapper: styled.div`
    ${tw`mt-2`}
  `,
  Title: styled.p`
    ${tw`font-bold text-xxl text-neutral-1 pb-3 border-solid border-b-2 border-neutral-4`}
  `,
  Body: styled.div`
    ${tw`mt-3 flex desktop:justify-between desktop:items-center desktop:flex-row flex-col gap-1 `}
  `,
};

export const LabelInput = styled.p`
  ${tw`font-medium text-lg text-neutral-1 pb-1`}
`;

export const Inputs = styled.input`
  ${tw`p-1 border-solid border-2 border-neutral-4 focus:border-neutral-4 outline-none w-full`}
`;

export const InputWrapper = styled.div`
  ${tw`flex phone:flex-row flex-col gap-1 items-end pb-2`}
`;

export const Icon = {
  Wrapper: styled.div`
    ${tw``}
  `,
  IconWrapper: styled.div`
    ${tw`flex gap-1`}
  `,
};

export const Desc = styled.p`
  ${tw`font-normal text-lg  text-neutral-1 pt-1`}
`;
