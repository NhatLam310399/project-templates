import styled from "styled-components";
import tw from "twin.macro";
import Image from "designs/Image";

export const LoginLayoutContainer = styled.div`
  ${tw`grid w-full h-full min-h-screen grid-cols-1 phone:grid-cols-2`}
`;

export const LeftSide = {
  Container: styled.div`
    ${tw`items-center justify-center hidden w-full h-full px-1 pointer-events-none select-none phone:flex bg-b-2`}
  `,
  Logo: styled(Image)`
    ${tw`h-3.5 absolute top-8 left-6`}
  `,
  ImageWrapper: styled.div`
    ${tw`w-3/4`}
  `,
};

export const RightSide = styled.main`
  ${tw`flex items-center justify-center w-full p-2 `}
`;

export const Content = styled.div`
  ${tw`w-full max-w-45 `}
`;
