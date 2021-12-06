import styled from "styled-components";
import tw from "twin.macro";
import { SVG as _SVG } from "@designs/SVG";

export const NotificationContainer = styled.div`
  ${tw`mr-1 cursor-pointer border-grey`}
`;

export const Icon = styled(_SVG)`
  ${tw`w-2.5 h-2.5`}
`;
export const Container = styled.div`
  ${tw`fixed top-0 right-0 w-full h-screen py-2 overflow-y-auto duration-150 bg-white phone:w-60 z-full`}
`;
