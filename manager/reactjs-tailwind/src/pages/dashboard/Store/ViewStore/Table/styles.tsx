import styled from "styled-components";
import tw from "twin.macro";

export const TableContainer = styled.div`
  ${tw`w-full`}
`;

export const Search = {
  Wrapper: styled.div`
    ${tw`py-2 border-b-2 border-solid border-neutral-3 flex flex-col-reverse gap-2 relative`}
    &::after {
      content: "";
      ${tw`w-5 h-[4px] bg-neutral-1  left-0 absolute`}
      bottom: -2px;
    }
    ${tw`phone:justify-between phone:items-center phone:flex-row`}
  `,
  Title: styled.p`
    ${tw`font-medium text-neutral-1 text-lg relative`}
  `,
};

export const Body = styled.div`
  ${tw`pt-5`}
`;

export const TableHeading = {
  Wrapper: styled.div`
    ${tw`pb-2 border-b-2 border-neutral-3 border-solid flex justify-between items-center`}
  `,
  Title: styled.p`
    ${tw`font-medium text-neutral-1 text-lg pl-0`}
    ${tw`phone:pl-6 `}
  `,
  Link: styled.p`
    ${tw`font-normal text-primary-1 text-lg underline cursor-pointer`}
  `,
  Desc: styled.p`
    ${tw`font-normal  text-lg text-neutral-2`}
  `,
};

export const Items = {
  Wrapper: styled.div`
    ${tw`py-4 border-b-2 border-solid border-neutral-4 flex gap-1  pl-0 flex-col items-center`}
    ${tw`phone:pl-4 phone:flex-row phone:justify-between`}
  `,
  Content: styled.div`
    ${tw`flex gap-2 items-center`}
  `,
  Title: styled.p`
    ${tw`font-normal text-lg text-neutral-1`}
  `,
  Desc: styled.p`
    ${tw`font-normal text-md text-neutral-1`}
  `,
  TextWrpper: styled.div`
    ${tw`flex flex-col gap-1`}
  `,
};

export const Edit = {
  Wrapper: styled.div`
    ${tw`p-1 border-2 border-solid border-primary-1 rounded-md cursor-pointer relative`}
  `,
};

export const Menu = {
  Wrapper: styled.div`
    ${tw`absolute bg-primary-3 z-10 rounded-md -left-18 top-4 shadow-md border-2 border-solid border-neutral-4 flex flex-col items-center w-20`}
  `,
  Item: styled.div`
    ${tw`w-full text-center py-1 font-normal text-lg text-neutral-1 `}
    &:hover {
      ${tw`bg-primary-1 text-primary-3`}
    }
  `,
};
