import styled from "styled-components";
import tw from "twin.macro";
import { Container } from "designs/PageLayout";

export const ProductTemplateContainer = styled(Container)`
  ${tw`w-full pb-12`}
`;

export const SubTitle = styled.h2`
  ${tw`mt-1 font-normal text-md phone:text-xl text-neutral-2`}
`;
