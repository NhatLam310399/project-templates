import styled from "styled-components";
import tw from "twin.macro";

import _BellIcon from "icons/Bell";

export const NotificationContainer = styled.div`
  ${tw`relative`}
`;

export const BellIcon = styled(_BellIcon)`
  ${tw` hover:text-neutral-1 relative `}
`;

export const NumberNotification = styled.div`
  ${tw`w-[20px] h-[20px] absolute z-10 rounded-full text-center leading-[20px] text-xs bg-sematic-1   text-primary-3`}
  top : -10px;
  right: -12px;
`;
export const NotificationList = {
  Wrapper: styled.div<{ isOpen: boolean }>`
    ${tw`h-50  w-full shadow-lg bg-neutral-5 border-2 border-solid border-neutral-4 rounded-lg fixed top-0 right-0 z-10 flex flex-col transition-all duration-1000 ease-in-out`}

    ${({ isOpen }) =>
      isOpen ? tw`transform translate-x-0` : tw`transform -translate-x-full`}

    ${tw`phone:top-5 phone:right-0 phone:absolute phone:transition-none phone:w-45`}
  `,
  Heading: styled.div`
    ${tw`p-[16px] h-[50px] flex justify-between`}
  `,
  Body: styled.div`
    ${tw`overflow-y-scroll flex-1`}
    &::-webkit-scrollbar {
      ${tw`w-[4px]`}
    }
    &::-webkit-scrollbar-thumb {
      ${tw`rounded-sm bg-neutral-3`}
    }
  `,
  Orther: styled.div`
    ${tw`p-[16px] text-right text-primary-1 font-normal text-xl cursor-pointer h-[56px]`}
  `,
};
export const Items = {
  Wrapper: styled.div`
    ${tw`p-[16px] border-b-2 border-solid border-neutral-4 cursor-pointer`}
    &:hover {
      ${tw`bg-neutral-4`}
    }
  `,
  Title: styled.p`
    ${tw`text-sematic-3 font-normal text-lg mb-[4px]`}
  `,
  Desc: styled.p`
    ${tw`font-medium text-lg text-neutral-1 mb-[16px] `}
    text-overflow:  ellipsis;
    overflow: hidden;
    width: 100%;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  `,
  DetailWrapper: styled.div`
    ${tw`font-normal text-neutral-2 text-md flex justify-between`}
  `,
};

export const Author = {
  Wrapper: styled.div`
    ${tw`flex gap-2`}
  `,
  Name: styled.p`
    ${tw`relative`}
    &::after {
      content: "";
      ${tw`h-2 w-[1px] bg-neutral-3 -right-1 top-[2px] absolute`}
    }
  `,
};
