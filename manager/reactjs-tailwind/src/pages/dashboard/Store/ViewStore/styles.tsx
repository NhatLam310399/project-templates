import styled, { keyframes } from "styled-components";
import tw from "twin.macro";

export const ViewStoreContainer = styled.div`
  ${tw`pb-5 w-full`}
`;

export const Heading = {
  Wrapper: styled.div`
    ${tw`flex flex-col gap-4 `}
    ${tw`phone:flex-row phone:justify-between phone:items-center`}
  `,
  Content: styled.div`
    ${tw`flex flex-col gap-2`}
    ${tw`phone:gap-4`}
  `,
  Name: styled.p`
    ${tw`font-bold text-5xl text-neutral-1`}
  `,
  Detail: styled.p`
    ${tw`font-normal text-lg text-primary-1`}
  `,
};

export const Body = styled.div`
  ${tw`pt-4 `}
`;

const animations = keyframes`
  from {
    
    opacity : 0
  } 
  to {
    opacity : 1
  }
`;

export const Notification = styled.div<{ status: boolean; success: boolean }>`
  ${tw`
    w-50 h-4  text-primary-3 rounded-md font-medium text-lg text-center leading-10
  `};

  animation: ${animations} 0.2s linear;
  ${({ status }) => (!status ? tw`hidden` : tw`block`)};
  ${({ success }) => (success ? tw`bg-sematic-3` : tw`bg-sematic-1`)};
`;
