import styled from "styled-components";
import tw from "twin.macro";

export const AffiliateLinkContainer = styled.div`
  ${tw`pb-5`}
`;

export const Title = styled.p`
  ${tw`font-bold text-5xl text-neutral-1 pb-5`}
`;

export const InputWrapper = styled.div`
  ${tw`flex phone:flex-row flex-col gap-1 items-end pb-2`}
`;
export const LabelInput = styled.p`
  ${tw`font-medium text-lg text-neutral-1 pb-1`}
`;

export const Inputs = styled.input`
  ${tw`p-1 border-solid border-2 border-neutral-4 focus:border-neutral-4 outline-none w-full`}
`;

export const SubTitle = styled.p`
  ${tw`font-bold text-xxl  text-neutral-1 pb-1`}
`;

export const Desc = styled.p`
  ${tw`font-normal text-lg text-neutral-1 pb-4`}
`;

export const Body = styled.div`
  ${tw``}
`;

export const LinkWrapper = styled.div`
  ${tw`flex flex-col justify-start phone:flex-row phone:justify-between items-center gap-2`}
`;

export const LinInputWrapper = styled.div`
  ${tw`flex flex-col gap-1 desktop:w-3/4 w-full `}
`;
