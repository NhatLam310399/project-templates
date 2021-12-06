import styled from "styled-components";
import tw from "twin.macro";

export const WorkContainer = styled.div`
  ${tw`pb-10`}
`;

export const Title = styled.div`
  ${tw`font-bold text-3xl text-neutral-1`}
`;

export const VideoWrapper = styled.div`
  ${tw`py-3 flex justify-center `}
`;

export const ListWrapper = styled.div`
  ${tw`flex flex-wrap -mx-1`}
`;
export const Itemss = {
  Wrapper: styled.div`
    ${tw`p-2 border-2 border-solid border-neutral-4 rounded-lg`}
    &:hover {
      ${tw`shadow-lg`}
    }
  `,
  Heading: styled.div`
    ${tw`flex gap-1`}
  `,
  Title: styled.p`
    ${tw`font-medium text-xl text-neutral-1`}
  `,
  Desc: styled.p`
    ${tw`pt-2 font-normal text-lg text-neutral-1 phone:leading-6 leading-10`}
  `,
  Link: styled.p`
    ${tw`cursor-pointer pt-1 font-medium text-lg text-sematic-3`}
  `,
};

export const Orther = {
  Wrapper: styled.div`
    ${tw`pt-2`}
  `,
  Title: styled.p`
    ${tw`font-bold text-xxl text-neutral-1`}
  `,
  Desc: styled.p`
    ${tw`pt-1 font-normal text-lg text-neutral-1`}
  `,
  Link: styled.p`
    ${tw`pt-1 font-medium text-sematic-3 text-md`}
  `,
};
