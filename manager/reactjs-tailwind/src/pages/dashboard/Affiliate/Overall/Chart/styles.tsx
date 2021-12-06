import styled from "styled-components";
import tw from "twin.macro";

export const ChartContainer = styled.div`
  ${tw`  `}
`;

export const Heading = {
  Wrapper: styled.div`
    ${tw`flex phone:justify-between phone:flex-row flex-col justify-start`}
  `,
  Title: styled.p`
    ${tw`font-bold text-xxl text-neutral-1`}
  `,
  Desc: styled.p`
    ${tw`font-normal text-lg text-primary-1 cursor-pointer`}
  `,
};
