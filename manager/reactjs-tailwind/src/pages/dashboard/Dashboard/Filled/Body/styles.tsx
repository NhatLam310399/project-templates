import styled from "styled-components";
import tw from "twin.macro";

export const BodyContainer = styled.div`
  ${tw`pt-10 grid grid-cols-1 desktop:grid-cols-2 gap-2`}
`;

export const Content = styled.div`
  ${tw`flex flex-col gap-2`}
`;
