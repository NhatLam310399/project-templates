import styled from "styled-components";
import tw from "twin.macro";

export const ProductCardContainer = styled.div`
  ${tw`relative p-1 duration-300 border rounded-lg cursor-pointer h-44 bg-primary-3 border-neutral-4 hover:shadow-md`}
  &:hover {
    .product-overlay {
      ${tw`duration-300 opacity-100`}
    }
  }
`;
export const ImageWrapper = styled.div`
  ${tw`relative flex items-center justify-center w-full h-24`}
`;
export const CheckboxWrapper = styled.div`
  ${tw`absolute top-0 z-30 left-1`}
`;
export const DetailWrapper = styled.div`
  ${tw`flex p-1 flex-col items-start gap-0.5 mt-1`}
`;
export const Name = styled.h2`
  ${tw`text-xl font-medium break-all text-neutral-1`}
`;
export const Text = styled.p`
  ${tw`font-normal break-all text-md text-neutral-1`}
`;

export const Overlay = styled.div`
  ${tw`absolute opacity-0 top-0 left-0 z-20 duration-300 flex items-center justify-center w-full h-24 bg-opacity-[0.5] rounded-lg bg-neutral-1`}
`;
export const Preview = styled.button`
  ${tw`py-1 duration-300 border rounded-md hover:bg-neutral-4 w-18 border-primary-1 bg-primary-3 text-primary-1`}
`;
export const Setting = styled.button`
  ${tw`absolute duration-300 hover:bg-neutral-4 top-1 right-2 w-3 h-3 border border-primary-1 rounded-md bg-primary-3 flex flex-col justify-center items-center gap-[2px]`}
`;
export const Dot = styled.span`
  ${tw`w-0.5 h-0.5 rounded-full bg-primary-1`}
`;

export const ModalSetting = styled.div<{ active: boolean }>`
  ${tw`absolute z-40 flex flex-col items-start px-0.5 py-2 duration-300 transform rounded-lg shadow-md top-3.5 right-3.5 bg-primary-3`}
  ${({ active }) =>
    active ? tw`visible opacity-100` : tw`invisible opacity-0`}
`;
export const Action = styled.button`
  ${tw`w-full text-lg py-0.5 px-3 font-normal text-left duration-300 hover:bg-neutral-4 text-neutral-1`}
`;
export const Download = styled.a`
  ${tw`w-full text-lg py-0.5 px-3 font-normal text-left duration-300 hover:bg-neutral-4 text-neutral-1`}
`;
