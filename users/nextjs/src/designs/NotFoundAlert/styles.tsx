import styled from "styled-components";
import tw from "twin.macro";

export const NotFoundAlertContainer = styled.div`
  ${tw`flex flex-col items-center w-full h-auto mt-10 pointer-events-none select-none`}
`;

export const NotFoundAlertTitle = styled.p`
  ${tw`w-full mt-1 text-20 font-medium text-center text-black`}
`;
