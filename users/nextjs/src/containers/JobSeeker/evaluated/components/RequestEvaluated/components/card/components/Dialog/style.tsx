import styled from "styled-components";
import tw from "twin.macro";

export const DialogWrapper = styled.div`
  ${tw`relative w-full p-4 bg-white max-w-screen-phone z-full`}
`;
export const Title = styled.h4`
  ${tw`mb-2 font-bold text-black text-20 laptop:text-26`}
`;
export const AvgPoint = styled.p`
  ${tw`mb-2 font-bold text-20 `}
`;
export const AvgPointNumber = styled.span`
  ${tw`text-secondary`}
`;
export const PointWrapper = styled.ul`
  ${tw`phone:py-2`}
`;
export const ItemPoint = styled.li`
  ${tw`flex items-center justify-between gap-2 mb-2`}
`;
export const NamePoint = styled.p`
  ${tw`font-medium text-16`}
`;
export const Point = styled.span`
  ${tw`font-bold text-16 text-secondary`}
`;
