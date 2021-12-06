import BaseButton from "designs/BaseButton";
import styled from "styled-components";
import tw from "twin.macro";

export const ProductTemplateCardContainer = styled(BaseButton)`
  ${tw`flex flex-col gap-y-1.5 w-full border border-solid rounded-lg cursor-pointer border-neutral-4 hover:shadow-lg text-left pb-1`}
`;

export const ImageWrapper = styled.div`
  ${tw`w-full aspect-w-1 aspect-h-1 `}
`;

export const Image = styled.img`
  ${tw` w-full rounded-t-lg`}
`;

export const DetailWrapper = styled.div`
  ${tw`flex flex-col gap-y-1 h-full w-full px-1`}
`;

export const Name = styled.h4`
  ${tw`text-lg font-medium text-neutral-1`}
`;

export const RatingWrapper = styled.div`
  ${tw`flex items-center gap-1`}
`;

export const TotalReview = styled.p`
  ${tw`font-medium text-md text-neutral-1`}
`;

export const Price = styled.p`
  ${tw`text-md  font-semibold text-neutral-1`}
`;

export const ColorWrapper = styled.div`
  ${tw``}
`;

export const Size = styled.p`
  ${tw`text-md font-medium text-neutral-2 uppercase`}
`;

export const Description = styled.p`
  ${tw`text-md font-normal text-neutral-1`}
`;
export const Tag = styled.div`
  ${tw`text-md font-medium text-primary-3 bg-sematic-1 rounded-lg py-0.5 px-1 absolute top-1.5 right-1.5`}
`;
