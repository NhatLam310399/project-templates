import styled from "styled-components";
import tw from "twin.macro";
import _Link from "@designs/Link";

export const ComingSoonContainer = styled.div`
  ${tw`relative w-screen h-screen text-white flex justify-center`}
`;

export const Content = styled.div`
  ${tw`w-full h-full absolute flex flex-col items-center justify-center`}
`;

export const Title = styled.h1`
  ${tw`font-bold text-48 laptop:text-70`};
`;

export const Text = styled.p`
  ${tw`text-16 laptop:text-26 font-light phone:font-medium text-center`}
`;

export const NavigationWrapper = styled.div`
  ${tw`w-full flex flex-col laptop:flex-row justify-center items-center`}
`;

export const Link = styled(_Link)`
  ${tw`mt-2 text-center w-30 py-1 border border-white duration-200 laptop:mr-2`}
`;
