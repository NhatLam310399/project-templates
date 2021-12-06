import styled from "styled-components";
import tw from "twin.macro";

export const ListTemplatesContainer = styled.div`
  ${tw`mt-2.5 w-full`}
`;

export const Header = styled.div`
  ${tw`grid gap-2`}
  grid-template-columns: 16% 1fr 1fr 16%;
`;

export const ListProducts = styled.div`
  ${tw` mt-2.5 w-full `}
`;

export const GridViewContainer = styled.section`
  ${tw`grid gap-2 `}
  width: auto;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
`;
