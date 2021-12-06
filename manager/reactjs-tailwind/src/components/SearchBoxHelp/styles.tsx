import styled from "styled-components";
import tw from "twin.macro";

export const SearchBoxContainer = styled.div`
  ${tw`relative h-5 mx-auto font-medium rounded-sm max-w-[334px] bg-primary-3 text-md focus-within:ring-1 ring-primary-1`}
`;

export const Form = styled.form`
  ${tw`w-full h-full`}
`;

export const TextField = styled.label`
  ${tw`relative flex flex-row items-center w-full h-full col-start-1 col-end-8 gap-1 px-2 phone:col-end-7 cursor-text`}
`;

export const Input = styled.input`
  ${tw`relative flex-1 h-full focus:outline-none text-md text-neutral-1 placeholder-neutral-3 bg-primary-3`}
`;
