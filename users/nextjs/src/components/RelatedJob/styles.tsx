import styled from "styled-components";
import tw from "twin.macro";
import _Link from "@designs/Link";

export const RelateJobContainer = styled.div`
  ${tw` mt-4 mb-8`}
`;
export const ListCardContainer = styled.div`
  ${tw`grid phone:grid-cols-6 grid-cols-12 laptop:grid-cols-12 gap-2 mt-4`}
`;
export const Title = styled.div`
  ${tw`text-black text-30 font-bold leading-none`}
`;
export const LinkWrapper = styled.div`
  ${tw`block col-span-12 phone:col-span-6 laptop:col-span-4`}
`;
export const Link = styled(_Link)`
  ${tw``}
`;
