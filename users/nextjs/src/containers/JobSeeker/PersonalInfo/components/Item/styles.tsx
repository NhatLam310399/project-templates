import tw from "twin.macro";
import styled from "styled-components";

export const Container = styled.div`
  ${tw`flex flex-row items-start py-4 mr-auto text-black gap-x-1`}
`;

export const Title = styled.h1`
  ${tw`font-bold leading-none phone:text-20 text-16 mb-0.5`}
`;

export const SubTitle = styled.h2`
  ${tw`font-normal phone:text-16 text-14`}
`;

export const Content = styled.div`
  ${tw`mr-auto`}
`;

export const Text = styled.p`
  ${tw`font-normal phone:text-16 text-14 text-body`}
`;
