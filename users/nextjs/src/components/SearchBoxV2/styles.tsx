import styled from "styled-components";
import tw from "twin.macro";
import _SearchIcon from "@designs/icons/Search";
import _Link from "@designs/Link";
import { SVG as _SVG } from "@designs/SVG";

export const SearchBoxContainer = styled.div<{ hasProvince?: boolean }>`
  ${tw`w-full font-medium text-14`}
`;

export const Form = styled.form`
  ${tw`relative flex flex-wrap justify-between w-full gap-2 laptop:flex-nowrap`}
`;

export const TextField = styled.div<{ hasProvince?: boolean }>`
  ${tw`flex flex-row items-center w-full h-full px-2 bg-white cursor-text`}
  ${({ hasProvince }) =>
    hasProvince ? tw`laptop:max-w-[800px]` : tw`laptop:max-w-[740px]`}
`;

export const Input = styled.input`
  ${tw`w-full flex-1 py-1.5 pl-1 h-full text-black placeholder-black font-normal text-16 leading-none`}
`;

export const Button = styled.button`
  ${tw`w-full laptop:max-w-[169px] h-5 font-medium bg-white phone:block text-primary text-16 hover:bg-secondary hover:text-white transition duration-300`}
`;

export const SearchIcon = styled(_SearchIcon)`
  ${tw`flex-shrink-0`}
`;

export const Dropdown = styled.div`
  ${tw`absolute z-30 hidden w-full gap-3 p-2 mt-1  bg-white shadow top-[30%] laptop:top-full phone:grid grid-cols-auto-1fr`}
`;

export const Title = styled.p`
  ${tw`mb-2 font-normal text-14 text-body`}
`;
export const EmptyDataSuggest = styled.p`
  ${tw`font-normal text-14 text-light`}
`;
export const RecentSearch = styled.div`
  ${tw`border-b phone:border-b-0 phone:border-r border-grey px-2 phone:px-0 pb-1.5 phone:pr-3 phone:pb-0`}
`;

export const RecentSearchItem = styled.p`
  ${tw`py-1 px-0.5 font-medium text-black duration-150 cursor-default text-16 hover:bg-grey hover:bg-opacity-20`}
`;

export const CommonKeyword = styled.div`
  ${tw`w-full h-full px-2 phone:px-0`}
`;

export const CommonKeywordContent = styled.div`
  ${tw`flex flex-wrap w-full`}
`;

export const CommonKeywordItem = styled.p`
  ${tw`inline-block p-1 mb-1 mr-1 font-normal border cursor-default text-14 border-grey hover:bg-grey hover:bg-opacity-20`}
`;

export const CommonKeywordType = styled.span`
  ${tw`text-body`}
`;

export const DropdownMobile = styled.div`
  ${tw`fixed top-0 left-0 flex flex-col w-full h-screen space-y-2 overflow-y-auto bg-white phone:hidden z-full`}
`;

export const MobileSearchBox = styled.div`
  ${tw`flex items-center px-2 border-b shadow border-grey`}
`;

export const Icon = styled(_SVG)`
  ${tw`cursor-pointer`}
`;

export const ListBoxMenu = styled.span`
  ${tw`flex items-center gap-x-1 w-full h-5 px-2.5 font-normal text-16 leading-none border border-grey bg-white truncate`}
`;
export const ListBoxItem = styled.span`
  ${tw`font-normal leading-none text-black cursor-pointer text-16`}
`;
