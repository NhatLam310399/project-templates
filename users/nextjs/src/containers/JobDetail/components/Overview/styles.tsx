import styled from "styled-components";
import tw from "twin.macro";
import _Link from "@designs/Link";

export const OverviewWrapper = styled.div`
  ${tw`container bg-white border border-solid border-grey`}
`;
export const Container = styled.div`
  ${tw`items-center block grid-cols-12 py-2 laptop:px-4 phone:grid gap-x-4`}
`;
export const Logo = styled.div`
  ${tw`phone:col-span-2 border border-tertiary p-1.5 flex justify-center items-center overflow-hidden max-w-[200px] mb-2 phone:mb-0`}
`;
export const Img = styled.img`
  ${tw`w-full transition duration-500 transform group-hover:scale-105`}
`;
export const MainContent = styled.div`
  ${tw`col-span-12 phone:col-span-10`}
`;
export const Title = styled.h2`
  ${tw`mb-2 font-semibold leading-none text-20`}
`;
export const CompanyName = styled(_Link)`
  ${tw`font-medium leading-none uppercase duration-300 cursor-default hover:text-primary text-16`}
`;
export const CompanyClick = styled.p`
  ${tw``}
`;
export const Location = styled.div`
  ${tw`block my-1 font-normal leading-none text-16`}
`;
export const SalaryWrapper = styled.div`
  ${tw`flex items-center gap-0.5 font-normal text-16`}
`;
export const Salary = styled.p`
  ${tw`font-bold leading-none text-secondary`}
`;
export const Field = styled.p`
  ${tw`leading-none`}
`;
export const ButtonWrapper = styled.div`
  ${tw`flex items-center mt-2 gap-x-2`}
`;
export const Button = styled.div`
  ${tw`flex items-center justify-center h-5 font-medium leading-none text-white transition duration-300 cursor-pointer bg-primary w-17 text-13 laptop:text-16 hover:bg-secondary`}
`;
export const Link = styled(_Link)`
  ${tw`flex items-center justify-center h-5 font-medium leading-none text-white transition duration-300 cursor-pointer bg-primary w-21 text-13 laptop:text-16 hover:bg-secondary`}
`;
