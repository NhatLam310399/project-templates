import BaseButton from "designs/BaseButton";
import styled from "styled-components";
import tw from "twin.macro";

export const AllCategoryLv1Container = styled.div`
  ${tw``}
`;

export const ListItems = styled.div`
  ${tw` w-full grid laptop:grid-cols-2 desktop:grid-cols-3 gap-2 `}
`;

export const Card = {
  Container: styled(BaseButton)`
    ${tw` w-full cursor-pointer border border-solid border-neutral-4 rounded-lg hover:shadow-lg`}
  `,
  Text: styled.p`
    ${tw`text-left text-md font-semibold p-1`}
  `,
  ImageContainer: styled.div`
    ${tw`w-full bg-[#f2f2f2]`}
    aspect-ratio: 59/40;
  `,
  Image: styled.img`
    ${tw`w-full`}
  `,
};
