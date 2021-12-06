import styled from "styled-components";
import tw from "twin.macro";
import _Link from "@designs/Link";

export const Wrapper = styled.div`
  ${tw`p-2 border border-tertiary phone:py-4 phone:pl-2 phone:pr-4`}
`;
export const Container = styled.div`
  ${tw`flex flex-col items-start justify-between phone:items-center phone:flex-row`}
`;
export const Content = styled.div`
  ${tw`w-full laptop:w-auto`}
`;
export const Title = styled.h3`
  ${tw`font-medium phone:px-2 phone:leading-none text-20`}
`;
export const InfoWrapper = styled.div`
  ${tw`flex flex-col items-start phone:divide-x phone:divide-black phone:items-center phone:flex-row phone:`}
`;
export const InfoItem = styled.div`
  ${tw`mt-1 font-normal text-left phone:mt-2 phone:px-2 phone:text-center text-14 phone:text-16`}
`;
export const Button = styled.div`
  ${tw`flex items-center justify-center h-5 mt-2 font-medium transition duration-200 border cursor-default w-17 text-16 text-primary border-tertiary hover:bg-primary hover:text-white laptop:mt-0`}
`;
export const Link = styled(_Link)`
  ${tw`flex items-center justify-center h-5 mt-2 font-medium transition duration-200 border w-17 text-16 text-primary border-tertiary hover:bg-primary hover:text-white laptop:mt-0`}
`;
