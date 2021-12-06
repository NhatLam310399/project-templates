import styled from "styled-components";
import tw from "twin.macro";

export const SSection = {
  Container: styled.section`
    ${tw`p-3 border border-solid rounded-lg border-neutral-4`}
  `,
  Title: styled.h2`
    ${tw`mb-1 font-bold text-xxl`}
  `,

  SubTitle: styled.h3`
    ${tw`text-xl font-normal mb-2.5`}
  `,
  Content: styled.div`
    ${tw`mt-2.5`}
  `,
};
