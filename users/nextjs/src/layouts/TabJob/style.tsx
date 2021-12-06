import styled from "styled-components";
import tw from "twin.macro";
import _Link from "@designs/Link";

export const Container = styled.div`
  ${tw``}
`;
export const HeaderTab = styled.div`
  ${tw`bg-primary`}
`;
export const Wrap = styled.div`
  ${tw``}
`;
export const TabList = styled.ul`
  ${tw`laptop:flex flex-wrap justify-between items-center hidden`}
`;
export const TabItem = styled.li<{ active: boolean }>`
  ${({ active }) => active && tw`border-b-4 border-white`};
  ${tw`flex px-0.5 items-center pb-1 w-full laptop:w-auto`}
`;
export const Link = styled(_Link)`
  ${tw`inline-block ml-1 font-normal text-white duration-75 transform text-16 hover:scale-105`}
`;
export const Content = styled.div`
  ${tw`w-full py-5`}
`;
