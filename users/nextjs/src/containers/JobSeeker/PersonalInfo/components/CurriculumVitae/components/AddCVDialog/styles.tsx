import styled from "styled-components";
import tw from "twin.macro";

export const Container = styled.div`
  ${tw`h-full w-max`}
`;

export const DialogButton = styled.div`
  ${tw`block cursor-pointer`}
`;

export const Wrapper = styled.div`
  ${tw`relative w-[90vw] p-2 bg-white phone:p-4 phone:w-65 text-center`}
`;

export const Title = styled.h1`
  ${tw`my-2 font-bold text-black phone:text-20 text-18`}
`;

export const Content = styled.div`
  ${tw`flex flex-col items-center justify-center p-4 border-2 border-dashed border-grey`}
`;

export const Text = styled.div`
  ${tw`mt-2 font-normal phone:text-16 text-14 text-body`}
`;

export const ButtonText = styled.p`
  ${tw`text-primary phone:text-16 text-14`}
`;

export const CVDescription = styled.span`
  ${tw`font-medium phone:text-20 text-18 text-secondary`}
`;

export const Input = styled.input``;
