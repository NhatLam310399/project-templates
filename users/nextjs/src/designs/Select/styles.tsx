import styled from "styled-components";
import tw from "twin.macro";
import { Listbox } from "@headlessui/react";

export const Container = styled.div`
  ${tw`w-full `}
`;

export const Label = styled.label<{ isError: boolean }>`
  ${tw` font-medium text-lg mb-0.5 `}
  ${({ isError }) => (isError ? tw`text-primary` : tw`text-black`)}
`;

export const HiddenInput = styled.input`
  ${tw`absolute w-1 h-1 opacity-0 `}
`;

export const ErrorMessage = styled.p`
  ${tw` text-primary text-xs ml-1.5 mt-0.5 `}
`;

export const ListboxButton = styled(Listbox.Button)`
  ${tw`relative w-full text-left cursor-pointer`}
`;

export const ListboxOptionsContainer = styled(Listbox.Options)`
  ${tw`absolute z-30 w-full py-1 mt-1 overflow-auto bg-white border border-solid rounded-lg shadow-md max-h-60 focus:outline-none border-tertiary scrollbar scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent divide-y divide-line`}
`;

export const Menu = styled.div<{ isError: boolean; disabled: boolean }>`
  ${tw`px-1.5 grid items-center w-full h-5 font-medium text-black bg-white border border-solid rounded-lg  border-gray focus:border-black text-md placeholder-secondary`};
  ${({ isError }) => isError && tw`border-primary`}
  ${({ disabled }) =>
    disabled &&
    tw`pointer-events-none opacity-60`}
  grid-template-columns: 1fr 25px;
`;

export const Text = styled.p`
  ${tw`truncate `}
`;

export const Placeholder = styled.p`
  ${tw` text-secondary`}
`;

export const MenuItem = styled.div<{ active?: boolean }>`
  ${tw` w-full px-1.5 py-0.5 text-md font-normal cursor-pointer`}
  ${({ active }) => active && tw`bg-tertiary`}
`;
