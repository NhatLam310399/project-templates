import styled from "styled-components";
import tw from "twin.macro";

export const AllProductSchemasContainer = styled.div`
  ${tw`relative`}
`;

export const ListItems = styled.div`
  ${tw`grid w-full grid-cols-2 gap-2 laptop:grid-cols-3 desktop:grid-cols-4`}
`;
