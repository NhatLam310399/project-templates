import styled from "styled-components";
import tw from "twin.macro";
import _Link from "@designs/Link";

export const CompanyCardWrapper = styled.div`
  ${tw`relative w-full px-2 py-2 mx-auto transition duration-300 bg-white border phone:px-4 border-tertiary hover:shadow`}
`;
export const CompanyCardContainer = styled.div`
  ${tw`items-center block grid-cols-12 phone:grid gap-x-4`}
`;
export const Logo = styled.div`
  ${tw`phone:col-span-2 max-w-[200px] mb-2 phone:mb-0 border border-tertiary p-1.5 flex justify-center items-center overflow-hidden`}
`;
export const Img = styled.img`
  ${tw`w-full transition duration-500 transform group-hover:scale-105`}
`;
export const Content = styled.div`
  ${tw`col-span-12 phone:col-span-6`}
`;
export const Title = styled.h1`
  ${tw`font-bold leading-none text-20`}
`;
export const Location = styled.p`
  ${tw`my-2 font-normal leading-none text-16`}
`;
export const Career = styled.p`
  ${tw`font-normal leading-none text-16`}
`;
export const ButtonWrapper = styled.div`
  ${tw`flex col-span-12 mt-2 phone:col-span-4 phone:justify-end phone:mt-0`}
`;
export const Button = styled.button`
  ${tw`items-center justify-center h-5 px-1 font-medium text-white transition duration-200 bg-primary text-16 hover:bg-secondary`}
`;
export const DialogContainer = styled.div`
  ${tw`relative p-4 bg-white z-full`}
`;
export const DialogTitle = styled.h2`
  ${tw`mb-2 font-bold leading-none text-20 phone:text-26`}
`;
export const DialogContent = styled.p`
  ${tw`font-normal leading-none text-16`}
`;
export const ButtonDialogWrapper = styled.div`
  ${tw`flex justify-end w-full px-1 mt-3 gap-x-2`}
`;
export const ButtonDialog = styled.div<{ isAccept?: boolean }>`
  ${tw`w-10 h-4.5 flex justify-center items-center text-16 font-medium leading-none cursor-pointer`}
  ${({ isAccept }) =>
    isAccept
      ? tw`text-white transition duration-200 bg-primary hover:bg-secondary`
      : tw`text-primary`}
`;
export const Link = styled(_Link)`
  ${tw`w-10 h-4.5 flex justify-center items-center text-16 font-medium leading-none bg-primary text-white hover:bg-secondary transition duration-200`}
`;
