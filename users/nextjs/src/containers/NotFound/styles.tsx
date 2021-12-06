import styled from "styled-components";
import tw from "twin.macro";

export const Wrapper = styled.div`
  ${tw`h-screen phone:px-5 flex justify-center items-center gap-5`}
`;
export const Container = styled.div`
  ${tw`mx-auto flex justify-between items-center flex-col-reverse laptop:flex-row`}
`;
export const TextContent = styled.div`
  ${tw`flex flex-col items-center laptop:items-start w-full laptop:w-auto mt-4 laptop:mt-0`}
`;
export const Text404 = styled.div`
  ${tw`w-full text-26 phone:text-44 laptop:text-70 text-primary font-bold phone:font-black leading-tight text-left`}
`;
export const Title = styled.h1`
  ${tw`w-full text-26 phone:text-33 desktop:text-48 text-primary text-left font-bold laptop:-mt-1`}
`;
export const Detail = styled.h2`
  ${tw`w-full text-20 font-normal text-left phone:text-20 mt-2 mb-2 phone:mb-4`}
`;
export const Button = styled.div`
  ${tw`w-full laptop:w-30 py-1 text-center text-white text-20 uppercase font-bold bg-primary cursor-pointer`}
`;
