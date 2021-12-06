import styled from "styled-components";
import tw from "twin.macro";
import _Link from "@designs/Link";

export const Wrapper = styled.div``;
export const Title = styled.h1`
  ${tw`font-bold text-26 text-primary pl-2 border-l-4 border-primary leading-10`}
`;
export const ListPost = styled.div`
  ${tw`mt-4`}
`;
export const Post = {
  Container: styled(_Link)`
    ${tw`mb-4 cursor-pointer text-16`}
  `,
  Title: styled.h3`
    ${tw`font-medium mt-2 mb-1.5 group-hover:text-secondary`}
  `,
  TxtContent: styled.p`
    ${tw`text-14 font-normal`}
  `,
};
