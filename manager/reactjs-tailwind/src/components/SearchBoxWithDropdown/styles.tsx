import styled from "styled-components";
import tw from "twin.macro";

export const SearchBoxContainer = styled.div`
  ${tw`relative flex items-center h-5 font-medium border rounded-lg border-neutral-3 bg-primary-3 text-md`}
`;

export const Form = styled.form`
  ${tw`grid w-full `}
`;

export const TextField = styled.div`
  ${tw`relative flex flex-row items-center w-full col-start-1 col-end-8 gap-1 px-2 bg-primary-3 phone:col-end-7 cursor-text`}
`;

export const Input = styled.input`
  ${tw`relative w-full outline-none focus:outline-none focus:border-0 focus:ring-0 text-neutral-1 placeholder-neutral-3`}
`;

export const Dropdown = styled.div`
  ${tw` absolute w-full top-[100%] left-0 max-h-60 shadow-lg bg-primary-3 z-10 rounded-lg cursor-auto overflow-y-auto mt-2.5`}
`;

export const DropdownItem = styled.div<{ active?: boolean }>`
  ${tw`w-full cursor-pointer text-neutral-1 text-md`}
  ${({ active }) => active && tw`bg-neutral-5`}
`;
