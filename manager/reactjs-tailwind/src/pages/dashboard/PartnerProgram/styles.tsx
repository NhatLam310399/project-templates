import styled from "styled-components";
import tw from "twin.macro";

export const PartnerProgramContainer = styled.div`
  ${tw`pb-10`}
`;

export const Heading = {
  Wrapper: styled.div`
    ${tw`flex  flex-col gap-1`}
    ${tw`phone:flex-row phone:justify-between`}
  `,

  Content: styled.div`
    ${tw`pr-2`}
  `,
  Title: styled.p`
    ${tw`font-bold text-5xl text-neutral-1`}
  `,
  Desc: styled.p`
    ${tw`font-normal  text-lg text-neutral-2 pt-1`}
  `,
  Img: styled.img`
    ${tw``}
  `,
};

export const Body = {
  Wrapper: styled.div`
    ${tw`pt-10`}
  `,
  Title: styled.p`
    ${tw`font-bold text-xxl text-neutral-1`}
  `,
  Content: styled.div`
    ${tw`pt-2 flex flex-wrap`}
  `,
};

export const Itemss = {
  Wrapper: styled.div`
    ${tw`p-2 border-2 border-solid border-neutral-4 rounded-lg cursor-pointer`}
    &:hover {
      ${tw`shadow-lg`}
    }
  `,
  Img: styled.img`
    ${tw``}
  `,
  Title: styled.p`
    ${tw`font-medium text-lg text-neutral-1 pb-1`}
  `,
  Desc: styled.p`
    ${tw`font-normal text-md text-neutral-1 pb-1`}
  `,
  Detail: styled.p`
    ${tw`font-normal text-md text-neutral-1 pb-1 flex items-center gap-1`}
  `,
};

export const Orther = {
  Wrapper: styled.div`
    ${tw`pt-10`}
  `,
  Title: styled.p`
    ${tw`font-bold text-xxl text-neutral-1`}
  `,
  Content: styled.div`
    ${tw`pt-3 flex flex-col gap-2 px-1`}
  `,
  ItemsWrapper: styled.div`
    ${tw`font-normal text-md text-neutral-1 flex gap-2`}
  `,
};
