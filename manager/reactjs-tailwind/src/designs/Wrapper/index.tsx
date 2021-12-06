import styled from "styled-components";
import tw from "twin.macro";

export const Wrapper = styled.div<{ isBackgroundNeutral?: boolean }>`
  ${tw`px-2 pt-3 laptop:px-6`}
  ${({ isBackgroundNeutral }) => (isBackgroundNeutral ? tw`bg-neutral-5` : ``)}
`;
