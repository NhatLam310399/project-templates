import styled from "styled-components";
import tw from "twin.macro";

export const Wrapper = styled.div`
  ${tw`grid w-full gap-4 phone:grid-cols-2 laptop:grid-cols-4`}
`;
export const Item = styled.div`
  ${tw`leading-10 desktop:leading-8`}
`;
export const TitleItem = styled.h3`
  ${tw`pb-1 font-bold border-b text-20`}
`;
export const MobileApp = styled.div`
  ${tw`flex gap-2`}
`;
export const ListSocial = styled.div`
  ${tw`flex items-center gap-2 my-4`}
`;
export const Verified = styled.div``;
export const Img = styled.img`
  ${tw`mt-1.5`}
`;
