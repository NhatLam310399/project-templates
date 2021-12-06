import styled from "styled-components";
import tw from "twin.macro";
import { Container } from "designs/PageLayout";

export const ImportOrderContainer = styled(Container)`
  ${tw`w-full pb-3`}
`;
export const Heading = styled.div`
  ${tw`pb-4 text-lg font-normal`}
`;

export const Title = styled.span`
  ${tw`text-neutral-2`}
`;

export const Detail = styled.span`
  ${tw`text-neutral-1`}
`;
