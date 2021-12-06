import styled from "styled-components";
import tw from "twin.macro";

export const AddContainer = styled.div`
  ${tw`pb-2`}
`;

export const Heading = {
  Wrapper: styled.div`
    ${tw``}
  `,
  detail: styled.p`
    ${tw`font-normal  text-neutral-2 text-lg`}
  `,
  Title: styled.p`
    ${tw`font-bold  text-neutral-1 text-5xl pt-2`}
  `,
  Desc: styled.p`
    ${tw`font-normal  text-neutral-1 text-lg leading-6 pt-2`}
  `,
};

export const Body = styled.div`
  ${tw`pt-2`}
`;

export const Wallet = {
  Wrapper: styled.div`
    ${tw`pb-2`}
  `,
  Title: styled.p`
    ${tw`font-bold  text-neutral-1 text-xxl pb-2`}
  `,
  Process: styled.div`
    ${tw` py-[16px] px-2 w-full bg-primary-1 text-primary-3 font-medium  text-lg rounded-md mb-2`}
  `,
  Desc: styled.p`
    ${tw`font-medium text-neutral-1 text-lg`}
  `,
  Amount: styled.div`
    ${tw`pt-1 flex`}
  `,
  Prefix: styled.div`
    ${tw`py-[8px] px-[16px] border-2 border-solid border-neutral-4 shadow-md font-normal text-neutral-3 text-lg `}
  `,
  FormContainer: styled.div`
    ${tw`pt-2`}
  `,
};

export const Inputs = styled.input`
  ${tw`border-2 border-solid border-primary-1 outline-none focus:border-primary-1`}
`;
