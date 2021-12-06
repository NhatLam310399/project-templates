import styled from "styled-components";
import tw from "twin.macro";

export const BlogDetailContainer = styled.div`
  ${tw`py-2 phone:py-5`}
`;
export const Container = styled.div`
  ${tw`w-full grid laptop:grid-cols-12 gap-6`}
`;
export const ContentWrapper = styled.div`
  ${tw`laptop:col-span-8 px-1 laptop:px-0`}
`;
export const PostSideWrapper = styled.div`
  ${tw`laptop:col-span-4 px-1 laptop:px-0`}
`;
