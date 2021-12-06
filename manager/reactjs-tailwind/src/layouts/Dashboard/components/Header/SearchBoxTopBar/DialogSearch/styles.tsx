import styled from "styled-components";
import tw from "twin.macro";

export const Overlay = styled.div<{ open: boolean }>`
  ${tw`fixed inset-0 z-30 invisible top-0 left-0 right-0 bottom-0 transition-opacity opacity-0 bg-[#131313b3]`}
  ${({ open }) => (open ? tw`visible opacity-100 ` : tw` `)}
`;

export const DialogSearchContainer = styled.div<{ open: boolean }>`
  ${tw`absolute top-0  bg-primary-3 z-40 rounded-sm -left-4.5 w-[310px]  h-[400px]`}
  ${tw`phone:-left-3 phone:w-[700px] phone:h-[610px]`}
  ${tw`laptop:left-0 laptop:h-[610px] laptop:w-[900px] `}
 
  ${({ open }) => (open ? tw`block ` : tw`hidden`)}
`;

export const HeadingSearch = {
  Wrapper: styled.div`
    ${tw` p-1 border-b-2 border-solid border-neutral-4 rounded-tl-sm rounded-tr-sm flex gap-2 justify-between `}
  `,
  SearchBox: styled.div`
    ${tw`flex items-center gap-1 flex-1`}
  `,
  Input: styled.input`
    ${tw`w-full outline-none border-none`}
  `,
};

export const Body = styled.div`
  ${tw`flex relative flex-col`}
  ${tw`phone:flex-row`}
`;

export const LeftSide = {
  Wrapper: styled.div`
    ${tw`p-[16px] border-r-2 border-solid border-neutral-4`}
  `,
  Title: styled.div`
    ${tw`font-medium text-lg text-neutral-1 hidden`}
    ${tw`phone:block`}
  `,
  Content: styled.div`
    ${tw` flex overflow-x-auto `}
    ${tw`phone:mt-[16px] phone:h-[490px] phone:overflow-y-scroll phone:block`}
    &::-webkit-scrollbar {
      ${tw`phone:w-[4px]`}
    }
    &::-webkit-scrollbar-thumb {
      ${tw`rounded-sm bg-neutral-3`}
    }
  `,
  Item: styled.p`
    ${tw`px-[8px] pb-[16px] font-normal text-md text-neutral-1 flex-shrink-0`}
    ${tw`phone:py-[8px] phone:flex-shrink`}
  `,
};

export const RightSide = {
  Wrapper: styled.div`
    ${tw`px-[8px] h-[200px] overflow-y-scroll`}
    ${tw`phone:px-[16px] phone:h-[500px] phone:overflow-y-scroll`}
    &::-webkit-scrollbar {
      ${tw`w-[4px]`}
    }
    &::-webkit-scrollbar-thumb {
      ${tw`rounded-sm bg-neutral-3`}
    }
  `,
  Content: styled.div`
    ${tw` grid grid-cols-1 gap-1`}
    ${tw` laptop:grid-cols-2`}
  `,
};

export const Notfound = {
  Wrapper: styled.div`
    ${tw`pb-2 border-solid border-b-2 border-neutral-3 flex flex-col items-center gap-1 mb-4 mt-4`}
  `,
  Title: styled.div`
    ${tw`font-bold text-xxl text-neutral-1`}
  `,
  Desc: styled.div`
    ${tw`font-normal text-lg text-neutral-1`}
  `,
};
export const Items = {
  Wrapper: styled.div`
    ${tw`p-2 border-2 rounded-sm border-solid border-neutral-4 flex items-center gap-1 laptop:w-30 phone:w-full cursor-pointer`}
    &:hover {
      ${tw`shadow-lg`}
    }
  `,
  Image: styled.img`
    ${tw`h-5 w-5`}
  `,
  Content: styled.div`
    ${tw``}
  `,
  Title: styled.p`
    ${tw`font-normal text-md leading-6 text-neutral-1`}
  `,
  Price: styled.p`
    ${tw`font-medium text-neutral-1 text-lg mt-1`}
  `,
};
