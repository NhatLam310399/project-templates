import styled from "styled-components";
import tw from "twin.macro";
import { Listbox } from "@headlessui/react";

export const Container = styled.div`
  ${tw`max-w-[250px]`}
`;

export const ListboxButton = styled(Listbox.Button)`
  ${tw`relative text-left cursor-pointer`}
`;

export const ListboxOptionsContainer = styled(Listbox.Options)`
  ${tw`absolute right-0 z-30 py-1 mt-1 overflow-auto bg-white border border-solid divide-y rounded shadow w-30 phone:w-35 max-h-60 focus:outline-none border-tertiary divide-line`}
`;

export const Menu = styled.div`
  ${tw`flex items-center font-medium text-16 text-secondary`}
`;

export const Text = styled.p`
  ${tw`mr-0.5`}
`;

export const MenuItem = styled.div<{ active?: boolean; selected?: boolean }>`
  ${tw` w-full px-2 py-1.5 text-16 font-normal cursor-pointer`}
  ${({ active }) => active && tw`bg-tertiary`}
  ${({ selected }) => selected && tw`bg-tertiary`}
`;
