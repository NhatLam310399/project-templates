import BaseButton from "designs/BaseButton";
import styled from "styled-components";
import tw from "twin.macro";

export const AllCategoryLv2And3Container = styled.div`
  ${tw`relative`}
`;

export const ListItems = styled.div`
  ${tw`grid w-full grid-cols-2 gap-2  laptop:grid-cols-3 desktop:grid-cols-4`}
`;

export const Card = {
  Container: styled(BaseButton)<{ isLong: boolean | undefined }>`
    ${tw`w-full border border-solid rounded-lg cursor-pointer  h-fit border-neutral-4 hover:shadow-lg`}
    ${({ isLong }) => isLong && tw`col-span-2`}
  `,
  Text: styled.p`
    ${tw`p-1 font-semibold text-left text-md`}
  `,
  ImageContainer: styled.div<{ isLong: boolean | undefined }>`
    ${tw`w-full h-fit bg-[#f2f2f2]`}
    ${({ isLong }) => (isLong ? "aspect-ratio: 100/47" : "aspect-ratio: 1/1")}
  `,
  Image: styled.img`
    ${tw`w-full h-auto`}
  `,
};
