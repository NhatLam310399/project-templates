import styled from "styled-components";
import tw from "twin.macro";

export const PreviewProductWrapper = styled.div`
  ${tw`flex flex-col items-center w-full h-full `}
`;

export const PreviewProductContainer = styled.div`
  ${tw`grid w-full grid-cols-12 max-w-laptop mt-4`}
`;

export const ImageSection = styled.div`
  ${tw`w-full col-start-1 col-end-5 `}
`;

export const Image = styled.img`
  ${tw``}
`;

export const Content = styled.div`
  ${tw`col-start-6 col-end-13 `}
`;

export const PropertyLayoutContainer = styled.div`
  ${tw` mt-2 text-neutral-2`}
`;

export const PrintFilesList = styled.ul`
  ${tw`flex flex-row gap-1 flex-wrap`}
`;
