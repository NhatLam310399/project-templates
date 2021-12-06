import styled from "styled-components";
import tw from "twin.macro";
import { Listbox } from "@headlessui/react";

export const Form = styled.form`
  ${tw`px-1`}
`;

export const ListboxButton = styled(Listbox.Button)`
  ${tw`relative w-full text-left cursor-pointer`}
`;

export const ListboxOptions = styled(Listbox.Options)`
  ${tw`absolute z-30 w-full py-1 text-14 bg-white rounded focus:outline-none`}
`;

export const ListOptions = styled.div`
  ${tw`w-full py-1 overflow-y-auto text-16 max-h-50 scrollbar scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent divide-y divide-line`}
`;

export const InputWrapper = styled.div`
  ${tw`w-full px-1.5 flex items-center relative`}
`;

export const Input = styled.input`
  ${tw`
    px-5.5 py-1.5 w-full h-5 text-16 font-normal text-black border-none bg-line focus:outline-none
  `}
`;

export const Button = styled.button<{ active: boolean; selected: boolean }>`
  ${tw` text-left py-1.5 px-1 w-full `}
  ${({ active }) => active && tw`bg-line`}
  ${({ selected }) => selected && tw`bg-line`}
`;
