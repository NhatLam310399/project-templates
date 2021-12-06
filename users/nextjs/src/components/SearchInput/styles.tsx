import styled from "styled-components";
import tw from "twin.macro";

export const SearchBoxContainer = styled.div`
  ${tw`relative font-medium text-16`}
`;

export const Input = styled.input`
  ${tw`w-full h-5 py-1 pl-6 rounded-md text-black placeholder-primary bg-white`}
`;

export const Button = styled.button<{ active?: boolean }>`
  ${tw`absolute top-0 left-0 w-5 h-full rounded-md flex justify-center items-center leading-none hover:bg-tertiary`}
  ${({ active }) => active && tw`bg-black`}
`;

export const Dropdown = styled.div`
  ${tw` absolute w-full top-[100%] left-0 max-h-60 shadow bg-white rounded cursor-auto`}
`;

export const DropdownItem = styled.div<{ active?: boolean }>`
  ${tw`w-full text-black cursor-pointer text-13 rounded hover:bg-line`}
  ${({ active }) => active && tw`bg-black`}
`;
