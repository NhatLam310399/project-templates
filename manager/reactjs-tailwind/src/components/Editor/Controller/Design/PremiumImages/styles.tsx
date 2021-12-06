import styled from "styled-components";
import tw from "twin.macro";
import BaseButton from "designs/BaseButton";

export const QuickDesignContainer = styled.div`
  ${tw``}
`;

export const ListDesignContainer = styled.div`
  ${tw``}
`;

export const ListDesigns = styled.ul`
  ${tw` flex flex-col mt-2 overflow-y-auto h-full overflow-x-auto w-full`}
`;
export const Price = styled.div`
  ${tw`absolute select-none bg-neutral-1 cursor-pointer  bg-opacity-20 opacity-0 duration-300 left-0 top-0 w-full h-full flex items-center justify-center text-xxl text-primary-3 font-bold`}
`;
export const Category = {
  Container: styled.li`
    ${tw`mt-2`}
  `,
  Name: styled.p`
    ${tw`font-medium text-lg truncate`}
  `,
  ListImage: styled.ul`
    ${tw`grid grid-cols-3 gap-1 px-1 mt-2`}
  `,

  ImageItem: styled.li`
    ${tw`relative col-span-1`}
    &:hover {
      ${Price} {
        ${tw`opacity-100 duration-300`}
      }
    }
  `,
  ImageContainer: styled(BaseButton)`
    ${tw` rounded-sm overflow-hidden hover:shadow-as-border w-full h-full flex justify-center items-center`}
  `,
  Image: styled.img`
    ${tw`cursor-pointer object-cover max-w-14 h-full max-h-10`}
  `,
};

export const Rock = styled.div`
  ${tw` w-full h-3 `}
`;
export const Title = styled.p`
  ${tw`my-1 font-medium text-xxl text-neutral-1`}
`;
