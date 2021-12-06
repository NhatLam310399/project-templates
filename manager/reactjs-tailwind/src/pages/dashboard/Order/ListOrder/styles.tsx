import styled from "styled-components";
import tw from "twin.macro";

export const OrderContainer = styled.div`
  ${tw`w-full pb-3`}
`;

export const OrderHeading = styled.div`
  ${tw`flex justify-between pb-3`}
`;

export const IconWrapper = styled.div`
  ${tw`flex items-center gap-1 cursor-pointer`}
`;

export const IconText = styled.p`
  ${tw`text-primary-1 font-medium text-lg`}
`;
