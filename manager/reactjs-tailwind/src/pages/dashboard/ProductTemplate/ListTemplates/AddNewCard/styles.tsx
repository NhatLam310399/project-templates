import styled from "styled-components";
import tw from "twin.macro";
import BaseButton from "designs/BaseButton";

export const AddNewCardContainer = styled(BaseButton)`
  ${tw`w-full justify-center cursor-pointer hover:shadow-md text-center h-full min-h-[360px] flex flex-col items-center gap-1.5 p-2 border border-dashed rounded-lg border-neutral-4`}
`;

export const Title = styled.h3`
  ${tw`text-xl font-medium `}
`;

export const Message = styled.p`
  ${tw`font-normal text-md`}
`;
