import styled from "styled-components";
import tw from "twin.macro";
import BaseButton from "designs/BaseButton";
import _Button from "designs/Button";
export const BasicClipartContainer = styled.div`
  ${tw``}
`;

export const ListDesignContainer = styled.div`
  ${tw``}
`;

export const ListDesigns = styled.ul`
  ${tw` flex flex-col overflow-y-auto h-full overflow-x-auto w-full`}
`;

export const Category = {
  Container: styled.li`
    ${tw`mt-2`}
  `,
  Name: styled.div`
    ${tw`font-medium flex items-center gap-1 text-lg mb-1`}
  `,
  Tag: styled.span`
    ${tw`text-sematic-2 border text-md font-medium rounded-md border-sematic-2 py-0.5 px-1`}
  `,
  ListImage: styled.ul`
    ${tw`grid grid-cols-5 gap-1 px-1`}
  `,
  ImageItem: styled.li<{ isPro: boolean }>`
    ${tw`relative aspect-w-1 aspect-h-1`}
    ${({ isPro }) => isPro && tw`opacity-20`}
  `,
  ImageContainer: styled(BaseButton)`
    ${tw`absolute rounded-sm overflow-hidden hover:shadow-as-border inset-0 w-full h-full flex justify-center items-center`}
  `,
  Image: styled.img`
    ${tw`cursor-pointer object-scale-down max-w-full max-h-full`}
  `,
};

export const Subscribe = {
  Container: styled.div`
    ${tw`bg-neutral-5 p-2`}
  `,
  Text: styled.p`
    ${tw`text-xl font-medium text-neutral-2`}
  `,
  Desc: styled.p`
    ${tw`text-lg font-normal mt-0.5 text-neutral-2`}
  `,
};
export const Button = styled(_Button)`
  ${tw`w-20 mt-1`}
`;
export const SubscribeWrapper = styled.div`
  ${tw``}
`;
export const Rock = styled.div`
  ${tw`w-full h-3`}
`;
