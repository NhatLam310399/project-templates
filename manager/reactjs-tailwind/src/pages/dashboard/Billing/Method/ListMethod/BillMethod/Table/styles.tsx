import styled from "styled-components";
import tw from "twin.macro";

export const Tables = {
  Wrapper: styled.div`
    ${tw`pb-2`}
  `,
  Title: styled.p`
    ${tw`font-bold text-xxl text-neutral-1 pb-1`}
  `,
  Desc: styled.p`
    ${tw`font-normal text-lg text-neutral-1 pb-2`}
  `,
  Body: styled.div`
    ${tw`pt-2 flex flex-col gap-2`}
  `,
};
