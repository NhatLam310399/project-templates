import styled from "styled-components";
import tw from "twin.macro";

export const Wrapper = styled.div`
  ${tw`
    my-4
    py-4
    bg-white
  `}
`;

export const Container = styled.div`
  ${tw`
      grid
      grid-cols-1
      laptop:grid-cols-2
      gap-x-4
      gap-y-4
      items-center
    `}
`;
export const Image = styled.img`
  ${tw`
      w-full
      h-full
      object-cover
      ml-auto
      hidden laptop:block
  `}
`;
export const Content = styled.div`
  ${tw`

  `}
`;
