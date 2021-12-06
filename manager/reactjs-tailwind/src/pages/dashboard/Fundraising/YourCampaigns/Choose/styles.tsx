import styled from "styled-components";
import tw from "twin.macro";

export const ChooseContainer = styled.div`
  ${tw`pb-3`}
`;

export const Title = styled.p`
  ${tw`font-bold text-xxl text-neutral-1 pb-1`}
`;

export const Desc = styled.p`
  ${tw`font-normal text-md text-neutral-1 pb-1`}
`;

export const Lable = styled.p`
  ${tw`font-normal text-lg text-neutral-1 pb-1`}
`;

export const Content = {
  Wrapper: styled.div`
    ${tw`flex mb-3 phone:flex-row flex-col`}
  `,
  BoxLink: styled.div`
    ${tw`px-2 py-1  font-normal text-neutral-2 text-lg bg-neutral-4 w-full phone:w-40 border-2 border-neutral-5 border-solid`}
  `,
  Box: styled.div`
    ${tw`px-2 py-1 font-normal text-lg flex justify-between w-full  phone:w-27 border-2 border-neutral-5 border-solid `}
  `,
};

export const VideoWrapper = styled.div`
  ${tw`pt-2 flex gap-1 font-normal text-neutral-1 text-md items-center phone:flex-row flex-col`}
`;
