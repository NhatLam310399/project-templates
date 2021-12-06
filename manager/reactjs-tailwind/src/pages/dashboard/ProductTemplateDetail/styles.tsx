import styled from "styled-components";
import tw from "twin.macro";
import { Container } from "designs/PageLayout";

export const ProductTemplateDetailContainer = styled(Container)`
  ${tw`w-full mb-10`}
`;

export const GridContainer = styled.div`
  ${tw`flex flex-col w-full gap-2 mt-4 phone:grid-cols-12 phone:grid`}
`;

export const ImageContainer = styled.div`
  ${tw`flex flex-col items-center w-full col-span-4 overflow-hidden h-28`}
`;

export const Content = styled.div`
  ${tw`w-full col-span-8`}
`;

export const PropertyLayoutContainer = styled.div`
  ${tw`mb-2 text-neutral-2`}
`;

export const LinkButton = styled.a`
  ${tw`block text-lg font-medium cursor-pointer hover:underline text-primary-2`}
`;

export const PrintFilesList = styled.ul`
  ${tw`flex flex-row flex-wrap gap-1`}
`;

export const ButtonsContainer = styled.div`
  ${tw`flex flex-col flex-wrap gap-1 mt-2 laptop:gap-2 laptop:flex-row`}
`;
