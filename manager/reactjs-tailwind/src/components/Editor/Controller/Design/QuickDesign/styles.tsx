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

export const Category = {
  Container: styled.li``,
  Name: styled.p`
    ${tw`font-medium text-lg`}
  `,
  ListImage: styled.ul`
    ${tw`grid grid-cols-4 gap-1 px-1 mt-2`}
  `,
  ImageItem: styled.li`
    ${tw`relative aspect-w-1 aspect-h-1`}
  `,
  ImageContainer: styled(BaseButton)`
    ${tw`absolute rounded-sm overflow-hidden hover:shadow-as-border inset-0 w-full h-full flex justify-center items-center`}
  `,
  Image: styled.img`
    ${tw`cursor-pointer object-cover w-full h-full`}
  `,
};

export const Rock = styled.div`
  ${tw` w-full h-3 `}
`;
