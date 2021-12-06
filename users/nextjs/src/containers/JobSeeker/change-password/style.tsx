import styled from "styled-components";
import tw from "twin.macro";

export const Container = styled.div`
  ${tw`grid grid-cols-2 p-1 bg-white laptop:p-4`}
`;
export const Title = styled.h3`
  ${tw`col-span-2 mb-4 font-bold text-black text-20 laptop:text-26`}
`;
export const Form = styled.form`
  ${tw`col-span-2 laptop:col-span-1`}
`;
export const Wrapper = styled.div`
  ${tw`my-2`}
`;
