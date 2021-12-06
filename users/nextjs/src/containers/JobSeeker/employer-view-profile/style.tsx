import styled from "styled-components";
import tw from "twin.macro";

import _Link from "@designs/Link";
export const Container = styled.div`
  ${tw`my-4`}
`;
export const Title = styled.div`
  ${tw`mb-4 font-bold text-20 laptop:text-26`}
`;
export const WrapTable = styled.div`
  ${tw`p-1 bg-white laptop:p-4`}
`;

export const EmptyJob = styled.div`
  ${tw`flex flex-col items-center py-4`}
`;
export const Text = styled.p`
  ${tw`mt-2 font-normal text-16`}
`;
export const Detail = styled.div`
  ${tw`text-right text-black cursor-pointer text-14`}
`;
