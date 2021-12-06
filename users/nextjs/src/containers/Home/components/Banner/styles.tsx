import styled from "styled-components";
import tw from "twin.macro";
import _ResponsiveImage from "@designs/ResponsiveImage";

export const BannerContainer = styled.div`
  ${tw`relative flex justify-center`}
`;

export const Background = styled(_ResponsiveImage)`
  ${tw`object-cover object-top w-screen h-35`}
`;

export const SearchWrapper = styled.div`
  ${tw`absolute top-0 flex items-center justify-center w-full h-full`}
`;

export const SearchContainer = styled.div`
  ${tw`flex flex-col gap-2 w-full max-w-[929px]`}
`;

export const Title = styled.h2`
  ${tw`font-bold text-white text-30`}
`;
