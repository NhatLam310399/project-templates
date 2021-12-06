import tw from "twin.macro";
import styled from "styled-components";

export const Container = styled.div`
  ${tw`flex flex-col items-center justify-center w-full py-2 border-2 border-dashed cursor-pointer select-none border-grey`}
`;

export const Text = styled.h1`
  ${tw`mt-0.5 font-medium text-black phone:text-20 text-16 text-center`}
`;
