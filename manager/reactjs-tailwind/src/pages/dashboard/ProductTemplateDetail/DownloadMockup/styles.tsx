import styled from "styled-components";
import tw from "twin.macro";
import { Link as _Link } from "react-router-dom";
import _Checkbox from "designs/Checkbox";

export const DownloadMockupWrapper = styled.div`
  ${tw`flex flex-col items-center w-full px-2 pb-10 `}
`;

export const DownloadMockupContainer = styled.div`
  ${tw`  w-full max-w-[1260px] h-full mt-3 mb-10`}
`;

export const ListMockups = styled.ul`
  ${tw`flex flex-row flex-wrap justify-center w-full gap-2 `}
`;

export const MockupCardContainer = styled.label<{ size: "lg" | "sm" }>`
  ${tw`relative pt-2 pb-1 border border-solid rounded-lg cursor-pointer select-none border-neutral-3 hover:shadow-md`}
  ${({ size }) => (size === "lg" ? tw`px-3` : tw`px-1`)}
`;

export const ImageContainer = styled.div`
  ${tw`relative flex flex-col items-center w-full`}
`;

export const NameMockup = styled.h3`
  ${tw`mt-1 text-xs font-normal text-center truncate phone:text-md `}
`;

export const Checkbox = styled(_Checkbox)`
  ${tw` absolute top-0.5 left-0.5 z-10 `}
`;

export const Message = styled.p`
  ${tw`mt-2 font-normal text-center text-md phone:text-lg text-neutral-1`}
`;

export const Link = styled(_Link)`
  ${tw` text-primary-1`}
`;

export const ListDemoSidesGenerated = styled.div`
  ${tw`w-full mt-12 `}
`;

export const DemoSide = {
  Container: styled.div`
    ${tw`w-full `}
  `,
  Header: styled.label`
    ${tw`flex flex-row items-center w-full gap-1 pb-1 border-b border-solid cursor-pointer border-neutral-4`}
    ${tw`text-lg font-semibold select-none `}
  `,
  Checkbox: styled(_Checkbox)`
    ${tw`z-10 w-2`}
  `,
  ListDemos: styled.ul`
    ${tw`flex flex-row flex-wrap gap-2 mt-2`}
  `,
};
