import styled from "styled-components";
import tw from "twin.macro";

export const AvatarContainer = styled.div<{ roundFull: boolean }>`
  ${tw`  w-4 h-4 overflow-hidden`}
  ${({ roundFull: isRound }) => (isRound ? tw`rounded-md` : tw`rounded-full`)}
`;
