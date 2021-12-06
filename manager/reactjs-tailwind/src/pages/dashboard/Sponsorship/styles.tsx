import styled from "styled-components";
import tw from "twin.macro";

export const SponsorshipContainer = styled.div`
  ${tw`pb-5`}
`;

export const Heading = {
  Wrapper: styled.div`
    ${tw`pb-4`}
  `,
  Title: styled.p`
    ${tw`font-bold text-neutral-1 text-5xl`}
  `,
  Desc: styled.p`
    ${tw`font-medium text-neutral-1 text-lg pt-2`}
  `,
  Detail: styled.p`
    ${tw`font-normal text-lg text-neutral-1 pt-2 `}
  `,
};

export const Body = styled.div`
  ${tw`w-full overflow-x-auto`}
`;

export const Table = {
  Wrapper: styled.div`
    ${tw`w-[600px]`}
    ${tw`desktop:w-1/2 phone:w-full`}
  `,
  Heading: styled.div`
    ${tw`flex justify-between items-center border-solid border-2 border-neutral-4 p-2`}
  `,
  Title: styled.p`
    ${tw`font-medium text-neutral-1 text-lg`}
  `,
  Desc: styled.p`
    ${tw`font-medium text-neutral-1 text-md pt-1`}
  `,
  ItemWrapper: styled.div`
    ${tw`flex font-medium text-neutral-1 text-lg`}
  `,
  LeftContent: styled.div`
    ${tw`flex gap-1 items-center  w-9/12 p-2 border-2 border-solid border-neutral-4`}
    border-top: transparent;
  `,
  RightCotent: styled.div`
    ${tw`p-2 border-2 border-neutral-4 border-solid w-3/12 `}
    border-top : transparent;
    border-left: transparent;
  `,
};

export const Others = {
  Wrapper: styled.div`
    ${tw`pt-2`}
  `,
  Title: styled.p`
    ${tw`font-bold text-xxl text-neutral-1`}
  `,
  Desc: styled.p`
    ${tw`font-normal text-lg text-neutral-1`}
  `,
  ItemWrapper: styled.div`
    ${tw`flex gap-1 items-center pt-1 justify-between`}
    ${tw`phone:justify-start`}
  `,
  Item: styled.div`
    ${tw`p-1 border-2 border-solid border-neutral-4 cursor-pointer`}
  `,
  Detail: styled.p`
    ${tw`pt-2 font-medium text-lg text-neutral-1`}
  `,
  Form: styled.div`
    ${tw`flex gap-2  pt-1 w-full flex-col`}
    ${tw`desktop:w-1/2 phone:flex-row phone:w-2/3`}
  `,
  Input: styled.input`
    ${tw`border-2 border-solid border-neutral-4 flex-1 p-1 focus:border-primary-1 focus:border-solid focus:border-2 outline-none`}
  `,
  Link: styled.p`
    ${tw`pt-1 font-normal text-lg text-neutral-1 cursor-pointer`}
  `,
};
