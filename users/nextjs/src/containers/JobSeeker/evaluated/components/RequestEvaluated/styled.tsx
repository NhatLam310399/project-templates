import styled from "styled-components";
import tw from "twin.macro";

export const Container = styled.div`
  ${tw`p-2 bg-white phone:p-4`}
`;
export const Title = styled.h3`
  ${tw`mb-3 font-bold text-black text-26 `}
`;
export const ListCard = styled.div`
  ${tw`grid grid-cols-1 gap-2 `}
`;
