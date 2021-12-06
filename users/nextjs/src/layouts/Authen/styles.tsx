import styled from "styled-components";
import tw from "twin.macro";
import { SVG as _SVG } from "@designs/SVG";

export const AuthenContainer = styled.div`
  ${tw`grid laptop:grid-cols-2 gap-2 bg-white p-2 phone:p-4 phone:my-4`}
`;

export const Background = styled(_SVG)`
  ${tw`w-full`}
`;
