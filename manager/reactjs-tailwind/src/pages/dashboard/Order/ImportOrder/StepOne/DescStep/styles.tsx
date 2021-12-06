import styled from "styled-components";
import tw from "twin.macro";

export const DescStepContainer = styled.div`
  ${tw`flex flex-wrap justify-center gap-y-6 `}
  ${tw`laptop:gap-x-6 laptop:flex-nowrap laptop:justify-start`}
`;

export const ImageStep = styled.img`
  ${tw`h-30 w-30`}
`;

export const Desc = styled.div`
  ${tw``}
`;

export const TitleDesc = styled.div`
  ${tw`font-bold text-xxl leading-9`}
`;

export const WrapperStepDesc = styled.div`
  ${tw`mt-3 flex flex-col gap-2`}
`;

export const StepDescContent = styled.div`
  ${tw`flex items-start gap-x-1`}
`;

export const Detail = styled.div`
  ${tw`font-normal text-xl text-neutral-2 leading-7`}
`;

export const DescDownload = styled.div`
  ${tw`pt-3`}
`;

export const WrapperDownloadIcon = styled.div`
  ${tw`mt-3 flex gap-3`}
`;

export const IconContent = styled.div`
  ${tw`flex items-center gap-1 cursor-pointer`}
`;

export const IconTitle = styled.div`
  ${tw`text-xl text-primary-1`}
`;
