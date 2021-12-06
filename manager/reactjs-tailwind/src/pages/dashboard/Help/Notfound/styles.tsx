import styled from "styled-components";
import tw from "twin.macro";

export const NotFoundWrapper = styled.main`
  ${tw`min-h-screen`}
`;

export const Header = styled.header`
  ${tw`relative w-full py-3 `}
`;

export const NotFoundContainer = styled.div`
  ${tw`grid items-center grid-cols-1 gap-2 phone:grid-cols-2 `}
`;

export const Content = styled.div`
  ${tw`w-full row-start-2 phone:row-start-1 `}
`;

export const Title = styled.h1`
  ${tw`mb-1 text-4xl font-bold phone:text-6xl`}
`;

export const SubTitle = styled.h2`
  ${tw`phone:text-xxl font-normal mb-2.5 text-lg`}
`;

export const ImageWrapper = styled.div`
  ${tw`flex items-center justify-center w-full row-start-1 px-4 phone:p-0 `}
`;

export const Footer = styled.footer`
  ${tw`relative w-full py-2 mt-auto mb-0 text-md font`}
`;
