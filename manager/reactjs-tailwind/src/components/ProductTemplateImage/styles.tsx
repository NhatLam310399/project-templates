import styled from "styled-components";
import tw from "twin.macro";

export const ProductTemplateImageContainer = styled.div`
  ${tw`relative`}
`;

export const HeatherBackground = styled.div`
  ${tw` inset-0 absolute z-[0] bg-no-repeat bg-contain `}
`;

export const TemplateImage = styled.div`
  ${tw` inset-0 absolute z-[1] `}
`;

export const UpperBackgroundImage = styled.div`
  ${tw` inset-0 absolute z-[2] bg-no-repeat bg-contain `}
`;
