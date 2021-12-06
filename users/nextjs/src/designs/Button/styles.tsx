import styled from "styled-components";
import tw from "twin.macro";

export const ButtonContainer = styled.button<{
  primary?: boolean;
  loading?: boolean;
}>`
  ${tw`flex items-center justify-center py-1 font-medium text-16`}
  ${({ primary }) =>
    primary
      ? tw`text-white duration-100 bg-primary hover:bg-opacity-80`
      : tw`text-black duration-100 bg-white bg-opacity-0 hover:bg-opacity-40`}
  ${({ loading }) =>
    loading ? tw`cursor-wait pointer-events-none bg-opacity-60` : ""}
`;
