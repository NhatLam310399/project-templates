import styled from "styled-components";
import tw from "twin.macro";

export const SearchBoxContainer = styled.div`
  ${tw`relative h-4 mx-1 font-medium rounded-lg max-w-65 bg-neutral-5 text-md focus-within:ring-1 ring-primary-1`}
`;

export const Form = styled.form`
  ${tw`w-full h-full `}
`;

export const TextField = styled.label`
  ${tw`relative flex flex-row items-center w-full h-full col-start-1 col-end-8 gap-1 px-2 phone:col-end-7 cursor-text`}
`;

export const Input = styled.input`
  ${tw`relative flex-1 h-full focus:outline-none text-md text-neutral-1 placeholder-neutral-3 bg-neutral-5`}
`;

export const Dropdown = styled.div`
  ${tw` absolute w-full top-[100%] left-0 max-h-60 shadow-lg bg-primary-3 z-10 rounded-lg cursor-auto overflow-y-auto mt-0.5`}
`;

export const DropdownItem = styled.div<{ active?: boolean }>`
  ${tw`w-full cursor-pointer text-neutral-1 text-md`}
  ${({ active }) => active && tw`bg-neutral-5`}
`;
