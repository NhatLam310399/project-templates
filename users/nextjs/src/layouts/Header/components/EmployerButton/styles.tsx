import styled from "styled-components";
import tw from "twin.macro";
import _Link from "@designs/Link";

export const EmployerButtonContainer = styled.div<{ employer: boolean }>`
  ${tw`text-16 px-1.5 py-0.5 border border-primary  hover:no-underline hidden laptop:block ml-2 cursor-pointer`}
  ${({ employer }) =>
    employer
      ? tw`border-primary text-primary`
      : tw`border-primary text-primary`}
`;
