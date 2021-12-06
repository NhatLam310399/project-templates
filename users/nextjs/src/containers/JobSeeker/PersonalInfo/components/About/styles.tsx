import styled from "styled-components";
import tw from "twin.macro";

export const Container = styled.div`
  ${tw`p-2 mb-2 bg-white phone:p-4 phone:mb-4`}
`;

export const Title = styled.h1`
  ${tw`mr-auto font-bold leading-tight phone:text-26 text-24`}
`;

export const TitleWrapper = styled.div`
  ${tw`flex flex-row mb-4`}
`;

export const Text = styled.p`
  ${tw`flex font-normal phone:text-16 text-14`}
`;
