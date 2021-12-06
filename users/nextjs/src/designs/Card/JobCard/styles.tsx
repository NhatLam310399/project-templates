import styled from "styled-components";
import tw from "twin.macro";
import _Link from "@designs/Link";

export const JobCardWrapper = styled.div`
  ${tw`relative w-full p-2 transition duration-300 bg-white border border-tertiary hover:shadow`}
`;
export const JobCardContainer = styled.div`
  ${tw`grid items-center grid-cols-12 gap-x-2`}
`;
export const Logo = styled.div`
  ${tw`col-span-3 phone:col-span-2 flex border border-tertiary p-0.5 phone:p-1.5  justify-center items-center overflow-hidden`}
`;
export const LogoContainer = styled.div`
  ${tw``}
`;
export const Img = styled.img`
  ${tw`w-full transition duration-500 transform group-hover:scale-105`}
`;
export const Content = styled.div`
  ${tw`relative col-span-9 phone:col-span-10`}
`;
export const Title = styled.h3`
  ${tw`w-full laptop:w-2/3 font-bold leading-tight break-words text-20 h-2.5`}
`;
export const CompanyName = styled.p`
  ${tw`py-1 font-normal leading-none truncate text-14`}
`;
export const Location = styled.p`
  ${tw`font-bold leading-none text-16`}
`;
export const UpdateTime = styled.p`
  ${tw`py-1 font-normal  text-14`}
`;
export const BenefitContainer = styled.div`
  ${tw`flex flex-wrap flex-col gap-1 phone:flex-row phone:items-center`}
`;
export const SalaryWrapper = styled.div`
  ${tw`relative my-1 laptop:absolute laptop:right-0 laptop:-top-1.5 text-16 font-normal text-secondary leading-none`}
`;

export const LinkWrapper = styled.div`
  ${tw``}
`;

export const Link = styled(_Link)<{ isSecondary?: boolean }>`
  ${tw`font-normal leading-none transition duration-300 text-16 hover:text-secondary`}
  ${({ isSecondary }) => (isSecondary ? tw`text-secondary` : tw`text-black`)}
`;
