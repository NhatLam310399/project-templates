import tw from "twin.macro";
import styled from "styled-components";

export const Container = styled.div`
  ${tw`p-2 mb-2 bg-white phone:p-4 phone:mb-4`}
`;

export const Title = styled.h1`
  ${tw`mr-auto font-bold leading-tight text-black phone:text-30 text-24`}
`;

export const TitleWrapper = styled.div`
  ${tw`flex flex-row`}
`;

export const Text = styled.p`
  ${tw`font-medium phone:text-20 text-16`}
`;

export const Description = styled(Text)`
  ${tw`phone:text-16 text-14`}
`;
