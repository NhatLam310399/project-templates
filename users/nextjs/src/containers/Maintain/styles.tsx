import styled from "styled-components";
import tw from "twin.macro";

export const MaintainContainer = styled.div`
  ${tw`w-full min-h-screen flex items-center justify-center`}
`;
export const Container = styled.div`
  ${tw`h-full flex flex-col-reverse gap-5 laptop:grid laptop:grid-cols-2 items-center laptop:gap-11`}
`;
export const BoxContent = styled.div`
  ${tw`w-full`}
`;
export const Title = styled.h2`
  ${tw`mb-2 w-full text-26 phone:text-33 desktop:text-48 font-bold leading-tight text-primary text-center laptop:text-left`}
`;
export const Text = styled.p`
  ${tw`w-full text-16 phone:text-20 font-normal text-black text-center laptop:text-left`}
`;
export const BoxImage = styled.div`
  ${tw`w-full h-full`}
`;
