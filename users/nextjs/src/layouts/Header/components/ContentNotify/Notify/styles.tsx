import styled from "styled-components";
import tw from "twin.macro";
import _Link from "@designs/Link";

export const ItemV2Container = styled.div`
  ${tw`w-full px-5 py-1.5 max-h-[50%] overflow-y-auto text-black border-b text-13 border-grey`}
`;

export const Company = styled.p`
  ${tw`mb-1 font-bold break-all text-16 text-primary`}
`;

export const Title = styled.p`
  ${tw` mb-2.5 break-all`}
`;

export const Content = styled.div<{ isOpen: boolean }>`
  ${tw`w-full mb-2.5 text-justify`}
  ${({ isOpen }) =>
    !isOpen &&
    `
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        `}
`;

export const Action = styled.div`
  ${tw`flex justify-between w-full leading-7 text-13 text-primary`}
`;

export const ExpandButton = styled.div`
  ${tw`transform cursor-pointer w-30 hover:scale-105`}
`;

export const ConfirmButton = styled(_Link)`
  ${tw`px-3 py-1 text-white uppercase w-max bg-primary hover:no-underline`}
`;

export const DateTime = styled.p`
  ${tw`w-full font-normal text-right text-13 text-primary`}
`;
