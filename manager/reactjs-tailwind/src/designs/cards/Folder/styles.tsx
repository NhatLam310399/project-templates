import styled from "styled-components";
import tw from "twin.macro";
export const FolderContainer = styled.button`
  ${tw`relative w-full duration-300 rounded-lg bg-neutral-5 hover:bg-neutral-4`}
`;
export const FolderWrapper = styled.div`
  ${tw`grid w-full phone:col-span-3 grid-cols-12 gap-1 p-1  min-h-[93px] `}
`;
export const IconWrapper = styled.div`
  ${tw`col-span-2 flex items-center max-w-2.5 `}
`;
export const Setting = styled.div`
  ${tw`col-span-1  items-center cursor-pointer flex flex-col justify-center gap-0.5`}
`;
export const InfoFolder = styled.div`
  ${tw`flex flex-col items-start justify-center h-full col-span-9 gap-y-1`}
`;
export const Icon = styled.img`
  ${tw`w-2.5 h-2.5`}
`;
export const Name = styled.p`
  ${tw`text-lg font-medium text-neutral-1`}
`;

export const Total = styled.p`
  ${tw`text-lg font-normal text-neutral-1`}
`;

export const Dots = styled.p`
  ${tw`w-0.5 h-0.5 bg-neutral-2 rounded-full`}
`;

export const ModalSetting = styled.div<{ active: boolean }>`
  ${tw`absolute z-20 flex flex-col items-start p-2 duration-300 transform rounded-lg shadow-md top-3 right-3 bg-primary-3`}
  ${({ active }) =>
    active ? tw`visible opacity-100` : tw`invisible opacity-0`}
`;
export const Action = styled.button`
  ${tw`w-full text-lg p-0.5 font-normal text-left duration-300 hover:bg-neutral-4 text-neutral-1`}
`;
