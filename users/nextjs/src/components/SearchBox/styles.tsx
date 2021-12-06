import styled from "styled-components";
import tw from "twin.macro";
import _SearchIcon from "@designs/icons/Search";

export const SearchBoxContainer = styled.div<{ hasProvince?: boolean }>`
  ${tw`w-full font-medium text-14`}
`;

export const Form = styled.form`
  ${tw`relative flex flex-wrap justify-between w-full gap-2 laptop:flex-nowrap`}
`;

export const TextField = styled.div`
  ${tw`flex flex-row items-center w-full laptop:max-w-[800px] h-full px-2 bg-white cursor-text`}
`;

export const Input = styled.input`
  ${tw`w-full flex-1 py-1.5 pl-1 h-full text-black placeholder-black font-normal text-16 leading-none`}
`;

export const Button = styled.button`
  ${tw`hidden w-full laptop:max-w-[169px] h-5 font-medium bg-white phone:block text-primary text-16 hover:bg-secondary hover:text-white transition duration-300`}
`;

export const Dropdown = styled.div`
  ${tw` absolute w-full top-[100%] left-0 max-h-60 bg-white shadow z-10 cursor-auto overflow-y-auto mt-0.5 py-2`}
`;

export const DropdownItem = styled.div<{ active?: boolean }>`
  ${tw`w-full px-2 text-black cursor-pointer text-16`}
  ${({ active }) => active && tw`bg-line`}
`;

export const SearchIcon = styled(_SearchIcon)`
  ${tw`flex-shrink-0`}
`;
export const ListBoxMenu = styled.span`
  ${tw`flex items-center gap-x-1 w-full h-5 px-2.5 font-normal text-16 leading-none border border-grey bg-white truncate`}
`;
export const ListBoxItem = styled.span`
  ${tw`font-normal leading-none text-black cursor-pointer text-16`}
`;
