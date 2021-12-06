import styled from "styled-components";
import tw from "twin.macro";
import _Link from "@designs/Link";

export const Container = styled.div`
  ${tw`p-2 grid grid-cols-12 min-h-[150px] gap-x-1  phone:gap-x-2 items-center bg-white hover:shadow transition duration-300 border border-tertiary`}
`;
export const Logo = styled.div`
  ${tw`col-span-3 phone:col-span-2 laptop:col-span-3 w-7 h-7 border border-tertiary p-0.5 phone:p-1.5 phone:w-8 phone:h-8 laptop:w-11 laptop:h-11 flex justify-center items-center overflow-hidden`}
`;
export const Img = styled.img`
  ${tw`w-full transition duration-500 transform group-hover:scale-105`}
`;
export const Content = styled.div`
  ${tw`col-span-9 phone:col-span-10 laptop:col-span-9`}
`;
export const Title = styled.h3`
  ${tw`text-20 font-bold truncate w-[230px] phone:w-auto mb-1 phone:mb-2 hover:text-secondary  transition duration-300`}
`;
export const InfoWrapper = styled.div`
  ${tw`flex justify-between items-center`}
`;
export const TextWrapper = styled.div`
  ${tw`flex flex-col justify-start`}
`;
export const Career = styled.p`
  ${tw`text-16 font-medium truncate w-[200px] phone:w-auto  mb-1`}
`;
export const Location = styled.p`
  ${tw`text-14 font-normal `}
`;
export const Heart = styled.div`
  ${tw`w-4`}
`;
export const HeartCount = styled.p`
  ${tw`text-13 font-normal text-secondary  mt-0.5 text-center`}
`;
export const Link = styled(_Link)`
  ${tw``}
`;
