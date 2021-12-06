import styled from "styled-components";
import tw from "twin.macro";
import _Link from "@designs/Link";

export const CardLayoutContainer = styled.div<{ length: number }>`
  ${({ length }) => (length > 2 ? tw`mb-12` : tw`mb-6`)};
  .slick-slide {
    ${tw`grid gap-2`}
    & > div {
      ${tw`flex gap-2`}
    }
  }
`;

export const Title = styled.h2`
  ${tw`mb-3 font-bold text-center text-black text-26 phone:text-30`}
`;

export const CardContainer = styled.div`
  ${tw`flex`}
`;
